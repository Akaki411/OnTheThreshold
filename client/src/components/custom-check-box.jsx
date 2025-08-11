import React, {useState} from 'react';

const CustomCheckBox = (props) => {
    const [active, setActive] = useState(props.isActive)
    const onClick = () => {
        if (props.disable) return
        setActive(!active)
        props.onClick(!active)
    }
    return (
        <div className="custom-checkbox" style={{backgroundColor: active ? "#AD0000" : "#AAAFB2"}} onClick={() => onClick()}>
            <div className="custom-checkbox_arrow" style={{display: active ? "block" : "none"}}/>
        </div>
    );
};

export default CustomCheckBox;