import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../main.jsx";
import {GetAllArticles} from "../../http/contentAPI.jsx";
import {observer} from "mobx-react-lite";
import BlockTitle from "../../components/block-title.jsx";

const WorksList = observer(({
    id,
    className = '',
    isStatic = false,
    setLoader = () => {},
    title = "Работы",
    loadLimit = 24,
    style,
    renderLimit = Number.MAX_SAFE_INTEGER
}) => {
    const {works} = useContext(Context)
    const [worksData, setWorks] = useState(works.worksByType[id])
    let isLoading = false
    let firstLoad = false
    const handleScroll = () => {
        if(isStatic) return
        const posY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        const itsAll = works.worksByType[id]?.info.all <= works.worksByType[id]?.info.loaded
        if(posY > 0.90 && !isLoading && !itsAll && firstLoad)
        {
            loadWorks()
        }
    }
    const loadWorks = () => {
        setLoader(true)
        isLoading = true
        const offset = works.worksByType[id].content.length
        GetAllArticles({type_id: id, limit: 12, offset: offset}).then(data => {
            works.setWorksByType(id, {
                content: works.worksByType[id].content.concat(data.content),
                info: {
                    all: data.info.all,
                    loaded: works.worksByType[id].info.loaded + data.info.count
                }
            })
            setWorks(works.worksByType[id].content)
            setLoader(false)
            isLoading = false
        })
    }
    useEffect(() => {
        document.title = "На пороге | " + title
        GetAllArticles({type_id: id, limit: loadLimit}).then(data => {
            works.setWorksByType(id, {
                content: data.content,
                info: {
                    all: data.info.all,
                    loaded: data.info.count
                }
            })
            setWorks(data.content)
            firstLoad = true
        })
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [])
    return (
        <div className={"frame " + className} style={style}>
            <BlockTitle title={title}/>
            <div className="works-list-place">
                {worksData?.slice(0, renderLimit).map(key => {
                    return <Block key={key.id} id={key.id} title={key.title} content={key.content} img={key.img}/>
                })}
            </div>
        </div>
    )
})

const Block = ({
    id,
    title,
    content,
    img
}) => {
    return(
        <a href={`/article/${id}`} className="works-list-block" style={{backgroundImage: `url(${import.meta.env.VITE_APP_API_URL + "/content/images/" + img})`}}>
            <div className="image-new-gradient">
                <div className="image-new-content">
                    <div className="image-new-content_box">
                        <h1 style={{fontSize: 24}}>{title}</h1>
                        <div className="image-new-content_description" style={{fontSize: 12}}>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default WorksList;