import { useContext } from "react";
import CartContext from "../CartContext";


const Header = () => {
  const { isCartItems } = useContext(CartContext);
  return (
    <header>
      <h1>
        <a href="/">BashPodden</a>
      </h1>
      <nav>
        <ul>
          <li>
            <a href="/Lyssna">Lyssna</a>
          </li>
          <li>
            <a href="/Handla">Handla</a>
          </li>

          <li>
            <a href="/Betala" className="cartIcon">
              Betala
              <span className={"cartAmount"}> {isCartItems.length}</span>
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
