require('dotenv').config()
const express = require('express')
const sequelize = require('./db')
require('./models/models')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')
const path = require('path')

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use("/images", express.static(path.resolve(__dirname, 'resources/images')))
app.use("/content/images", express.static(path.resolve(__dirname, 'resources/pictures')))
app.use("/content/audio", express.static(path.resolve(__dirname, 'resources/audio')))
app.use(fileUpload({}))
app.use('/api', router)
app.use(errorHandler)

const start = async () => {
    try
    {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    }
    catch (e)
    {
        console.log(e)
    }
}


start()
