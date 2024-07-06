import React from 'react';
import {Bars} from "react-loader-spinner";

const Preloader = () => {
    return (
        <div className="centric-wrapper">
            <Bars wrapperClass="mt50px" color="#AD0000" visible={true}/>
        </div>
    );
};

export default Preloader;