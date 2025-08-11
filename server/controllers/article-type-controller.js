const { ArticleType } = require("../models/models")
const ApiError = require("../error/ApiError")

class ArticleTypeController
{
    async getAllArticleTypes(req, res, next)
    {
        try
        {
            const types = await ArticleType.findAll()
            return res.json(types)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async getArticleType(req, res, next)
    {
        try
        {
            const {id} = req.params

            if (!id || isNaN(Number(id)))
            {
                return next(ApiError.badRequest("Incorrect ID"))
            }

            const type = await ArticleType.findByPk(id)
            if (!type)
            {
                return next(ApiError.notFound("ID is not found"))
            }

            return res.json(type)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async createArticleType(req, res, next)
    {
        try
        {
            const {title, is_show_on_pages = false} = req.body

            if (!title || typeof title !== "string")
            {
                return next(ApiError.badRequest("Поле 'title' обязательно и должно быть строкой"))
            }

            const existing = await ArticleType.findOne({ where: { title } })
            if (existing)
            {
                return next(ApiError.badRequest("Тип статьи с таким названием уже существует"));
            }

            await ArticleType.create({ title, is_show_on_pages })
            const articleTypes = await ArticleType.findAll()
            return res.json(articleTypes.map(key => key.dataValues))
        }
        catch (e)
        {
            return next(ApiError.internal(e.message));
        }
    }

    async deleteArticleType(req, res, next)
    {
        try
        {
            const {id} = req.params;

            if (!id || isNaN(Number(id)))
            {
                return next(ApiError.badRequest("Некорректный ID"));
            }

            const type = await ArticleType.findByPk(id);
            if (!type)
            {
                return next(ApiError.notFound("ID is not found"))
            }
            await type.destroy()

            const articleTypes = await ArticleType.findAll()
            return res.json(articleTypes.map(key => key.dataValues))
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ArticleTypeController()
