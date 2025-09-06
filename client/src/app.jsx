import {BrowserRouter} from "react-router-dom"
import AppRouter from "./components/functional/app-router.jsx"
import "./app.css"
import {observer} from "mobx-react-lite";
import {useContext, useEffect, useState} from "react";
import {Context} from "./main.jsx";
import {Check} from "./http/userAPI.jsx";
import Preloader from "./pages/preloader/preloader.jsx";
import {routes} from "./routes.jsx";

const App = observer(() =>  {
    const {user} = useContext(Context)
    const [loader, setLoader] = useState(true)
    useEffect(() => {
        Check().then(data => {
            user.setUser(data)
            user.setIsAuth(true)
            user.setIsAdmin(data.role === "ADMIN")
        }).catch(() => {
            user.setUser({})
            user.setIsAuth(false)
            user.setIsAdmin(false)
        }).finally(() => {
            setLoader(false)
        })
    }, [])

    if(loader)
    {
        return <Preloader/>
    }

    return (
        <BrowserRouter>
            <AppRouter/>
        </BrowserRouter>
    )
})

export default App;