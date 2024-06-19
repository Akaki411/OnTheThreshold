import {makeAutoObservable} from "mobx";

export default class WorksStore
{
    constructor()
    {
        this._randomWorks = []
        this._worksByType = {}
        this._page = 1
        this._limit = 20
        this._totalCount = 0
        this._selectedType = ""
        makeAutoObservable(this)
    }

    setWorks(works)
    {
        this._randomWorks = works
    }
    setWorksByType(type, works)
    {
        this._worksByType[type] = works
    }
    setPage(page)
    {
        this._page = page
    }
    setLimit(limit)
    {
        this._limit = limit
    }
    setCount(count)
    {
        this._totalCount = count
    }

    get works()
    {
        return this._randomWorks
    }
    get worksByType()
    {
        return this._worksByType
    }
    get page()
    {
        return this._page
    }
    get limit()
    {
        return this._limit
    }
    get count()
    {
        return this._totalCount
    }
}