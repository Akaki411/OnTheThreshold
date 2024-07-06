import React, {useContext, useEffect} from 'react';
import {MutatingDots} from "react-loader-spinner";
import {useNavigate, useSearchParams} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Logout = observer(() => {
    const {user} = useContext(Context)
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')
    const navigate = useNavigate()

    useEffect(() => {
        localStorage.removeItem("token")
        user.setUser({})
        user.setIsAuth(false)
        user.setIsAdmin(false)
        navigate(redirect ? redirect : HOME_ROUTE)
    }, [])

    return (
        <div className="centric-wrapper">
            <MutatingDots
                height="100"
                width="100"
                radius="13"
                color="#AD0000"
                secondaryColor="#AD0000"
            />
            Пожалуйста подождите...
        </div>
    );
})

export default Logout;