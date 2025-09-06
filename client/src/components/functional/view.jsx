import React from 'react';

const View = (props) => {
    for(let component of props.children)
    {
        if(component.props.id)
        {
            if(component.props.id?.toString() === props.value)
            {
                return component
            }
        }
    }
    return props.default || (<div>Не найдено</div>)
};


export default View;