import React, { useState, useEffect, useRef, useContext } from 'react'


import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import SimpleReactValidator from 'simple-react-validator';



import '../css/login.css'

export default function Login() {

    const userContext = useContext(UserContext)
    const updateUserLayerLogin = userContext.setLoginInfo
    const sendLogin = userContext.login;
    const navigateTo = useNavigate();

    const allowValidator = useRef(new SimpleReactValidator());


    const updateFormField = (event) => {
        updateUserLayerLogin(
            {
                ...userContext.loginInfo,
                [event.target.name]: event.target.value
            }
        )

    }

    const notifyWrongLogin = () => toast.error('Failed login. Register for an account.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const loginUser = async () => {

        if (allowValidator.current.allValid()) {

            const response = await sendLogin(userContext.loginInfo)

            console.log("after login response", response)
            if (response) {
                navigateTo("/products")
            }
            else {
                notifyWrongLogin()
                navigateTo("/register")
            }

        } else {
            // alert("Failed to login account as failed validation.")
            console.log("entered validator show message route for login.")
            
            allowValidator.current.showMessages();
            
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
                <div className='register-error-message-style'>
                    {allowValidator.current.message('Email', userContext.loginInfo.email,
                        'required|email')}

                </div>

                <label className='mt-2'>Password</label>
                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.loginInfo.password}
                    name="password"
                    onChange={updateFormField}
                />

                <div className='register-error-message-style'>
                    {allowValidator.current.message('Email', userContext.loginInfo.password,
                        'required')}

                </div>

                <Button variant="light"
                className='mt-2'
                    onClick={loginUser}
                    id="login-button-style"
                >
                    Login</Button>


                <Button variant="light"
                    className='ms-2 mt-2'
                    onClick={registerUser}
                    id="register-button-style"
                >
                    New User</Button>

            </div>




        </React.Fragment>
    )
}
