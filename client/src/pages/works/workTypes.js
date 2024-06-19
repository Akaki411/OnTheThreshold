import React, {useRef} from 'react';

const WorkTypes = (props) => {
    const panel = useRef(null)
    const buttons = {
        poetry: {title: "ПОЭЗИЯ", src: "/works/poetry"},
        prose: {title: "ПРОЗА", src: "/works/prose"},
        translation: {title: "ПЕРЕВОДЫ", src: "/works/translation"},
        essay: {title: "ЭССЕ", src: "/works/essay"}
    }
    const buttonSize = 100 / Object.keys(buttons).length
    const selectButtonOffset = Object.keys(buttons).indexOf(props.select)
    return (
        <div className="content gray-banner mt50px">
            <div className="frame work-types-panel" ref={panel}>
                {Object.keys(buttons).map(key => {
                    return <Block data={buttons[key]} key={key} isActive={key === props.select}/>
                })}
                <div className="work-types-cursor" style={{display: selectButtonOffset >= 0 ? "block" : "none", left: `calc(${(buttonSize / 2) + (buttonSize * selectButtonOffset)}% - 10px)`}}/>
            </div>
        </div>
    )
}

const Block = (props) => {
    return (
        <a href={props.data.src} className="work-types-block" style={{color: props.isActive ? "#AD0000" : "#FFFFFF"}}>
            {props.data.title}
        </a>
    )
}

export default WorkTypes;