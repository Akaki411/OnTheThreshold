import React from 'react';

const BlockTitle = (props) => {
    return (
        <div className="block-title">
            <h1>{props.title}</h1>
            <div className="line"/>
        </div>
    );
};

export default BlockTitle;