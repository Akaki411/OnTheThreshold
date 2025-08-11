const ApiError = require('../error/ApiError')
const {Genre, Book} = require("../models/models")
const uuid = require('uuid')
const path = require('path')


class BooksController 
{
    async getBooks(req, res, next) 
    {
        try 
        {
            const {title, genre_id, author_id} = req.query
            const where = title ? {title: {[Op.iLike]: `%${title}%`}} : {}
            const include = []
            if (genre_id) include.push({model: Genre, through: {attributes: []}, where: {genre_id}})
            if (author_id) include.push({model: Author, through: {attributes: []}, where: {author_id}})
            const books = await Book.findAll({ where, include })
            return res.json(books.map(key => key.dataValues))
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async getBook(req, res, next) 
    {
        try 
        {
            const { id } = req.params
            const book = await Book.findByPk(id, {include: [Author, Genre]})
            if (!book) return next(ApiError.badRequest("Книга не найдена"))
            return res.json(book.dataValues)
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async createBook(req, res, next) 
    {
        try 
        {
            let {
                title, date, description,
                genreIds, authorIds,
                eBook, eBookPrice,
                printBook, printBookPrice
            } = req.body
            const { cover, photos } = req.files

            if (!title || !date || !description || !genreIds || !cover || !photos ||
                (eBook && !eBookPrice) ||
                (printBook && !printBookPrice)) 
            {
                return next(ApiError.badRequest(`Не указано:
                    ${!title ? "заголовок\n" : ""}
                    ${!date ? "дата публикации\n" : ""}
                    ${!description ? "описание\n" : ""}
                    ${!genreIds ? "жанры\n" : ""}
                    ${!cover ? "обложка\n" : ""}
                    ${!photos ? "фотографии\n" : ""}
                    ${(eBook && !eBookPrice) ? "цена на электронную книгу\n" : ""}
                    ${(printBook && !printBookPrice) ? "цена на печатную книгу" : ""}`))
            }

            const coverFileName = uuid.v4() + ".jpg"
            await cover.mv(path.resolve(__dirname, '..', 'static', coverFileName))

            let book = await Book.create({
                title,
                description,
                cover_img_url: coverFileName,
                original_publish_date: new Date(date)
            })

            await BookGenre.bulkCreate(genreIds.map(id => ({ book_id: book.book_id, genre_id: id })))

            if (authorIds) 
            {
                await BookAuthor.bulkCreate(authorIds.map(id => ({ book_id: book.book_id, author_id: id })))
            }

            const images = Array.isArray(photos) ? photos : [photos]
            for (const image of images) 
            {
                const filename = uuid.v4() + ".jpg"
                await image.mv(path.resolve(__dirname, '..', 'static', filename))
                await BookImage.create({ book_id: book.book_id, image_url: filename })
            }

            if (eBook)
            {
                await Product.create({
                    book_id: book.book_id,
                    release_form_id: 1,
                    title: `${title} (электронная версия)`,
                    price: eBookPrice,
                    stock_quantity: 1000
                });
            }

            if (printBook) 
            {
                await Product.create({
                    book_id: book.book_id,
                    release_form_id: 2,
                    title: `${title} (печатная версия)`,
                    price: printBookPrice,
                    stock_quantity: 100
                })
            }

            return res.json({success: 1})
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async updateBook(req, res, next) 
    {
        try 
        {
            const {id} = req.params
            const updated = await Book.update(req.body, {where:{book_id: id}})
            return res.json(updated.dataValues)
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }

    async deleteBook(req, res, next) 
    {
        try 
        {
            const {id} = req.params
            await Book.destroy({where: {book_id: id}})
            return res.json({success: 1})
        } 
        catch (e) 
        {
            return next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BooksController()
