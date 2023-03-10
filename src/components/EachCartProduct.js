import React, { useState, useContext, useEffect } from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import CartContext from '../contexts/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import '../css/each_cart_product.css';
import { faPenToSquare, faSquareCheck } from '@fortawesome/free-solid-svg-icons';

export default function EachCartProduct(props) {

    const cartContext = useContext(CartContext);
    const [ableEdit, setEdit] = useState(false)
    const [cartQuantity, setCartQuantity] = useState(props.cart.quantity)
    const setCartInfo = cartContext.setCartInfo
    const updateCart = cartContext.updateCart
    const deleteOneCartItem = cartContext.deleteCartItem
    const [error, setError] = useState(false)


    const updateFormField = (event) => {

        console.log("enter updateFormField route")


        let currentStock = props.cart.variant.stock
        let newValue = parseInt(event.target.value)
        // console.log("currentStock", currentStock)
        // console.log("newValue", newValue)

        if (newValue > currentStock) {
            // console.log("quant more than current stock")

            setCartQuantity(
                currentStock
            )
            setError(true);
        }

        else if (newValue < 1) {
            // console.log("quant less than 1")

            setCartQuantity(
                1
            )
            setError(true);
        }
        else {
            // console.log("quant is correct amount.")

            setCartQuantity(
                event.target.value
            )
        }

    }

    useEffect(
        () => {
            console.log("testing")



        }, [cartQuantity]

    )

    const sendUpdate = (event) => {
        // console.log("send update function clicked")
        console.log("cartQuantity", cartQuantity)

        // setCartInfo({
        //     ...cartContext.cartInfo,
        //     'quantity': cartQuantity,

        // })
        updateCart(cartQuantity);
        setEdit(false);
        // console.log("props reload function from navandoff layer", props.reloadProp)

        props.reloadProp();
        props.reloadCartInProvider();



    }

    const startEditForVar = (id) => {
        console.log("startEditForVar function ran.")
        console.log("variant id to set in cart provider", id)

        setCartInfo(
            {
                ...cartContext.cartInfo,
                'variantId': id
            }
        )
    }

    const deleteCartItem = (id) => {
        console.log("variant id to delete", id)

        deleteOneCartItem(id);

    }
    return (
        <React.Fragment>
            <ListGroupItem>

                <img src={props.cart.variant.image_url}
                    alt="cart-thumbnail-image"
                    className="cart-thumbnail-image"
                />


                {ableEdit ?
                    <React.Fragment>
                        <div>
                            <label className='mt-2'>Update cart item quantity</label>
                            <div id="box-update-and-button">
                                <input type="text"
                                    className='quantity-box-style form-control mb-1 mt-1'
                                    value={cartQuantity}
                                    onChange={updateFormField}
                                />
                                <Button className='btn-sm ms-1'
                                    variant='light'
                                    id="confirm-edit-button-style"
                                    onClick={sendUpdate}
                                >
                                    <FontAwesomeIcon icon={faSquareCheck} /> Confirm

                                </Button>

                            </div>
                            {error ? <div id="error-message">Correct stock amount is inputted.</div> : ""}

                            <Button className='btn-sm btn-danger ms-1'
                                onClick={() => { deleteCartItem(props.cart.variant.id) }}
                            >Delete Cart Item</Button>

                        </div>


                    </React.Fragment>

                    :

                    <React.Fragment>
                        <h5 className='mt-2'>{props.cart.variant.name}</h5>
                        <p>Color: {props.cart.variant.color.color}</p>
                        <p>Cost: $ {props.cart.variant.soap.cost / 100}</p>
                        {/* <p>QuantityProp: {props.cart.quantity}</p> */}
                        <p>Quantity: {cartQuantity}</p>

                        <Button className='btn-sm btn-success'
                            id='edit-button-style'
                            variant='light'
                            onClick={() => {
                                setEdit(true)
                                startEditForVar(props.cart.variant.id)
                            }}

                        >
                            <FontAwesomeIcon icon={faPenToSquare} /> Edit


                        </Button>


                    </React.Fragment>

                }
            </ListGroupItem>


        </React.Fragment>

    )
}
