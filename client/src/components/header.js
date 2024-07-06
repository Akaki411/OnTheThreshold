import React from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Header = observer((props) =>
{
    const {user} = React.useContext(Context)
    const buttons = {
        main: {title: "ГЛАВНАЯ", src: "/", access: "OPEN"},
        poetry: {title: "ПОЭЗИЯ", src: "/works/poetry", access: "OPEN"},
        prose: {title: "ПРОЗА", src: "/works/prose", access: "OPEN"},
        translation: {title: "ПЕРЕВОДЫ", src: "/works/translation", access: "OPEN"},
        essay: {title: "ЭССЕ", src: "/works/essay", access: "OPEN"},
        news: {title: "НОВОСТИ", src: "/news", access: "OPEN"},
        admin: {title: "АДМИНКА", src: "/admin", access: "ADMIN"},
        logout: {title: "ВЫЙТИ", src: "/logout", access: "AUTH"}
    }
    return (
        <div className="header">
            {Object.keys(buttons).filter(key => {
                return buttons[key].access === "OPEN" || (user.isAuth && buttons[key].access === "AUTH") || (user.isAdmin && buttons[key].access === "ADMIN")
            }).map(key => {
                return (<HeaderBlock params={buttons[key]} isActive={key === props.active} key={key}/>)
            })}
        </div>
    )
})

const HeaderBlock = (props) => {
    return (
        <div className="header-block">
            <a href={props.params.src} className={props.isActive ? "header-block_active" : ""}>{props.params.title}</a>
        </div>
    )
}

export default Header;