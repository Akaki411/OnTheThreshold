import React, {useContext, useEffect, useState} from 'react';
import AdminMenu from "./adminMenu";
import View from "../../components/view";
import NewArticle from "./newArticle";
import {useNavigate} from "react-router-dom";
import {Context} from "../../index"
import {HOME_ROUTE, AUTH_ROUTE} from "../../utils/consts";
import {observer} from "mobx-react-lite";


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
            <AdminMenu onSelect={(id) => {setActivePanel(id)}}/>
            <div className="content admin-content-place">
                <View value={activePanel}>
                    <NewArticle id="add_article"/>
                    <div id="articles">Articles</div>
                    <div id="settings">Settings</div>
                </View>
            </div>
            <div className="back-button" onClick={() => navigate(HOME_ROUTE)}>Назад</div>
        </div>
    )
})

export default Admin;