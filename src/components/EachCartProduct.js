import React, { useState, useContext } from 'react'
import { Button, ListGroupItem } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import CartContext from '../contexts/CartContext';


import '../css/each_cart_product.css';

export default function EachCartProduct(props) {

    const cartContext = useContext(CartContext);
    const [ableEdit, setEdit] = useState(false)
    const [cartQuantity, setCartQuantity] = useState(props.cart.quantity)
    const setCartInfo = cartContext.setCartInfo
    const updateCart = cartContext.updateCart

    // WHY CAN ONLY DETECT FOR THE LATEST QUESTION CONTINUE
    const updateFormField = (event) => {
        setCartQuantity(
            event.target.value
        )
    }

    const sendUpdate = (event) => {
        // console.log("send update function clicked")
        
        setCartInfo({
            ...cartContext.cartInfo,
            'quantity': cartQuantity,
            
        })
        updateCart();

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
                            <label>Update cart item quantity</label>
                            <div id="box-update-and-button">
                                <input type="text"
                                    className='quantity-box-style form-control mb-1 mt-1'
                                    value={cartQuantity}
                                    onChange={updateFormField}
                                />
                                <Button className='btn-sm btn-success ms-1'
                                    onClick={sendUpdate}
                                >Confirm update</Button>

                            </div>

                            <Button className='btn-sm btn-danger ms-1'

                            >Delete Cart Item</Button>

                        </div>


                    </React.Fragment>

                    :

                    <React.Fragment>
                        <h5>{props.cart.variant.name}</h5>
                        <p>Color: {props.cart.variant.color.color}</p>
                        <p>Cost: $ {props.cart.variant.soap.cost / 100}</p>
                        <p>Quantity: {props.cart.quantity}</p>

                        <Button className='btn-sm btn-success'
                            onClick={() => {
                                setEdit(true)
                                startEditForVar(props.cart.variant.id)
                            }}

                        >Edit</Button>


                    </React.Fragment>

                }
            </ListGroupItem>


        </React.Fragment>

    )
}
