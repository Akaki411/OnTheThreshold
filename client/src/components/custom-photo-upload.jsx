import React, {useRef, useState} from 'react';
import {ReactSVG} from "react-svg";
import PlusSVG from "../resources/vector_icons/plus.svg"

const CustomPhotoUpload = (props) => {
    const [fileName, setFileName] = useState("Выберите файл...")
    const fileInput = useRef(null)
    const onChange = key => {
        if(key.target.value === "") return
        const path = key.target.value.split("\\")
        setFileName(path[path.length - 1])
        props.onChange(fileInput.current.files[0])
    }
    return (
        <label className="select-image-block">
            <input ref={fileInput} type="file" accept="image/*" style={{display: "none", width: 0, height: 0}} onChange={key => onChange(key)}/>
            <div style={{width: "24px"}}>
                <ReactSVG className="svg24icons" src={PlusSVG}/>
            </div>
            <span style={{marginLeft: "15px", whiteSpace: "nowrap"}}>{fileName}</span>
        </label>
    );
};

export default CustomPhotoUpload;