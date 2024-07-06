import React, {useContext} from 'react';
import {Context} from "../../index";
import {observer} from "mobx-react-lite";

const WorksBlock = observer(() => {
    const {works} = useContext(Context)
    return (
        <div className="works-block">
            <div className="works-block-arrow_place">
                <div className="arrow" style={{transform: "rotateZ(180deg)"}}/>
            </div>
            <div className="works-scrollbar">
                {works.works?.map(key => {
                    return <Block data={key} key={key.id}/>
                })}
            </div>
            <div className="works-block-arrow_place">
                <div className="arrow"/>
            </div>
        </div>
    )
})

const Block = (props) => {
    return (
        <div className="works-scrollbar-block">
            <div className="works-scrollbar-block_image"><a href={`/articles/${props.data.id}`} style={{backgroundImage: `url(${process.env.REACT_APP_API_URL + "/" + props.data.img})`}}/></div>
            <div className="works-scrollbar-block_title"><h1>{props.data.title}</h1></div>
            <div className="works-scrollbar-block_content"><p>{props.data.content}</p></div>
            <div className="works-scrollbar-block_button"><a href={`/articles/${props.data.id}`}>Подробнее >>></a></div>
        </div>
    )
}

export default WorksBlock;