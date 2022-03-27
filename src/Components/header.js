import { useContext } from "react";
import CartContext from "../CartContext";
import {  NavLink } from "react-router-dom";

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
            <NavLink to="/Lyssna" className="cartIcon">
              Lyssna
            </NavLink>
          </li>
          <li>
            <NavLink to="/Handla" className="cartIcon">
              Handla
            </NavLink>
          </li>

          <li>
            <NavLink to="/Betala" className="cartIcon">
              Betala
              <span className={"cartAmount"}> {isCartItems.length}</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
