import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

//Basic responses
export const GiveAllArticles = async (params) => {
    const {data} = await $host.get('api/articles/', {params})
    return data
}
export const GiveArticle = async (id) => {
    const {data} = await $host.get('api/articles/' + id)
    return data
}

//Admin responses
export const UploadNewArticle = async (params) => {
    const {data} = await $authHost.post('api/articles/new', params)
    return data
}
