import {makeAutoObservable} from "mobx";

export default class NewsStore
{
    constructor()
    {
        this._news = []
        this._loaded = 1
        this._totalCount = 0
        makeAutoObservable(this)
    }

    setNews(news)
    {
        this._news = news
    }
    setLoaded(loaded)
    {
        this._loaded = loaded
    }
    setCount(count)
    {
        this._totalCount = count
    }

    get news()
    {
        return this._news
    }
    get loaded()
    {
        return this._loaded
    }
    get count()
    {
        return this._totalCount
    }
}