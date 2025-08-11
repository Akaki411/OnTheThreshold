const {Genre} = require("../models/models")
const ApiError = require('../error/ApiError')

class GenreController
{
    async addGenre(req, res, next) 
    {
        try 
        {
            let {title} = req.body
            if (!title) 
            {
                return next(ApiError.badRequest("Не указано название"))
            }
            await Genre.create({title})
            const genres = await Genre.findAll()
            return res.json(genres.map(key => key.dataValues))
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async getGenre(req, res, next) 
    {
        try
        {
            let {id} = req.query
            if (id) 
            {
                id = JSON.parse(id)
                const genres = await Genre.findAll({where: {genre_id: id}})
                return res.json(genres.map(key => key.dataValues))
            } 
            else 
            {
                const genres = await Genre.findAll()
                return res.json(genres.map(key => key.dataValues))
            }
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async removeGenre(req, res, next) 
    {
        try 
        {
            let {id} = req.body
            if (!id) 
            {
                return next(ApiError.badRequest("Не указан id"))
            }
            await Genre.destroy({where: { genre_id: id }})
            const genres = await Genre.findAll()
            return res.json(genres.map(key => key.dataValues))
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new GenreController()