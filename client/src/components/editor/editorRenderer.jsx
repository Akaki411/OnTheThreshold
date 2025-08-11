import React, {createRef, useState} from 'react'
import "./rendererStyles.css"
import {ReactSVG} from "react-svg"
import WarningSVG from "../../resources/vector_icons/warning.svg"
import LinkSVG from "../../resources/vector_icons/link.svg"
import QuoteSVG from "../../resources/vector_icons/quote.svg"
import SoundSVG from "../../resources/vector_icons/sound.svg"
import PlaySVG from "../../resources/vector_icons/play.svg"
import PauseSVG from "../../resources/vector_icons/pause.svg"
import CustomCheckBox from "../custom-check-box.jsx";
import MusicPlayer from "./musicPlayer.jsx";
import ReadProgress from "../read-progress.jsx";

const GenerateString = (length) => {
    const lib = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890"
    let result = ""
    for(let i = 0; i < length; i++)
    {
        result += lib[Math.floor(lib.length * Math.random())]
    }
    return result
}

const EditorRenderer = (props) => {
    const [play, setPlay] = useState(false)
    const [current, setCurrent] = useState("")
    const ref = createRef()

    const Load = (id, url) => {
        if(current !== id)
        {
            ref.current.src = process.env.REACT_APP_API_URL + "/" + url
            setCurrent(id)
        }
        setPlay(ref.current.paused)
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
        <div className="renderer">
            <ReadProgress/>
            {props.data.map(key => {return key.type}).includes("audio") && <MusicPlayer
                ref={ref}
                onPlay={setPlay}
            />}
            {props.data.map(key => {
                return <ParseElement key={key.id} data={key} callback={Load} current={current} isPlaying={play}/>
            })}
        </div>
    )
}

const ParseElement = ({data, callback, current, isPlaying}) => {
    switch (data.type)
    {
        case "header":
            return <HeaderRenderer data={data.data}/>
        case "paragraph":
            return <ParagraphRenderer data={data.data}/>
        case "table":
            return <TableRenderer data={data.data}/>
        case "list":
            return <ListRenderer data={data.data}/>
        case "warning":
            return <WarningRenderer data={data.data}/>
        case "code":
            return <CodeRenderer data={data.data}/>
        case "linkTool":
            return <LinkRenderer data={data.data}/>
        case "image":
            return <ImageRenderer data={data.data}/>
        case "raw":
            return <RawRenderer data={data.data}/>
        case "quote":
            return <QuoteRenderer data={data.data}/>
        case "checklist":
            return <CheckListRenderer data={data.data}/>
        case "delimiter":
            return <DelimiterRenderer/>
        case "audio":
            return <AudioRenderer id={data.id} data={data.data} callback={callback} isActive={(current === data.id) && isPlaying}/>
        default:
            return <br key={data.id}/>
    }
}

const AudioRenderer = ({id, data, callback, isActive}) => {
    return (
        <div className="audio-renderer">
            <ReactSVG src={SoundSVG} className="svg32icons"/>
            <div className="audio-renderer_audio-place">
                <div>
                    <div style={{textAlign: "right"}}>{data.title}</div>
                    <div className="audio-renderer_audio_caption">{data.caption}</div>
                </div>
                <div className="audio-renderer_button" onClick={() => {callback(id, data.src)}}>
                    {isActive ? <ReactSVG src={PauseSVG} className="svg32icons"/> : <ReactSVG src={PlaySVG} className="svg32icons"/>}
                </div>
            </div>

        </div>
    )
}

const DelimiterRenderer = () => {
    return <div className="renderer-delimiter">***</div>
}

const CheckListRenderer = ({data}) => {
    data.items = data.items.map(key => {
        return {
            text: key.text,
            checked: key.checked,
            id: GenerateString(5)
        }
    })
    return (
        <div className="checklist-renderer">
            {data.items.map(key => {
                return (
                    <div key={key.id} className="checklist-renderer_point">
                        <CustomCheckBox isActive={key.checked} disable={true}/>
                        {key.text}
                    </div>
                )
            })}
        </div>
    )
}

const QuoteRenderer = ({data}) => {
    return (
        <div className="quote-renderer">
            <ReactSVG src={QuoteSVG} className="svg32icons quote-renderer_quote" style={{opacity: 0.4}}/>
            <div className="quote-renderer_text">{data.text}</div>
            <div className="quote-renderer_caption">{data.caption}</div>
        </div>
    )
}

const RawRenderer = ({data}) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: data.html }}/>
    )
}

const ImageRenderer = ({data}) => {
    return (
        <div style={{margin: "30px 0"}}>
            <img src={data.file.url} alt="" style={{width: "100%"}}/>
            <div className="renderer-image_caption">{data.caption}</div>
        </div>
    )
}
const LinkRenderer = ({data}) => {
    const getDomain = (url) => {
        url = url.replace(/^https?:\/\/?/, '')
        url = url.split('/')[0]
        return url
    }
    const delSSL = (url) => {
        return url.replace("https", "http")
    }
    return (
        <a className="renderer-link" href={data.link}>
            <div style={{display: "flex", flexDirection: "column"}}>
                <div className="renderer-link_title">{data.meta.title} <ReactSVG src={LinkSVG}/></div>
                <div className="renderer-link_description" dangerouslySetInnerHTML={{ __html: data.meta.description }}/>
                <div className="renderer-link_domain">{getDomain(data.link)}</div>
            </div>
            <div className="renderer-link_image"><img style={{width: "30px"}} src={delSSL(data.meta.image.url)} alt="link"/></div>
        </a>
    )
}

const CodeRenderer = ({data}) => {
    return (
        <div className="renderer-code">
            {data.code}
        </div>
    )
}

const WarningRenderer = ({data}) => {
    return (
        <div className="renderer-warning">
            <div className="renderer-warning_logo"><ReactSVG src={WarningSVG} className="svg24icons"/></div>
            <div className="renderer-warning_title">{data.title}</div>
            <div className="renderer-warning_message">{data.message}</div>
        </div>
    )
}

const ListRenderer = ({data}) => {
    return (
        <ul style={{listStyleType: data.style === "ordered" ? "decimal" : "disc"}}>
            {data.items.map(key => {
                return <li key={key}>{key}</li>
            })}
        </ul>
    )
}

const TableRenderer = ({data}) => {
    let withHeader = data.withHeadings
    data.content = data.content.map(row => {
        return {
            rows: row.map(cell => {
                return {
                    cell: cell,
                    id: GenerateString(5)
                }
            }),
            id: GenerateString(5)
        }
    })
    return (
        <div className="editor-table">
            {data.content.map(row => {
                return <div key={row.id} className="editor-table_row" style={{backgroundColor: withHeader ? "#303030" : "transparent"}}>{row.rows.map(cell => {
                    withHeader = false
                    return <div key={cell.id} className="editor-table_cell">{cell.cell}</div>
                })}</div>
            })}
        </div>
    )
}

const ParagraphRenderer = ({data}) => {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>
}

const HeaderRenderer = ({data}) => {
    switch (data.level)
    {
        case 1:
            return <h1>{data.text}</h1>
        case 2:
            return <h2>{data.text}</h2>
        case 3:
            return <h3>{data.text}</h3>
        case 4:
            return <h4>{data.text}</h4>
        case 5:
            return <h5>{data.text}</h5>
        case 6:
            return <h6>{data.text}</h6>
        default:
            return <h1>{data.text}</h1>
    }
}

export default EditorRenderer;