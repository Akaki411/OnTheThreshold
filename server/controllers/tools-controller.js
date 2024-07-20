const cheerio = require('cheerio')
const request = require('request')
const uuid = require('uuid')
const converter = require("./converter")
const fs = require("fs")
const path = require("path")

class ToolsController
{
    async LinkParser(req, res)
    {
        try
        {
            const {url} = req.query
            request(url, (err, response, html) => {
                if (err) return res.json({success : 0})
                const $ = cheerio.load(html)
                const title = $('title').text()
                const description = $('meta[name="description"]').attr('content')
                let image = $('link[rel="icon"]').attr('href')
                if(image)
                {
                    if(!image.match(/http/))
                    {
                        let source = url.replace(/^[^\/]*:\/\/|www\./, '')
                        image = `http${url.match(/https/) ? "s" : ""}://${source.split("/")[0]}${image}`
                    }
                }
                return res.json({
                    success : 1,
                    meta: {
                        title,
                        description,
                        image : {
                            url : image
                        }
                    }
                })
            })
        }
        catch (e)
        {
            return res.json({success : 0})
        }
    }

    async UploadImage(req, res)
    {
        try
        {
            const {image} = req.files
            let fileName = uuid.v4() + ".webp"
            const webp = await converter.ConvertPhotoFromBuffer(image.data)
            await fs.writeFile("static/" + fileName, webp, err => {
                if (err)
                {
                    return res.json({success : 0})
                }
                return res.json({success : 1, file: {url : fileName}})
            })
        }
        catch (e)
        {
            return res.json({success : 0})
        }
    }

    async UploadAudio(req, res)
    {
        try
        {
            const {file} = req.files
            let fileName = uuid.v4() + ".mp3"
            await file.mv(path.resolve(__dirname, '..', 'static', fileName))
            return res.json({url : fileName, type: "audio/mpeg3"})
        }
        catch (e)
        {
            console.log(e)
            return res.json({success : 0})
        }
    }
}

module.exports = new ToolsController()
