import React, { useContext, useEffect, useRef, useState } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import ProductContext from '../contexts/ProductContext'
import '../css/products.css';

export default function Variant() {

    const productContext = useContext(ProductContext)
    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us80.gitpod.io/api/"
    const [variants, setVariants] = useState([])

    const { product_id } = useParams();
    const trackRender = useRef(0);
    // let allVariants = productContext.getAllVariants()


    const retrieveVariant = async () => {
        let response = await axios.get(BASE_API_URL + "products/" +
            product_id + "/variants")

        console.log(response.data.name)

        // DEBUG SETTING THE VARIANT DOES NOT UPDATE IN STATE
        setVariants(response.data);
        trackRender.current = 1
        return response.data;
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

            {variants?.length > 0 && variants.map(v => (<React.Fragment>
                <h3>{v.name}</h3>

            </React.Fragment>))}

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

