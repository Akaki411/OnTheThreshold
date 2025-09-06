import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import Header from "../../components/header";
import HeaderContacts from "../../components/header-contacts.jsx";
import View from "../../components/functional/view.jsx";
import NotFound from "../../components/not-found.jsx";
import Footer from "../../components/footer";
import WorksList from "./worksList.jsx";
import WorkTypes from "./workTypes.jsx";
import {PropagateLoader} from 'react-spinners'
import {observer} from "mobx-react-lite";
import {GetTypeByName} from "../../http/contentAPI.jsx";

const Works = observer(() =>
{
    const {state} = useParams()
    const [loader, setLoader] = useState(false)
    const [type, setType] = useState(null)
    const [types, setTypes] = useState([])

    useEffect(() => {
        if(!state)
        {
            setType(null)
            return
        }
        GetTypeByName(state).then(data => {
            setType(Object.keys(data).length === 0 ? null : data)
        })
    }, [])

    return (
        <div className="wrapper">
            <div className="head-banner" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL}/images/second-bg-image.webp)`}}>
                <div className="frame">
                    <Header active={state} onLoad={setTypes}/>
                    <HeaderContacts/>
                </div>
            </div>
            <div className="content">
                {!!type ? <WorksList id={type.type_id} title={type.title} setLoader={state => {setLoader(state)}}/> : <NotFound/>}
                <PropagateLoader cssOverride={{marginTop: "50px"}} color="#AD0000" loading={loader}/>
                <WorkTypes select={state} data={types}/>
                <Footer/>
            </div>

        </div>
    )
})

export default Works;