const ApiError = require('../error/ApiError')
const {Article} = require("../models/models")
const sequelize = require("sequelize");
const uuid = require('uuid')
const converter = require("./converter");
const fs = require("fs");


class ContentController
{
    async GetAllArticles(req, res, next)
    {
        try
        {
            let {limit, offset, type} = req.query
            limit = limit || 10
            offset = offset || 0
            const now = new Date()
            let works = []
            let all = 0
            if(type)
            {
                works = await Article.findAll({
                    where: {
                        type,
                        published: {[sequelize.Op.lt]: now}
                    },
                    order: [['published', 'DESC']], limit, offset})
                all = await Article.count({where: {type, published: {[sequelize.Op.lt]: now}}})
            }
            else
            {
                works = await Article.findAll({
                    where: {
                        type: {
                            [sequelize.Op.ne]: 'news',
                        },
                        published: {
                            [sequelize.Op.lt]: now
                        }},
                    order: sequelize.literal('random()'), limit, offset})
                all = await Article.count({where: {type: {[sequelize.Op.ne]: 'news',}, published: {[sequelize.Op.lt]: now}}})
            }
            return res.json({
                info: {
                    count: works.length,
                    all: all
                },
                content: works.map(key => {
                    return {
                        id: key.dataValues.id,
                        type: key.dataValues.type,
                        title: key.dataValues.title,
                        content: key.dataValues.description,
                        author: key.dataValues.authorId,
                        img: key.dataValues.photoURL,
                        date: key.dataValues.published
                    }
                })
            })
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async GetArticle(req, res, next)
    {
        try
        {
            let {id} = req.params
            if(isNaN(id)) return next(ApiError.badRequest("Не указан id"))
            const work = await Article.findOne({where: {id}})
            if(!work) return next(ApiError.badRequest("Статья не найдена"))
            return res.json({
                id: work.dataValues.id,
                type: work.dataValues.type,
                title: work.dataValues.title,
                content: work.dataValues.content,
                author: work.dataValues.authorId,
                img: work.dataValues.photoURL,
                date: work.dataValues.published
            })
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }

    async CreateArticle(req, res, next)
    {
        try
        {
            let {type, title, author, description, content, published} = req.body
            if(!type || !title || !author || !description || !content)
            {
                return next(ApiError.badRequest(`Не указано: 
                ${!type ? "тип " : ""}
                ${!title ? "заголовок " : ""}
                ${!author ? "автор " : ""}
                ${!description ? "описание " : ""}
                ${!content ? "содержание" : ""}`))
            }
            const {img} = req.files
            published = published || new Date()
            const filename = uuid.v4() + ".webp"
            if(img)
            {
                try
                {
                    const webp = await converter.ConvertPhotoFromBuffer(img.data)
                    await fs.writeFile("static/" + filename, webp, () => {})
                }
                catch (e)
                {
                    return next(ApiError.internal(e.message))
                }
            }
            const article = await Article.create({
                type: type,
                title: title,
                photoURL: filename,
                authorId: author,
                description: description,
                content: content,
                published: published
            })
            return res.json(article.dataValues)
        }
        catch (e)
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ContentController()
