import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Product from "./pages/Products";


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ProductsProvider from "./providers/ProductsProvider";


// import './App.css';



function App() {


  return (

    <div className="App">

      <Router>
        <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Soap Paradies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/">Fill in </Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>


        {/*  WITHOUT USING REACT BOOTSTRAP 
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
        </nav> */}



        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />
          } />

          {/* About Us route */}
          <Route path="/about" element={<AboutUs />} />

          {/* Products page */}
          <Route path="/products" element={
            <ProductsProvider>
              <Product />
            </ProductsProvider>

          }
          />




        </Routes>
      </Router>






    </div>
  );
}

export default App;
