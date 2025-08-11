import React, {createRef, useEffect, useState} from 'react';
import {ReactSVG} from "react-svg";
import PlaySVG from "../../resources/vector_icons/play.svg"
import PauseSVG from "../../resources/vector_icons/pause.svg"
import ReplaySVG from "../../resources/vector_icons/replay.svg"
import SoundSVG from "../../resources/vector_icons/sound.svg"

const MusicPlayer = React.forwardRef((props, ref) => {
    const [play, setPlay] = useState(false)
    const [cantPlay, setCantPlay] = useState(true)
    const [position, setPosition] = useState(0)
    const [loop, setLoop] = useState(true)
    const [volume, setVolume] = useState(1)
    const [visible, setVisible] = useState(false)
    useEffect(() => {
        ref.current.addEventListener('timeupdate', (key) => {
            if(!key.srcElement.paused)
            {
                setPosition(key.srcElement.currentTime / key.srcElement.duration)
                if(props.onUpdate) props.onUpdate(position)
            }
        })
        ref.current.addEventListener('canplay', (key) => {
            setCantPlay(key.target.readyState === 0)
        })
        ref.current.addEventListener('play', (key) => {
            setPlay(key.target.paused)
        })
        ref.current.addEventListener('pause', (key) => {
            setPlay(key.target.paused)
        })
    }, [])
    const Play = async () => {
        if(cantPlay) return
        if(ref.current.paused)
        {
            await ref.current.play()
        }
        else
        {
            await ref.current.pause()
        }
        setPlay(ref.current.paused)
        props.onPlay(!ref.current.paused)
    }
    const SetPosition = (value) => {
        if(ref.current.readyState === 0) return
        setPosition(value)
        ref.current.currentTime = ref.current.duration * value
    }
    const SetVolume = (value) => {
        setVolume(value)
        ref.current.volume = value
    }
    return (
        <div className="music-player_position">
            <audio src={process.env.REACT_APP_API_URL + "/" + props.src} ref={ref} loop={loop}/>
            <div className="music-player frame" style={{transform: `translateY(${visible ? "0" : "50px"})`}}>
                <div onClick={Play} className="music-player-cell glow_on_hover">
                    {play ? <ReactSVG src={PlaySVG}/> : <ReactSVG src={PauseSVG}/>}
                </div>
                <div className="music-player_thumb">
                    <Thumb value={position} setValue={SetPosition} cantPlay={cantPlay}/>
                </div>
                <VolumeThumb setValue={SetVolume} value={volume}/>
                <div onClick={() => {setLoop(!loop)}} className="music-player-cell glow_on_hover">
                    <ReactSVG src={ReplaySVG} style={{fill: loop ? "#AD0000" : "#AAAFB2"}}/>
                </div>
                <div className="music-player_hide" onClick={() => {setVisible(!visible)}}>
                    <div className="arrow" style={{marginLeft: visible ? 5 : -8, transform: `scale(0.4) rotateZ(${visible ? "90deg" : "-90deg"})`}}/>
                </div>
            </div>
        </div>
    );
})

const Thumb = ({value, setValue, cantPlay}) => {
    const ref = createRef()
    const [width, setWidth] = useState(0)
    const [moving, setMoving] = useState(false)
    const [offset, setOffset] = useState(0)
    const [size, setSize] = useState(0)
    useEffect(() => {
        const move = (event) => {
            if(!moving || cantPlay) return
            setWidth(Math.max(0, Math.min(event.clientX - offset, size)))
        }

        window.addEventListener("mousemove", move)

        return () => {
            window.removeEventListener("mousemove", move)
        }
    }, [moving, cantPlay])

    useEffect(() => {
        const up = () => {
            if(!moving || cantPlay) return
            setValue(width / size)
            setMoving(false)
        }

        window.addEventListener("mouseup", up)

        return () => {
            window.removeEventListener("mouseup", up)
        }
    }, [moving, cantPlay])
    const push = (event) => {
        if(cantPlay) return
        setSize(ref.current.offsetWidth)
        setOffset(ref.current.getBoundingClientRect().left)
        setMoving(true)
        setWidth(event.clientX - ref.current.getBoundingClientRect().left)
    }
    return (
        <div className="music-player_thumb_place glow_on_hover" ref={ref} onMouseDown={push}>
            <div className="music-player_thumb_range" style={{width: moving ? width : `${value * 100}%`}}/>
        </div>
    )
}

const VolumeThumb = ({value, setValue}) => {
    const ref = createRef()
    const [moving, setMoving] = useState(false)
    const [height, setHeight] = useState(0)
    const [offset, setOffset] = useState(0)
    useEffect(() => {
        const up = (event) => {
            if(!moving) return
            setMoving(false)
            setHeight(Math.max(0, Math.min(70 - event.clientY + offset, 70)))
            setValue(height / 70)
        }
        window.addEventListener("mouseup", up)
        return () => {
            window.removeEventListener("mouseup", up)
        }
    }, [moving, height])
    const push = (event) => {
        setOffset(ref.current.getBoundingClientRect().top)
        setMoving(true)
        setHeight(Math.max(0, Math.min(70 - event.clientY + offset, 70)))
        setValue(height / 70)
    }
    const move = (event) => {
        if(!moving) return
        setHeight(Math.max(0, Math.min(70 - event.clientY + offset, 70)))
        setValue(height / 70)
    }

    return (
        <div className="music-player-cell" id="volume-lvl">
            <ReactSVG src={SoundSVG} className="glow_on_hover"/>
            <div className="music-player_volume">
                <div className="music-player_volume_thumb" ref={ref} onMouseDown={push} onMouseMove={move}>
                    <div className="music-player_volume_thumb_cursor" style={{height: moving ? height : (value * 70)}}/>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer;