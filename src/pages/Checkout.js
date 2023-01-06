import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

import CartContext from '../contexts/CartContext'

export default function CheckOut() {

    const cartContext = useContext(CartContext);
    const navigateTo = useNavigate();


    useEffect(
        () => {
            const checkoutNow = async () => {

                let sessionDetails = {}
                let publishableKey = null
                const stripeResponse = await cartContext.checkoutCart()

                if (!stripeResponse) {
                    navigateTo("/about")
                    return;
                } else {
                    // CONTINUE FROM HERE STRIPE PAYMENT
                    sessionDetails = {
                        sessionId: stripeResponse.sessionId,
                    }
                    publishableKey = stripeResponse.publishableKey
                }

            }
            checkoutNow();

        }, []


    )









    return (
        <React.Fragment>

            <h1>Check Out Is running. Please hold...</h1>
        </React.Fragment>

    )
}

