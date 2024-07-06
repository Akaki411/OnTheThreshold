const sharp = require('sharp');
class Converter
{
    async ConvertPhotoFromBuffer(buffer)
    {
        return await sharp(buffer).webp({quality: 80}).toBuffer()
    }
}

module.exports = new Converter()