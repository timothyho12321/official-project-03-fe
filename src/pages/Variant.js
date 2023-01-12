import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Form, Row } from 'react-bootstrap'
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../contexts/ProductContext'
import '../css/products.css';
import '../css/variants.css';
import CartContext from '../contexts/CartContext';
import context from 'react-bootstrap/esm/AccordionContext';
import Slider from "react-slick";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Variant() {

    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext)
    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/"
    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us82.gitpod.io/api/"
    


    const [variants, setVariants] = useState([])
    const [variantId, setVarId] = useState()

    const { product_id } = useParams();

    const trackRender = useRef(0);
    // let allVariants = productContext.getAllVariants()

    const createCartItem = cartContext.addVariantToCart
    const setCartInfo = cartContext.setCartInfo
    const navigateTo = useNavigate()

    const changeVarIdInCartProvider = (id) => {
        // console.log("changeVarIdInCartProvider ran")
        // console.log("variantId TO UPDATE",id)
        // setVarId(id)
        // console.log("variantId AFTER UPDATE",variantId)

        setCartInfo({
            ...cartContext.cartInfo,
            'variantId': id
        })

    }

    const retrieveVariant = async () => {

        // Axios is to fetch all variants of this one soap product
        let response = await axios.get(BASE_API_URL + "products/" +
            product_id + "/variants")

        console.log("response.data", response.data);
        // console.log(response.data.name);
        // let emptyArray = []
        // emptyArray.push(response.data);
        // console.log("check if variant is now in empty array", emptyArray)

        //setVariants(emptyArray);
        setVariants(response.data);
        setVarId(variants[0]?.id);

        // setVarId(0);
        // console.log("see variant [0]",variants[0].image_url)
        // console.log("variant_id", variantId)
        trackRender.current = 1

        getDetailsOfChosenVariant();

        return response.data;
    }

    const failLoginMsg = () => toast.warning('Please login to add to cart.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const returnUrlWithVariantId = () => {

        let selection = variantId
        console.log(selection);
        // console.log("variants", variants)

        let filterForVariantPicture = variants.filter(v => v.id === selection);
        console.log("filterForVariantPicture", filterForVariantPicture)
        let urlString = filterForVariantPicture[0]?.image_url
        // console.log("urlString", urlString);

        if (!urlString) {
            urlString = ""
        }
        return urlString;
    }

    const returnThumbnailVariantsRow = () => {

        console.log("variants", variants)
        let pictureMap = variants.map(v =>
            <Card.Img key={v.id}
                id="variant-thumbnail"
                variant="top" src={v.image_url}
                className="me-2"
                onClick={() => {
                    // console.log("v.id",v.id);
                    setVarId(v.id);

                    changeVarIdInCartProvider(v.id);
                }}
            />)

        return pictureMap;
    }


    // const changeDisplayVariantId () => {

    //     setVarId(v.id);

    // }


    const getDetailsOfChosenVariant = () => {

        let filterForVariantDetail = variants.filter(v => v.id === variantId);
        // console.log("filterForVariantDetail",filterForVariantDetail)
        filterForVariantDetail = filterForVariantDetail[0]
        console.log("filterForVariantDetail", filterForVariantDetail)
        // filterForVariantDetail = filterForVariantDetail?.name
        // console.log("filterForVariantDetail", filterForVariantDetail)

        let cardBodyToReturn =
            <React.Fragment>
                <Card.Title>{filterForVariantDetail?.name}</Card.Title>

                <Card.Text>
                    <div>Overall soap: {filterForVariantDetail?.soap.name}</div>
                    <div>${parseFloat(filterForVariantDetail?.soap.cost) / 100}</div>

                    {/* <Button variant="primary"
                            onClick={addVariantToCart2}
                        >
                            Add to cart</Button> */}

                </Card.Text>

            </React.Fragment>

        // return filterForVariantDetail;
        return cardBodyToReturn;

    }

    const addVariantToCart = async () => {

        let haveAccount = JSON.parse(localStorage.getItem("accountData"))
        console.log("haveAccount", haveAccount)

        if (!haveAccount) {
            // alert("Please login.")
            failLoginMsg();
            console.log("Ask user to login.")
            navigateTo('/login')
        } else {

            await makeCart();

        }


    }

    const makeCart = async () => {
        console.log("entered makeCart route");
        console.log("cartInfo", cartContext.cartInfo)
        console.log("variant_id to makeCart", variantId)


        const resultResponse = await createCartItem(cartContext.cartInfo)

        console.log(resultResponse);
    }

    const updateFormField = (event) => {
        // console.log("updateFormField ran")
        // console.log(event.target.name)
        // console.log(event.target.value)
        // console.log({...cartContext.cartInfo})
        setCartInfo({
            ...cartContext.cartInfo,
            [event.target.name]: event.target.value
        })
    }



    useEffect(
        () => {
            const init = async () => {
                let variantInfo = await retrieveVariant();

                console.log("variantInfo", variantInfo);

                console.log("variants in state", variants);
            }
            init();
        }, []
    )

    return (
        <React.Fragment>
            <h1>Variant Detail Page</h1>

            <Button onClick={retrieveVariant}>Click for get variant</Button>

            {/* {variants?.length > 0 ? variants.map(v => (<React.Fragment>
                <h3>{v.name} </h3>

            </React.Fragment>)) : ""} */}

            <div id="variant-card">
                <Card style={{ width: '100%' }} >

                    <Card.Img variant="top" src={returnUrlWithVariantId()} />


                    <Card.Header>
                        {/* <Card.Img id="variant-thumbnail" variant="top" src={returnUrlWithThumbnailId()} /> */}
                        {returnThumbnailVariantsRow()}
                    </Card.Header>


                    <Card.Body>
                        {getDetailsOfChosenVariant()}

                        {/* <Card.Title>Test{getDetailsOfChosenVariant()?.name}</Card.Title> */}


                        {/* <label>Select quantity</label>

                        <input type="text"
                            className='form-control mb-3 mt-1'
                            value={cartContext.cartInfo.quantity}
                            name="quantity"
                            onChange={updateFormField}
                        /> */}

                        <Button variant="primary"
                            onClick={addVariantToCart}
                        >
                            Add to cart</Button>
                    </Card.Body>
                </Card>

            </div>


        </React.Fragment>

    )
}

