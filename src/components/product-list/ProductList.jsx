import { useEffect, useState } from 'react';
import { useOrder } from '../../context/OrderContext';

const ProductList = () => {
  const { order, addOrderItem } = useOrder();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    if (Array.isArray(order.products)) {
      setProducts(order.products);
    }
  }, [order]);

  if (!Array.isArray(products)) {
    return <div>Error: No se pudieron cargar los productos.</div>;
  }

  return (
    <div>
      <h1>Lista de Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.product}>
            {product.name} - {product.quantity} - ${product.price}
            <button onClick={() => addOrderItem(product)}>Agregar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;