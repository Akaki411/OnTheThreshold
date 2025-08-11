import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/header";
import HeaderContacts from "../../components/header-contacts.jsx";
import Footer from "../../components/footer";
import WorksBlock from "../home/worksBlock.jsx";
import GrayBanner from "../../components/gray-banner.jsx";
import {Context} from "../../main.jsx";
import {GiveAllArticles} from "../../http/contentAPI.jsx";
import BlockTitle from "../../components/block-title.jsx";
import {observer} from "mobx-react-lite";
import NewsTape from "./newsTape.jsx";
import WorksList from "../works/worksList.jsx";
import {PropagateLoader} from "react-spinners";

const News = observer(() => {
    const {works} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        document.title = "На пороге | Новости"
        GiveAllArticles({limit: 12}).then(data => {
            works.setWorks(data.content)
            works.setCount(data.info.count)
        })
    }, [])
    const workTypes = ["poetry", "prose", "translation", "essay"]
    const type = workTypes[Math.floor(Math.random() * workTypes.length)]
    return (
        <div className="wrapper">
            <div className="head-banner" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/second-bg-image.webp)`}}>
                <div className="frame">
                    <Header active="news"/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <div className="frame news">
                    <NewsTape setloader={state => {setLoader(state)}}>
                        <PropagateLoader cssOverride={{marginTop: "50px"}} color="#AD0000" loading={loader}/>
                    </NewsTape>
                    <WorksList
                        id={type}
                        title={`Что стоит почитать?`}
                        style={{maxWidth: 300}}
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