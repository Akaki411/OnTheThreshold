import React from 'react';

class WorksBlock extends React.Component
{
    render()
    {
        return (
            <div className="works-block frame">
                <div className="works-block-arrow_place">
                    <div className="arrow" style={{transform: "rotateZ(180deg)"}}/>
                </div>
                <div className="works-scrollbar">
                    {this.props.content.content.map(key => {
                        return <Block data={key} key={key.id}/>
                    })}
                </div>
                <div className="works-block-arrow_place">
                    <div className="arrow"/>
                </div>
            </div>
        )
    }
}

const Block = (props) => {
    return (
        <div className="works-scrollbar-block">
            <div className="works-scrollbar-block_image"><img src={props.data.img} alt="work_image"/></div>
            <div className="works-scrollbar-block_title"><h1>{props.data.title}</h1></div>
            <div className="works-scrollbar-block_content"><p>{props.data.content}</p></div>
            <div className="works-scrollbar-block_button"><a href={`/works/${props.data.id}`}>Подробнее >>></a></div>
        </div>
    )
}

export default WorksBlock;