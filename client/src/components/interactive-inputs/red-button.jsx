import React from 'react';

const RedButton = (props) => {
    return (
        <button
            className="ui-button"
            style={{
                width: props.width,
                height: props.height
            }}
            disabled={!props.active}
            onClick={() => {if(props.onClick) props.onClick()}
        }>{props.text}</button>
    )
}

export default RedButton;