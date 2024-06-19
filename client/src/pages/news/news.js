import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/header";
import HeaderContacts from "../../components/headerContacts";
import Footer from "../../components/footer";
import WorksBlock from "../home/worksBlock";
import GrayBanner from "../../components/grayBanner";
import {Context} from "../../index";
import {giveAllArticles} from "../../http/contentAPI";
import BlockTitle from "../../components/blockTitle";
import {observer} from "mobx-react-lite";
import NewsTape from "./newsTape";
import WorksList from "../works/worksList";
import {Bars} from "react-loader-spinner";

const News = observer(() => {
    const {works} = useContext(Context)
    const [loader, setLoader] = useState(false)
    useEffect(() => {
        giveAllArticles({limit: 12}).then(data => {
            works.setWorks(data.content)
            works.setCount(data.info.count)
        })
    }, [])
    const workTypes = ["poetry", "prose", "translation", "essay"]
    const type = workTypes[Math.floor(Math.random() * workTypes.length)]
    return (
        <div className="wrapper">
            <div className="head-banner" id="second-bg">
                <div className="frame">
                    <Header active="news"/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <div className="frame news">
                    <NewsTape setloader={state => {setLoader(state)}}>
                        <Bars wrapperClass="mt50px" color="#AD0000" visible={loader}/>
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