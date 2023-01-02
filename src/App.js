import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Product from "./pages/Products";


import './App.css';



function App() {


  return (

    <div className="App">

      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Soaps</Link>
            </li>

          </ul>
        </nav>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />
          } />

          {/* About Us route */}
          <Route path="/about" element={<AboutUs />} />

          {/* Products page */}
          <Route path="/products" element={<Product />} />
        </Routes>
      </Router>






    </div>
  );
}

export default App;
