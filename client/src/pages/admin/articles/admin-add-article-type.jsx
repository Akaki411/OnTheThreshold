import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {
    AddGenre,
    AddType,
    ChangePagesOfType,
    GetAllGenres,
    GetAllTypes,
    RemoveGenre,
    RemoveType
} from "../../../http/contentAPI.jsx";
import VisualList from "../../../components/interactive-inputs/visual-list.jsx";
import TextField from "../../../components/interactive-inputs/text-field.jsx";

const AdminAddArticleType = observer(({
    onUpdate = () => {}
}) => {
    const [types, setTypes] = React.useState([])
    const [title, setTitle] = React.useState("")
    const updateTypes = (data) => {
        onUpdate(data)
        setTypes(data)
    }
    useEffect(() => {
        GetAllTypes().then((data) => {
            updateTypes(data)
        })
    }, [])
    const addGenre = () => {
        if (title === "") return
        if (types.includes(title)) return
        AddType(title).then((data) => {
            updateTypes(data)
        })
    }
    const removeGenre = (id) => {
        RemoveType(id).then((data) => {
            updateTypes(data)
        })
    }
    const changePages = (ids) => {
        ChangePagesOfType({ids}).then()
    }
    return (
        <div style={{display: "flex", width: "100%"}}>
            <div style={{flex: 4}}>
                <TextField name="Введите заголовок" width="100%" deathTime={500} onInput={setTitle} style={{backgroundColor: "#101010"}}/>
            </div>
            <div style={{flex: 1, width: 40}} className="centering">
                <div className="plus" onClick={addGenre}/>
            </div>
            <div style={{flex: 4}}>
                <VisualList
                    deletable={true}
                    selectable={true}
                    data={types.map(key => {return {id: key.type_id, title: key.title, isActive: key.is_show_on_pages}})}
                    remove={removeGenre} style={{backgroundColor: "#101010"}}
                    active={changePages}
                />
            </div>
        </div>
    )
})

export default AdminAddArticleType