import React from 'react';
import {ReactSVG} from "react-svg";
import ZenLogo from "../resources/vector_icons/zen.svg";
import TgLogo from "../resources/vector_icons/tg.svg";
import VkLogo from "../resources/vector_icons/vk.svg";

const Footer = () => {
    const date = new Date()
    const copy = (text) => {
        navigator.clipboard.writeText(text).then(() => {})
    }
    return (
        <div className="frame mt50px">
            <div className="footer-links_contacts footer-email glow_on_hover"><p onClick={() => {copy("Korn.2002.04@yandex.ru")}}>Korn.2002.04@yandex.ru</p></div>
            <div className="short-line"/>
            <div className="footer-links">
                <div className="footer-links_place">
                    <div className="header-contacts-links" style={{justifyContent: "center"}}>
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
                </div>
                <div className="footer-links_place glow_on_hover" style={{minWidth: "350px"}} onClick={() => {copy("akovalysko123@gmail.com")}}><p></p>made by akovalysko123@gmail.com</div>
                <div className="footer-links_place" style={{opacity: 0.75}}><p>{`${date.getFullYear()} © Все права защищены`}</p></div>
            </div>
        </div>
    );
};

export default Footer;