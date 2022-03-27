import "./checkout.css";
import { useContext, useState } from "react";
import CartContext from "../../CartContext";
const Checkout = () => {
  require("./checkout.css");
  const { clearCart } = useContext(CartContext);
  const { isCartItems } = useContext(CartContext);
  const [isFirstName, setFirstName] = useState();
  const [isLastName, setLastName] = useState();
  const [isEmail, setEmail] = useState();
  const [isPhone, setPhone] = useState();
  const [isAdress, setAdress] = useState();
  const [isZip, setZip] = useState();
  const [isCity, setCity] = useState();
  const [isDiscountCode, setDiscountCode] = useState();
  const [isPaymentMethod, setPaymentMethod] = useState();

  // Update recipe
  const sendOrder = (e) => {
    e.preventDefault();
    if (
      isFirstName !== null &&
      isLastName !== null &&
      isEmail !== null &&
      isPhone !== null &&
      isAdress !== null &&
      isZip !== null &&
      isCity !== null
    ) {
      let formData = JSON.stringify({
        Order: {
          CustomerFirstName: isFirstName,
          CustomerLastName: isLastName,
          CustomerMail: isEmail,
          CustomerPhone: isPhone,
          CustomerAdress: isAdress,
          CustomerZip: isZip,
          CustomerCity: isCity,
          DiscountCode: isDiscountCode,
          PaymentMethod: isPaymentMethod,
        },
        OrderProducts: JSON.parse(localStorage.getItem("Shopping")),
      });
      console.log(formData);
      let url = `https://localhost:7207/api/apiorder`;
      fetch(url, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data))
        .catch((res) => console.log(res));
    }
  };
  /* const priceTotal = () => {
    let cart = JSON.parse(localStorage.getItem("Shopping"));
    for (let i = 0; i < cart.length; i++) {

    }
  }; */

  return (
    <main>
      <div className="flex-row">
        <div className="checkout-half">
          <h2>Dina Uppgifter:</h2>
          <form>
            <input
              placeholder="Förnamn"
              name="FirstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Efternamn"
              name="LastName"
              onChange={(e) => setLastName(e.target.value)}
            />
            <input placeholder="Epost" name="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
              placeholder="Telefonnummer"
              name="Phone"
              onChange={(e) => setPhone(e.target.value)}
            />
            <input placeholder="Adress" name="Adress" onChange={(e) => setAdress(e.target.value)} />
            <input placeholder="Postkod" name="Zip" onChange={(e) => setZip(e.target.value)} />
            <input placeholder="Stad" name="City" onChange={(e) => setCity(e.target.value)} />
            <input
              placeholder="Rabattkod"
              name="DiscountCode"
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <select name="PaymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="PaperBill">Faktura</option>
              <option value="Swish">Swish</option>
              <option value="CreditCard">Kort</option>
            </select>

            <input
              value="Skicka"
              type="button"
              name="submitButton"
              onClick={(e) => {
                sendOrder(e);
              }}
            />
            <input type="reset" name="Clear" />
          </form>
        </div>
        <div className="checkout-half">
          <h2>Varukorg:</h2>

          {isCartItems.map((cart, i) => {
            return (
              <article key={i} className="cart-item">
                <h3>{cart.name}</h3>
                <p>
                  {cart.productColor} -{cart.amount}st - {cart.price * cart.amount}
                </p>
              </article>
            );
          })}
          <p style={{ "textAlign": "right" }}>Summa:</p>
          <p style={{ "textAlign": "right" }}>Moms:</p>
          <p style={{ "textAlign": "right" }}>Rabatt:</p>
          <br></br>
          {isCartItems.length > 0 ? (
            <button className="clear-cart" onClick={() => clearCart()}>
              Töm Varukorgen
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </main>
  );
};

export default Checkout;
