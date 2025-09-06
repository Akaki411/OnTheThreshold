import React from 'react';
import BlockTitle from "../../../components/block-title.jsx";
import AdminAddGenre from "./admin-add-genre.jsx";
import CustomDateTime from "../../../components/interactive-inputs/date-time-picker.jsx";
import PhotoUploader from "../../../components/photo-uploader.jsx";
import BigTextField from "../../../components/interactive-inputs/big-text-field.jsx";
import AdminSelectGenre from "./adminSelectGenre.jsx";
import CustomCheckBox from "../../../components/custom-check-box.jsx";
import CustomEditor from "../../../components/editor/customEditor.jsx";
import {ReactSVG} from "react-svg";
import DocSVG from "../../../resources/vector_icons/doc.svg"
import {CreateBook} from "../../../http/contentAPI.jsx";
import AnimateToggle from "../../../components/interactive-inputs/animate-toggle.jsx";

const BooksControl = () => {
    const [genres, setGenres] = React.useState([])

    const [title, setTitle] = React.useState("")
    const [date, setDate] = React.useState(new Date())
    const [description, setDescription] = React.useState("")
    const [photos, setPhotos] = React.useState({cover: null, files: []})
    const [genre, setGenre] = React.useState([])
    const [eBook, setEBook] = React.useState(false)
    const [eBookPrice, setEBookPrice] = React.useState(0)
    const [book, setBook] = React.useState(false)
    const [bookPrice, setBookPrice] = React.useState(0)
    const [eBookContent, setEBookContent] = React.useState({blocks: []})

    const [bookFile, setBookFile] = React.useState(null)

    const createBook = async () => {
        const formData = new FormData()
        for(let file of photos.files)
        {
            formData.append('photos', file)
        }
        formData.append('title', title)
        formData.append('date', date.toString())
        formData.append('description', description)
        formData.append('cover', photos.cover)
        formData.append('genre', JSON.stringify(genre))
        formData.append('eBook', eBook)
        formData.append('eBookPrice', eBookPrice)
        formData.append('book', book)
        formData.append('bookPrice', bookPrice)
        formData.append('eBookContent', JSON.stringify(eBookContent))

        CreateBook(formData).then(data => {
            if(data.success)
            {
                alert("Книга опубликована")
                window.location.reload()
            }
            else
            {
                alert("Ошибка публикации книги")
            }
        })
    }

    return (
        <div className="fullscreen-frame">
            <BlockTitle title="Список жанров"/>
            <div className="admin-new-article-options mt20px">
                <AdminAddGenre onUpdate={(data) => setGenres(data)}/>
            </div>
            <BlockTitle title="Добавить книгу"/>
            <div className="admin-new-article-options mt20px" style={{display: "flex", columnGap: "20px"}}>
                <div style={{flex: 1}}>
                    <div className="admin-new-article-options mt20px" style={{columnGap: "20px"}}>
                        <div className="admin-new-article-options_block" style={{flex: 1}}>
                            <div className="admin-new-article-options_block_title">Название</div>
                            <input style={{fontSize: 14}} placeholder="Введите название книги..." type="text"
                                   className="content admin-new-article_input-title" onChange={(data) => setTitle(data.target.value)}/>
                            <div className="line"
                                 style={{minHeight: "1px", position: "absolute", bottom: 0, left: 0, width: "300px"}}/>
                        </div>
                        <div className="admin-new-article-options_block" style={{flex: 1}}>
                            <div className="admin-new-article-options_block_title">Дата выпуска</div>
                            <CustomDateTime onChange={time => setDate(time)} disable={false} value={date.toString()}/>
                        </div>
                    </div>
                    <div className="admin-new-article-options mt20px">
                        <BigTextField placeholder="Введите описание" onChange={text => setDescription(text)}/>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <div className="admin-new-article-options_block_title mt20px">Обложка и фото</div>
                    <PhotoUploader className="mt20px" onChange={data => setPhotos(data)}/>
                </div>

                {/*аддоны*/}
            </div>
            <div className="admin-new-article-options mt20px" style={{display: "flex", columnGap: "20px"}}>
                <div style={{flex: 1}} className="mt20px">
                    <div className="admin-new-article-options_block_title">Выберите жанры</div>
                    <AdminSelectGenre list={genres} className="mt20px" onSelect={data => {setGenre(data)}}/>
                </div>
                <div style={{flex: 1}} className="mt20px">
                    <div className="admin-new-article-options_block_title">Выберите вариации</div>
                    <div style={{display: "flex"}} className="mt20px">
                        <div className="admin-new-article-options_block">
                            <div className="admin-new-article-options_block_title"><span style={{marginRight: 20}}>Электронная версия</span>
                                <AnimateToggle onChange={setEBook}/>
                            </div>
                            {eBook && <div><input style={{fontSize: 14}} placeholder="Цена..." type="number"
                                                 className="content admin-new-article_input-title"
                                                 onChange={(data) => setBookPrice(parseInt(data.target.value))}/>
                                <div className="line"
                                     style={{
                                         minHeight: "1px",
                                         position: "absolute",
                                         bottom: 0,
                                         left: 0,
                                         width: "100px"
                                     }}/>
                            </div>}
                        </div>
                        <div className="admin-new-article-options_block">
                            <div className="admin-new-article-options_block_title"><span style={{marginRight: 20}}>Печатное издание</span>
                                <CustomCheckBox onClick={key => setBook(key)}/></div>
                            {book && <div><input style={{fontSize: 14}} placeholder="Цена..." type="number"
                                                 className="content admin-new-article_input-title"
                                                 onChange={(data) => setEBookPrice(parseInt(data.target.value))}/>
                                <div className="line"
                                     style={{
                                         minHeight: "1px",
                                         position: "absolute",
                                         bottom: 0,
                                         left: 0,
                                         width: "100px"
                                     }}/>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
            {eBook && <div className="admin-new-article-options mt50px">
                <div className="admin-new-article-options_block_title">
                    Текст электронной книги
                    <label style={{marginLeft: 30}}>
                        <ReactSVG className="svg24icons" src={DocSVG}/>
                        <input type="file" accept=".docx" style={{display: "none", width: 0, height: 0}} onChange={data => {
                            if(data.target.files[0]) setBookFile(data.target.files[0])
                        }}/>
                    </label>
                </div>
                <CustomEditor onChange={content => setEBookContent(content)} file={bookFile}/>
            </div>}
            <div className="admin-new-article-options mt50px">
                <button
                    disabled={title === "" || description === "" || photos.cover === null || photos.files.length === 0 || genre.length === 0 || (eBook && ( isNaN(eBookPrice) || eBookContent.blocks.length === 0)) || (book && isNaN(bookPrice)) || (!book && !eBook)}
                    className="ui-button"
                    style={{width: "250px", position: "fixed", right: "5%", bottom: "5%", zIndex: 99}}
                    onClick={() => createBook()}
                >Опубликовать
                </button>
            </div>
        </div>
    )
}

export default BooksControl;