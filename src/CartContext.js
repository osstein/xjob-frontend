import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Shopping")) || []);

  const store = () => {
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
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
    //Set initial
    setCartItems(JSON.parse(localStorage.getItem("Shopping")));
    // Sätt förtsta item alt. höj antalet om objektet redan finns alt. lägg till objektet i listan
    let o = 0;
    let cart = isCartItems;
    if (isCartItems.length === 0) {
      setCartItems((prevState) => [
        ...prevState,
        { name, productId, price, amount, typeId, productSize, productColor, productNumber },
      ]);
    } else {
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = cart[i].amount + 1;
          setCartItems(cart);
          o = o + 1;
        }
      }
      if (o === 0) {
        setCartItems((prevState) => [
          ...prevState,
          { name, productId, price, amount, typeId, productSize, productColor, productNumber },
        ]);
      }
      o = 0;
    }

    // Lagra i localstorage
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
