import React, { useContext } from 'react'
import { Accordion, Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductContext from '../contexts/ProductContext'
import '../css/products.css';

export default function Product() {

    const productContext = useContext(ProductContext)

    let allSoaps = productContext.getAllSoaps()
    let allSoapsUse = allSoaps.message

    const currentProductLayerSearch = productContext.searchCall
    const changeProductLayerSearch = productContext.setSearchCall

    const updateFormField = (event) => {
        changeProductLayerSearch({
            ...currentProductLayerSearch,
            [event.target.name]: event.target.value
        })

    }

    const updateFormNumber = (event) => {
        changeProductLayerSearch({
            ...currentProductLayerSearch,
            [event.target.name]: parseInt(event.target.value)
        })

    }

    const updateFormFieldArray = (event) => {

        console.log("event.target.value", event)
        console.log("called updateFormFieldArray function")

        let findIndex = currentProductLayerSearch.smells.indexOf(parseInt(event.target.value))

        console.log("findIndex", findIndex)

        console.log("currentProductLayerSearch.smells", currentProductLayerSearch.smells)
        let addToArray = [...currentProductLayerSearch.smells, parseInt(event.target.value)]
        console.log("addToArray", addToArray)
        if (findIndex === -1) {
            changeProductLayerSearch({
                ...currentProductLayerSearch,
                [event.target.name]: addToArray

            })

        } else {
            let removePrint = [...currentProductLayerSearch.smells.slice(0, findIndex),
            ...currentProductLayerSearch.smells.slice(findIndex + 1)]
            console.log("removePrint", removePrint)

            let a = [...currentProductLayerSearch.smells.slice(0, findIndex)]
            console.log("a", a)


            changeProductLayerSearch({
                ...currentProductLayerSearch,
                [event.target.name]: [...currentProductLayerSearch.smells.slice(0, parseInt(findIndex)),
                ...currentProductLayerSearch.smells.slice(parseInt(findIndex) + 1)]

            })

        }

        // if (!currentProductLayerSearch.smells.includes(event.target.value)) {
        //     changeProductLayerSearch({
        //         ...currentProductLayerSearch,
        //         [event.target.name]: addToArray

        //     })

        // } else {
        //     let removePrint = [...currentProductLayerSearch.smells.slice(0, findIndex),
        //     ...currentProductLayerSearch.smells.slice(findIndex + 1)]
        //     console.log("removePrint", removePrint)

        //     let a = [...currentProductLayerSearch.smells.slice(0, findIndex)]
        //     console.log("a", a)


        //     changeProductLayerSearch({
        //         ...currentProductLayerSearch,
        //         [event.target.name]: [...currentProductLayerSearch.smells.slice(0, parseInt(findIndex)),
        //         ...currentProductLayerSearch.smells.slice(parseInt(findIndex) + 1)]

        //     })

        // }

        // changeProductLayerSearch({
        //     ...currentProductLayerSearch,
        //     [event.target.name]: event.target.value
        // })

    }

    const updateFormFieldArray2 = (event) => {
        console.log(event.target.value)
        console.log(event.target.name)
        // Step 1: get current array
        let clonedArray = [...currentProductLayerSearch.smells]

        // Step 2: Modify array
        // Case 1: if user's checked smell is in array -> remove checked smell from array
        // ['1', '2', '3']

        if (clonedArray.includes(event.target.value)) {
            // console.log("entered remove route debug")
            let indexToReplace = clonedArray.indexOf(event.target.value)
            // console.log("indexToReplace", indexToReplace)
            let firstHalf = [...clonedArray.slice(0, indexToReplace)]
            // console.log("firstHalf", firstHalf)
            clonedArray = [...clonedArray.slice(0, indexToReplace),
            ...clonedArray.slice(indexToReplace + 1)]

            console.log("clonedArrayRemove", clonedArray)
        }

        // Case 2: if user's checked smell is new and not in array -> add to array
        // add to clonedArray
        else {
            clonedArray = [...clonedArray, event.target.value]
            console.log("clonedArray", clonedArray)

        }



        console.log("clonedArray", clonedArray)
        // Step 3: Set to state the current array
        changeProductLayerSearch({
            ...currentProductLayerSearch,
            [event.target.name]: clonedArray
        })

    }


    const printSoap = () => {
        console.log("entered printsoap route")

        console.log("allSoaps", allSoaps)
        console.log("allSoapsUse", allSoapsUse)
    }


    return (
        <React.Fragment>
            <h1>Products Page</h1>

            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Filter search</Accordion.Header>
                    <Accordion.Body>

                        <label>Soap Name </label>
                        <input type="text"
                            className='form-control'
                            name='name'
                            value={currentProductLayerSearch.name}
                            onChange={updateFormField}
                        />

                        <div className='mt-2'>
                            <label>Min Cost </label>
                            <input type="text"
                                className='form-control'
                                name='min_cost'
                                value={currentProductLayerSearch.min_cost}
                                onChange={updateFormField}
                            />
                        </div>

                        <div className='mt-2'>
                            <label>Max Cost </label>
                            <input type="text"
                                className='form-control'
                                name='max_cost'
                                value={currentProductLayerSearch.max_cost}
                                onChange={updateFormField}
                            />
                        </div>
                        <div className='mt-2'>
                            <label>Min width </label>
                            <input type="text"
                                className='form-control'
                                name='min_width'
                                value={currentProductLayerSearch.min_width}
                                onChange={updateFormField}
                            />
                        </div>

                        <div className='mt-2'>
                            <label>Max width  </label>
                            <input type="text"
                                className='form-control'
                                name='max_width'
                                value={currentProductLayerSearch.max_width}
                                onChange={updateFormField}
                            />
                        </div>

                        <div className='mt-2'>
                            <label>Min height </label>
                            <input type="text"
                                className='form-control'
                                name='min_height'
                                value={currentProductLayerSearch.min_height}
                                onChange={updateFormField}
                            />
                        </div>

                        <div className='mt-2'>
                            <label>Max height  </label>
                            <input type="text"
                                className='form-control'
                                name='max_height'
                                value={currentProductLayerSearch.max_height}
                                onChange={updateFormField}
                            />
                        </div>


                        <div className='mt-2'>
                            <label>Oil </label>
                            {/* <input type="text" className='form-control' name='title' value="" /> */}

                            <div>
                                <select name="oils"
                                    className='form-control'
                                    value={currentProductLayerSearch.oils}
                                    // Possible to check if option 0 was selected and set value as empty string
                                    onChange={updateFormNumber}
                                >
                                    <option key={0} value={999}>
                                        --------- Select one ---------
                                    </option>
                                    <option key={1} value={1}>
                                        Aloe Vera Oil
                                    </option>
                                    <option key={2} value={2}>
                                        Soy Bean Oil
                                    </option>
                                    <option key={3} value={3}>
                                        Canola Oil
                                    </option>
                                    <option key={4} value={4}>
                                        Animal Fats
                                    </option>

                                </select>

                            </div>


                        </div>


                        {/* QUESTION Need to debug why cannot unselect selected option. It becomes NAN and cannot read event.target.value */}
                        <div className='mt-2'>
                            <label>Smells </label>


                            <select name="smells"
                                className='form-control'
                                value={currentProductLayerSearch.smells}
                                onChange={updateFormFieldArray2}
                                multiple
                            >
                                <option key={0} value="">
                                    --------- Select one ---------
                                </option>
                                <option key={1} value={1}>
                                    Floral
                                </option>
                                <option key={2} value={2}>
                                    Fresh
                                </option>
                                <option key={3} value={3}>
                                    Clean
                                </option>
                                <option key={4} value={4}>
                                    Airy
                                </option>
                                <option key={5} value={5}>
                                    Earthy
                                </option>

                            </select>

                        </div>







                        <div id="div-for-search-buttons">
                            <button className='btn btn-success btn-sm'
                                onClick={() => { productContext.displaySearchProducts() }}
                            >Enter Search</button>

                            <button className='btn btn-warning btn-sm ms-2'
                                onClick={() => { productContext.showClearSearch() }}
                            >Reset Search</button>

                        </div>



                    </Accordion.Body>
                </Accordion.Item>
            </Accordion >

            <Button onClick={printSoap}>Click for soap</Button>

            {/* {allSoapsUse?.length > 0 && allSoapsUse.map(s => (<React.Fragment>
           <h3>{s.name}</h3> 

           </React.Fragment>)) */}

            <Row xs={1} md={2} lg={3} className="g-4">
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
                                    <div>Purposes to put tab: {allSoapsUse[index].purposes?.map(p => p.purpose)}</div>
                                    <div>Smells to put tab: {allSoapsUse[index].smells?.map(s => s.smell)}</div>
                                    <div>Type: {allSoapsUse[index].type?.type}</div>

                                    <div>Width: {allSoapsUse[index].width}</div>
                                    <div>Height: {allSoapsUse[index].height}</div>
                                    <div>Cost: {allSoapsUse[index].cost}</div>


                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </React.Fragment>

    )
}

