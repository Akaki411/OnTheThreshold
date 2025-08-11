import React, {useEffect, useState} from 'react';
import {GetBooks} from "../../http/contentAPI.jsx";
import {observer} from "mobx-react-lite";
import "./books.css"

const BooksList = observer(() => {
    const [books, setBooks] = useState([])

    useEffect(() => {
        GetBooks().then(data => {
            setBooks(data)
        })
    }, [])
    return (
        <div className="frame">
            {books.map(key => {
                return <BookBlock data={key} key={key.id}/>
            })}
        </div>
    )
})

const BookBlock = (props) => {
    // console.log(props.data)
    return (
        <div className="book-container">
            <div className="book-container_image">image</div>
            <div className="book-container_title">title</div>
            <div className="book-container_info">info</div>
            <div className="book-container_description">description</div>
            <div className="book-container_price">price</div>
            <div className="book-container_addons">addons</div>
            <div className="book-container_button">button</div>

        </div>
    )
}

export default BooksList;