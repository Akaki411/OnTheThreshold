import React, {useState} from 'react';
import {ReactSVG} from "react-svg";
import PlaySVG from "../../resources/vector_icons/play.svg"

const MusicPlayer = React.forwardRef((props, ref) => {
    const [play, setPlay] = useState(false)
    const Play = () => {
        setPlay(!play)
        if(ref.current.paused)
        {
            ref.current.play()
        }
        else
        {
            ref.current.pause()
        }


    }
    return (
        <div className="music-player">
            <audio src={process.env.REACT_APP_API_URL + "/" + props.src} ref={ref}/>
            <div onClick={Play} className="music-player_play">
                {play ? <div className="pause"/> : <ReactSVG src={PlaySVG}/>}
            </div>
            <div className="music-player_thumb">

            </div>
        </div>
    );
})

export default MusicPlayer;