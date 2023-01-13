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
            console.log("response", response.data)
            setOrders(response.data)
        }

        findOrders()



    }, [])






    return (

        <React.Fragment>
            <h2 className='ms-2 mt-2'>Orders page</h2>

            <Table bordered responsive variant='danger' striped>
                <thead>
                    <tr>
                        <th>
                            Order Id
                        </th>
                        <th>
                            First Name
                        </th>
                        <th>
                            Email
                        </th>
                        <th>
                            Payment Type
                        </th>
                        <th>
                            Total Cost
                        </th>
                        <th>
                            Order Status
                        </th>
                        <th>
                            Receipt Info.
                        </th>
                        <th>
                            Order Date
                        </th>
                        <th>
                            Delivery Date
                        </th>
                    </tr>
                </thead>

                <tbody>

                    {orders.map(o => (
                        <tr>
                            <td>
                                {o.id}
                            </td>
                            <td>
                                {o.account.first_name}
                            </td>
                            <td>
                                {o.account.email}
                            </td>
                            <td>
                                {o.payment_type}
                            </td>
                            <td>
                                {o.total_cost}
                            </td>
                            <td>
                                {o.order_status.status}
                            </td>
                            <td>
                                <a href={o.receipt_url}>Link</a>
                            </td>
                            <td>
                                {o.order_date.slice(0,10)}
                            </td>
                            <td>
                                {o.delivery_date.slice(0,10)}
                            </td>
                        </tr>
                    )
                    )}
                </tbody>

            </Table>



        </React.Fragment>)

}