import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/header";
import HeaderContacts from "../../components/header-contacts.jsx";
import Footer from "../../components/footer";
import WorksBlock from "../home/works-block.jsx";
import GrayBanner from "../../components/gray-banner.jsx";
import {Context} from "../../main.jsx";
import {GetAllArticles} from "../../http/contentAPI.jsx";
import BlockTitle from "../../components/block-title.jsx";
import {observer} from "mobx-react-lite";
import NewsTape from "./newsTape.jsx";
import WorksList from "../works/worksList.jsx";
import {PropagateLoader} from "react-spinners";

const News = observer(() => {
    const {works} = useContext(Context)
    const [loader, setLoader] = useState(false)
    const [types, setTypes] = useState([])
    useEffect(() => {
        document.title = "На пороге | Новости"
        GetAllArticles({limit: 12}).then(data => {
            works.setWorks(data.content)
            works.setCount(data.info.count)
        })
    }, [])
    const type = types[Math.floor(Math.random() * types.length)]
    return (
        <div className="wrapper">
            <div className="head-banner" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/second-bg-image.webp)`}}>
                <div className="frame">
                    <Header active="news" onLoad={setTypes}/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <div className="frame news news-block">
                    <NewsTape setloader={state => {setLoader(state)}}>
                        <PropagateLoader cssOverride={{marginTop: "50px"}} color="#AD0000" loading={loader}/>
                    </NewsTape>
                    <WorksList
                        id={type?.type_id}
                        title={`Что стоит почитать?`}
                        className="news-works-block"
                        static={true}
                        loadLimit={12}
                        renderLimit={4}
                    />
                </div>
            </div>
            <div className="content">
                <GrayBanner className="mt50px">
                    <div className="content frame">
                        <BlockTitle title="Возможно вы пропустили"/>
                        <WorksBlock content={works.works}/>
                    </div>
                </GrayBanner>
                <Footer/>
            </div>
        </div>
    );
})

export default News;