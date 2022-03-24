import "./App.css";
import Home from "./Pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./Pages/Episodes/episodes";
import Store from "./Pages/Store/store";
import Header from "./Components/header";
import Checkout from "./Pages/Checkout/checkout";
import {CartFunctionality} from "./CartContext";

function App() {
  
  return (
    <div className="App">
      <CartFunctionality>
      <Header/>
      <Router>
        <Routes>
          <Route exact path="" element={<Home />}></Route>
          <Route exact path="Handla/" element={<Store />}></Route>
          <Route exact path="Handla/:CategoryId" element={<Store />}></Route>
          <Route exact path="Lyssna" element={<Episodes />}></Route>
          <Route exact path="Betala" element={<Checkout />}></Route>
          {/* <Route path="/recipe/:recipeid" element={<Recipe />}></Route> */}
        </Routes>
      </Router>
      <footer></footer>
      </CartFunctionality>
    </div>
  );
}

export default App;
