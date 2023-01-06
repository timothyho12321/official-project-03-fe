import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AboutUs from "./pages/AboutUs";
import Home from "./pages/Home";
import Product from "./pages/Products";
import Variant from "./pages/Variant";
import CartProvider from "./providers/CartProvider";
import UsersProvider from "./providers/UsersProvider";
import NavAndOff from "./components/NavAndOff";
import Login from "./pages/Login";
import ProductsProvider from "./providers/ProductsProvider";
import CheckOut from "./pages/Checkout";
import Success from "./pages/Success";
import Cancel from "./pages/Cancel";


import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';



// import './App.css';


function App() {

  return (

    <div className="App">

      <Router>


        {/* Navbar and Offcanvas Checkout Cart */}
        <UsersProvider>
          <CartProvider>
            <NavAndOff />
          </CartProvider>
        </UsersProvider>

        {/* <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand href="#home">Soap Paradies</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/products">Products</Nav.Link>
                <Nav.Link href="/login">Login</Nav.Link>

              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}

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

          {/* Variants page */}
          <Route path="/products/:product_id/variants" element={
            <ProductsProvider>

              <CartProvider>
                <Variant />
              </CartProvider>

            </ProductsProvider>

          }
          />

          {/* Login page */}
          <Route path="/login" element={

            <UsersProvider>
              <Login />
            </UsersProvider>
          }
          />

          {/* Checkout Cart page */}
          <Route path="/checkout" element={
            <UsersProvider>
              <CartProvider>
                <CheckOut />
              </CartProvider>
            </UsersProvider>
          }
          />

          {/* Success URL route*/}
          <Route path="/checkout/success" element={
            <UsersProvider>
              <Success />
            </UsersProvider>

          } />

          {/* Cancel URL route */}
          <Route path="/checkout/cancel" element={
            <Cancel />}
          />




        </Routes>
      </Router>






    </div>
  );
}

export default App;
