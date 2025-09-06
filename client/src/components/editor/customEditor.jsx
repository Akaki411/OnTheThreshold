import React, {useEffect} from "react";
import {createReactEditorJS} from 'react-editor-js'
import {EDITOR_JS_TOOLS} from "./editorConstants.jsx";
import "./editorStyles.css"
import {ParseDocument} from "../../http/contentAPI.jsx";

const CustomEditor = ({onChange, file}) =>
{
    const editor = React.useRef(null)
    const [content, setContent] = React.useState({time: new Date().getTime(), blocks: []})
    const [render, setRender] = React.useState(true)
    const ReactEditorJS = createReactEditorJS()

    useEffect(() => {
        if(!file) return
        setRender(false)
        ParseDocument(file).then(data => {
            setContent(data)
            onChange(data)
            setRender(true)
        })
    }, [file])

    const handleInitialize = React.useCallback((instance) => {
        editor.current = instance
    }, [])

    const handleSave = async () => {
        const savedData = await editor.current.save();
        onChange(savedData)
    }
    return (
        <div className="admin-new-article-editor">
            {render && <ReactEditorJS onInitialize={handleInitialize} instanceRef={(instance) => (editor.current = instance)} tools={EDITOR_JS_TOOLS}
                            onChange={handleSave} data={content}/>}
        </div>
    )
}

export default CustomEditor