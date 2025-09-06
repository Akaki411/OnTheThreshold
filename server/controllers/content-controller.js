const {Article, ArticleType, User} = require('../models/models')
const { Op } = require('sequelize')
const uuid = require('uuid')
const fs = require('fs/promises')
const converter = require('./converter')
const ApiError = require('../error/ApiError')

class ContentController 
{
    async getAllArticles(req, res, next) 
    {
        try 
        {
            let {limit, offset, type_id} = req.query
            limit = parseInt(limit) || 10
            offset = parseInt(offset) || 0
            const now = new Date()

            const where = {published_at: {[Op.lt]: now}}
            if (type_id) where.type_id = type_id

            const {rows, count} = await Article.findAndCountAll({
                where,
                include: [
                    { model: User, as: 'articleAuthor', attributes: ['user_id', 'nickname'] },
                    { model: ArticleType, attributes: ['title'] }
                ],
                order: [['published_at', 'DESC']],
                limit,
                offset
            })

            return res.json({
                info: { count: rows.length, all: count },
                content: rows.map(a => ({
                    id: a.article_id,
                    type: a.article_type?.title,
                    title: a.title,
                    content: a.description,
                    author: a.articleAuthor?.nickname,
                    img: a.photo_url,
                    date: a.published_at
                }))
            })
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message));
        }
    }

    async getArticle(req, res, next) 
    {
        try 
        {
            const { id } = req.params
            const article = await Article.findByPk(id)
            if (!article) return next(ApiError.badRequest("Статья не найдена"))
            return res.json(article.dataValues)
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async createArticle(req, res, next) 
    {
        try 
        {
            const {type_id, title, author_id, description, content, published_at} = req.body
            const {img} = req.files || {}
            if (!type_id || !title || !author_id || !description || !content) 
            {
                return next(ApiError.badRequest("Отсутствуют обязательные поля"))
            }
            const filename = img ? uuid.v4() + ".webp" : null
            if (img) 
            {
                const webp = await converter.ConvertPhotoFromBuffer(img.data)
                await fs.writeFile("resources/pictures/" + filename, webp)
            }
            await Article.create({
                type_id,
                title,
                author_id,
                photo_url: filename,
                description,
                content,
                published_at: published_at || new Date()
            })
            return res.json({success: 1})
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async updateArticle(req, res, next) 
    {
        try 
        {
            const {id} = req.params
            const data = req.body
            const updated = await Article.update(data, {where: {article_id: id}})
            return res.json({updated})
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteArticle(req, res, next) 
    {
        try 
        {
            const {id} = req.params
            await Article.destroy({where: {article_id: id}})
            return res.json({deleted: id})
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new ContentController();
