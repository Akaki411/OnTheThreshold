import React, {useContext, useEffect} from 'react';
import {CheckNickname, CheckRegToken, Register} from "../../http/userAPI.jsx"
import {Context} from "../../main.jsx";
import {useNavigate} from "react-router-dom";
import {AUTH_ROUTE, HOME_ROUTE} from "../../utils/consts";
import TextField from "../../components/interactive-inputs/text-field.jsx";
import SexSelect from "../../components/interactive-inputs/sex-select.jsx";
import RedButton from "../../components/interactive-inputs/red-button.jsx";
import LoadingStatus from "../../components/interactive-inputs/loading-status.jsx";
import {observer} from "mobx-react-lite";
import AnimatedSwipe from "../../components/functional/animated-swipe.jsx";


const Registration = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const params = new URLSearchParams(window.location.search)

    const [activeIndex, setActiveIndex] = React.useState(0)
    const [userId, setUserId] = React.useState(null)
    const [email, setEmail] = React.useState("")
    const [nickname, setNickname] = React.useState("")
    const [sex, setSex] = React.useState("male")
    const [password, setPassword] = React.useState("")

    useEffect(() => {
        const token = params.get("token")
        if(!token)
        {
            navigate(AUTH_ROUTE)
        }
        CheckRegToken({token}).then((data) => {
            if(!data.valid)
            {
                navigate(AUTH_ROUTE)
                return
            }
            setUserId(data.userId)
            setEmail(data.email)
        }).catch(() => {
            navigate(AUTH_ROUTE)
        })
    }, [])

    useEffect(() => {
        if(email === "" || password.length < 6) return
        console.log({userId, email, nickname, sex, password})
        Register({userId, email, nickname, sex, password}).then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === "ADMIN")
            navigate(HOME_ROUTE)
        }).catch(error => {
            console.log(error)
            alert(error.response.data.message)
        })
    }, [password])

    return (
        <div className="centric-wrapper">
            <div className="auth-panel">
                <div className="auth-panel-image" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/reg-bg.webp)`}}/>
                <div className="auth-panel-background">
                    <p style={{position: "absolute", top: 10, left: 40, color: "#AAAFB2"}}>Регистрация</p>
                    <AnimatedSwipe activeID={activeIndex} className="auth-panel-content">
                        <Name action={({nickname, sex}) => {
                            setNickname(nickname)
                            setSex(sex)
                            setActiveIndex(1)
                        }}/>
                        <Password action={({pwd}) => {setPassword(pwd)}}/>
                    </AnimatedSwipe>
                </div>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    )
})

const Name = ({action = () => {}}) => {
    const [nickname, setNickname] = React.useState("")
    const [status, setStatus] = React.useState('idle')
    const [sex, setSex] = React.useState(true)
    const [ready, setReady] = React.useState(false)


    React.useEffect(() =>
    {
        if(nickname !== "")
        {
            setStatus("loading")
            CheckNickname({nickname}).then((data) => {
                setStatus(data.find ? "error" : "success")
                setReady(!data.find)
            })
        }
    }, [nickname])

    return (
        <div className="auth-panel-content">
            <div className="auth-panel-content_row">
                <TextField name="Никнейм" width="100%" onInput={setNickname} onChange={(key) => {
                    setReady(false)
                    setStatus(key === "" ? "idle" : "loading")
                }}/>
                <SexSelect onClick={(data) => {setSex(data ? "male" : "female")}} name="Пол"/>
            </div>
            <div className="auth-panel-content_row">
                <LoadingStatus
                    status={status}
                    loadingText="Проверка..."
                    successText="Никнейм свободен"
                    errorText="Никнейм занят"
                />
                <RedButton text="Далее" height="40px" active={ready} onClick={() => {action({nickname, sex})}}/>
            </div>
        </div>
    )
}

const Password = ({action = () => {}}) => {
    const [status, setStatus] = React.useState('idle')
    const [ready, setReady] = React.useState(false)
    const [password, setPassword] = React.useState("")
    const [retype, setRetype] = React.useState("")

    useEffect(() => {
        setReady(password === retype && password.length > 6)
    }, [password, retype])

    return (
        <div className="auth-panel-content">
            <div className="auth-panel-content_row">
                <TextField type="password" name="Пароль" width="100%" onChange={(key) => {setPassword(key)}}/>
            </div>
            <div className="auth-panel-content_row">
                <TextField type="password" name="Повторите пароль" width="100%" onChange={(key) => {setRetype(key)}}/>
            </div>
            <div className="auth-panel-content_row">
                <LoadingStatus
                    status={status}
                    loadingText="Регистрация..."
                    successText="Добро пожаловать"
                    errorText="Что-то не так, попробуйте еще раз"
                />
                <RedButton text="Регистрация" height="40px" active={ready} onClick={() => {action({pwd: password})}}/>
            </div>
        </div>
    )
}


export default Registration;