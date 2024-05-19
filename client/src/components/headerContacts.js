import React from 'react';
import {ReactSVG} from 'react-svg'
import ZenLogo from "../resources/vector_icons/zen.svg"
import TgLogo from "../resources/vector_icons/tg.svg"
import VkLogo from "../resources/vector_icons/vk.svg"

const HeaderContacts = () => {
    return (
        <div className="header-contacts">

            <div className="header-contacts-block">
                <h1 className="header-contacts-title">Мечислав Зарянский</h1>
                <div className="header-contacts-links">
                    <a href="https://dzen.ru/worked_time">
                        <ReactSVG className="svg32icons glow_on_hover" src={ZenLogo}/>
                    </a>
                    <a href="https://t.me/worked_time">
                        <ReactSVG className="svg32icons glow_on_hover" src={TgLogo}/>
                    </a>
                    <a href="https://vk.com/worked_time">
                        <ReactSVG className="svg32icons glow_on_hover" src={VkLogo}/>
                    </a>
                </div>
                <a href="/">
                    <div className="header-contacts-button">ЗАКАЗАТЬ КНИГУ</div>
                </a>
            </div>
        </div>
    );
};

export default HeaderContacts;