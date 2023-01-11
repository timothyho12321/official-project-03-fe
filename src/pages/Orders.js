import React, { useState, useEffect, useRef, useContext } from 'react'

import axios from 'axios'

import { Button, Table } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Orders() {

    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/orders/"
    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us82.gitpod.io/api/orders/"



    const [orders, setOrders] = useState([])

    useEffect(() => {

        console.log("ran the useEffect")
        const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))


        async function findOrders() {
            const response = await axios.get(BASE_API_URL, {
                headers: {
                    Authorization: `Bearer ${haveToken.accessToken}`
                }
            })
            // console.log("response", response.data)
            setOrders(response.data)
        }

        findOrders()



    }, [])






    return (

        <React.Fragment>
            <h2>Orders page</h2>

            <Table bordered>
                <thead>
                    <tr>
                        <td>
                            id
                        </td>
                        <td>
                            Account Id
                        </td>
                        <td>
                            Total Cost
                        </td>
                    </tr>
                </thead>

                <tbody>

                    {orders.map(o => (
                        <tr>
                            <td>
                                {o.id}
                            </td>
                            <td>
                                {o.account_id}
                            </td>
                            <td>
                                {o.total_cost}
                            </td>
                        </tr>
                    )
                    )}
                </tbody>

            </Table>



        </React.Fragment>)

}