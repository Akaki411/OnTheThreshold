import React, {useRef, useState} from 'react';
import PlusSVG from "../../../resources/vector_icons/plus.svg"
import GearSVG from "../../../resources/vector_icons/gear.svg"
import StatsSVG from "../../../resources/vector_icons/stats.svg"
import BooksSVG from "../../../resources/vector_icons/books.svg"
import {ReactSVG} from "react-svg"

const AdminMenu = (props) => {
    const [offset, setOffset] = useState(70)
    const buttons = {
        add_article: {icon: PlusSVG},
        books: {icon: BooksSVG},
        articles: {icon: StatsSVG},
        settings: {icon: GearSVG}
    }
    const pressButton = (data) => {
        setOffset(data.offset)
        props.onSelect(data.id)
    }
    return (
        <div className="admin-menu">
            <div>
                {Object.keys(buttons).map(key => {
                    return <Block data={buttons[key]} id={key} key={key} onClick={(data)=>pressButton(data)}/>
                })}
            </div>
            <div className="cursor" style={{right: -5, top: -5, width: 10, height: 10, transform: `translateY(${offset}px) rotateZ(45deg)`}}/>
        </div>
    )
}

const Block = (props) => {
    const block = useRef(null)
    const getOffset = () => {
        const offset = block.current.getBoundingClientRect()
        return offset.top + (offset.height/2)
    }
    return (
        <div className="admin-menu-block" ref={block} onClick={() => {props.onClick({id: props.id, offset: getOffset()})}}>
            <ReactSVG className="svg24icons" src={props.data.icon}/>
        </div>
    )
}

export default AdminMenu;