import React, {useContext, useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom"
import {Context} from "../../main.jsx"
import {observer} from "mobx-react-lite"
import {HOME_ROUTE} from "../../utils/consts"
import TextField from "../../components/interactive-inputs/text-field.jsx";
import LoadingStatus from "../../components/interactive-inputs/loading-status.jsx";
import RedButton from "../../components/interactive-inputs/red-button.jsx";
import AnimatedSwipe from "../../components/functional/animated-swipe.jsx";
import {CheckEmail, Login} from "../../http/userAPI.jsx";

const Auth = observer(() =>
{
    const {user} = useContext(Context)
    const navigate = useNavigate()
    const [activeIndex, setActiveIndex] = useState(0)
    const [mail, setEmail] = useState("")

    useEffect(() => {
        if(user.isAuth)
        {
            navigate(HOME_ROUTE)
        }
    }, [])

    return (
        <div className="centric-wrapper">
            <div className="auth-panel">
                <div className="auth-panel-image" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/reg-bg.webp)`}}/>
                <div className="auth-panel-background">
                    <p style={{position: "absolute", top: 10, left: 40, color: "#AAAFB2"}}>Вход / Регистрация</p>
                    <AnimatedSwipe activeID={activeIndex} className="auth-panel-content">
                        <Email action={({find, email}) => {
                            setEmail(email)
                            if(find)
                            {
                                setActiveIndex(1)
                            }
                        }}/>
                        <Password email={mail}/>
                    </AnimatedSwipe>
                </div>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    )
})

const Email = ({action = () => {}}) =>
{
    const [ready, setReady] = useState(false)
    const [status, setStatus] = useState("idle")
    const [email, setEmail] = useState("")
    const [buttonVisible, setButtonVisible] = useState(true)

    const checkEmail = () =>
    {
        if(email === "") return
        setStatus("loading")
        CheckEmail({email}).then((data) => {
            setStatus(data.find ? "idle" : "success")
            action({
                find: data,
                email: email
            })
            setButtonVisible(false)
        }).catch(() => {
            setStatus("error")
        })
    }

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    return (
        <div className="auth-panel-content" style={{width: "100%"}}>
            <div className="auth-panel-content_row">
                <TextField type="email" name="Email" width="100%" onChange={(key) =>
                {
                    setReady(isValidEmail(key))
                    if(isValidEmail(key))
                    {
                        setEmail(key)
                    }
                }}/>
            </div>
            <div className="auth-panel-content_row">
                <LoadingStatus
                    status={status}
                    loadingText="Проверка..."
                    successText="Ссылка выслана на почтовый ящик"
                    errorText="Что-то не так, попробуйте еще раз"
                />
                {buttonVisible && <RedButton text="Далее" height="40px" active={ready} onClick={checkEmail}/>}
            </div>
        </div>
    )
}

const Password = observer(({email}) =>
{
    const navigate = useNavigate()
    const {user} = useContext(Context)
    const [ready, setReady] = useState(false)
    const [password, setPassword] = useState("")
    const [status, setStatus] = useState("idle")

    const login = () =>
    {
        console.log(password)
        if(email === "" || password.length < 6) return
        console.log(12)

        setStatus("loading")
        Login({email, password}).then(data => {
            console.log(data)
            user.setUser(user)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === "ADMIN")
            navigate(HOME_ROUTE)
        }).catch((e) => {
            console.log(e)
            setStatus("error")
        })
    }

    return (
        <div className="auth-panel-content" style={{width: "100%"}}>
            <div className="auth-panel-content_row">
                <TextField type="password" name="Пароль" width="100%" onChange={(key) =>
                {
                    setReady(key !== "")
                    setPassword(key)
                }}/>
            </div>
            <div className="auth-panel-content_row">
                <LoadingStatus
                    status={status}
                    loadingText="Проверка..."
                    successText="Добро пожаловать"
                />
                <RedButton text="Войти" height="40px" active={ready} onClick={login}/>
            </div>
        </div>
    )
})


export default Auth