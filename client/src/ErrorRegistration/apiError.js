import React, {Component} from 'react';
import "./errors.css"

import CrossVector from "../resources/vector_icons/cross.svg"
import WarnVector from "../resources/vector_icons/warn.svg"
import CheckVector from "../resources/vector_icons/check.svg"
import {ReactSVG} from "react-svg";

const storage = require("../resources/storage.json")

class ApiError extends Component
{

    state = {
        errorOpen: false,
        errorText: "",
        warnOpen: false,
        warnText: "",
        doneOpen: false
    }

    PrintError(message)
    {
        this.setState({
            errorOpen: true,
            errorText: message
        })

        setTimeout(() => {
            this.setState({
                errorOpen: false,
                errorText: ""
            })
        }, storage.ERROR_POP_UP_TIME)
    }

    PrintWarn(message)
    {
        this.setState({
            warnOpen: true,
            warnText: message
        })

        setTimeout(() => {
            this.setState({
                warnOpen: false,
                warnText: ""
            })
        }, storage.WARNING_POP_UP_TIME)
    }

    PrintDone()
    {
        this.setState({
            doneOpen: true
        })

        setTimeout(() => {
            this.setState({
                doneOpen: false
            })
        }, storage.DONE_POP_UP_TIME)
    }

    render()
    {
        return (
            <div className='errorBannersPlace'>

                <div className={'apiBanner ' + (this.state.errorOpen ? 'BannerIsActive' : 'ErrorBannerDisable')} style={{backgroundColor: "#ED2945"}}>
                    <div className="apiBannerImage">
                        <ReactSVG src={CrossVector} className="evim"/>
                    </div>
                    <div className="apiBannerWhiteText" style={{color: "white"}}>Ошибка: <br/> {this.state.errorText}</div>
                </div>

                <div className={'apiBanner ' + (this.state.warnOpen ? 'BannerIsActive' : 'ErrorBannerDisable')} style={{backgroundColor: "#EABD1C"}}>
                    <div className="apiBannerImage">
                        <ReactSVG src={WarnVector} className="evim"/>
                    </div>
                    <div className="apiBannerWhiteText" style={{color: "black"}}>Внимание: <span> </span></div>
                </div>

                <div className={'apiBanner ' + (this.state.doneOpen ? 'BannerIsActive' : 'ErrorBannerDisable')} style={{backgroundColor: "#70C85E"}}>
                    <div className="apiBannerImage">
                        <ReactSVG src={CheckVector} className="evim"/>
                    </div>
                    <div className="apiBannerWhiteText" style={{color: "white"}}>Выполнено!</div>
                </div>
            </div>
        );
    }
}

export default ApiError;