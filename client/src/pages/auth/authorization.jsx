import React, {useContext} from 'react';
import {Login} from "../../http/userAPI.jsx";
import {Context} from "../../main.jsx";
import {useNavigate, useSearchParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import {HOME_ROUTE} from "../../utils/consts";

const Authorization = observer((props) => {
    const [searchParams] = useSearchParams()
    const redirect = searchParams.get('redirect')
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const login = () => {
        if(email === "" || password === "") return
        Login({email, password}).then(data => {
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === "ADMIN")
            navigate(redirect ? redirect : HOME_ROUTE)
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    return (
        <div className="auth-panel-content">
            <div className="auth-panel-content_block">
                <input type="email" placeholder="Логин..." className="ui-input" onChange={key => {setEmail(key.target.value)}}/>
            </div>
            <div className="auth-panel-content_block">
                <input type="password" placeholder="Пароль..." className="ui-input" onChange={key => {setPassword(key.target.value)}}/>
            </div>
            <div className="auth-panel-content_block">
                <button className="ui-button" disabled={email.length === 0 || password.length === 0} onClick={login}>Войти</button>
            </div>
            <div className="auth-panel-content_block">
                <button className="ui-button" style={{backgroundColor: "#303030"}} onClick={() => {props.onChange("reg")}}>Регистрация</button>
            </div>
        </div>
    );
})

export default Authorization;