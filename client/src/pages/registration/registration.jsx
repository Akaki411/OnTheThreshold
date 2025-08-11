import React, {useContext} from 'react';
import {Register} from "../../http/userAPI.jsx"
import {Context} from "../../main.jsx";
import {useNavigate} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/consts";
import TextField from "../../components/interactive-inputs/text-field.jsx";
import SexSelect from "../../components/interactive-inputs/sex-select.jsx";

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
        <div className="centric-wrapper">
            <div className="auth-panel">
                <div className="auth-panel-image" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/reg-bg.webp)`}}/>
                <div className="auth-panel-background">
                    <p style={{position: "absolute", top: 10, left: 40, color: "#AAAFB2"}}>Регистрация</p>
                    <Name/>
                </div>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    )
}

const Name = (props) => {
    const [nickname, setNickname] = React.useState("")
    const [sex, setSex] = React.useState(true)
    const [ready, setReady] = React.useState(true)


    React.useEffect(() => {
        setReady(nickname !== "")
    }, [nickname, sex])

    return (
        <div className="auth-panel-content">
            <div className="auth-panel-content_row">
                <TextField name="Никнейм" width="100%" onInput={setNickname}/>
                <SexSelect onClick={setSex} name="Пол"/>
            </div>

        </div>
    )
}

export default Registration;