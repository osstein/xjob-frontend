import { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [isCartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Shopping")) || []);
  const [isCartPrice, setCartPrice] = useState();
  const [isCartVat, setCartVat] = useState();
  const [isCartDiscount, setCartDiscount] = useState();
  const { NewNotification } = useContext(NotificationContext);

  const store = () => {
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
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
      tot +=
        (isCartItems[i].vat / 100) *
        isCartItems[i].price *
        ((1 - isCartItems[i].discount / 100) * isCartItems[i].amount);
    }
    setCartVat(tot);
  };
  const calcDiscount = () => {
    let tot = 0;

    for (let i = 0; i < isCartItems.length; i++) {
      if (isCartItems[i].discount > 0) {
        tot =
          tot + (isCartItems[i].discount / 100) * (isCartItems[i].price * isCartItems[i].amount);
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
    console.log(isCartItems);
    if (isCartItems.length === 0) {
      console.log("Tom array");
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
      localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    } else {
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = parseInt(cart[i].amount) + parseInt(amount);
          setCartItems(cart);
          o = o + 1;
          console.log("+ amount");
        }
      }
      if (o === 0) {
        console.log("Om objekt inte finns sedan innan");
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
    console.log(isCartItems);
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    calcPrice();
    calcDiscount();
    calcVat();
    NewNotification(name + " tillagd");
  };

  useEffect(() => {
    store();
  }, [isCartItems]);

  const clearCart = () => {
    setCartItems([]);
    setCartVat(0);
    setCartPrice(0);
    setCartDiscount(0);
    localStorage.setItem("Shopping", "[]");
    NewNotification("Varukorgen är tom");
  };

  const adjustCart = (typeId, productId, change) => {
    let cart = isCartItems;

    if (change === "Increase")
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = parseInt(cart[i].amount) + 1;
          setCartItems(cart);
          NewNotification(cart[i].name + " ökad med 1");
        }
      }
    if (change === "Decrease")
      for (let i = 0; i < isCartItems.length; i++) {
        if (productId === cart[i].productId && typeId === cart[i].typeId) {
          cart[i].amount = parseInt(cart[i].amount) - 1;
          if (parseInt(cart[i].amount) <= 1) {
            cart[i].amount = 1;
          }
          setCartItems(cart);
          NewNotification(cart[i].name + " minskad med 1");
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
    NewNotification("Produkt borttagen");
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
