import React, { useContext } from 'react'
import { Button, Card, Col, Row } from 'react-bootstrap'
import ProductContext from '../contexts/ProductContext'

export default function Product() {

    const productContext = useContext(ProductContext)

    let allSoaps = productContext.getAllSoaps()
    let allSoapsUse = allSoaps.message

    const printSoap = () => {
        console.log("entered printsoap route")

        console.log("allSoaps", allSoaps)
        console.log("allSoapsUse", allSoapsUse)
    }
    return (
        <React.Fragment>
            <h1>Products Page</h1>
            <Button onClick={printSoap}>Click for soap</Button>

            {/* {allSoapsUse?.length > 0 && allSoapsUse.map(s => (<React.Fragment>
           <h3>{s.name}</h3> 

           </React.Fragment>)) */}

            <Row xs={1} md={2} lg={3} className="g-4">
                {Array.from({ length: allSoapsUse?.length }).map((_, index) => (
                    <Col className="d-flex justify-content-center card-holder ">
                        <Card>
                            <Card.Img variant="top"
                                src={allSoapsUse[index].image_url}
                                style={{ "height": "50vh", justifyContent: "center" }}
                            />
                            <Card.Body>
                                <Card.Title>Title:{allSoapsUse[index].name}</Card.Title>
                                <Card.Text>
                                    <div>Base: {allSoapsUse[index].base.base}</div>
                                    <div>Oil: {allSoapsUse[index].oil.oil}</div>
                                    <div>Purposes to put tab: {allSoapsUse[index].purposes?.map(p=>p.purpose)}</div>
                                    <div>Smells to put tab: {allSoapsUse[index].smells?.map(s=>s.smell)}</div>
                                    <div>Type:{allSoapsUse[index].type?.type}</div>
                                    
                                    <div>Width:{allSoapsUse[index].width}</div>
                                    <div>Height:{allSoapsUse[index].height}</div>
                                    <div>Cost:{allSoapsUse[index].cost}</div>

                                
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>

    )
}

