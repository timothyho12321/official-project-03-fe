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
import UserContext from "../contexts/UserContext";

export default function NavAndOff() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext)
    const usersContext = useContext(UserContext)

    const [cart, setCart] = useState([])
    const [cartFilled, setCartFilled] = useState(false)

    const [reload, setReload] = useState(false);
    const [cartButtonNum, setCartButtonNum] = useState(0);
    const [firstName, setFirstName] = useState("Guest");
    const [lastName, setLastName] = useState("New");
    const getCartFromProvider = cartContext.getCart
    const logoutInProvider = usersContext.logout


    useEffect(
        () => {
            console.log("useEffect happen")

            let numberForCartBox = 0;

            async function fillInCartBox() {
                console.log("entered the fillInCartBox route.")

                console.log("numberForCartBox1", numberForCartBox)
                let responseCartNum = await getCartFromProvider();
                console.log("get cart for cartBox", responseCartNum);



                // responseCartNum = JSON.parse(responseCartNum)
                numberForCartBox = responseCartNum.length
                console.log("numberForCartBox2", numberForCartBox)
                setCartButtonNum(numberForCartBox);

            }
            fillInCartBox();


            // Setting firstname and lastname in state

            let accountData = (localStorage.getItem("accountData"))

            accountData = JSON.parse(accountData)

            //DEBUG WHY CANNOT READ INTO ARRAY 

            const takeFirstName = accountData?.loggedInAccount?.first_name
            // const firstName =accountData["loggedInAccount"]

            const takeLastName = accountData?.loggedInAccount?.last_name
            if (takeFirstName) {
                setFirstName(takeFirstName);
            }
            if (takeLastName) {
                setLastName(takeLastName);
            }



        }, []

    )


    // const getCartItemNumber = async () => {
    //     console.log("entered route of getcartitemnumber")
    //     let responseCartNum = await getCartFromProvider();
    //     console.log("response in offcanvas DEBUG", responseCartNum);

    //     setCart(responseCart);
    // }

    const prepareCartOffCanvas = async () => {
        let responseCart = await getCartFromProvider();
        console.log("response in offcanvas DEBUG", responseCart);

        setCart(responseCart);

        if (responseCart) {
            setCartFilled(true);
        }


    }

    const displayCartItems = () => {

        console.log("enter displayCartItems route.")
        // console.log("cart[0].id", cart[0].id)

        let startMapped =
            // (cart.map(i =>
            //     <div>
            //         {i.variant.name}
            //     </div>
            // ))

            // QUESTION WHY DOES TERNARY CHECK HERE NOT WORK? WHITE SCREEN IF CART IS EMPTY.
            <ListGroup className="mt-2">
                {
                    cart?.length > 0 ?
                        cart?.map((_, idx) =>
                            <EachCartProduct
                                key={idx}
                                cart={cart[idx]}
                                reloadCartInProvider={prepareCartOffCanvas}

                                reloadProp={() => { setReload(!reload) }}

                            />
                        ) :
                        <div>No item in cart.</div>

                }

            </ListGroup>


        return (
            <React.Fragment>
                {startMapped}

            </React.Fragment>
        );

    }

    const userNavWelcome = () => {

        let accountData = (localStorage.getItem("accountData"))

        accountData = JSON.parse(accountData)

        //DEBUG WHY CANNOT READ INTO ARRAY 

        const firstName = accountData?.loggedInAccount?.first_name
        // const firstName =accountData["loggedInAccount"]

        const lastName = accountData?.loggedInAccount?.last_name

        console.log("accountData", accountData)
        console.log("firstName", firstName)
        // console.log("lastName", lastName)

        const combinedFirstLast = firstName + " " + lastName

        return combinedFirstLast
    }


    return (
        <React.Fragment>

            <div id="overall-position-nav">

                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="#home">Soap Paradies</Navbar.Brand>

                        <span id="nav-brand-at-front" className="d-lg-none">
                            <div>
                                <Navbar.Text>
                                    Hi, {firstName} {lastName}!

                                    <div className="mt-2">
                                        <Button id="checkout-button"
                                            variant="info"
                                            onClick={() => {
                                                handleShow();
                                                prepareCartOffCanvas()

                                            }
                                            }
                                            className="me-2 btn-sm">
                                            Cart Checkout (
                                            {cartButtonNum}
                                            )
                                        </Button>

                                        <Button id="logout-button"
                                            variant="info"
                                            className="btn-sm"
                                            onClick={() => {
                                                handleShow();
                                                logoutInProvider();
                                            }}
                                        >
                                            Logout account
                                        </Button>

                                    </div>



                                </Navbar.Text>
                            </div>
                        </span>

                        <Navbar.Toggle aria-controls="basic-navbar-nav" />


                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">



                                {/* <Nav.Link href="/about">About New</Nav.Link> */}

                                <Nav.Link eventKey="link-1" as={Link} to='/'>
                                    Home New
                                </Nav.Link>
                                <Nav.Link eventKey="link-2" as={Link} to='/about'>
                                    About New
                                </Nav.Link>
                                <Nav.Link eventKey="link-2" as={Link} to='/products'>
                                    Product
                                </Nav.Link>
                                <Nav.Link eventKey="link-2" as={Link} to='/login'>
                                    Login
                                </Nav.Link>
                                <Nav.Link eventKey="link-2" as={Link} to='/orders'>
                                    Orders
                                </Nav.Link>


                                <span id="nav-brand-at-back">
                                    <Navbar.Text >Hi, {firstName} {lastName}!

                                        <div>
                                            <Button id="checkout-button"
                                                variant="info"
                                                onClick={() => {
                                                    handleShow();
                                                    prepareCartOffCanvas()

                                                }
                                                }
                                                className="me-2 btn-sm">
                                                Cart Checkout (
                                                {cartButtonNum}
                                                )
                                            </Button>

                                            <Button id="logout-button"
                                                variant="info"
                                                className="btn-sm"
                                                onClick={() => {
                                                    handleShow();
                                                    logoutInProvider();
                                                }}
                                            >
                                                Logout account
                                            </Button>
                                        </div>

                                    </Navbar.Text>

                                </span>

                                <>

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

                                            {cartFilled ? displayCartItems() : <div>Loading cart</div>}

                                            {cartFilled ? <a href="/checkout" className="btn btn-success btn-lg mt-3">Checkout Cart!</a>
                                                : <a href="/login" className="btn btn-warning mt-3">Login to allow 'checkout'.</a>}

                                        </Offcanvas.Body>
                                    </Offcanvas>
                                </>





                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>

            </div>







        </React.Fragment >


    )


}