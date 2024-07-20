import React, {createRef, useState} from 'react'
import "./rendererStyles.css"
import {ReactSVG} from "react-svg"
import WarningSVG from "../../resources/vector_icons/warning.svg"
import LinkSVG from "../../resources/vector_icons/link.svg"
import QuoteSVG from "../../resources/vector_icons/quote.svg"
import CustomCheckBox from "../customCheckBox";
import MusicPlayer from "./musicPlayer";

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
    const [audioSrc, setAudioSrc] = useState("")
    const [current, setCurrent] = useState("")
    let player = createRef()

    return (
        <div className="renderer">
            <MusicPlayer
                ref={player}
                src={audioSrc}
            />
            {props.data.map(key => {
                return ParseElement(key, {
                    setSrc: setAudioSrc,
                    current: current
                })
            })}
        </div>
    )
}

const ParseElement = (data, callbacks) => {
    switch (data.type)
    {
        case "header":
            return <HeaderRenderer key={data.id} data={data.data}/>
        case "paragraph":
            return <ParagraphRenderer key={data.id} data={data.data}/>
        case "table":
            return <TableRenderer key={data.id} data={data.data}/>
        case "list":
            return <ListRenderer key={data.id} data={data.data}/>
        case "warning":
            return <WarningRenderer key={data.id} data={data.data}/>
        case "code":
            return <CodeRenderer key={data.id} data={data.data}/>
        case "linkTool":
            return <LinkRenderer key={data.id} data={data.data}/>
        case "image":
            return <ImageRenderer key={data.id} data={data.data}/>
        case "raw":
            return <RawRenderer key={data.id} data={data.data}/>
        case "quote":
            return <QuoteRenderer key={data.id} data={data.data}/>
        case "checklist":
            return <CheckListRenderer key={data.id} data={data.data}/>
        case "delimiter":
            return <DelimiterRenderer key={data.id}/>
        case "audio":
            return <AudioRenderer key={data.id} id={data.id} data={data.data} callbacks={callbacks}/>
        default:
            return <br key={data.id}/>
    }
}

const AudioRenderer = ({id, data, callbacks}) => {
    const [play, setPlay] = useState(false)
    const Play = () => {
        setPlay(!play)
        if(callbacks.current !== id)
        {
            callbacks.setSrc(data.url)
        }
    }
    return (
        <div className="audio-renderer">
            <div className="audio-renderer_button" onClick={Play}>
                {play ? <div className="pause"/> : <div className="play"/>}
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