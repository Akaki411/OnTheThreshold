import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../components/header";
import HeaderContacts from "../../components/headerContacts";
import View from "../../components/view";
import NotFound from "../../components/notFound";
import Footer from "../../components/footer";
import WorksList from "./worksList";
import WorkTypes from "./workTypes";
import {Bars} from 'react-loader-spinner'

const Works = () =>
{
    const {state} = useParams()
    const [loader, setLoader] = useState(false)
    return (
        <div className="wrapper">
            <div className="head-banner" id="second-bg">
                <div className="frame">
                    <Header active={state}/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                <View value={state} default={<NotFound/>}>
                    <WorksList id="poetry" title="Поэзия" setloader={state => {setLoader(state)}}/>
                    <WorksList id="prose" title="Проза" setloader={state => {setLoader(state)}}/>
                    <WorksList id="translation" title="Переводы" setloader={state => {setLoader(state)}}/>
                    <WorksList id="essay" title="Эссе" setloader={state => {setLoader(state)}}/>
                </View>
                <Bars wrapperClass="mt50px" color="#AD0000" visible={loader}/>
                <WorkTypes select={state}/>
                <Footer/>
            </div>

        </div>
    )
}

export default Works;