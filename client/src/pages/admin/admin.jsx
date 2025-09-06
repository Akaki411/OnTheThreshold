import React, {useContext, useEffect, useState} from 'react';
import AdminMenu from "./main/adminMenu.jsx";
import View from "../../components/functional/view.jsx";
import NewArticle from "./articles/newArticle.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../../main.jsx"
import {HOME_ROUTE, AUTH_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";
import BooksControl from "./books/booksControl.jsx";


const Admin = observer(() =>
{
    const {user} = useContext(Context)
    const [activePanel, setActivePanel] = useState("add_article")
    const navigate = useNavigate()
    useEffect(() => {
        document.title = "На пороге | ADMIN"
        if(!user.isAuth)
        {
            navigate(AUTH_ROUTE + "?redirect=/admin")
            return
        }
        if(!user.isAdmin) navigate(HOME_ROUTE)
    })
    return (
        <div className="wrapper limited-frame">
            <AdminMenu onSelect={setActivePanel}/>
            <div className="content admin-content-place">
                <View value={activePanel}>
                    <NewArticle id="add_article"/>
                    <BooksControl id="books"/>
                    <div id="articles">Articles</div>
                    <div id="settings">Settings</div>
                </View>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    )
})

export default Admin;