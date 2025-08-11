import React, {useContext, useEffect, useState} from 'react';
import View from "../../components/view";
import Authorization from "./authorization.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../../main.jsx";
import {observer} from "mobx-react-lite";
import {HOME_ROUTE} from "../../utils/consts";

const Auth = observer(() => {
    const {user} = useContext(Context)
    const [state, setState] = useState("auth")
    const navigate = useNavigate()

    useEffect(() => {
        if(user.isAuth)
        {
            navigate(HOME_ROUTE)
        }
    })

    return (
        <div className="centric-wrapper">
            <div className="auth-panel" id="first-bg">
                <div className="auth-panel-background">
                    <View value={state}>
                        <Authorization onChange={setState} id="auth"/>
                    </View>
                </div>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    );
})

export default Auth;