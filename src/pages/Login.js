import React, { useState, useEffect, useRef, useContext } from 'react'


import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import '../css/login.css'

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

console.log("after login response",response)
        if(response){
            navigateTo("/products")
        }
        else{
            navigateTo("/register")
        }
    }

    const registerUser = () => {
        navigateTo("/register")
    }



    return (

        <React.Fragment>
            <h1 id="login-header-style" className='mt-2 ms-3'>Login</h1>
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
                <Button variant="light"
                    onClick={loginUser}
                    id="login-button-style"
                >
                    Login</Button>


                <Button variant="light"
                    className='ms-2'
                    onClick={registerUser}
                    id="register-button-style"
                >
                    New User</Button>

            </div>




        </React.Fragment>
    )
}
