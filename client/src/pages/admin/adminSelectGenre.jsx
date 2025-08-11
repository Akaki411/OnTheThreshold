import React, {useEffect} from 'react';

const AdminSelectGenre = (props) => {
    const [genres, setGenres] = React.useState(props.list.map(key => {return [key, false]}))

    useEffect(() => {
        setGenres(props.list.map(key => {return [key, false]}))
    }, [props.list])

    useEffect(() => {
        props.onSelect(genres.filter(key => {return key[1]}).map(key => {return key[0].id}))
    }, [genres])
    const onSelect = (id) => {
        setGenres(genres.map(key => {return [key[0], key[0].id === id ? !key[1] : key[1]]}))
    }
    return (
        <div className={"admin-genre-list " + props.className}>
            {genres.map(key => {
                return <GenreBlock key={key[0].id} id={key[0].id} title={key[0].title} isActive={key[1]} select={(id) => onSelect(id)}/>
            })}
        </div>
    );
}

const GenreBlock = (props) => {
    return (
        <div className="admin-genre-list_block" style={{backgroundColor: props.isActive ? "#AD0000" : "#303030", cursor: "pointer"}} onClick={() => props.select(props.id)}>
            {props.title}
        </div>
    )
}


export default AdminSelectGenre;