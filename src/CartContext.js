
import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Shopping")) || []);

  const store = () => {
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    console.log( localStorage.getItem("Shopping"));
  };

  const addItem = (
    name,
    productId,
    price,
    amount,
    typeId,
    productSize,
    productColor,
    productNumber
  ) => {
    setCartItems(JSON.parse(localStorage.getItem("Shopping")));

    setCartItems((prevState) => [
      ...prevState,
      { name, productId, price, amount, typeId, productSize, productColor, productNumber },
    ]);

    store();
  };

  useEffect(() => {
    store();
  }, [isCartItems]);

  const clearCart = () => {
    setCartItems([]);
    localStorage.setItem("Shopping", "[]");
  };

  return (
    <CartContext.Provider value={{ isCartItems, addItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
