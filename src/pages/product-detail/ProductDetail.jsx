import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const URL = `https://663ebeffe3a7c3218a4b47e7.mockapi.io`;

export default function ProductDetail() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  const [loading, setLoading] = useState(true); // Inicializa como true

  async function getProductById(productId) {
    try {
      const response = await axios.get(`${URL}/products/${productId}`);
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Asegúrate de que se establezca en false al final
    }
  }

  useEffect(() => {
    getProductById(id);
  }, [id]); // Agrega id como dependencia

  if (loading) {
    return <h4>Cargando....</h4>;
  }

  if (!product) {
    return <h4>Producto no encontrado</h4>; // Maneja el caso cuando no se encuentra el producto
  }

  return <h1>{product.name}</h1>;
}
