import { useState, useEffect } from "react";
import ProductCard from "../product-card/ProductCard";
import axios from "axios";
import "./ProductList.css"

const URL = "https://663ebeffe3a7c3218a4b47e7.mockapi.io/";

export default function ProductList() {
    const [products, setProducts] = useState([]); // Inicializar como un array vacío

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        try {
            const response = await axios.get(`${URL}/products`);
            const productsAPI = response.data;
            console.log(productsAPI);
            setProducts(productsAPI);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <h2>LISTA DE PRODUCTOS</h2>
            
            <div className="card-container">
                {products.map((prod) => (
                <ProductCard key={prod.id} product={prod} />    
                )
            )}

            </div>
            </div>
    );
}
