import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React, { useState, useContext, useEffect, useRef } from 'react'
import Offcanvas from 'react-bootstrap/Offcanvas';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Home from "../pages/Home";
import AboutUs from "../pages/AboutUs";
import ProductsProvider from "../providers/ProductsProvider";
import Product from "../pages/Products";
import UsersProvider from "../providers/UsersProvider";
import Login from "../pages/Login";
import '../css/nav_and_off.css';
import { Button, ListGroup } from "react-bootstrap";
import CartContext from "../contexts/CartContext";
import ProductContext from "../contexts/ProductContext";
import EachCartProduct from "./EachCartProduct";

export default function NavAndOff() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext)

    const [cart, setCart] = useState([])
    const [cartFilled, setCartFilled] = useState(false)

    const getCartFromProvider = cartContext.getCart

    const prepareCartOffCanvas = async () => {
        console.log("prepareCartOffCanvas ran")

        let responseCart = await getCartFromProvider();
        console.log("response in offcanvas", responseCart)

        setCart(responseCart);
        setCartFilled(true);

    }

    const displayCartItems = () => {

        console.log("enter displayCartItems route.")
        console.log("cart[0].id", cart[0].id)

        let startMapped =
            // (cart.map(i =>
            //     <div>
            //         {i.variant.name}
            //     </div>
            // ))

            <ListGroup className="mt-2">
                {cart?.map((_, idx) =>
                    <EachCartProduct
                        cart={cart[idx]}

                    />

                )}

            </ListGroup>


        return (
            <React.Fragment>
                {startMapped}

            </React.Fragment>
        );

    }

    return (
        <React.Fragment>

            <Router>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Soap Paradies</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">

                                <Navbar.Text>
                                    <a id="nav-bar-text-home" href="/">Home</a>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <a id="nav-bar-text-about" href="/about">About Us</a>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <a id="nav-bar-text-products" href="/products">Products</a>
                                </Navbar.Text>
                                <Navbar.Text>
                                    <a id="nav-bar-text-login" href="/login">Login</a>
                                </Navbar.Text>

                                <>
                                    <Button id="checkout-button"
                                        variant="info"
                                        onClick={() => {
                                            handleShow();
                                            prepareCartOffCanvas()

                                        }
                                        }
                                        className="me-2">
                                        Cart Checkout
                                    </Button>
                                    <Offcanvas show={show} onHide={handleClose} placement="end">
                                        <Offcanvas.Header closeButton>
                                            <Offcanvas.Title>Your Cart Checkout</Offcanvas.Title>
                                        </Offcanvas.Header>
                                        <Offcanvas.Body>

                                            <Button variant="danger"
                                                onClick=""
                                            >
                                                Button to test
                                            </Button>

                                            {cartFilled ? displayCartItems() : ""}

                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </>


                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>





            </Router>
        </React.Fragment>


    )


}