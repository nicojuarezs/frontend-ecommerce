import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";
import Modal from "../../layout/modal/modal";
import "../../layout/modal/Modal.css";
import { useUser } from "../../context/UserContext";
import useApi from "../../services/interceptor/interceptor";
import Pagination from "../../pagination/Pagination";

export default function AdminProduct() {
  const api = useApi();
  const { token } = useUser(); // Accede al token del contexto
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState([]);

  // Estados para mi componente paginación y peticiones
  const [totalItems, setTotalItems] = useState(0);
  const [pageItems, setPageItems] = useState(2);
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página actual

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    getProducts({ page: currentPage });
    getCategories();
  }, [pageItems, currentPage]);

  async function getCategories() {
    try {
      const response = await api.get(`/categories`);
      const categoriesDB = response.data.categories;
      setCategories(categoriesDB);
    } catch (error) {
      console.log("Error al obtener categorías", error);
    }
  }

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  async function getProducts({ page = 0 }) {
    try {
      const response = await api.get(`/products?limit=${pageItems}&page=${page}`);
      const { products, total } = response.data;

      setProducts(products);
      setTotalItems(total);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al obtener los productos", "error");
    }
  }

  async function onSubmit(data) {
    try {
      const formData = new FormData();
      if (data.id) {
        formData.append("_id", data.id);
      }
  
      formData.append("name", data.name);
      formData.append("price", +data.price);
  
      formData.append("image", data.image.length ? data.image[0] : undefined);
  
      formData.append("createdAt", new Date(data.createdAt).getTime());
      formData.append("category", data.category);
      formData.append("description", data.description);
  
      if (isEditing) {
        await updateProductData(formData);
      } else {
        await createProduct(formData);
        // Notificación de éxito al agregar el producto
        Swal.fire('¡Éxito!', 'El producto se ha agregado exitosamente.', 'success');
      }
  
      reset();
      setIsEditing(false);
      handleClose(); // Cierra el modal después de enviar el formulario
    } catch (error) {
      console.error("Error al enviar el formulario", error);
      Swal.fire("Error", "Error al agregar el producto", "error");
    }
  }

  async function updateProductData(productFormData) {
    try {
      const id = productFormData.get("_id");
      await api.put(`/products/${id}`, productFormData);
      getProducts({ page: currentPage });
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al actualizar el producto", "error");
    }
  }

  async function createProduct(product) {
    try {
      await api.post(`/products`, product);
      getProducts({ page: currentPage });
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteProduct(id) {
    // Mostrar la confirmación antes de eliminar
    const result = await Swal.fire({
      title: 'Borrar producto',
      text: '¿Realmente desea quitar este producto?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        await api.delete(`/products/${id}`, {
          headers: {
            Authorization: token,
          },
        });

        // Actualiza la lista de productos después de eliminar
        setProducts(products.filter((product) => product._id !== id));
        getProducts({ page: currentPage });
        Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
      } catch (error) {
        console.log("Error al eliminar el producto:", error);
        Swal.fire("Error", "Error al eliminar el producto", "error");
      }
    }
  }

  function handleEditProduct(product) {
    setIsEditing(true);
    setValue("id", product._id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("category", product.category._id);
    setValue("description", product.description);
    setValue("createdAt", formatTimestampToInputDate(product.createdAt));
    handleOpen(); // Abre el modal para editar el producto
  }

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function formatPrice(price) {
    // Elimina las comas y los decimales, y agrega un punto como separador decimal si es necesario
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace(/,/g, '');
  }

  return (
    <div className="admin-container">
      <h1>ADMIN PRODUCT</h1>
      <button className="btn" onClick={handleOpen}>
        CARGAR PRODUCTO
      </button>

      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("_id")} />
          <div className="input-group">
            <label htmlFor="name">Producto</label>
            <input
              type="text"
              {...register("name", {
                required: true,
                minLength: 3,
                maxLength: 100,
              })}
            />
            {errors.name?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
            {(errors.name?.type === "minLength" ||
              errors.name?.type === "maxLength") && (
              <span className="input-error">
                La cantidad de caracteres es inválida
              </span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="price">Precio</label>
            <input type="number" {...register("price", { required: true })} />
            {errors.price?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="image">Imagen</label>
            <input
              type="file"
              accept="image/*"
              {...register("image", { required: true })}
            />
            {errors.image?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="category">Categoría</label>
            <select
              {...register("category", { required: true })}
              className="select-input"
            >
              {categories.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.category?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="description">Descripción</label>
            <textarea
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="createdAt">Fecha de ingreso</label>
            <input
              type="date"
              {...register("createdAt", { required: true })}
            />
            {errors.createdAt?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <button
            className={isEditing ? "btn-success" : ""}
            type="submit"
          >
            {isEditing ? "Actualizar" : "Crear"}
          </button>
        </form>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="image">Imagen</th>
              <th className="name">Producto</th>
              <th className="description">Descripción</th>
              <th className="price">Precio</th>
              <th className="action">Acciones</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr className="admin-table-row" key={product._id}>
                <td className="image">
                  <img
                    src={`http://localhost:3000/images/products/${product.image}`}
                    alt={product.name}
                  />
                </td>
                <td className="name">
                  <p>{product.name}</p>
                </td>
                <td className="description">
                  <p>{product.description}</p>
                </td>
                <td className="price">
                  <p>{formatPrice(product.price)}</p>
                </td>
                <td className="action">
                  <button
                    className="action-btn"
                    onClick={() => handleEditProduct(product)}
                  >
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button
                    className="action-btn btn-danger"
                    onClick={() => deleteProduct(product._id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="list-tools">
          <Pagination totalItems={totalItems} loadPage={getProducts} pageItems={pageItems} />
          <select defaultValue={pageItems} onChange={(e) => setPageItems(Number(e.target.value))}>
            <option value="2">2 Items</option>
            <option value="3">3 Items</option>
            <option value="5">5 Items</option>
          </select>
        </div>
      </div>

      {isOpen && (
        <Modal closeModal={handleClose}>
          <h2>{isEditing ? "Editar Producto" : "Agregar Producto"}</h2>
          {}
        </Modal>
      )}
    </div>
  );
}