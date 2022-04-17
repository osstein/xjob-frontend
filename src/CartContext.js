import { createContext, useState, useEffect, useContext } from "react";
import NotificationContext from "./NotificationContext";

const CartContext = createContext();

export function CartProvider({ children }) {

  // Cart States
  const [isCartItems, setCartItems] = useState(JSON.parse(localStorage.getItem("Shopping")) || []);
  const [isCartPrice, setCartPrice] = useState();
  const [isCartVat, setCartVat] = useState();
  const [isCartDiscount, setCartDiscount] = useState();
  const { NewNotification } = useContext(NotificationContext);

  //Function fpr saving to local storage
  const store = () => {
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    calcPrice();
    calcDiscount();
    calcVat();
  };
// Calculate price total
  const calcPrice = () => {
    let tot = 0;
    for (let i = 0; i < isCartItems.length; i++) {
      tot = tot + isCartItems[i].price * isCartItems[i].amount;
    }
    setCartPrice(tot);
  };
  // Calculate VAT total
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
  // Calculate discounts
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
// Add item to cart
// If item exist increase amount else add new item
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

    // Save in localstorage
    
    localStorage.setItem("Shopping", JSON.stringify(isCartItems));
    calcPrice();
    calcDiscount();
    calcVat();
    NewNotification(name + " tillagd");
  };

  // Store when cart items change
  useEffect(() => {
    store();
  }, [isCartItems]);


  // Clear the cart totally
  const clearCart = () => {
    setCartItems([]);
    setCartVat(0);
    setCartPrice(0);
    setCartDiscount(0);
    localStorage.setItem("Shopping", "[]");
    NewNotification("Varukorgen är tom");
  };

  //Increase / decrease amount on product
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
  // Remove item from cart
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
// Export functions and states
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
