import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {AddGenre, GetAllGenres, RemoveGenre} from "../../../http/contentAPI.jsx";
import VisualList from "../../../components/interactive-inputs/visual-list.jsx";
import TextField from "../../../components/interactive-inputs/text-field.jsx";

const AdminAddGenre = observer(({onUpdate = () => {}}) => {
    const [genres, setGenres] = React.useState([])
    const [title, setTitle] = React.useState("")
    const updateGenres = (data) => {
        onUpdate(data)
        setGenres(data)
    }
    useEffect(() => {
        GetAllGenres().then((data) => {
            updateGenres(data)
        })
    }, [])
    const addGenre = () => {
        if (title === "") return
        if (genres.includes(title)) return
        AddGenre(title).then((data) => {
            updateGenres(data)
        })
    }
    const removeGenre = (id) => {
        RemoveGenre(id).then((data) => {
            updateGenres(data)
        })
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
                <VisualList deletable={true} data={genres.map(key => {return {id: key.genre_id, title: key.title}})} remove={removeGenre} style={{backgroundColor: "#101010"}}/>
            </div>
        </div>
    )
})

export default AdminAddGenre