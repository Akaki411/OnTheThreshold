import {$authHost, $host} from "./index.jsx";

//Basic responses
export const GiveAllArticles = async (params) => {
    const {data} = await $host.get('api/articles/', {params})
    return data
}
export const GiveArticle = async (id) => {
    const {data} = await $host.get('api/articles/' + id)
    return data
}

export const GetAllGenres = async () => {
    const {data} = await $host.get('api/books/genre/')
    return data
}

export const GetGenres = async (id) => {
    const {data} = await $host.get('api/books/genre/?id=' + JSON.stringify(id))
    return data
}

export const GetBooks = async (params) => {
    const {data} = await $host.get('api/books/', {params})
    return data
}

export const ParseDocument = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    const {data} = await $host.post('api/tools/parse-document', formData)
    return data
}


//Admin responses
export const UploadNewArticle = async (params) => {
    const {data} = await $authHost.post('api/articles/new', params)
    return data
}

export const AddGenre = async (title) => {
    const {data} = await $authHost.post('api/books/genre/add', {title})
    return data
}

export const RemoveGenre = async (id) => {
    const {data} = await $authHost.post('api/books/genre/remove', {id})
    return data
}

export const CreateBook = async (formData) => {
    const {data} = await $authHost.post('api/books/add', formData)
    return data
}