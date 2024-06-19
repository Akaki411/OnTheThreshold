import React from 'react';

const Header = (props) =>
{
    const buttons = {
        main: {title: "ГЛАВНАЯ", src: "/"},
        poetry: {title: "ПОЭЗИЯ", src: "/works/poetry"},
        prose: {title: "ПРОЗА", src: "/works/prose"},
        translation: {title: "ПЕРЕВОДЫ", src: "/works/translation"},
        essay: {title: "ЭССЕ", src: "/works/essay"},
        news: {title: "НОВОСТИ", src: "/news"}
    }
    return (
        <div className="header">
            {Object.keys(buttons).map(key => {
                return (<HeaderBlock params={buttons[key]} isActive={key === props.active} key={key}/>)
            })}
        </div>
    )
}

const HeaderBlock = (props) => {
    return (
        <div className="header-block">
            <a href={props.params.src} className={props.isActive ? "header-block_active" : ""}>{props.params.title}</a>
        </div>
    )
}

export default Header;