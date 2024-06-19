const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
    banned: {type: DataTypes.BOOLEAN, defaultValue: false}
})
const Article = sequelize.define('article', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    type: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: false},
    photoURL: {type: DataTypes.STRING, allowNull: true},
    authorId: {type: DataTypes.INTEGER, allowNull: false},
    description: {type: DataTypes.TEXT},
    content: {type: DataTypes.TEXT},
    published: {type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("now")}
})
const Book = sequelize.define('book', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    title: {type: DataTypes.STRING, allowNull: false},
    description: {type: DataTypes.TEXT, allowNull: true},

})

module.exports = {
    User,
    Article
}





