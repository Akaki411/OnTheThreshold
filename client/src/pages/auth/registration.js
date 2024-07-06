import React, {useContext} from 'react';
import {Register} from "../../http/userAPI"
import {Context} from "../../index";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";

const Registration = (props) => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [email, setEmail] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [repeatPassword, setRepeatPassword] = React.useState("")

    const registration = () => {
        if(email === "" || password === "") return
        Register({email, password}).then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === "ADMIN")
            navigate(HOME_ROUTE)
        }).catch(error => {
            alert(error.response.data.message)
        })
    }

    return (
        <div className="auth-panel-content">
            <div className="auth-panel-content_block">
                <input type="email" placeholder="Введите email" className="ui-input" onChange={key => {setEmail(key.target.value)}}/>
            </div>
            <div className="auth-panel-content_block">
                <input type="password" placeholder="Введите пароль" className="ui-input" onChange={key => {setPassword(key.target.value)}}/>
            </div>
            <div className="auth-panel-content_block">
                <input type="password" style={{border: password === repeatPassword ? "none" : "1px solid #AD0000"}} placeholder="Повторите пароль" className="ui-input" onChange={key => {setRepeatPassword(key.target.value)}}/>
            </div>
            <div className="auth-panel-content_block">
                <button className="ui-button" disabled={email === "" || password === "" || password !== repeatPassword} onClick={registration}>Регистрация</button>
            </div>
            <div className="auth-panel-content_block">
                <button className="ui-button" style={{backgroundColor: "#303030"}} onClick={() => {props.onChange("auth")}}>Войти</button>
            </div>
        </div>
    );
};

export default Registration;