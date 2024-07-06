import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import {GiveAllArticles} from "../../http/contentAPI";
import {observer} from "mobx-react-lite";
import BlockTitle from "../../components/blockTitle";

const WorksList = observer((props) => {
    const {works} = useContext(Context)
    const [worksData, setWorks] = useState(works.worksByType[props.id])
    let isLoading = false
    let firstLoad = false
    const handleScroll = () => {
        if(props.static) return
        const posY = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
        const itsAll = works.worksByType[props.id]?.info.all <= works.worksByType[props.id]?.info.loaded
        if(posY > 0.90 && !isLoading && !itsAll && firstLoad)
        {
            loadWorks()
        }
    }
    const loadWorks = () => {
        props.setloader(true)
        isLoading = true
        const offset = works.worksByType[props.id].content.length
        GiveAllArticles({type: props.id, limit: 12, offset: offset}).then(data => {
            works.setWorksByType(props.id, {
                content: works.worksByType[props.id].content.concat(data.content),
                info: {
                    all: data.info.all,
                    loaded: works.worksByType[props.id].info.loaded + data.info.count
                }
            })
            setWorks(works.worksByType[props.id].content)
            props.setloader(false)
            isLoading = false
        })
    }
    useEffect(() => {
        document.title = "На пороге | " + props.title
        GiveAllArticles({type: props.id, limit: props.loadLimit || 24}).then(data => {
            works.setWorksByType(props.id, {
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
        <div className="frame" style={props.style || {}}>
            <BlockTitle title={props.title}/>
            <div className="works-list-place">
                {worksData?.slice(0, props.renderLimit || Number.MAX_SAFE_INTEGER).map(key => {
                    return <Block key={key.id} data={key}/>
                })}
            </div>
        </div>
    )
})

const Block = (props) => {
    return(
        <a href={`/article/${props.data?.id}`} className="works-list-block" style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + "/" + props.data.img})`}}>
            <div className="image-new-gradient">
                <div className="image-new-content">
                    <div className="image-new-content_box">
                        <h1 style={{fontSize: 24}}>{props.data?.title}</h1>
                        <div className="image-new-content_description" style={{fontSize: 12}}>
                            {props.data?.content}
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}

export default WorksList;