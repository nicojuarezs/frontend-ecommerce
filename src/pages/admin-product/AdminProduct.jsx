import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { formatTimestampToInputDate } from "../../services/utils/formatDates";
import Modal from "../../layout/modal/modal";
import "../../layout/modal/Modal.css"

const URL = `https://663ebeffe3a7c3218a4b47e7.mockapi.io`;

export default function AdminProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  function handleClose() {
    setIsOpen(false);
  }

  function handleOpen() {
    setIsOpen(true);
  }

  async function getProducts() {
    try {
      const response = await axios.get(`${URL}/products`);
      setProducts(response.data);
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al obtener los productos", "error");
    }
  }

  const { register, setValue, handleSubmit, reset, formState: { errors } } = useForm();

  async function onSubmit(data) {
    data.createdAt = new Date(data.createdAt).getTime();
    data.price = +data.price;

    if (data.id) {
      await updateProductData(data);
    } else {
      await createProduct(data);
    }
  }

  async function updateProductData(product) {
    try {
      await axios.put(`${URL}/products/${product.id}`, product);
      Swal.fire("Éxito", "Producto actualizado correctamente", "success");
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      setProducts(updatedProducts);
      setIsEditing(false);
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al actualizar el producto", "error");
    }
  }

  async function createProduct(product) {
    try {
      const newProduct = await axios.post(`${URL}/products`, product);
      Swal.fire("Éxito", "Producto creado correctamente", "success");
      setProducts([...products, newProduct.data]);
      reset();
      handleClose();
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al crear el producto", "error");
    }
  }

  async function deleteProduct(id) {
    try {
      await axios.delete(`${URL}/products/${id}`);
      Swal.fire("Éxito", "Producto eliminado correctamente", "success");
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.log(error);
      Swal.fire("Error", "Error al eliminar el producto", "error");
    }
  }

  function handleEditProduct(product) {
    setIsEditing(true);
    setValue("id", product.id);
    setValue("name", product.name);
    setValue("price", product.price);
    setValue("image", product.image);
    setValue("category", product.category);
    setValue("description", product.description);
    setValue("createdAt", formatTimestampToInputDate(product.createdAt));
    handleOpen();
  }

  return (
    <div className="admin-container">
      <h1>ADMIN PRODUCT</h1>
      <button className="btn" onClick={handleOpen}>CARGAR PRODUCTO</button>
      <div className="admin-form-container">
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
          <div className="input-group">
            <label htmlFor="name">Producto</label>
            <input
              type="text"
              {...register("name", { required: true, minLength: 3, maxLength: 100 })}
            />
            {errors.name?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
            {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (
              <span className="input-error">La cantidad de caracteres es invalida</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="image">Imagen</label>
            <input
              type="url"
              {...register("image", { required: true })}
            />
            {errors.image?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="category">Categoria</label>
            <select {...register("category", { required: true })}>
              <option value="running">Running</option>
              <option value="moda">Moda</option>
              <option value="sports">Deportes</option>
              <option value="mountain">Montaña</option>
            </select>
            {errors.category?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="description">Descripcion</label>
            <textarea
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="createdAt">Fecha ingreso</label>
            <input
              type="date"
              {...register("createdAt", { required: true })}
            />
            {errors.createdAt?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          
          <button className={isEditing ? 'btn-success' : ''} 
          type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        </form>
      </div>
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr className="admin-table-head">
              <th className="image">Imagen</th>
              <th className="name">Producto</th>
              <th className="description">Descripcion</th>
              <th className="price">Precio</th>
              <th className="action">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="admin-table-head" key={product.id}>
                <td className="image">
                  <img src={product.image} alt={product.name} />
                </td>
                <td className="name">
                  <p>{product.name}</p>
                </td>
                <td className="description">
                  <p>{product.description}</p>
                </td>
                <td className="price">
                  <p>${product.price}</p>
                </td>
                <td className="action">
                  <button className="action-btn"
                    onClick={() => handleEditProduct(product)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="action-btn btn-danger"
                    onClick={() => deleteProduct(product.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal title="Cargar producto" isOpen={isOpen} handleClose={handleClose}>
        <>
        <form className="admin-form" onSubmit={handleSubmit(onSubmit)}>
          <input type="hidden" {...register("id")} />
          <div className="input-group">
            <label htmlFor="name">Producto</label>
            <input
              type="text"
              {...register("name", { required: true, minLength: 3, maxLength: 100 })}
            />
            {errors.name?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
            {(errors.name?.type === "minLength" || errors.name?.type === "maxLength") && (
              <span className="input-error">La cantidad de caracteres es invalida</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="price">Precio</label>
            <input
              type="number"
              {...register("price", { required: true })}
            />
            {errors.price?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="image">Imagen</label>
            <input
              type="url"
              {...register("image", { required: true })}
            />
            {errors.image?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="category">Categoria</label>
            <select {...register("category", { required: true })}>
              <option value="running">Running</option>
              <option value="moda">Moda</option>
              <option value="sports">Deportes</option>
              <option value="mountain">Montaña</option>
            </select>
            {errors.category?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="description">Descripcion</label>
            <textarea
              {...register("description", { required: true })}
            />
            {errors.description?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="createdAt">Fecha ingreso</label>
            <input
              type="date"
              {...register("createdAt", { required: true })}
            />
            {errors.createdAt?.type === "required" && (
              <span className="input-error">El campo es requerido</span>
            )}
          </div>
          
          <button className={isEditing ? 'btn-success' : ''} 
          type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
        </form>
        </>
      </Modal>
    </div>
  );
}