import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import UserContext from '../contexts/UserContext'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function UsersProvider(props) {

    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/accounts/"
    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us82.gitpod.io/api/accounts/"
    const BASE_API_URL = "https://tgc-20-project-03-timothy-ho.onrender.com/api/accounts/"

    const [loginInfo, setLoginInfo] = useState({
        "email": "",
        "password": ""
    })

    const [registerInfo, setRegisterInfo] = useState({
        "first_name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "password_confirm": "",
        "contact_number": ""

    })

    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [interval, setStateInterval] = useState(false)

    const [tokens, saveTokens] = useState(null)


    const successLoginMsg = () => toast.success('Login success. Welcome!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    const successLogoutMsg = () => toast.success('Logged out. See you again!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
    });

    useEffect(() => {
        console.log("useEffect happen")
        // if (!interval) {

        //  console.log("no interval in state")

        //     // when user is logged in. check local storage
        //     // setStateInterval(true);

        //     // make API Call

        // }

        const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
        if (haveToken) {

            console.log("no interval in state")

            // setStateInterval(true);

            // make API Call to resend new accesstoken 

            const startCountTime = Date.now()
            const testTimeFive = 12 * 60 * 60 * 1000 * 5

            // const fiveHourToMilli = 60 * 60 * 1000 * 5
            // console.log("fiveHourToMilli", fiveHourToMilli)

            // let endTimeToRefresh = startCountTime + fiveHourToMilli
            let endTimeToRefresh = startCountTime + testTimeFive

            const refreshTokenGetNew = async () => {
                const getCurrentTime = Date.now()

                const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
                console.log("refresh interval route", haveToken);

                const hasTimeReached = getCurrentTime >= endTimeToRefresh;
                if (hasTimeReached | !haveToken) {
                    alert("Your refresh token is expired. Please login again.")

                    clearInterval(timerIntervalForRefresh);

                } else {

                    // call refresh token route
                    // refresh token must still exist in local storage


                    let returnNewAccessToken = await userContext.refreshToken();

                    console.log("refresh ran with return", returnNewAccessToken)
                    console.log("no dot data", JSON.stringify(returnNewAccessToken))
                    console.log("no stringify", returnNewAccessToken)

                    localStorage.removeItem('currentUserTokens');

                    localStorage.setItem('currentUserTokens', JSON.stringify(returnNewAccessToken))


                }



            }

            const threeHourToMilli = 60 * 60 * 1000 * 3
            const threeSecondToMilli = 1000 * 5
            const timerIntervalForRefresh = setInterval(refreshTokenGetNew, threeHourToMilli)

            // const timerIntervalForRefresh = setInterval(refreshTokenGetNew, threeSecondToMilli)

            setStateInterval(true);

            // if (!localStorage.getItem("refreshToken")) {
            if (!localStorage.getItem("currentUserTokens")) {

                console.log("entered check localStorage route")
                return null
            }

        }



    }, []
    )

    const userContext = {
        loginInfo,
        setLoginInfo,
        registerInfo,
        setRegisterInfo,
        // userLoggedIn,
        // setUserLoggedIn,


        login: async (loginInfo) => {

            let response = null;

            try {

                response = await axios.post(BASE_API_URL + "login",
                    loginInfo)


                // set state of logged in user provider layer to update offcanvas cart
                // setUserLoggedIn(!userLoggedIn)
                // console.log("checkState UserloggedIn", userLoggedIn)

            }
            catch (e) {
                console.log(e)
            }

            if (response.data) {

                // console.log("this is success response", response.data)

                const accountData = await axios.get(BASE_API_URL + "profile", {
                    headers: {
                        Authorization: `Bearer ${response.data.accessToken}`
                    }
                })

                console.log("account data", accountData.data);

                saveTokens(response.data);


                localStorage.setItem('currentUserTokens', JSON.stringify(response.data))
                localStorage.setItem('accountData', JSON.stringify(accountData.data))

                setLoginInfo({
                    'email': '',
                    'password': ''
                })

                // alert("You are logged in. Good to see you!")
                successLoginMsg();


                // toast.success('Welcome back!', {
                //     position: "top-right",
                //     autoClose: 5000,
                //     hideProgressBar: false,
                //     closeOnClick: true,
                //     pauseOnHover: true,
                //     draggable: true,
                //     progress: undefined,
                // });
            }

            const startCountTime = Date.now()
            const testTimeFive = 12 * 60 * 60 * 1000 * 5

            // const fiveHourToMilli = 60 * 60 * 1000 * 5
            // console.log("fiveHourToMilli", fiveHourToMilli)

            // let endTimeToRefresh = startCountTime + fiveHourToMilli
            let endTimeToRefresh = startCountTime + testTimeFive

            const refreshTokenGetNew = async () => {
                const getCurrentTime = Date.now()

                const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
                console.log("refresh interval route", haveToken);

                const hasTimeReached = getCurrentTime >= endTimeToRefresh;
                if (hasTimeReached | !haveToken) {
                    alert("Your refresh token is expired. Please login again.")

                    clearInterval(timerIntervalForRefresh);

                } else {

                    // call refresh token route
                    // refresh token must still exist in local storage


                    let returnNewAccessToken = await userContext.refreshToken();

                    console.log("refresh ran with return", returnNewAccessToken)
                    console.log("no dot data", JSON.stringify(returnNewAccessToken))
                    console.log("no stringify", returnNewAccessToken)

                    localStorage.removeItem('currentUserTokens');

                    localStorage.setItem('currentUserTokens', JSON.stringify(returnNewAccessToken))


                }



            }

            const threeHourToMilli = 60 * 60 * 1000 * 3
            const threeSecondToMilli = 1000 * 5
            const timerIntervalForRefresh = setInterval(refreshTokenGetNew, threeHourToMilli)

            // const timerIntervalForRefresh = setInterval(refreshTokenGetNew, threeSecondToMilli)

            setStateInterval(true);

            // if (!localStorage.getItem("refreshToken")) {
            if (!localStorage.getItem("currentUserTokens")) {

                console.log("entered check localStorage route")
                return null
            }

            // timerIntervalForRefresh()
            return response
        },

        refreshToken: async () => {

            try {

                const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
                // console.log("have Token", haveToken);


                const response = await axios.post(BASE_API_URL + "refresh",
                    { refreshToken: haveToken.refreshToken }, {
                    headers: {
                        Authorization: `Bearer ${haveToken.accessToken}`
                    }
                });

                console.log("called refreshToken on backend", response.data)
                return response.data

            }

            catch (e) {
                console.log(e);

                return false;

            }

        },



        logout: async () => {
            const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
            console.log("have Token", haveToken);

            try {
                let logOutResponse = await axios.post(BASE_API_URL + "logout",
                    { refreshToken: haveToken.refreshToken })

                console.log("logOutResponse", logOutResponse)

                localStorage.removeItem("currentUserTokens");
                localStorage.removeItem("accountData");

                successLogoutMsg();

            } catch (e) {
                console.log(e)
            }



        },

        register: async () => {
            console.log("entered register route in UsersProvider layer");

            // console.log(registerInfo);

            const response = await axios.post(BASE_API_URL + "signup", registerInfo)
            console.log(response);

            setRegisterInfo({
                "first_name": "",
                "last_name": "",
                "email": "",
                "password": "",
                "password_confirm": "",
                "contact_number": ""
            })

            // alert("You have completed signing up for the account. Please login.")



        }


    }


    return (
        <UserContext.Provider value={userContext}>

            {props.children}
        </UserContext.Provider>

    )
}
