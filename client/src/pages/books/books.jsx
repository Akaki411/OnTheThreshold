import React from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import BooksList from "./booksList.jsx";

const Books = () => {
    return (
        <div className="wrapper">
            <div className="frame">
                <Header active="books"/>
            </div>
            <div className="content">
                <BooksList />
            </div>

            <div className="content">
                <Footer/>
            </div>
        </div>
    );
};

export default Books;