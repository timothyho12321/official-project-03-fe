import axios from 'axios';
import React, { useState } from 'react'
import CartContext from '../contexts/CartContext';


const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/"
// const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us80.gitpod.io/api/"



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

            try {
                console.log(passIn.variantId)
                console.log('quantity', passIn.quantity)
                const response = await axios.post(BASE_API_URL + "cartforshopping/" + `${passIn.variantId}` + "/add", {
                    // quantity in cartInfo will not be retained if variantId is updated
                    //Question to debug
                    // 'quantity': cartInfo.quantity,
                    'quantity': 1,
                })

                alert("Your variant item has been added to shopping cart successfully.")

                return response;

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