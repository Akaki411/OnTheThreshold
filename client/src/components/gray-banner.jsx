import React from 'react';

const GrayBanner = (props) => {
    return (
        <div className={`gray-banner${props.className ? ` ${props.className}` : ""}`}>
            {props.children}
        </div>
    );
};

export default GrayBanner;