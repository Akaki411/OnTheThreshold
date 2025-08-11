import React, {useContext} from 'react';
import {Context} from "../../main.jsx";

const NewsList = () => {
    const {news} = useContext(Context)
    return (
        <div className="news-list">
            <div className="news-list_header">
                <h1>Недавние новости</h1>
            </div>
            <div className="news-list-content">
                {news.news.map(key => {
                    return <NewsBlock data={key} key={key.id}/>
                })}
            </div>
        </div>
    )
}

const NewsBlock = (props) => {
    const months = {
        1: "января",
        2: "февраля",
        3: "марта",
        4: "апреля",
        5: "мая",
        6: "июня",
        7: "июля",
        8: "августа",
        9: "сентября",
        10: "октября",
        11: "ноября",
        12: "декабря",
    }
    const getDate = (date) => {
        date = new Date(date)
        return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    }
    return (
        <a href={`/article/${props.data.id}`} className="news-list-content_block">
            <div className="news-list-content_block_title">{props.data.title}</div>
            <div className="news-list-content_block_content">{props.data.content}</div>
            <div className="news-list-content_block_date">{getDate(props.data.date)}</div>
        </a>
    )
}

export default NewsList;