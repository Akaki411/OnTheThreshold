import {$authHost, $host} from "./index.jsx";

//Basic responses
export const GetAllArticles = async (params) => {
    const {data} = await $host.get('api/articles/', {params})
    return data
}
export const GetArticleById = async (id) => {
    const {data} = await $host.get('api/articles/' + id)
    return data
}
export const GetTypeByName = async (name) => {
    const {data} = await $host.get('api/article-types/name?name=' + name)
    return data
}

export const GetAllTypes = async () => {
    const {data} = await $host.get('api/article-types/')
    return data
}

export const GetAllVisibleTypes = async () => {
    const {data} = await $host.get('api/article-types/visible')
    return data
}

export const GetAllGenres = async () => {
    const {data} = await $host.get('api/genres/')
    return data
}

export const GetGenres = async (id = []) => {
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

export const AddType = async (title) => {
    const {data} = await $authHost.post('api/article-types/new', {title})
    return data
}

export const ChangePagesOfType = async ({ids}) => {
    const {data} = await $authHost.put('api/article-types/', {ids})
    return data
}

export const RemoveType = async (id) => {
    const {data} = await $authHost.delete('api/article-types/' + id)
    return data
}

export const UploadNewArticle = async (params) => {
    const {data} = await $authHost.post('api/articles/new', params)
    return data
}

export const AddGenre = async (title) => {
    const {data} = await $authHost.post('api/genres/new', {title})
    return data
}

export const RemoveGenre = async (id) => {
    const {data} = await $authHost.delete('api/genres/' + id)
    return data
}

export const CreateBook = async (formData) => {
    const {data} = await $authHost.post('api/books/add', formData)
    return data
}

export const UploadArticlePicture = async (image) => {
    const formData = new FormData()
    formData.append('image', image)
    const {data} = await $authHost.post("/api/tools/upload-image", formData)
    return data
}