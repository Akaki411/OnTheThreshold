import React, {useContext, useEffect, useRef, useState} from 'react';
import BlockTitle from "../../components/blockTitle";
import {Context} from "../../index";
import {HowMuchPassed} from "../../utils/dateTime";
import {ReactSVG} from "react-svg";
import ClockSVG from "../../resources/vector_icons/clock.svg"
import {giveAllArticles} from "../../http/contentAPI";
import {observer} from "mobx-react-lite";

const NewsTape = observer((props) => {
    const {news} = useContext(Context)
    const [newsData, setNews] = useState(news.news)
    const tape = useRef(null)
    let isLoading = false
    let firstLoad = false
    const handleScroll = () => {
        const pos = tape.current.getBoundingClientRect()
        const posY = (pos.height + pos.top - window.innerHeight) / pos.height
        const itsAll = news.count <= news.loaded
        if(posY < -0.2 && !isLoading && !itsAll && firstLoad)
        {
            loadNews()
        }
    }
    const loadNews = () => {
        props.setloader(true)
        isLoading = true
        giveAllArticles({type: "news", limit: 8, offset: news.news.length}).then(data => {
            news.setNews(news.news.concat(data.content))
            news.setCount(data.info.all)
            news.setLoaded(news.news.length)
            setNews(news.news)
            props.setloader(false)
            isLoading = false
        })
    }
    useEffect(() => {
        giveAllArticles({type: "news", limit: 8}).then(data => {
            news.setNews(news.news.concat(data.content))
            news.setCount(data.info.all)
            news.setLoaded(news.loaded + data.info.count)
            setNews(news.news)
            firstLoad = true
        })
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    return (
        <div>
            <BlockTitle title="Новости"/>
            <div className="content" ref={tape}>
                {newsData.map(key => {
                    return <Block key={key.id} data={key}/>
                })}
                {props.children}
            </div>
        </div>
    )
})

const Block = (props) => {

    return (
        <div className="news-tape-block">
            <a href={`/article/${props.data.id}`}>
                <div className="news-tape-block_image" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + "/" + props.data.img})`}}/>
            </a>
            <div className="news-tape-block_content-place">
                <div className="news-tape-block_content frame">
                    <div className="works-scrollbar-block_title"><h1>{props.data.title}</h1></div>
                    <div className="news-tape-block_content-date">
                        <ReactSVG className="svg12icons" src={ClockSVG}/>
                        <p>{HowMuchPassed(props.data.date)}</p>
                    </div>
                    <div className="news-tape-block_content-description">{props.data.content}</div>
                    <div className="works-scrollbar-block_button"><a href={`/article/${props.data.id}`}>Подробнее >>></a></div>
                </div>
            </div>
        </div>
    )
}
export default NewsTape;