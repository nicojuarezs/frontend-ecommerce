import ProductList from "../../components/product-list/ProductList";
import { useOrder } from "../../context/OrderContext";

export default function Home() {

  const { order } = useOrder();
  console.log(order);

  return (
    <>
      <h1>Principal</h1>

      <ProductList />
      </>
  );
}
