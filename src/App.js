
import "./App.css";
import Home from "./Pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Episodes from "./Pages/Episodes/episodes";
import Store from "./Pages/Store/store";
import Checkout from "./Pages/Checkout/checkout";

function App() {
  return (
    <div className="App">
      <header>
        <h1>BashPodden</h1>
      </header>

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
      <footer>

      </footer>
    </div>
  );
}

export default App;
