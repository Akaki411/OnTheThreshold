import {$host} from "./index";

//Basic responses
const giveAllArticles = async (params) => {
    const {data} = await $host.get('api/articles/', {params})
    return data
}

export {
    giveAllArticles
}