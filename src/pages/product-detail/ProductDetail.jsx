import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatPrice } from "../../services/utils/formatNumber";
import { useOrder } from "../../context/OrderContext";
import "./ProductDetail.css";

const URL = `http://localhost:3000/api/products`;

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const { addOrderItem } = useOrder();

  async function getProductById(productId) {
    try {
      // Realiza la solicitud GET al backend
      const response = await axios.get(`${URL}/${productId}`);
      console.log('Datos del producto:', response.data);
      setProduct(response.data.product);
    } catch (error) {
      console.error('Error al obtener el producto:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (id) {
      getProductById(id);
    }
  }, [id]);

  if (loading) {
    return <h4>Cargando....</h4>;
  }

  if (!product) {
    return <h4>Producto no encontrado</h4>;
  }

  return (
    <div className="product-detail-card">
      <div className="product-detail-header">
        <img
          className="product-detail-img"
          src={`http://localhost:3000/images/products/${product.image}`}
          alt={product.name || 'Imagen no disponible'}
        />
      </div>
      <div className="product-detail-body">
        <h2 className="product-detail-title">{product.name || 'Nombre no disponible'}</h2>
        <p className="product-detail-description">
          <strong>Descripción:</strong> {product.description || 'Descripción no disponible'}
        </p>
        <p className="product-detail-price">
          <strong>Precio:</strong> ${formatPrice(product.price) || 'Precio no disponible'}
        </p>
        <p className="product-detail-brand">
          <strong>Marca:</strong> Nike
        </p>
        <p className="product-detail-info">
          Nike es una marca líder en la industria del deporte y la moda. Con una rica historia de innovación y calidad, Nike ofrece productos que no solo destacan por su diseño, sino también por su rendimiento. Cada producto Nike está diseñado para satisfacer las necesidades de los atletas y entusiastas del deporte, combinando tecnología avanzada con estilo inigualable.
        </p>
      </div>
      <div className="product-detail-footer">
      <button 
  onClick={() => addOrderItem(product)} 
  className="add-to-cart-button"
  style={{ marginTop: '20px' }}
>
  Comprar
</button>

      </div>
    </div>
  );
}
