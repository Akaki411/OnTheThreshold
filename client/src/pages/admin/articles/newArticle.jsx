import React, {useEffect, useState} from 'react'
import CustomEditor from "../../../components/editor/customEditor.jsx"
import AnimateSelect from "../../../components/interactive-inputs/animate-select.jsx";
import CustomDateTime from "../../../components/interactive-inputs/date-time-picker.jsx";
import {UploadNewArticle} from "../../../http/contentAPI.jsx";
import BlockTitle from "../../../components/block-title.jsx";
import AdminAddArticleType from "./admin-add-article-type.jsx";
import BigTextField from "../../../components/interactive-inputs/big-text-field.jsx";
import PhotoUploader from "../../../components/photo-uploader.jsx";
import TextField from "../../../components/interactive-inputs/text-field.jsx";
import AnimateToggle from "../../../components/interactive-inputs/animate-toggle.jsx";

const NewArticle = () => {
    const [settingTime, changeSettingTime] = useState(false)
    const [types, setTypes] = useState([])

    const [articleType, setArticleType] = useState(null)
    const [articleImage, setArticleImage] = useState(null)
    const [articleTime, setArticleTime] = useState(new Date())
    const [articleTitle, setArticleTitle] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleContent, setArticleContent] = useState({blocks: []})

    const [readyToPublish, setReadyToPublish] = useState(false)

    useEffect(() => {
        setReadyToPublish(
            articleImage !== null &&
            articleTitle !== "" &&
            articleDescription !== "" &&
            articleContent?.blocks?.length !== 0 &&
            articleType !== null
        )
    }, [articleType, articleImage, articleTime, articleTitle, articleDescription, articleContent])


    const uploadArticle = () => {
        if (articleType === null) {
            alert("Не выбран тип статьи")
            return
        }
        if (articleImage === null) {
            alert("Не загружена обложка")
            return
        }
        if (articleTime === null && settingTime) {
            alert("Не выбрана дата публикации")
            return
        }
        if (articleTitle === "") {
            alert("Отсутствует название")
            return
        }
        if (articleContent.blocks.length === 0) {
            alert("Статья пустая")
            return
        }
        const formData = new FormData()
        formData.append('type_id', articleType)
        formData.append('title', articleTitle)
        formData.append('img', articleImage)
        formData.append('author_id', 1)
        formData.append('description', articleDescription)
        formData.append('content', JSON.stringify(articleContent.blocks))
        formData.append('published_at', articleTime.toString())

        UploadNewArticle(formData).then((data) => {
            if(data.success)
            {
                alert("Статья опубликована")
                window.location.reload()
            }
            else
            {
                alert("Ошибка публикации статьи")
            }
        })
    }

    return (
        <div className="fullscreen-frame">

            <BlockTitle title="Типы статей"/>
            <div className="admin-new-article-options mt20px">
                <AdminAddArticleType onUpdate={(data) => setTypes(data)}/>
            </div>

            <BlockTitle title="Новая статья"/>
            <div className="admin-new-article-options mt20px" style={{height: 450}}>
                <div style={{flex: 1}}>
                    <div className="admin-new-article-options mt20px" style={{columnGap: "20px"}}>
                        <div className="admin-new-article-options_block" style={{flex: 1}}>
                            <TextField name="Введите название" width="100%" deathTime={500} onInput={setArticleTitle} style={{backgroundColor: "#101010"}}/>
                        </div>
                        <div className="admin-new-article-options_block" style={{flex: 1}}>
                            <AnimateSelect
                                options={[{id: -1, title: "Новость"}].concat(types.map(key => {return {id: key.type_id, title: key.title}}))}
                                selectedId={articleType}
                                placeholder="Выберите тип"
                                onSelect={key => setArticleType(key)}/>
                        </div>
                    </div>
                    <div className="admin-new-article-options" style={{height: 345}}>
                        <BigTextField
                            name="Введите описание"
                            width="100%"
                            height="100%"
                            style={{backgroundColor: "#101010"}}
                            onInput={setArticleDescription}
                        />
                    </div>
                </div>
                <div style={{flex: 1, display: "flex", flexDirection: "column-reverse", height: "100%"}}>
                    <PhotoUploader
                        title="Добавить обложку"
                        className="mt20px"
                        style={{backgroundColor: "#101010", height: "calc(100% - 33px)"}}
                        onChange={setArticleImage}/>
                </div>
            </div>

            <div className="admin-new-article-options mt20px" style={{width: "50%"}}>
                <div className="admin-new-article-options_block">
                    <div className="admin-new-article-options_block_title"><span style={{marginRight: 20}}>Отложить публикацию</span>
                        <AnimateToggle onChange={key => {
                            changeSettingTime(key)
                        }}/>
                    </div>
                    <CustomDateTime onChange={time => setArticleTime(time)} disabled={!settingTime} date={true} time={true}/>
                </div>
            </div>

            <CustomEditor onChange={content => setArticleContent(content)}/>

            <div className="admin-new-article-options mt20px" style={{width: "100%"}}>
                <div className="admin-new-article-options_block" style={{display: "flex", flexDirection: "row-reverse", width: "100%"}}>
                    <button
                        disabled={!readyToPublish}
                        className="ui-button"
                        style={{width: "250px", position: "relative"}}
                        onClick={uploadArticle}>Опубликовать
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NewArticle;