import React from 'react';

const GrayBanner = (props) => {
    return (
        <div className="gray-banner">
            {props.children}
        </div>
    );
};

export default GrayBanner;