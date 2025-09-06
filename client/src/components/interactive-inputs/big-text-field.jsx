import React from 'react';


const BigTextField = ({
    onInput = () => {},
    onChange = () => {},
    deathTime = 1500,
    width,
    height,
    style = {},
    name = "Имя"
}) => {
    const [isActive, setActive] = React.useState(false)
    const [inputValue, setInputValue] = React.useState("")
    const input = React.useRef(null)

    React.useEffect(() => {
        onChange(inputValue)
        const timer = setTimeout(() => {onInput(inputValue)}, deathTime)
        return () => {clearTimeout(timer)}
    }, [inputValue])

    return (
        <label style={{width: width, height: height, display: "block", marginTop: "14px", position: "relative"}}>
            <span className={isActive ? "ui-input_name ui-input_name_active" : "ui-input_name"}>{name}{isActive ? "" : "..."}</span>
            <textarea
                style={{padding: "10px 10px", ...style}}
                className="ui-input"
                ref={input}
                onFocus={() => {setActive(true)}}
                onBlur={() => {setActive(event.target.value !== "")}}
                onInput={(key) => {setInputValue(key.target.value)}}/>
        </label>
    )
}

export default BigTextField;