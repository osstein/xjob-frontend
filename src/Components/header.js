import { useContext } from "react";
import CartContext from "../CartContext";
import Notify from "./notification.js";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { isCartItems } = useContext(CartContext);
  return (
    <header>
      <h1>
        <NavLink to="/">BashPodden</NavLink>
      </h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/Lyssna">Lyssna</NavLink>
          </li>
          <li>
            <NavLink to="/Nyheter">Nyheter</NavLink>
          </li>
          <li>
            <NavLink to="/Handla">Handla</NavLink>
          </li>

          <li>
            <NavLink to="/Betala" className="cartIcon">
              Betala
              <span className={"cartAmount"}> {isCartItems.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Notify />
    </header>
  );
};

export default Header;
