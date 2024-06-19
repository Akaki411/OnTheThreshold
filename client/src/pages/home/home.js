import React, {useContext, useEffect} from 'react';
import Header from "../../components/header"
import HeaderContacts from "../../components/headerContacts"
import WorksBlock from "./worksBlock";
import GrayBanner from "../../components/grayBanner";
import Footer from "../../components/footer";
import NewsList from "./newsList";
import {giveAllArticles} from "../../http/contentAPI"
import {Context} from "../../index";
import NewsImages from "./NewsImages";
import {observer} from "mobx-react-lite";


const Home = observer(() => {
    const {works, news} = useContext(Context)

    useEffect(() => {
        giveAllArticles({type: "news", limit: news.limit}).then(data => {
            news.setNews(data.content)
            news.setCount(data.info.count)
        })
        giveAllArticles({limit: 9}).then(data => {
            works.setWorks(data.content)
            works.setCount(data.info.count)
        })
    }, [])
    return (
        <div className="wrapper">
            <div className="head-banner" id="first-bg">
                <div className="frame">
                    <Header active="main"/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <div className="news frame">
                    <NewsImages/>
                    <NewsList/>
                </div>
            </div>
            <GrayBanner className="mt50px">
                <div className="content frame">
                    <WorksBlock content={works.works}/>
                </div>
            </GrayBanner>
            <div className="content">
                <Footer/>
            </div>
        </div>
    );
})

export default Home;