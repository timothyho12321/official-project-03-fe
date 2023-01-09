import React, { useState, useEffect, useRef, useContext } from 'react'


import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const userContext = useContext(UserContext)
    const updateUserLayerLogin = userContext.setLoginInfo
    const sendLogin = userContext.login;
    const navigateTo = useNavigate();

    const updateFormField = (event) => {
        updateUserLayerLogin(
            {
                ...userContext.loginInfo,
                [event.target.name]: event.target.value
            }
        )

    }

    const loginUser = async () => {
        const response = await sendLogin(userContext.loginInfo)



        // if(res){
        //     navigate("/products")
        // }
        // else{
        //     navigate("/register")
        // }
    }

    const registerUser = () => {
        navigateTo("/register")
    }



    return (

        <React.Fragment>

            <div className='mt-3 ms-3 me-3'>
                <label>Email</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.loginInfo.email}
                    name="email"
                    onChange={updateFormField}
                />
                <label>Password</label>
                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.loginInfo.password}
                    name="password"
                    onChange={updateFormField}
                />
                <Button variant="primary"
                    onClick={loginUser}
                >
                    Login</Button>


                <Button variant="warning"
                    className='ms-2'
                    onClick={registerUser}
                >
                    New? Register</Button>

            </div>




        </React.Fragment>
    )
}
