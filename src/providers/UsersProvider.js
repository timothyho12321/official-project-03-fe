import React, { useState, useEffect, useRef } from 'react'

import axios from 'axios'
import UserContext from '../contexts/UserContext'

export default function UsersProvider(props) {

    const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us81.gitpod.io/api/accounts/"
    // const BASE_API_URL = "https://3000-timothyho12-officialpro-nd3lexqwq5u.ws-us80.gitpod.io/api/accounts/"

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




    const [tokens, saveTokens] = useState(null)

    const userContext = {
        loginInfo,
        setLoginInfo,
        registerInfo,
        setRegisterInfo,

        login: async (loginInfo) => {

            let response = null;

            try {

                response = await axios.post(BASE_API_URL + "login",
                    loginInfo)

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

                alert("You are logged in. Good to see you!")



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
            const testTimeHome = 1000 * 3
            // const fiveHourToMilli = 60 * 60 * 1000 * 5
            console.log("fiveHourToMilli", threeHourToMilli)

            let endTimeToRefresh = startCountTime + threeHourToMilli

            const refreshTokenGetNew = async () => {
                const getCurrentTime = Date.now()

                const hasTimeReached = getCurrentTime >= endTimeToRefresh;
                if (hasTimeReached) {
                    alert("Your refresh token is expired. Please login again.")

                    clearInterval(timerIntervalForRefresh);

                } else {

                    // call refresh token route
                    // refresh token must still exist in local storage


                    await userContext.refreshToken();

                }

               

            }

            const threeHourToMilli = 60 * 60 * 1000 * 3
            const timerIntervalForRefresh = setInterval(refreshTokenGetNew, threeHourToMilli)


            if(localStorage.getItem("refreshToken")){
                return null
            }
    
            timerIntervalForRefresh()

            return true
        },

        refreshToken: async () => {

            try {

                const haveToken = JSON.parse(localStorage.getItem("currentUserTokens"))
                console.log("have Token", haveToken);


                const response = await axios.post(BASE_API_URL + "refresh",
                    { refreshToken: haveToken.refreshToken }, {
                    headers: {
                        Authorization: `Bearer ${haveToken.accessToken}`
                    }
                });

                console.log("called refreshToken on backend", response.data)
                return true

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

            alert("You have completed signing up for the account. Please login.")



        }


    }


    return (
        <UserContext.Provider value={userContext}>

            {props.children}
        </UserContext.Provider>

    )
}
