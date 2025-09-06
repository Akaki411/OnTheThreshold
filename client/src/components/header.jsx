import React, {useEffect, useState} from 'react'
import {Context} from "../main.jsx"
import {observer} from "mobx-react-lite"
import {GetAllVisibleTypes} from "../http/contentAPI.jsx"

const Header = observer(({
     active,
     onLoad = () => {}
}) => {
    const {user} = React.useContext(Context)
    const [types, setTypes] = useState([])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        GetAllVisibleTypes().then((data) => {
            setTypes(data)
            onLoad(data)
        })
    }, [])

    const buttons = [{name: "main", title: "ГЛАВНАЯ", src: "/"}]

    for(let type of types)
    {
        buttons.push({name: type.name, title: type.title.toUpperCase(), src: "/works/" + type.name})
    }

    buttons.push({name: "news", title: "НОВОСТИ", src: "/news"})

    if(user.isAdmin) buttons.push({name: "admin", title: "АДМИНКА", src: "/admin"})
    if(user.isAuth) buttons.push({name: "logout", title: "ВЫЙТИ", src: "/logout"})

    const toggleMobileMenu = () =>
    {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const closeMobileMenu = () =>
    {
        setIsMobileMenuOpen(false)
    }

    return (
        <>
            <div className="header">
                <div className="header-desktop">
                    {buttons.map(key => {
                        return (<HeaderBlock title={key.title} src={key.src} isActive={key.name === active} key={key.name}/>)
                    })}
                </div>
                <div className="header-mobile">
                    <button
                        className={`hamburger ${isMobileMenuOpen ? 'hamburger-active' : ''}`}
                        onClick={toggleMobileMenu}
                        aria-label="Меню"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
            <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-open' : ''}`}>
                <div className="mobile-menu-overlay" onClick={closeMobileMenu}></div>
                <div className="mobile-menu-content">
                    <button className="mobile-menu-close" onClick={closeMobileMenu}>
                        ×
                    </button>
                    <nav className="mobile-menu-nav">
                        {buttons.map(key => {
                            return (
                                <a
                                    href={key.src}
                                    className={`mobile-menu-link ${key.name === active ? 'mobile-menu-link-active' : ''}`}
                                    key={key.name}
                                    onClick={closeMobileMenu}
                                >
                                    {key.title}
                                </a>
                            )
                        })}
                    </nav>
                </div>
            </div>
        </>
    )
})

const HeaderBlock = ({title, src, isActive}) => {
    return (
        <div className="header-block">
            <a href={src} className={isActive ? "header-block_active" : ""}>{title}</a>
        </div>
    )
}

export default Header;