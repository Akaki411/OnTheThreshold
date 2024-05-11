import React from 'react';
import ZenLogo from "../resources/vector_icons/zen.svg"

const HeaderContacts = () => {
    return (
        <div className="header-contacts">
            <div/>
            <div className="header-contacts-block">
                <h1 className="header-contacts-title">Мечислав Зарянский</h1>
                <div>
                    <div>
                        <img src={ZenLogo} alt="Zen"/>
                    </div>
                    <div>

                    </div>
                    <div>

                    </div>
                </div>
                <a href="#">
                    <div className="header-contacts-button">ЗАКАЗАТЬ КНИГУ</div>
                </a>
            </div>
        </div>
    );
};

export default HeaderContacts;