import React, {useContext, useEffect} from 'react';
import {BeatLoader} from "react-spinners";
import {useNavigate, useSearchParams} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import {Context} from "../../main.jsx";

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
            <BeatLoader
                size="13"
                color="#AD0000"
            />
            Пожалуйста подождите...
        </div>
    );
})

export default Logout;