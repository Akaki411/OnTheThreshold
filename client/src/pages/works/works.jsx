import React, {useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../components/header";
import HeaderContacts from "../../components/header-contacts.jsx";
import View from "../../components/view";
import NotFound from "../../components/not-found.jsx";
import Footer from "../../components/footer";
import WorksList from "./worksList.jsx";
import WorkTypes from "./workTypes.jsx";
import {PropagateLoader} from 'react-spinners'
import {observer} from "mobx-react-lite";

const Works = observer(() =>
{
    const {state} = useParams()
    const [loader, setLoader] = useState(false)
    return (
        <div className="wrapper">
            <div className="head-banner" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/second-bg-image.webp)`}}>
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
                <PropagateLoader cssOverride={{marginTop: "50px"}} color="#AD0000" loading={loader}/>
                <WorkTypes select={state}/>
                <Footer/>
            </div>

        </div>
    )
})

export default Works;