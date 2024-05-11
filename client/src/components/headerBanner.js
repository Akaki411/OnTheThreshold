import React from 'react';

const HeaderBanner = (props) => {
    return (
        <div className="head-banner" id={props.img}>
            {props.children}
        </div>
    );
};

export default HeaderBanner;