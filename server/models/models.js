const sequelize = require('../db');
const { DataTypes } = require('sequelize');

//ПОЛЬЗОВАТЕЛИ И АУТЕНТИФИКАЦИЯ

const User = sequelize.define('user', {
    user_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: true },
    sex: { type: DataTypes.STRING, allowNull: false, defaultValue: 'male' },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: true },
    role: { type: DataTypes.STRING, defaultValue: 'USER' },
    img: { type: DataTypes.STRING, allowNull: true },
    is_banned: { type: DataTypes.BOOLEAN, defaultValue: false },
    is_active: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
    indexes: [
        { fields: ['nickname'] },
        { fields: ['email'] }
    ]
})

//ТОВАРЫ И КНИГИ

const Author = sequelize.define('author', {
    author_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    middle_name: { type: DataTypes.STRING, allowNull: true },
    nickname: { type: DataTypes.STRING, unique: true, allowNull: true },
    birth_date: { type: DataTypes.DATEONLY, allowNull: true },
    death_date: { type: DataTypes.DATEONLY, allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
}, {
    timestamps: false,
    indexes: [
        { name: 'author_full_name_idx', fields: ['last_name', 'first_name', 'middle_name'] },
        { name: 'author_nickname_idx', fields: ['nickname'] }
    ]
})

const AuthorContact = sequelize.define('author_contact', {
    contact_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    type: { type: DataTypes.STRING, allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false
})

const Genre = sequelize.define('genre', {
    genre_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: false,
    indexes: [
        { fields: ['title'] }
    ]
})

const Book = sequelize.define('book', {
    book_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    cover_img_url: { type: DataTypes.STRING, allowNull: true },
    original_publish_date: { type: DataTypes.DATEONLY, allowNull: true },
}, {
    indexes: [
        { fields: ['title'] }
    ]
})

const BookImage = sequelize.define('book_image', {
    image_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    image_url: { type: DataTypes.STRING, allowNull: false },
    caption: { type: DataTypes.STRING }
}, {
    timestamps: false
})

const ReleaseForm = sequelize.define('release_form', {
    release_form_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true },
}, {
    timestamps: false,
    indexes: [
        { fields: ['title'] }
    ]
})

const BookAuthor = sequelize.define('book_author', {
    book_id: { type: DataTypes.INTEGER, primaryKey: true },
    author_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { timestamps: false })

const BookGenre = sequelize.define('book_genre', {
    book_id: { type: DataTypes.INTEGER, primaryKey: true },
    genre_id: { type: DataTypes.INTEGER, primaryKey: true }
}, { timestamps: false });


const Product = sequelize.define('product', {
    product_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    book_id: { type: DataTypes.INTEGER, allowNull: false },
    release_form_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    discount_percent: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
    is_addon: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
    stock_quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, {
    indexes: [
        { fields: ['title'] }
    ]
})

//КОРЗИНА И ЗАКАЗЫ

const Basket = sequelize.define('basket', {
    basket_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }
}, {
    timestamps: false
})

const BasketItem = sequelize.define('basket_item', {
    basket_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    basket_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }
}, {
    timestamps: false
})

const OrderStatus = sequelize.define('order_status', {
    order_status_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false, unique: true }
}, {
    timestamps: false,
    indexes: [
        { fields: ['title'] }
    ]
})

const Order = sequelize.define('order', {
    order_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_status_id: { type: DataTypes.INTEGER, allowNull: false },
    created_at: { type: DataTypes.DATE, defaultValue: sequelize.fn("now") },
    total_price: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
}, {
    timestamps: false
})

const OrderItem = sequelize.define('order_item', {
    order_item_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    order_id: { type: DataTypes.INTEGER, allowNull: false },
    product_id: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, allowNull: false },
    price_per_item: { type: DataTypes.DECIMAL(10, 2), allowNull: false }
})

//БЛОГ И СТАТЬИ

const ArticleType = sequelize.define('article_type', {
    type_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, unique: true, allowNull: false },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    is_show_on_pages: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false }
}, {
    timestamps: false,
    indexes: [
        { fields: ['title'] },
        { fields: ['name'] }
    ]
})

const Article = sequelize.define('article', {
    article_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    author_id: { type: DataTypes.INTEGER, allowNull: false },
    type_id: { type: DataTypes.INTEGER, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    photo_url: { type: DataTypes.STRING, allowNull: true },
    description: { type: DataTypes.TEXT },
    content: { type: DataTypes.TEXT },
    published_at: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.fn("now") }
}, {
    indexes: [
        { fields: ['title'] }
    ]
})

//ПРОМОКОДЫ

const PromoCode = sequelize.define('promo_code', {
    promo_code_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    code: { type: DataTypes.STRING(32), unique: true, allowNull: false },
    description: { type: DataTypes.TEXT },
    script: { type: DataTypes.TEXT, allowNull: false},
    discount_percent: { type: DataTypes.INTEGER, defaultValue: 0 },
    discount_amount: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
    start_date: { type: DataTypes.DATE, allowNull: false },
    end_date: { type: DataTypes.DATE, allowNull: false },
    max_uses: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
    times_used: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, {
    timestamps: false,
    indexes: [ { fields: ['code'] } ]
})

const PromoCodeUsage = sequelize.define('promo_code_usage', {
    usage_id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    promo_code_id: { type: DataTypes.INTEGER, allowNull: false },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    order_id: { type: DataTypes.INTEGER, allowNull: true }
}, {
    timestamps: true,
    updatedAt: false
})


//ОПРЕДЕЛЕНИЕ СВЯЗЕЙ

// Пользователь и Корзина
User.hasOne(Basket, { foreignKey: 'user_id' });
Basket.belongsTo(User, { foreignKey: 'user_id' });

// Корзина и Товары
Basket.belongsToMany(Product, { through: BasketItem, foreignKey: 'basket_id' });
Product.belongsToMany(Basket, { through: BasketItem, foreignKey: 'product_id' });

Basket.hasMany(BasketItem, { foreignKey: 'basket_id' });
BasketItem.belongsTo(Basket, { foreignKey: 'basket_id' });
Product.hasMany(BasketItem, { foreignKey: 'product_id' });
BasketItem.belongsTo(Product, { foreignKey: 'product_id' });


// Пользователь и Заказы
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Заказ и Статус Заказа
OrderStatus.hasMany(Order, { foreignKey: 'order_status_id' });
Order.belongsTo(OrderStatus, { foreignKey: 'order_status_id' });

// Заказ и Товары
Order.belongsToMany(Product, { through: OrderItem, foreignKey: 'order_id' });
Product.belongsToMany(Order, { through: OrderItem, foreignKey: 'product_id' });

Order.hasMany(OrderItem, { foreignKey: 'order_id' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id' });
Product.hasMany(OrderItem, { foreignKey: 'product_id' });
OrderItem.belongsTo(Product, { foreignKey: 'product_id' });

// Книга и Товар 
Book.hasMany(Product, { foreignKey: 'book_id' });
Product.belongsTo(Book, { foreignKey: 'book_id' });

// Форма выпуска и Товар
ReleaseForm.hasMany(Product, { foreignKey: 'release_form_id' });
Product.belongsTo(ReleaseForm, { foreignKey: 'release_form_id' });

// Книги и Авторы
Book.belongsToMany(Author, { through: BookAuthor, foreignKey: 'book_id' });
Author.belongsToMany(Book, { through: BookAuthor, foreignKey: 'author_id' });

// Книги и Жанры
Book.belongsToMany(Genre, { through: BookGenre, foreignKey: 'book_id' });
Genre.belongsToMany(Book, { through: BookGenre, foreignKey: 'genre_id' });

// Книга и Изображения Книги
Book.hasMany(BookImage, { foreignKey: 'book_id' });
BookImage.belongsTo(Book, { foreignKey: 'book_id' });

// Автор и Контакты Автора
Author.hasMany(AuthorContact, { foreignKey: 'author_id' });
AuthorContact.belongsTo(Author, { foreignKey: 'author_id' });

// Статьи
Article.belongsTo(User, { as: 'articleAuthor', foreignKey: 'author_id' }); // Указываем псевдоним, чтобы избежать конфликта
User.hasMany(Article, { foreignKey: 'author_id' });

ArticleType.hasMany(Article, { foreignKey: 'type_id' });
Article.belongsTo(ArticleType, { foreignKey: 'type_id' });

// Промокоды и их использование
PromoCode.hasMany(PromoCodeUsage, { foreignKey: 'promo_code_id' });
PromoCodeUsage.belongsTo(PromoCode, { foreignKey: 'promo_code_id' });

User.hasMany(PromoCodeUsage, { foreignKey: 'user_id' });
PromoCodeUsage.belongsTo(User, { foreignKey: 'user_id' });

Order.hasOne(PromoCodeUsage, { foreignKey: 'order_id' });
PromoCodeUsage.belongsTo(Order, { foreignKey: 'order_id' });

module.exports = {
    User,
    Author,
    AuthorContact,
    Genre,
    Book,
    BookImage,
    BookAuthor,
    BookGenre,
    ReleaseForm,
    Product,
    Basket,
    BasketItem,
    OrderStatus,
    Order,
    OrderItem,
    ArticleType,
    Article,
    PromoCode,
    PromoCodeUsage
};
