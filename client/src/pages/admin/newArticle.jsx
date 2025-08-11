import React, {useState} from 'react'
import CustomEditor from "../../components/editor/customEditor"
import CustomSelect from "../../components/custom-select.jsx";
import CustomPhotoUpload from "../../components/custom-photo-upload.jsx";
import CustomDateTime from "../../components/custom-date-time.jsx";
import CustomCheckBox from "../../components/custom-check-box.jsx";
import {UploadNewArticle} from "../../http/contentAPI.jsx";

const NewArticle = () => {
    const [settingTime, changeSettingTime] = useState(false)

    const [articleType, setArticleType] = useState("news")
    const [articleImage, setArticleImage] = useState(null)
    const [articleTime, setArticleTime] = useState(new Date())
    const [articleTitle, setArticleTitle] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleContent, setArticleContent] = useState({blocks: []})

    const articleTypes = {
        news: "Новость",
        poetry: "Поэзия",
        prose: "Проза",
        translation: "Перевод",
        essay: "Эссе"
    }

    const uploadArticle = () => {
        if (articleType === "") {
            alert("Выбран неверный тип")
            return
        }
        if (articleImage === null) {
            alert("Не загружена обложка")
            return
        }
        if (articleTime === null) {
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
        formData.append('type', articleType)
        formData.append('title', articleTitle)
        formData.append('img', articleImage)
        formData.append('author', 1)
        formData.append('description', articleDescription)
        formData.append('content', JSON.stringify(articleContent.blocks))
        formData.append('published', articleTime.toString())

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
            <div className="admin-new-article-options mt50px">
                <div className="admin-new-article-options_block">
                    <div className="admin-new-article-options_block_title">Тип публикации</div>
                    <CustomSelect elements={articleTypes} onChange={key => setArticleType(key)}/>
                </div>
                <div className="admin-new-article-options_block">
                    <div className="admin-new-article-options_block_title">Загрузить обложку</div>
                    <CustomPhotoUpload onChange={file => setArticleImage(file)}/>
                </div>
                <div className="admin-new-article-options_block">
                    <div className="admin-new-article-options_block_title"><span style={{marginRight: 20}}>Отложить публикацию</span><CustomCheckBox
                        onClick={key => {
                            changeSettingTime(key)
                            if (!key) setArticleTime(new Date())
                        }}/></div>
                    <CustomDateTime onChange={time => setArticleTime(time)} disable={!settingTime}/>
                </div>
                <div className="admin-new-article-options_block">
                    <div className="admin-new-article-options_block_title">Название</div>
                    <input style={{fontSize: 14}} placeholder="Введите заголовок..." type="text"
                           className="content admin-new-article_input-title"
                           onChange={key => setArticleTitle(key.target.value)}/>
                    <div className="line"
                         style={{minHeight: "1px", position: "absolute", bottom: 0, left: 0, width: "300px"}}/>
                </div>
            </div>
            <div className="mt50px">
                <input placeholder="Введите краткое описание..." type="text"
                       className="content admin-new-article_input-title"
                       onChange={key => setArticleDescription(key.target.value)}/>
                <div className="line"/>
            </div>
            <CustomEditor onChange={content => setArticleContent(content)}/>
            <button
                disabled={articleImage === null || articleTitle === "" || articleDescription === "" || articleContent?.blocks?.length === 0}
                className="ui-button"
                style={{width: "250px", position: "fixed", right: "5%", bottom: "5%", zIndex: 99}}
                onClick={uploadArticle}>Опубликовать
            </button>
        </div>
    );
};

export default NewArticle;