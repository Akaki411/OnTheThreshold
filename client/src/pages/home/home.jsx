import React, {useContext, useEffect} from 'react';
import Header from "../../components/header"
import HeaderContacts from "../../components/header-contacts.jsx"
import WorksBlock from "./worksBlock.jsx";
import GrayBanner from "../../components/gray-banner.jsx";
import Footer from "../../components/footer";
import NewsList from "./newsList.jsx";
import {GiveAllArticles} from "../../http/contentAPI.jsx"
import {Context} from "../../main.jsx";
import NewsImages from "./NewsImages.jsx";
import {observer} from "mobx-react-lite";


const Home = observer(() => {
    const {works, news} = useContext(Context)

    useEffect(() => {
        document.title = "На пороге"
        GiveAllArticles({type: "news", limit: news.limit}).then(data => {
            news.setNews(data.content)
            news.setCount(data.info.count)
        })
        GiveAllArticles({limit: 9}).then(data => {
            works.setWorks(data.content)
            works.setCount(data.info.count)
        })
    }, [])
    return (
        <div className="wrapper">
            <div className="head-banner" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/first-bg-image.webp)`}}>
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