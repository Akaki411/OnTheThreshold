import React from 'react'

const Cross = (props) => {
    return (
        <div className="cross" style={{backgroundColor: props.color ? props.color : null}}/>
    )
}

export default Cross