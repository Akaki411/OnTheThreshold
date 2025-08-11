import React, {useEffect} from 'react';
import {ReactSVG} from "react-svg";
import Plus from "../resources/vector_icons/plus.svg"
import Link from "../resources/vector_icons/link.svg"

const CustomMultiPhotoUpload = (props) => {
    const [files, setFiles] = React.useState([])
    const [cover, setCover] = React.useState(0)

    useEffect(() => {
        props.onChange({cover: cover, files: files})
    }, [files, cover])

    const newFiles = (data) => {
        if(data.target.files.length > 0)
        {
            setFiles(Array.from(data.target.files))
        }
    }

    return(
        <div className={"multi-photo-upload " + props.className}>
            {files.length === 0 && <label>
                <div className="multi-photo-upload_title">
                    <ReactSVG src={Plus}/>
                    <p>Добавить фото</p>
                </div>
                <input type="file" accept="image/*" multiple={true} onChange={(data) => {newFiles(data)}}/>
            </label>}
            {files.length !== 0 && <div className="multi-photo-upload_list">
                <label className="svg24icons" style={{fill: "#AAAFB2", position: "absolute", top: 10, right: 10}}>
                    <ReactSVG src={Link}/>
                    <input type="file" accept="image/*" multiple={true} onChange={(data) => {}}/>
                </label>
                {files.map((file, index) => {
                    return <Block file={file} key={file.name} id={index} isActive={index === cover} onClick={(id) => setCover(id)}/>
                })}
            </div>}
        </div>
    )
}

const Block = (props) =>
{
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
        <div style={{position: "relative"}} onClick={() => {props.onClick(props.id)}}>
            <div style={block}>
                <img src={URL.createObjectURL(props.file)} alt="changedImage" style={image}/>
            </div>
            {props.isActive && <div style={text}>
                <p>Обложка</p>
            </div>}
        </div>

    )
}

export default CustomMultiPhotoUpload;