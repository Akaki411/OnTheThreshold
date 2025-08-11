import React from 'react';

const SexSelect = (props) => {
    const [active, isActive] = React.useState(true)
    return (
        <div style={{width: props.width ? props.width : 40, height: props.height ? props.height : 40}} className="sex-select" onClick={() => {
            isActive(!active)
            if(props.onClick) props.onClick(!active)
        }}>
            <p className="sex-select_name">{props.name}</p>
            <div className="sex-select_round"/>
            <div className={active ? "sex-select_body_man" : "sex-select_body_man sex-select_body_woman"}/>
        </div>
    )
}

export default SexSelect;