import axios from 'axios';
import React, { useState } from 'react'
import CartContext from '../contexts/CartContext';


const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/"
// const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us82.gitpod.io/api/"
    


export default function CartProvider(props) {

    // const [quantity, setQuantity] = useState(0)

    const [cartInfo, setCartInfo] = useState({
        'quantity': 1,
        'variantId': ""
    })


    const shopCartContext = {
        cartInfo,
        setCartInfo,
        addVariantToCart: async (passIn) => {

            // console.log("ran addVariantToCart in cartprovider.js")

            const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            console.log("have Token", haveToken);

            try {

                if (haveToken.accessToken) {
                    // console.log("passIn.variantId",passIn.variantId)
                    console.log('cartInfo.variantId', cartInfo.variantId)

                    console.log('passIn.quantity', passIn.quantity)

                    const response = await axios.post(BASE_API_URL + "cartforshopping/" + `${cartInfo.variantId}` + "/add", {
                        'quantity': 1,
                    }, {
                        headers: {
                            Authorization: `Bearer ${haveToken.accessToken}`
                        }
                    })

                    // const response = await axios.post(BASE_API_URL + "cartforshopping/" + `${passIn.variantId}` + "/add", {

                    //     'quantity': 1,
                    // })

                    alert("Your variant item has been added to shopping cart successfully.")

                    return response;

                } else {
                    console.log("Your access token is invalid. Please login.")
                }


            } catch (e) {
                console.log(e)
            }

        },
        getCart: async () => {
            const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            console.log("have Token", haveToken);

            try {

                if (haveToken.accessToken) {
                    // console.log("received access token.")
                    // console.log("haveToken.accessToken", haveToken.accessToken)

                    // console.log("URL", BASE_API_URL + "cartforshopping/")
                    const response = await axios.get(BASE_API_URL + "cartforshopping/", {
                        headers: {
                            Authorization: `Bearer ${haveToken.accessToken}`
                        }
                    })

                    return response.data


                } else {
                    console.log("Your access token is invalid. Please login.")

                }


            } catch (e) {
                console.log(e)
            }

        },
        updateCart: async (passedQuantity) => {
            console.log("entered updateCart route in CartProvider.")

            // console.log("cartInfo.quantity",cartInfo.quantity)
            console.log("passedQuantity", passedQuantity)


            const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            // console.log("have Token", haveToken);

            try {

                if (haveToken.accessToken) {

                    console.log("cartInfo.variantId", cartInfo.variantId);

                    const response = await axios.put(BASE_API_URL + "cartforshopping/"
                        + `${cartInfo.variantId}` + "/update"
                        , {
                            "quantity": passedQuantity

                        },
                        {
                            headers: {
                                Authorization: `Bearer ${haveToken.accessToken}`
                            }
                        })

                    return response;

                } else {
                    console.log("Your access token is invalid. Please login.")
                }

            } catch (e) {
                console.log(e)
            }



        },
        deleteCartItem: async (passedVId) => {
            console.log("entered delete oneCart Item route in CartProvider.")

            // console.log("cartInfo.quantity",cartInfo.quantity)
            console.log("passedVId", passedVId)


            const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            console.log("have Token", haveToken);

            try {

                if (haveToken.accessToken) {

                    const response = await axios.delete(BASE_API_URL + "cartforshopping/"
                        + `${passedVId}` + "/delete", {
                        headers: {
                            Authorization: `Bearer ${haveToken.accessToken}`
                        }
                    })
                    return response;

                } else {
                    console.log("Your access token is invalid. Please login.")
                }

            } catch (e) {
                console.log(e)
            }

        },
        checkoutCart: async () => {
            console.log("entered route of check out function")

            // const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            // console.log("have Token", haveToken);

            try {
                const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))

                const checkCartItems = await shopCartContext.getCart();
                console.log("checkCartItems", checkCartItems)

                if (!checkCartItems || !checkCartItems.length) {
                    alert("Unable to checkout as cart is empty. Please add some item to cart.")
                } else {

                    const response = await axios.get(BASE_API_URL + "cartcheckoutreact/", {
                        headers: {
                            Authorization: `Bearer ${haveToken.accessToken}`
                        }
                    })
                    console.log("response", response)

                    return response.data
                }



            } catch (e) {
                console.log(e)
            }


        }

    }



    return (
        <CartContext.Provider value={shopCartContext}>
            {props.children}
        </CartContext.Provider>
    )

}