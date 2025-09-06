import React, {useRef} from 'react';

const calcOffset = (types, type) => {
    for (const key of types)
    {
        const index = types.indexOf(key)
        if(key.name === type) return index
    }
    return 0
}

const WorkTypes = ({
    select,
    data = []
}) => {
    const panel = useRef(null)
    const buttonSize = 100 / data.length
    const selectButtonOffset = calcOffset(data, select)
    return (
        <div className="content gray-banner mt50px">
            <div className="frame work-types-panel" ref={panel}>
                {data.map(key => {
                    return <Block key={key.type_id} isActive={key.type_id === select} src={"/works/" + key.name} title={key.title.toUpperCase()}/>
                })}
                <div className="cursor" style={{display: selectButtonOffset >= 0 ? "block" : "none", left: `calc(${(buttonSize / 2) + (buttonSize * selectButtonOffset)}% - 10px)`}}/>
            </div>
        </div>
    )
}

const Block = ({
    src,
    isActive,
    title
}) => {
    return (
        <a href={src} className="work-types-block" style={{color: isActive ? "#AD0000" : "#FFFFFF"}}>
            {title}
        </a>
    )
}

export default WorkTypes;