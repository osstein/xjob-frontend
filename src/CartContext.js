import { createContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Shopping")) || []);
  const [isCartPrice, setCartPrice] = useState();
  const [isCartVat, setCartVat] = useState();
  const [isCartDiscount, setCartDiscount] = useState();

  const store = () => {
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    setCartItems(JSON.parse(localStorage.getItem("Shopping")));
    calcPrice();
    calcDiscount();
    calcVat();
  };

  const calcPrice = () => {
    let tot = 0;
    for (let i = 0; i < isCartItems.length; i++) {
      tot = tot + isCartItems[i].price * isCartItems[i].amount;
    }
    setCartPrice(tot);
  };
  const calcVat = () => {
    let tot = 0;
    for (let i = 0; i < isCartItems.length; i++) {
      tot = tot + (isCartItems[i].vat / 100) * ((isCartItems[i].price * (1 - (isCartItems[i].discount / 100))) * isCartItems[i].amount) ;
    }
    setCartVat(tot);
  };
  const calcDiscount = () => {
    let tot = 0;

    for (let i = 0; i < isCartItems.length; i++) {
      if (isCartItems[i].discount > 0) {
        tot =
          tot +
          ((isCartItems[i].discount) / 100) * (isCartItems[i].price * isCartItems[i].amount);
      }
    }
    setCartDiscount(tot);
  };

  const addItem = (
    name,
    productId,
    price,
    amount,
    typeId,
    productSize,
    productColor,
    productNumber,
    discount,
    vat
  ) => {
    //Set initial
    setCartItems(JSON.parse(localStorage.getItem("Shopping")));
    // Sätt förtsta item alt. höj antalet om objektet redan finns alt. lägg till objektet i listan
    let o = 0;
    let cart = isCartItems;
    if (isCartItems.length === 0) {
      setCartItems((prevState) => [
        ...prevState,
        {
          name,
          productId,
          price,
          amount,
          typeId,
          productSize,
          productColor,
          productNumber,
          discount,
          vat,
        },
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
          {
            name,
            productId,
            price,
            amount,
            typeId,
            productSize,
            productColor,
            productNumber,
            discount,
            vat,
          },
        ]);
      }
      o = 0;
    }

    // Lagra i localstorage
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    calcPrice();
    calcDiscount();
    calcVat();
  };

  useEffect(() => {
    store();
  }, []);

  const clearCart = () => {
    setCartItems([]);
    setCartVat(0)
    setCartPrice(0)
    setCartDiscount(0)
    localStorage.setItem("Shopping", "[]");
  };

  const adjustCart = (typeId, productId, change) => {
    let cart = isCartItems;

    if (change === "Increase")
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = cart[i].amount + 1;
          setCartItems(cart);
        }
      }
    if (change === "Decrease")
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = cart[i].amount - 1;
          setCartItems(cart);
        }
      }

    store();
  };
  const removeCart = (typeId, productId) => {
    let cart = isCartItems;
    for (let i = 0; i < isCartItems.length; i++) {
      if (productId === cart[i].productId && typeId === cart[i].typeId) {
        cart.splice(i, 1);
        i--;
        setCartItems(cart);
      }
    }
    store();
  };

  return (
    <CartContext.Provider
      value={{
        isCartItems,
        isCartVat,
        isCartPrice,
        isCartDiscount,
        removeCart,
        addItem,
        clearCart,
        adjustCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
