import React, {useEffect} from "react";
import * as ReactEditorJS from "react-editor-js";
import {EDITOR_JS_TOOLS} from "./editorConstants.jsx";
import "./editorStyles.css"
import {ParseDocument} from "../../http/contentAPI.jsx";

const CustomEditor = (props) =>
{
    const editor = React.useRef(null)
    const [content, setContent] = React.useState({time: new Date().getTime(), blocks: []})
    const [render, setRender] = React.useState(true)

    useEffect(() => {
        if(!props.file) return
        setRender(false)
        ParseDocument(props.file).then(data => {
            setContent(data)
            props.onChange(data)
            setRender(true)
        })
    }, [props.file])


    const handleSave = async () => {
        const savedData = await editor.current.save();
        props.onChange(savedData)
    }
    return (
        <div className="admin-new-article-editor">
            {render && <ReactEditorJS instanceRef={(instance) => (editor.current = instance)} tools={EDITOR_JS_TOOLS}
                            onChange={handleSave} data={content}/>}
        </div>
    )
}

export default CustomEditor