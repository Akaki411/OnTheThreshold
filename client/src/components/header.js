import React from 'react';

class Header extends React.Component
{
    state = {
        buttons: {
            main: {title: "ГЛАВНАЯ", src: ""},
            poetry: {title: "ПОЭЗИЯ", src: ""},
            prose: {title: "ПРОЗА", src: ""},
            translations: {title: "ПЕРЕВОДЫ", src: ""},
            essay: {title: "ЭССЕ", src: ""},
            news: {title: "НОВОСТИ", src: ""}
        }
    }

    render()
    {
        return (
            <div className="header">
                {Object.keys(this.state.buttons).map(key => {
                    return (<HeaderBlock params={this.state.buttons[key]} isActive={key === this.props.active} key={key}/>)
                })}
            </div>
        )
    }
}

const HeaderBlock = (props) => {
    return (
        <div className="header-block">
            <a href={props.params.src} className={props.isActive ? "header-block_active" : ""}>{props.params.title}</a>
        </div>
    )
}

export default Header;