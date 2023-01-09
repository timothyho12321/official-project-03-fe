import React, { useState, useEffect, useRef, useContext } from 'react'


import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function Register() {

    const userContext = useContext(UserContext)
    const updateUserLayerLogin = userContext.setLoginInfo
    const updateUserLayerRegister = userContext.setRegisterInfo
    
    const sendLogin = userContext.login;
    const sendRegister = userContext.register;
    const navigateTo = useNavigate();

    const updateFormField = (event) => {
        updateUserLayerLogin(
            {
                ...userContext.loginInfo,
                [event.target.name]: event.target.value
            }
        )

    }

    const updateFormField2 = (event) => {
        updateUserLayerRegister(
            {
                ...userContext.registerInfo,
                [event.target.name]: event.target.value
            }
        )
        console.log(userContext.registerInfo)

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

    const createUser = async () => {
        const response = await sendRegister(userContext.registerInfo)



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
            <h2>Register as a New User</h2>
            <div className='mt-3 ms-3 me-3'>
                <label>First Name</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.first_name}
                    name="first_name"
                    onChange={updateFormField2}
                />

                <label>Last Name</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.last_name}
                    name="last_name"
                    onChange={updateFormField2}
                />

                <label>Email</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.email}
                    name="email"
                    onChange={updateFormField2}
                />

                <label>Password</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.password}
                    name="password"
                    onChange={updateFormField2}
                />

                <label>Confirm Password</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.password_confirm}
                    name="password_confirm"
                    onChange={updateFormField2}
                />

                <label>Contact Number</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.contact_number}
                    name="contact_number"
                    onChange={updateFormField2}
                />



                <Button variant="primary"
                    onClick={createUser}
                >
                    Create Account</Button>




            </div>




        </React.Fragment>
    )
}
