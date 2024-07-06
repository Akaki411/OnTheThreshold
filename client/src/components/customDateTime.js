import React from 'react';

const CustomDateTime = (props) => {
    return (
        <input style={{height: 38, display: props.disable ? "none" : "block"}} type="datetime-local" className="admin-new-article_select" onChange={key => props.onChange(new Date(key.target.value))}/>
    );
};

export default CustomDateTime;