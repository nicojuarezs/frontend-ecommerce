import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/product-card/ProductCard";
import './Home.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    try {
      const response = await axios.get('http://localhost:3000/api/products');
      setProducts(response.data.products);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h1>Listado de Productos</h1>
      <section className="home-container"> {}
        {products.length > 0 ? (
          products.map((item, index) => (
            <ProductCard key={index} product={item} />
          ))
        ) : (
          <p>No hay productos en el carrito.</p>
        )}
      </section>
    </>
  );
}
