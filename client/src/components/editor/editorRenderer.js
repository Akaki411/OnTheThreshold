import React from 'react'
import "./rendererStyles.css"
import {ReactSVG} from "react-svg"
import WarningSVG from "../../resources/vector_icons/warning.svg"


const EditorRenderer = (props) => {
    console.log(props.data)

    return (
        <div className="renderer">
            {props.data.map(key => {
                return ParseElement(key)
            })}
        </div>
    )
}

const ParseElement = (data) => {
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
        default:
            return <br key={data.id}/>
    }
}

const LinkRenderer = ({data}) => {
    return (
        <a className="renderer-link" href={data.link}>

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
    return (
        <div className="editor-table">
            {data.content.map(row => {
                return <div className="editor-table_row" style={{backgroundColor: withHeader ? "#303030" : "transparent"}}>{row.map(cell => {
                    withHeader = false
                    return <div className="editor-table_cell">{cell}</div>
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