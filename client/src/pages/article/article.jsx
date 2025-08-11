import React, {useEffect, useState} from 'react';
import Header from "../../components/header";
import Footer from "../../components/footer";
import {useParams} from "react-router-dom";
import {GiveArticle} from "../../http/contentAPI.jsx";
import EditorRenderer from "../../components/editor/editorRenderer";

const Article = () => {
    const {id} = useParams()
    const [title, setTitle] = useState("")
    const [content, setContent] = useState([])

    useEffect(() => {
        GiveArticle(id).then(data => {
            setTitle(data.title)
            setContent(JSON.parse(data.content))
        })
    }, [])

    return (
        <div className="wrapper">
            <div className="frame">
                <Header/>
            </div>
            <div className="frame mt50px">
                <div>
                    <h1 style={{margin: "10px 0"}}>{title}</h1>
                </div>
                <div className="line"/>
            </div>
            <div className="frame mt50px">
                <EditorRenderer data={content}/>
            </div>
            <div className="content">
                <Footer/>
            </div>
        </div>
    )
}

export default Article;