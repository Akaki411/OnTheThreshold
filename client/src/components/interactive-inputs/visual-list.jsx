import React, {useEffect} from 'react';

const VisualList = ({
    data = [],
    active = () => {},
    remove = () => {},
    width,
    height,
    style,
    selectable = false,
    deletable = false
}) => {
    const [list, setList] = React.useState([])

    useEffect(() => {
        setList(data.map(key => {return [key, !!key.isActive]}))
    }, [data])

    useEffect(() => {
        active(list.filter(key => {return key[1]}).map(key => {return key[0].id}))
    }, [list])

    const onSelect = (id) => {
        setList(list.map(key => {return [key[0], key[0].id === id ? !key[1] : key[1]]}))
    }

    return (
        <div className="admin-genre-list" style={{width, height, ...style}}>
            {
                list.map(key => {
                    return <Block
                        key={key[0].id}
                        id={key[0].id}
                        title={key[0].title}
                        isActive={key[1]}
                        remove={remove}
                        change={onSelect}
                        deletable={deletable}
                        selectable={selectable}/>
                })
            }
        </div>
    )
}

const Block = ({
   id,
   title,
   isActive,
   remove = () => {},
   change = () => {},
   deletable,
   selectable
}) => {
    return (
        <div className="admin-genre-list_block"
             style={{backgroundColor: (isActive && selectable) ? "#AD0000" : "#303030", cursor: "pointer"}}>
            <span onClick={() => {if(selectable) change(id)}}>{title}</span>
            {deletable &&
                <div className="admin-genre-list_block-cross" onClick={() => {remove(id)}}>
                    <div className="cross"/>
                </div>}
        </div>
    )
}

export default VisualList;