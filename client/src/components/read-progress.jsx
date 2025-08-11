import React, {useEffect, useState} from 'react';

const ReadProgress = () => {
    const [position, setPosition] = useState(0)
    useEffect(() => {
        window.addEventListener("scroll", () => {
            setPosition(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight))
        })
    }, [])
    return (
        <div className="read-progress">
            <div className="read-progress_thumb" style={{width: window.innerWidth * position}}/>
        </div>
    );
};

export default ReadProgress;