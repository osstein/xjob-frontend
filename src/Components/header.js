import { useContext } from "react";
import CartContext from "../CartContext";
import Notify from "./notification.js";
import { NavLink, Link } from "react-router-dom";

const Header = () => {
  const { isCartItems } = useContext(CartContext);
  return (
    <header>
      <h1>
        <Link to="/">BashPodden</Link>
      </h1>

      <nav>
        <ul>
          <li>
            <NavLink to="/Nyheter">Läsa</NavLink>
          </li>
          <li>
            <NavLink to="/Lyssna">Lyssna</NavLink>
          </li>

          <li>
            <NavLink to="/Handla">Handla</NavLink>
          </li>

          <li>
            <NavLink to="/Betala" className="cartIcon">
              Betala<span className={"cartAmount"}>{isCartItems.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      <Notify />
    </header>
  );
};

export default Header;
