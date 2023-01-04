import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../contexts/ProductContext'
import '../css/products.css';
import '../css/variants.css';
import CartContext from '../contexts/CartContext';

export default function Variant() {

    const productContext = useContext(ProductContext)
    const cartContext = useContext(CartContext)
    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/"
    const [variants, setVariants] = useState([])
    const [variantId, setVarId] = useState()

    const { product_id } = useParams();

    const trackRender = useRef(0);
    // let allVariants = productContext.getAllVariants()


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
        setVarId(variants[0].id);

        // setVarId(0);
        // console.log("see variant [0]",variants[0].image_url)
        console.log("variant_id", variantId)
        trackRender.current = 1

        getDetailsOfChosenVariant();

        return response.data;
    }


    const returnUrlWithVariantId = () => {

        let selection = variantId
        console.log(selection);
        console.log("variants", variants)

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
                onClick={() => { setVarId(v.id) }}
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
                    example
                    Overall soap: {filterForVariantDetail?.soap.name}
                    ${filterForVariantDetail?.soap.cost}
                    {filterForVariantDetail?.name}
                    {filterForVariantDetail?.name}
                </Card.Text>

            </React.Fragment>

        // return filterForVariantDetail;
        return cardBodyToReturn;

    }

    const addVariantToCart = async ()=>{
        await makeCart()
    }
    const makeCart = async ()=>{
        const resultResponse= await cartContext(addVariantToCart.cartInfo)
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


                        {/* <Card.Text>
                            Some quick example text to build on the card title and make up the
                            bulk of the card's content.
                        </Card.Text> */}
                        <Button variant="primary">Add to cart</Button>
                    </Card.Body>
                </Card>

            </div>




            {/* <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: allSoapsUse?.length }).map((_, index) => (
                    <Col className="d-flex justify-content-center card-holder ">
                        <Card key={allSoapsUse[index].id} id="soap-card" as={Link} to={`/products/${allSoapsUse[index].id}/variants`}>
                            <Card.Img variant="top"
                                src={allSoapsUse[index].image_url}
                                style={{ "height": "50vh", justifyContent: "center" }}
                            />
                            <Card.Body>
                                <Card.Title>Title: {allSoapsUse[index].name}</Card.Title>
                                <Card.Text>
                                    <div>Base: {allSoapsUse[index].base.base}</div>
                                    <div>Oil: {allSoapsUse[index].oil.oil}</div>
                                    <div>Purposes to put tab: {allSoapsUse[index].purposes?.map(p=>p.purpose)}</div>
                                    <div>Smells to put tab: {allSoapsUse[index].smells?.map(s=>s.smell)}</div>
                                    <div>Type: {allSoapsUse[index].type?.type}</div>
                                    
                                    <div>Width: {allSoapsUse[index].width}</div>
                                    <div>Height: {allSoapsUse[index].height}</div>
                                    <div>Cost: {allSoapsUse[index].cost}</div>

                                
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row> */}


        </React.Fragment>

    )
}

