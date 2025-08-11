import React from 'react'

const TextField = (props) => {
    const [isActive, setActive] = React.useState(false)
    const input = React.useRef(null)

    return (
        <label style={{width: props.width ? props.width : 250, height: props.height ? props.height : 40, display: "block", marginTop: "14px", position: "relative"}}>
            <span className={isActive ? "ui-input_name ui-input_name_active" : "ui-input_name"}>{props.name}{isActive ? "" : "..."}</span>
            <input type={props.type ? props.type : "text"} className="ui-input" ref={input} onFocus={() => {setActive(true)}} onBlur={() => {setActive(event.target.value !== "")}} onInput={(key) => {if(props.onInput) props.onInput(key)}}/>
        </label>
    )
}

export default TextField