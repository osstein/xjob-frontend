import { createContext, useState } from "react";

const CartContext = createContext();

export function CartFunctionality({ children }) {
  const [isCartItems, setCartItems] = useState([
    { "id": 213, "Price": 123 },
    { "id": 123, "Price": 123 }
  ]);

  const addItem = (id, productId, price, amount, typeId, productSize, productColor, productNumber) => {
    setCartItems((prevState) => [...prevState, { id, productId, price, amount, typeId, productSize, productColor, productNumber }]);
  };

  return <CartContext.Provider value={{ isCartItems, addItem }}>{children}</CartContext.Provider>;
}

export default CartContext;
