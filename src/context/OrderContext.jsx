import { useEffect, useState, useContext, createContext } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("order");
    return savedOrder ? JSON.parse(savedOrder) : [];
  });
  
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [sidebarToggle, setSidebarToggle] = useState(false);

  useEffect(() => {

    calculateTotal();
    calculateCount();
    localStorage.setItem("order", JSON.stringify([...order]));
  }, [order]);

  function addOrderItem(producto) {
    const product = order.find(prod => prod.id === producto.id);
    if (product) {
      handleChangeQuantity(product.id, product.quantity + 1);
    } else {
      producto.quantity = 1;
      setOrder(prevOrder => [...prevOrder, producto]);
    }
  }

  function calculateTotal() {
    let totalCount = 0;
    order.forEach((prod) => {
      totalCount += prod.price * prod.quantity;
    });
    setTotal(totalCount);
  }

  function calculateCount() {
    let itemCount = 0;
    order.forEach((prod) => {
      itemCount += prod.quantity;
    });
    setCount(itemCount);
  }

  function handleChangeQuantity(id, quantity) {
    const updatedOrder = order.map(item => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    /* localStorage.setItem("order", JSON.stringify(updatedOrder)); */
    setOrder(updatedOrder);
  }

  function removeItem(id) {
    Swal.fire({
      title: "Borrar producto",
      text: "Realmente desea quitar este producto?",
      icon: "warning",
      showCancelButton: true,
      showConfirmButton: true,
      confirmButtonText: "Borrar",
      reverseButtons: true,
    }).then(result => {
      if (result.isConfirmed) {
        const updatedOrder = order.filter(prod => prod.id !== id);
        /* localStorage.setItem("order", JSON.stringify(updatedOrder)); */
        setOrder(updatedOrder);
      }
    });
  }

  function toggleSidebarOrder() {
    setSidebarToggle(prevValue => !prevValue);
  }

  return (
    <OrderContext.Provider value={{ order, total, count, sidebarToggle, addOrderItem, handleChangeQuantity, removeItem, toggleSidebarOrder }}>
      {children}
    </OrderContext.Provider>
  );
};
