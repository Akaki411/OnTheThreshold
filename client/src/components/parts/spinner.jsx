import React from 'react'

const Spinner = (props) => {
    return (
        !props.disabled && <div className="spinner" style={
            {
                width: props.width ? props.width : null,
                backgroundColor: props.color ? props.color : null
            }
        }/>
    )
}

export default Spinner