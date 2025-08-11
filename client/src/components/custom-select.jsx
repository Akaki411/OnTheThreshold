import React from 'react';

const CustomSelect = (props) => {
    return (
        <select defaultValue="news" className="admin-new-article_select" onChange={key => {props.onChange(key.target.value)}}>
            {Object.keys(props.elements).map(key => {
                return <option key={key} value={key}>{props.elements[key]}</option>
            })}
        </select>
    )
}

export default CustomSelect;