import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <h3>Länkar</h3>
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
          <NavLink to="/Betala">Betala</NavLink>
        </li>
      </ul>
      <h3>Andra kanaler</h3>
      <ul>
        <li>
          <a href="https://www.youtube.com/bashpodden">Youtube</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
