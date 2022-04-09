import "./checkout.css";
import { useContext, useState, useEffect } from "react";
import CartContext from "../../CartContext";
import { IoChevronDownCircleSharp } from "react-icons/io5";
import { IoChevronUpCircleSharp } from "react-icons/io5";
import NotificationContext from "../../NotificationContext";
const Checkout = () => {
  require("./checkout.css");
  const { isCartItems, isCartVat, isCartPrice, isCartDiscount, removeCart, clearCart, adjustCart } =
    useContext(CartContext);
  const { NewNotification } = useContext(NotificationContext);

  const [isFirstName, setFirstName] = useState();
  const [isLastName, setLastName] = useState();
  const [isEmail, setEmail] = useState();
  const [isPhone, setPhone] = useState();
  const [isAdress, setAdress] = useState();
  const [isZip, setZip] = useState();
  const [isCity, setCity] = useState();
  const [isDiscountCode, setDiscountCode] = useState("");
  const [isPaymentMethod, setPaymentMethod] = useState();

  // Update recipe
  const sendOrder = () => {
    if (isCartItems.length > 0) {
      if (
        isFirstName !== undefined &&
        isLastName !== undefined &&
        isEmail !== undefined &&
        isPhone !== undefined &&
        isAdress !== undefined &&
        isZip !== undefined &&
        isCity !== undefined
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
          .then(clearCart())
          .then(
            NewNotification("TACK! " + isFirstName + " " + isLastName + ", din order är skickad")
          )
          .then(document.getElementById("checkout-form").reset())
          .catch((res) => console.log(res));
      } else {
        NewNotification("Alla fält måste vara ifyllda");
      }
    } else {
      NewNotification("Varukorgen är tom");
    }
  };
  const [isDC, setDC] = useState();
  const [isDCPercent, setDCPercent] = useState(0);

  //Get productsTypes
  const getDC = () => {
    let fetchPath = "https://localhost:7207/api/apidiscountcodes/";
    const fetchTasting = async (url) => {
      try {
        const response = await fetch(url, {
          method: "GET",
        });
        const data = await response.json();

        setDC(data);
        if (!response.ok) {
          throw new Error(response.statusText);
        }
      } catch (e) {
        console.log(`Error: ${e}`);
      }
    };
    fetchTasting(fetchPath);
  };

  const checkDiscount = (e) => {
    for (let i = 0; i < isDC.length; i++) {
      let campaignStart = new Date(isDC[i].campaignStart).getTime();
      let campaignEnd = new Date(isDC[i].campaignEnd).getTime();
      let now = new Date().getTime();
      if (e === isDC[i].code && now > campaignStart && now < campaignEnd) {
        setDCPercent(isDC[i].discount / 100);
        NewNotification("Rabattkoden är tillagd");
        break;
      } else {
        setDCPercent(0);
        NewNotification("Felaktig rabattkod");
      }
    }
  };

  useEffect(() => {
    getDC();
  }, []);

  return (
    <main>
      <div className="flex-row">
        <div className="checkout-half">
          <h2>Dina Uppgifter:</h2>
          <form className="checkout-form" id="checkout-form">
            <label htmlFor="FirstName">
              Förnamn:
              <input
                placeholder="Förnamn"
                name="FirstName"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </label>
            <label htmlFor="LastName">
              Efternamn:
              <input
                placeholder="Efternamn"
                name="LastName"
                onChange={(e) => setLastName(e.target.value)}
              />
            </label>
            <label htmlFor="Email">
              E-post:
              <input placeholder="Epost" name="Email" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label htmlFor="Phone">
              Telefonnummer:
              <input
                placeholder="Telefonnummer"
                name="Phone"
                onChange={(e) => setPhone(e.target.value)}
              />
            </label>
            <label htmlFor="Adress">
              Gatunamn:{" "}
              <input placeholder="Gata" name="Adress" onChange={(e) => setAdress(e.target.value)} />
            </label>
            <label htmlFor="Zip">
              Postkod:{" "}
              <input placeholder="Postkod" name="Zip" onChange={(e) => setZip(e.target.value)} />
            </label>
            <label htmlFor="City">
              Stad:{" "}
              <input placeholder="Stad" name="City" onChange={(e) => setCity(e.target.value)} />
            </label>

            <label htmlFor="PaymentMethod">
              Betalmetod:
              <select name="PaymentMethod" onChange={(e) => setPaymentMethod(e.target.value)}>
                <option>Choose</option>
                <option value="PaperBill">Faktura</option>
                <option value="Swish">Swish</option>
                <option value="CreditCard">Kort</option>
              </select>
            </label>
            <div className="checkout-buttons">
              <input className="clear-button" value="Rensa formulär" type="reset" name="Clear" />
              <input
                value="Skicka Beställning"
                type="button"
                name="submitButton"
                onClick={(e) => {
                  sendOrder(e);
                }}
              />
            </div>
          </form>
        </div>
        <div className="checkout-half">
          <h2>Varukorg:</h2>
          <form className="discount-form">
            <label htmlFor="DiscountCode">
              Ev. Rabattkod:{" "}
              <input
                className="discount-field"
                placeholder="Rabattkod"
                name="DiscountCode"
                onChange={(e) => {
                  setDiscountCode(e.target.value);
                }}
              />
            </label>
            <input
              className="discount-button"
              value={"Lägg till kod"}
              type="button"
              onClick={() => {
                checkDiscount(isDiscountCode);
              }}
            />
          </form>
          <table>
            <thead>
              <tr>
                <th>Produkt</th>
                <th>Antal</th>
                <th>Modell</th>
                <th>Pris</th>
              </tr>
            </thead>
            <tbody>
              {isCartItems.map((cart) => {
                return (
                  <tr key={cart.name + cart.typeId}>
                    <td>
                      {cart.name}
                      <span
                        className={"cart-remove-checkout"}
                        onClick={() => removeCart(cart.typeId, cart.productId)}
                      >
                        <br></br>
                        (Ta bort produkt)
                      </span>
                    </td>
                    <td className="cart-amount-checkout">
                      <span onClick={() => adjustCart(cart.typeId, cart.productId, "Decrease")}>
                        <IoChevronDownCircleSharp />
                      </span>
                      {" " + cart.amount + " "}
                      <span onClick={() => adjustCart(cart.typeId, cart.productId, "Increase")}>
                        <IoChevronUpCircleSharp />
                      </span>
                    </td>
                    <td>
                      {cart.productColor} - {cart.productSize}
                    </td>
                    <td>{cart.price * ((100 - cart.discount) / 100) * cart.amount}sek</td>
                  </tr>
                );
              })}
              <tr>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right" }}>Summa: </td>
                <td>{isCartPrice - isCartDiscount}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td style={{ textAlign: "right" }}>Moms: </td>
                <td>{isCartVat}</td>
              </tr>

              {1 - isDCPercent < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "right" }}>Rabatt: </td>
                  <td>{(isCartPrice - isCartDiscount) * isDCPercent}</td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
              {1 - isDCPercent < 1 ? (
                <tr>
                  <td></td>
                  <td></td>
                  <td style={{ textAlign: "right" }}>Summa efter rabatt: </td>
                  <td>{(isCartPrice - isCartDiscount) * (1 - isDCPercent)}</td>
                </tr>
              ) : (
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
          </table>
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
