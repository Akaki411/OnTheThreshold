import React from 'react';

const NotFound = () => {
    return (
        <div className="not-found-block">
            <div className="not-found-block_left">Такой страницы <span style={{color: "#AD0000"}}>не существует</span></div>
            <div className="not-found-block_right">404</div>
        </div>
    );
};

export default NotFound;