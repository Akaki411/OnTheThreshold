const ApiError = require("../error/ApiError");
const {Author} = require("../models/models");

class AuthorController
{
    async getAllAuthors(req, res, next)
    {
        try
        {
            const authors = await Author.findAll()
            return res.json(authors.map(key => key.dataValues))
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async getAuthor(req, res, next)
    {
        try
        {
            const {id} = req.params
            const author = await Author.findByPk(id)
            if (!author) return next(ApiError.badRequest("Автор не найден"))
            return res.json(author.dataValues)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async createAuthor(req, res, next)
    {
        try
        {
            let { first_name, last_name, middle_name, nickname, birth_date, death_date, description } = req.body
            if (!first_name || !last_name)
            {
                return next(ApiError.badRequest(`Не указано:
                    ${!first_name ? "имя " : ""}
                    ${!last_name ? "фамилия" : ""}`))
            }

            const author = await Author.create({
                first_name,
                last_name,
                middle_name,
                nickname,
                birth_date,
                death_date,
                description
            })
            return res.json(author.dataValues)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async updateAuthor(req, res, next)
    {
        try
        {
            const {id} = req.params
            await Author.update(req.body, {where: {author_id: id}})
            return res.json({success: 1})
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteAuthor(req, res, next)
    {
        try
        {
            const {id} = req.params
            await Author.destroy({where: {author_id: id}})
            return res.json({success: 1})
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new AuthorController()