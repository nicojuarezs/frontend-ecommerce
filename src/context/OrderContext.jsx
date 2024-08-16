import { useEffect, useState, useContext, createContext } from "react";
import Swal from "sweetalert2";

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState(() => {
    const savedOrder = localStorage.getItem("order");
    const parsedOrder = savedOrder ? JSON.parse(savedOrder) : [];
    return Array.isArray(parsedOrder) ? parsedOrder : [];
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
    const product = order.find((prod) => prod._id === producto._id);
    if (product) {
      handleChangeQuantity(product._id, product.quantity + 1);
    } else {
      producto.quantity = 1;
      setOrder((prevOrder) => [...prevOrder, producto]);
      Swal.fire({
        icon: 'success',
        title: '¡Producto agregado!',
        text: 'El producto ha sido agregado al carrito.',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  function calculateTotal() {
    if (Array.isArray(order)) {
      let totalCount = 0;
      order.forEach((prod) => {
        totalCount += prod.price * prod.quantity;
      });
      setTotal(totalCount);
    }
  }

  function calculateCount() {
    if (Array.isArray(order)) {
      let itemCount = 0;
      order.forEach((prod) => {
        itemCount += prod.quantity;
      });
      setCount(itemCount);
    }
  }

  function handleChangeQuantity(id, quantity) {
    if (Array.isArray(order)) {
      const updatedOrder = order.map((item) =>
        item._id === id ? { ...item, quantity } : item
      );
      setOrder(updatedOrder);
    }
  }

  function removeItem(id) {
    Swal.fire({
      title: "Borrar producto",
      text: "¿Realmente desea quitar este producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        if (Array.isArray(order)) {
          const updatedOrder = order.filter((prod) => prod._id !== id);
          setOrder(updatedOrder);
        }

        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Producto borrado con éxito.',
          showConfirmButton: false,
          timer: 2000,
        });
      }
    });
  }

  function toggleSidebarOrder() {
    setSidebarToggle((prevValue) => !prevValue);
  }

  return (
    <OrderContext.Provider
      value={{
        order,
        total,
        count,
        sidebarToggle,
        addOrderItem,
        handleChangeQuantity,
        removeItem,
        toggleSidebarOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
