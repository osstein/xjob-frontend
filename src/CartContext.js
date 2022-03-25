import { createContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartItems, setCartItems] = useState([
    { id: 213, Price: 123 },
    { id: 123, Price: 123 },
  ]);

  const addItem = (
    id,
    productId,
    price,
    amount,
    typeId,
    productSize,
    productColor,
    productNumber
  ) => {
   /*  for (let i = 0; i < isCartItems.length; i++) {
      if (id == isCartItems[i].id && isCartItems[i].typeId === typeId) {
        isCartItems[i].amount = isCartItems[i].amount + 1;
      }
    } */

    setCartItems((prevState) => [
      ...prevState,
      { id, productId, price, amount, typeId, productSize, productColor, productNumber },
    ]);
  };

  return <CartContext.Provider value={{ isCartItems, addItem }}>{children}</CartContext.Provider>;
}

export default CartContext;
