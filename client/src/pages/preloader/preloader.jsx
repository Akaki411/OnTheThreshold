import React from 'react';
import {ScaleLoader} from "react-spinners";

const Preloader = () => {
    return (
        <div className="centric-wrapper">
            <ScaleLoader color="#AD0000" loading={true}/>
        </div>
    );
};

export default Preloader;