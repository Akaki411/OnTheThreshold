import React, {useEffect} from 'react';
import {observer} from "mobx-react-lite";
import {AddGenre, GetAllGenres, RemoveGenre} from "../../http/contentAPI.jsx";

const AdminAddGenre = observer((props) => {
    const [genres, setGenres] = React.useState([])
    const [title, setTitle] = React.useState("")
    const input = React.useRef()

    const updateGenres = (data) => {
        if (props.onUpdate) props.onUpdate(data)
        setGenres(data)
    }

    useEffect(() => {
        GetAllGenres().then((data) => {
            updateGenres(data)
        })
    }, [])

    const addGenre = () => {
        if (title === "") return

        AddGenre(title).then((data) => {
            updateGenres(data)
            input.current.value = ""
            setTitle("")
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
                <input style={{fontSize: 14}} placeholder="Введите заголовок..." type="text"
                       className="content admin-new-article_input-title_border" ref={input} onChange={(data) => {
                    setTitle(data.target.value)
                }}/>
            </div>
            <div style={{flex: 1, width: 40}} className="centering">
                <div className="plus" onClick={() => {
                    addGenre()
                }}/>
            </div>
            <div style={{flex: 4}}>
                <GenreList list={genres} delete={(id) => {
                    removeGenre(id)
                }}/>
            </div>

        </div>
    );
})

const GenreList = (props) => {
    return (
        <div className="admin-genre-list">
            {props.list.map(key => {
                return <GenreBlock key={key.id} id={key.id} title={key.title} delete={(id) => {
                    props.delete(id)
                }}/>
            })}
        </div>
    )
}

const GenreBlock = (props) => {
    return (
        <div className="admin-genre-list_block">
            {props.title}
            <div className="cross" onClick={() => {
                props.delete(props.id)
            }}/>
        </div>
    )
}


export default AdminAddGenre;