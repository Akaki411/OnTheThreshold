import React, {useEffect} from 'react';
import {ReactSVG} from "react-svg";
import Plus from "../resources/vector_icons/plus.svg"
import Link from "../resources/vector_icons/link.svg"

const PhotoUploader = ({
    onChange = () => {},
    className = "",
    multiple = false,
    style,
    title = "Добавить фото"
}) => {
    const [files, setFiles] = React.useState([])
    const [cover, setCover] = React.useState(0)

    useEffect(() => {
        if(multiple)
        {
            onChange({cover: cover, files: files})
        }
        else
        {
            onChange(files[0])
        }
    }, [files, cover])

    const newFiles = (data) => {
        if(data.target.files.length > 0)
        {
            setFiles(Array.from(data.target.files))
        }
    }

    return(
        <div className={"multi-photo-upload " + className} style={style}>
            {files.length === 0 && <label>
                <div className="multi-photo-upload_title">
                    <ReactSVG src={Plus}/>
                    <p>{title}</p>
                </div>
                <input
                    style={{display: "none"}}
                    type="file"
                    accept="image/*"
                    multiple={multiple}
                    onChange={(data) => {newFiles(data)}}/>
            </label>}
            {files.length !== 0 && <div className="multi-photo-upload_list">
                <label className="svg24icons" style={{fill: "#AAAFB2", position: "absolute", top: 10, right: 10}}>
                    <ReactSVG src={Link}/>
                    <input type="file" accept="image/*" multiple={multiple} onChange={(data) => {}}/>
                </label>
                {files.map((file, index) => {
                    return <Block file={file} key={file.name} id={index} isActive={index === cover} onClick={(id) => setCover(id)}/>
                })}
            </div>}
        </div>
    )
}

const Block = ({
    onClick = () => {},
    id,
    file,
    isActive
}) => {
    const block = {
        width: "150px",
        height: "200px",
        position: "relative",
        cursor: "pointer",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    const text = {
        width: "150px",
        height: "16px",
        color: "#AAAFB2",
        fontSize: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }
    const image = {
        height: "100%",
        display: "block"
    }
    return(
        <div style={{position: "relative"}} onClick={() => {onClick(id)}}>
            <div style={block}>
                <img src={URL.createObjectURL(file)} alt="changedImage" style={image}/>
            </div>
            {isActive && <div style={text}>
                <p>Обложка</p>
            </div>}
        </div>

    )
}

export default PhotoUploader;