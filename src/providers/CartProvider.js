import axios from 'axios';
import React, { useState } from 'react'
import CartContext from '../contexts/CartContext';


const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/"



export default function CartProvider(props) {


    // const [quantity, setQuantity] = useState(0)

    const [cartInfo, setCartInfo] = useState({
        'quantity': 1,
        'variantId': ''
    })



    const shopCartContext = {
        cartInfo,
        setCartInfo,
        addVariantToCart: async (quantity) => {

            try {
                const response = await axios.post(BASE_API_URL + "cartforshopping"+`${cartInfo.variantId}`+"/add",{
                    'quantity': cartInfo.quantity,
                    
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