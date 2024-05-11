import React from 'react';

class Header extends React.Component
{
    state = {
        buttons: {
            main: {title: "Главная", src: ""},
            main1: {title: "Главная", src: ""},
            main2: {title: "Главная", src: ""},
            main3: {title: "Главная", src: ""},
            main4: {title: "Главная", src: ""}
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
            <a href={props.params.src} style={{color: (props.isActive ? "#AD0000" : "#FFFFFF")}}>{props.params.title}</a>
        </div>
    )
}

export default Header;