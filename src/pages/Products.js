import React, { useContext, useEffect, useRef, useState } from 'react'
import { Accordion, Badge, Button, Card, Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ProductContext from '../contexts/ProductContext'
import SimpleReactValidator from 'simple-react-validator';

import '../css/products.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlask, faHandsBubbles, faOilCan, faPumpSoap, faRuler, faScroll, faSprayCanSparkles, faTag, faTape } from '@fortawesome/free-solid-svg-icons';

import { Player } from '@lottiefiles/react-lottie-player';

export default function Product() {




    const productContext = useContext(ProductContext)

    let allSoaps = productContext.getAllSoaps()
    let allSoapsUse = allSoaps.message

    const currentProductLayerSearch = productContext.searchCall
    const changeProductLayerSearch = productContext.setSearchCall

    const [loadedProducts, setLoadedProducts] = useState(false)
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


    useEffect(

        () => {
            console.log("useEffect in Products Component ran.")
            // allSoaps();
            productContext.getAllSoaps()
            setLoadedProducts(true);

        }, []
    )




    // const updateFormFieldArray = (event) => {

    //     console.log("event.target.value", event)
    //     console.log("called updateFormFieldArray function")

    //     let findIndex = currentProductLayerSearch.smells.indexOf(parseInt(event.target.value))

    //     console.log("findIndex", findIndex)

    //     console.log("currentProductLayerSearch.smells", currentProductLayerSearch.smells)
    //     let addToArray = [...currentProductLayerSearch.smells, parseInt(event.target.value)]
    //     console.log("addToArray", addToArray)
    //     if (findIndex === -1) {
    //         changeProductLayerSearch({
    //             ...currentProductLayerSearch,
    //             [event.target.name]: addToArray

    //         })

    //     } else {
    //         let removePrint = [...currentProductLayerSearch.smells.slice(0, findIndex),
    //         ...currentProductLayerSearch.smells.slice(findIndex + 1)]
    //         console.log("removePrint", removePrint)

    //         let a = [...currentProductLayerSearch.smells.slice(0, findIndex)]
    //         console.log("a", a)


    //         changeProductLayerSearch({
    //             ...currentProductLayerSearch,
    //             [event.target.name]: [...currentProductLayerSearch.smells.slice(0, parseInt(findIndex)),
    //             ...currentProductLayerSearch.smells.slice(parseInt(findIndex) + 1)]

    //         })

    //     }

    //     // if (!currentProductLayerSearch.smells.includes(event.target.value)) {
    //     //     changeProductLayerSearch({
    //     //         ...currentProductLayerSearch,
    //     //         [event.target.name]: addToArray

    //     //     })

    //     // } else {
    //     //     let removePrint = [...currentProductLayerSearch.smells.slice(0, findIndex),
    //     //     ...currentProductLayerSearch.smells.slice(findIndex + 1)]
    //     //     console.log("removePrint", removePrint)

    //     //     let a = [...currentProductLayerSearch.smells.slice(0, findIndex)]
    //     //     console.log("a", a)


    //     //     changeProductLayerSearch({
    //     //         ...currentProductLayerSearch,
    //     //         [event.target.name]: [...currentProductLayerSearch.smells.slice(0, parseInt(findIndex)),
    //     //         ...currentProductLayerSearch.smells.slice(parseInt(findIndex) + 1)]

    //     //     })

    //     // }

    //     // changeProductLayerSearch({
    //     //     ...currentProductLayerSearch,
    //     //     [event.target.name]: event.target.value
    //     // })

    // }

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

        console.log("after update smell", currentProductLayerSearch)
    }


    const allowValidator = useRef(new SimpleReactValidator());


    // const notifySearch = () => toast("Search sent!");

    const notifySearch = () => toast.success(' Searching...', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const notifyWrongSearch = () => toast.error('Wrong input types entered for search.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const validateAndSendSearch = () => {

        if (allowValidator.current.allValid()) {

            notifySearch()

            productContext.displaySearchProducts()
        } else {


            // alert("Failed to search as wrong input entered")
            notifyWrongSearch()
            // console.log("entered failed search route")
            allowValidator.current.showMessages();

        }



    }


    return (
        <React.Fragment>
            <h1 className='mt-2 ms-3' id="product-header-style">Products</h1>

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
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Name', currentProductLayerSearch.name,
                                'alpha_space')}

                        </div>

                        <div className='mt-2'>
                            <label>Min Cost </label>
                            <input type="text"
                                className='form-control'
                                name='min_cost'
                                value={currentProductLayerSearch.min_cost}
                                onChange={updateFormField}
                            />
                        </div>
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Min Cost', currentProductLayerSearch.min_cost,
                                'numeric|min:0')}

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

                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Max Cost', currentProductLayerSearch.max_cost,
                                'numeric|min:0')}

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
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Min Width', currentProductLayerSearch.min_width,
                                'numeric|min:0')}

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
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Max Width', currentProductLayerSearch.max_width,
                                'numeric|min:0')}

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
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Min Height', currentProductLayerSearch.min_height,
                                'numeric|min:0')}

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
                        <div className='products-error-message-style'>
                            {allowValidator.current.message('Max Height', currentProductLayerSearch.max_height,
                                'numeric|min:0')}

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






                        {/* <ToastContainer /> */}
                        {/* <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="colored"
                        /> */}
                        <div id="div-for-search-buttons">
                            <button id="enter-search-btn-style"
                                variant="light"
                                className='btn btn-sm'
                                onClick={() => {
                                    validateAndSendSearch()
                                }}
                            >Enter Search</button>

                            <button id="reset-search-btn-style"
                                className='btn  btn-sm ms-2'
                                variant="light"
                                onClick={() => { productContext.showClearSearch() }}
                            >Reset Search</button>

                        </div>



                    </Accordion.Body>
                </Accordion.Item>
            </Accordion >

            {/* {allSoapsUse?.length > 0 && allSoapsUse.map(s => (<React.Fragment>
           <h3>{s.name}</h3> 

           </React.Fragment>)) */}

            {loadedProducts ?

                <Row xs={1} md={2} lg={3} className="g-4">
                    {Array.from({ length: allSoapsUse?.length }).map((_, index) => (
                        <Col className="d-flex justify-content-center card-holder ">
                            <Card className='mt-3'
                                key={allSoapsUse[index].id} id="soap-card" as={Link} to={`/products/${allSoapsUse[index].id}/variants`}>
                                <Card.Img variant="top"
                                    src={allSoapsUse[index].image_url}
                                    style={{ "height": "50vh", justifyContent: "center" }}
                                />
                                <Card.Body>
                                    <Card.Title ><FontAwesomeIcon icon={faPumpSoap} className="fa-2xl" /><span id='product-title-style'>{allSoapsUse[index].name}</span> </Card.Title>
                                    <Card.Text>
                                        <div><FontAwesomeIcon icon={faFlask} /> -{allSoapsUse[index].base.base}</div>
                                        <div><FontAwesomeIcon icon={faOilCan} /> -{allSoapsUse[index].oil.oil}</div>
                                        <div><FontAwesomeIcon icon={faHandsBubbles} />  {allSoapsUse[index].purposes?.map(p => <Badge bg="warning" className='ms-1'>{p.purpose}</Badge>)}</div>
                                        <div><FontAwesomeIcon icon={faSprayCanSparkles} /> {allSoapsUse[index].smells?.map(s => <Badge bg="info" className='ms-1'>{s.smell}</Badge>)}</div>
                                        <div><FontAwesomeIcon icon={faScroll} /> -{allSoapsUse[index].type?.type}</div>
                                        <div><FontAwesomeIcon icon={faRuler} /> -Width: {allSoapsUse[index].width}</div>
                                        <div><FontAwesomeIcon icon={faTape} /> -Height: {allSoapsUse[index].height}</div>
                                        <div><FontAwesomeIcon icon={faTag} /> -${allSoapsUse[index].cost/100}</div>


                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>

                :
                <React.Fragment>
                    <div className='mt-2 ms-2' >Loading products...</div>
                    <Player
                        src='https://assets3.lottiefiles.com/packages/lf20_eHMDJF.json'
                        id='soap-loading-animation-style'
                        loop
                        autoplay
                    />

                </React.Fragment>

            }

        </React.Fragment>

    )
}

