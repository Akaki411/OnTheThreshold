import React from 'react';

const AnimateToggle = ({
    defaultValue = false,
    onChange = () => {},
    disabled = false
}) => {
    const [isOn, setIsOn] = React.useState(defaultValue);

    const handleToggle = () =>
    {
        if(disabled) return
        const newState = !isOn
        setIsOn(newState)
        onChange(newState)
    }

    return (
        <div className={`toggle-switch ${isOn ? 'active' : 'inactive'}`} onClick={handleToggle}>
            <div className={`toggle-circle ${isOn ? 'active' : 'inactive'}`} />
        </div>
    );
};

export default AnimateToggle;