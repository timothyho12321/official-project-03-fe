import React, { useState, useEffect, useRef, useContext } from 'react'


import axios from 'axios'
import UserContext from '../contexts/UserContext'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

import '../css/register.css'

export default function Register() {

    const userContext = useContext(UserContext)
    const updateUserLayerLogin = userContext.setLoginInfo
    const updateUserLayerRegister = userContext.setRegisterInfo

    const sendLogin = userContext.login;
    const sendRegister = userContext.register;
    const navigateTo = useNavigate();

    const [showLoginButton, setLoginButton] = useState(false);

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
    const [value, setValue] = useState(0);

   


    const createUser = async () => {


        // if (validator.allValid()) {
        //     const response = await sendRegister(userContext.registerInfo)

        //     setLoginButton(true);
        // } else {
        //     console.log("entered validator show message route")
        //     validator.showMessages();
        //     makeForceUpdate();
        //     makeForceUpdate2();
        // }


        if (allowValidator.current.allValid()) {
            const response = await sendRegister(userContext.registerInfo)

            setLoginButton(true);
        } else {
            alert("Failed to create account as correct details are needed.")
            console.log("entered validator show message route")
            allowValidator.current.showMessages();
           
        }


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

    const navigateToLogin = () => {
        navigateTo("/login")
    }

    // const constructor = () => {
    //     let validator = new SimpleReactValidator();
    // }

    // constructor() {
    //     this.validator = new SimpleReactValidator();
    //   }

    // const validator = new SimpleReactValidator({
    //     className: 'text-danger',
    //     messages: {
    //         email: 'That is not an email.',
    //     }
    // });

    const allowValidator = useRef(new SimpleReactValidator());

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

                {/* {validator.message('firstname', userContext.registerInfo.first_name,
                    'required|alpha')} */}
                <div className='register-error-message-style'>
                    {allowValidator.current.message('First Name', userContext.registerInfo.first_name,
                        'required|alpha')}

                </div>


                <label>Last Name</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.last_name}
                    name="last_name"
                    onChange={updateFormField2}
                />
                <div className='register-error-message-style'>
                    {allowValidator.current.message('Last Name', userContext.registerInfo.last_name,
                        'required|alpha')}

                </div>

                <label>Email</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.email}
                    name="email"
                    onChange={updateFormField2}
                />
                <div className='register-error-message-style'>
                    {allowValidator.current.message('Email', userContext.registerInfo.email,
                        'required|email')}

                </div>
                <label>Password</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.password}
                    name="password"
                    onChange={updateFormField2}
                    placeholder="Need one special character, one upper and number"
                />
                <div className='register-error-message-style'>
                    {/* {simpleValidator.current.message('Password', userContext.registerInfo.password,
                        'required|min:8|in:1,2,3,4,5,6,7,8,9,0,!,#,$,%,&,(,)')} */}

                    {/* {simpleValidator.current.message('Password', userContext.registerInfo.password,
                        'required|in:foo,bar')} */}


                    {/* {simpleValidator.current.message('Password', userContext.registerInfo.password,
                        `regex:${'1', '2', '3'}`)} */}



                    {allowValidator.current.message('Password', userContext.registerInfo.password,
                        ['required',
                            'min:8',
                            { regex: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', `!`, `"`, '#', '$', '%', '&', `'`, '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '}', '|', '~'] }
                        ])}


                    {/* {simpleValidator.current.message('Password', userContext.registerInfo.password,
                        ['required', 
                        'min:8',
                        {in: ['1', '2','3','4','5','6','7','8','9','0',`!`,`"`,'#','$','%','&',`'`,'(',')','*','+',',','-','.','/',':',';','<','=','>','?','@','[',']','^','_','`','{','}','|','~']}
                        ])
                        } */}

                    {/* {simpleValidator.current.message('Password', userContext.registerInfo.password,
                        ['required', 
                        'min:8',
                        {in: ['1', '2','3']}
                        ])
                        } */}

                </div>

                <label>Confirm Password</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.password_confirm}
                    name="password_confirm"
                    onChange={updateFormField2}
                />

                {/* {simpleValidator.current.message('confirmPassword', userContext.registerInfo.password_confirm,
                    `regex:apple`)} */}
                {/* <div className='register-error-message-style'>
                    {simpleValidator.current.message('confirmPassword', userContext.registerInfo.password_confirm,
                        `regex:${userContext.registerInfo.password}`)}
                </div> */}
                <div className='register-error-message-style'>
                    {allowValidator.current.message('confirmPassword', userContext.registerInfo.password_confirm,
                        ['required',
                        
                        { regex: `${userContext.registerInfo.password}`}
                    ])}
                </div>

                


                <label>Contact Number</label>

                <input type="text"
                    className='form-control mb-3 mt-1'
                    value={userContext.registerInfo.contact_number}
                    name="contact_number"
                    onChange={updateFormField2}
                />
                <div className='register-error-message-style'>
                    {allowValidator.current.message('Contact Number', userContext.registerInfo.contact_number,
                        'required|numeric|min:8')}
                </div>

                {showLoginButton ?

                    <Button variant="success"
                        onClick={navigateToLogin}
                    >
                        Go to 'Login' page</Button>
                    :
                    <Button variant="primary"
                        onClick={createUser}
                    >
                        Create Account</Button>
                }








            </div>




        </React.Fragment >
    )
}