import React from 'react';

const CustomTextArea = (props) => {
    return (
        <textarea className="custom-textarea" placeholder={props.placeholder} onChange={data => props.onChange(data.target.value)}/>
    );
};

export default CustomTextArea;