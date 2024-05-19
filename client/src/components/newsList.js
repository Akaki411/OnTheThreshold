import React, {useEffect, useRef, useState} from 'react';

class NewsList extends React.Component
{
    render()
    {
        return (
            <div className="news-list">
                <div className="news-list_header">
                    <h1>Недавние новости</h1>
                </div>
                <div className="news-list-content">
                    {this.props.data.content.map(key => {
                        return <NewsBlock data={key} key={key.id}/>
                    })}
                    <div className="">
                        <div/>
                    </div>
                </div>
            </div>
        )
    }
}

const NewsBlock = (props) => {
    const [limit, setLimit] = useState(50)
    const block = useRef()
    useEffect(() => {
        let x = Math.floor(block.current.clientWidth / 50)
        setLimit(x * 7)
    }, [])
    window.addEventListener("resize", () => {
        let x = Math.floor(block.current.clientWidth / 50)
        setLimit(x * 7)
    })
    const wrapText = (text, offset) => {
        const words = text.split(" ")
        let result = words.slice(0, Math.min(offset, words.length)).join(" ")
        if (words.length > offset) result += "..."
        return result
    }
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
        <a href={`/news/${props.data.id}`}>
            <div className="news-list-content_block">
                <div className="news-list-content_block_title">{props.data.title}</div>
                <div className="news-list-content_block_content" ref={block}>{wrapText(props.data.content, limit)}</div>
                <div className="news-list-content_block_date">{getDate(props.data.date)}</div>
            </div>
        </a>
    )
}

export default NewsList;