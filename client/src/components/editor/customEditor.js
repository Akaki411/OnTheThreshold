import React from "react";
import ReactEditorJS from "react-editor-js";
import {EDITOR_JS_TOOLS} from "./editorConstants";
import "./editorStyles.css"

const CustomEditor = (props) =>
{
    const editor = React.useRef(null)
    const handleSave = async () => {
        const savedData = await editor.current.save();
        props.onChange(savedData)
    }
    return (
        <div className="admin-new-article-editor">
            <ReactEditorJS instanceRef={(instance) => (editor.current = instance)} tools={EDITOR_JS_TOOLS} onChange={handleSave}/>
        </div>
    )
}

export default CustomEditor