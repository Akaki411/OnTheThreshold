import React from 'react';
import Header from "../../components/header"
import HeaderBanner from "../../components/headerBanner"
import HeaderContacts from "../../components/headerContacts";

const Home = () => {
    return (
        <div>
            <HeaderBanner img="first-bg">
                <Header active="main"/>
                <HeaderContacts/>
            </HeaderBanner>
        </div>
    );
};

export default Home;