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

export default function NavAndOff() {



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
                                
                                {/* 
                                <Link to="/">
                                    <Navbar.Text id="nav-bar-text-products">Products</Navbar.Text>
                                </Link> */}

                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>





            </Router>
        </React.Fragment>


    )


}