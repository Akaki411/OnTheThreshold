import React from 'react';

const CustomDateTime = (props) => {
    const getDate = (date) => {
        const now = new Date(date)
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    }
    return (
        <input style={{height: 38, display: props.disable ? "none" : "block"}} value={props.value ? getDate(props.value) : ""}
               min={props.min ? props.min : ""} max={props.max ? props.max : ""} type="datetime-local"
               className="admin-new-article_select" onChange={key => props.onChange(new Date(key.target.value))}/>
    );
};

export default CustomDateTime;