import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductContext from '../contexts/ProductContext';

export default function ProductsProvider(props) {

    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/"
    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us80.gitpod.io/"
    
    const [soaps, setSoaps] = useState([]);

    
    // const [search, addSearch] = useState(
    //     {
    //         name:"",
    //         cost:"",
    //         width:"",
    //         height:"", 
    //         shape:"", 
    //         smells:"", 
    //         oils:""
    //     }
    // );

    
    const [searchCall, setSearchCall] = useState({
        'name': "",
        'min_cost': "",
        'max_cost': "",
        'min_width': "",
        'max_width': "",
        'min_height': "",
        'max_height': "",
        // 'shape ': "",
        'smells': "",
        'oils': "",
    })

    useEffect(
        () => {
            const getAllSoaps = async () => {
                console.log("getAllSoaps route")
                let response = await axios.get(BASE_API_URL + "api/products")

                console.log(response.data);

                setSoaps(response.data);

            }
            getAllSoaps();
        }, []
    )


    const shareProductContext = {
        soaps,
        getAllSoaps: ()=>{
            return soaps
        },
        searchCall,
        setSearchCall

    }


    return (
        <ProductContext.Provider value={shareProductContext}>
            {props.children}

        </ProductContext.Provider >

    )


}
