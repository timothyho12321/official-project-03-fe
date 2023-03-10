import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import CartContext from '../contexts/CartContext'
import { loadStripe } from '@stripe/stripe-js'


export default function CheckOut() {

    const cartContext = useContext(CartContext);
    const navigateTo = useNavigate();


    useEffect(
        () => {
            const checkoutNow = async () => {

                let sessionSpecifics = {}
                let publishableKey = null
                const stripeResponse = await cartContext.checkoutCart()
                if (!stripeResponse) {
                    navigateTo("/products")
                    return;
                } else {
                    publishableKey = stripeResponse.publishableKey
                    sessionSpecifics =
                    {
                        sessionId: stripeResponse.sessionId,
                    }
                }

                const stripe = await loadStripe(publishableKey)
                stripe.redirectToCheckout(sessionSpecifics)

            }
            checkoutNow();

        }, []


    )









    return (
        <React.Fragment>

            <h1 className='mt-3 ms-3 me-3'>Check Out Is running. Please hold...</h1>
        </React.Fragment>

    )
}

