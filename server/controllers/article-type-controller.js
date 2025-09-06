const { ArticleType } = require("../models/models")
const ApiError = require("../error/ApiError")

const ruToLat = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'yo','ж':'zh','з':'z','и':'i','й':'y','к':'k',
    'л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'ts',
    'ч':'ch','ш':'sh','щ':'sch','ъ':"'",'ы':'y','ь':"'",'э':'e','ю':'yu','я':'ya'
}
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

    async getAllVisibleArticleTypes(req, res, next)
    {
        try
        {
            const types = await ArticleType.findAll({where: {is_show_on_pages: true}})
            return res.json(types)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async getArticleTypeById(req, res, next)
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

    async getArticleTypeByName(req, res, next)
    {
        try
        {
            const {name} = req.query
            if (!name)
            {
                return next(ApiError.badRequest("Incorrect name"))
            }
            const type = await ArticleType.findOne({where: {name}})
            if (!type)
            {
                return res.json({})
            }
            return res.json(type)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async changeShowPages(req, res, next)
    {
        try
        {
            const {ids} = req.body
            if(!ids || !Array.isArray(ids))
            {
                return next(ApiError.badRequest("Incorrect IDs"))
            }

            await ArticleType.update({is_show_on_pages: false}, {where: {}})
            if(ids.length > 0)
            {
                await ArticleType.update(
                    {is_show_on_pages: true},
                    {where: {type_id: ids}}
                )
            }
            const types = await ArticleType.findAll()

            return res.json(types)
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
            const {title} = req.body

            if (!title || typeof title !== "string")
            {
                return next(ApiError.badRequest("Title is not exist"))
            }

            const existing = await ArticleType.findOne({ where: { title } })
            if (existing)
            {
                return next(ApiError.badRequest("Incorrect title"));
            }

            await ArticleType.create({
                title,
                name: title.toLowerCase().split('').map(char => ruToLat[char] || char).join('')
            })
            const articleTypes = await ArticleType.findAll()
            return res.json(articleTypes.map(key => key.dataValues))
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteArticleType(req, res, next)
    {
        try
        {
            const {id} = req.params
            if (!id || isNaN(Number(id)))
            {
                return next(ApiError.badRequest("Incorrect ID"));
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
