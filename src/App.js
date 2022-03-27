import "./App.css";
import Home from "./Pages/Home/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./Pages/Episodes/episodes";
import Store from "./Pages/Store/store";
import Header from "./Components/header";
import Checkout from "./Pages/Checkout/checkout";
import Product from "./Pages/Product/product";
import { CartProvider } from "./CartContext";

function App() {

  window.onload = localStorage.setItem("ShoppingCart", JSON.stringify("oldItems"))
  return (
    <div className="App">
      <Router>
        {" "}
        <CartProvider>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />}></Route>
            <Route exact path="Handla/" element={<Store />}></Route>
            <Route exact path="Handla/:CategoryId" element={<Store />}></Route>
            <Route exact path="Lyssna" element={<Episodes />}></Route>
            <Route exact path="Betala" element={<Checkout />}></Route>
            <Route exact path="Produkt/:ProductId" element={<Product />}></Route>
            {/* <Route path="/recipe/:recipeid" element={<Recipe />}></Route> */}
          </Routes>
          <footer>
            <p>footer</p>
          </footer>
        </CartProvider>
      </Router>
    </div>
  );
}

export default App;
