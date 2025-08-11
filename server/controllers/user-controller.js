const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}


class UserController
{
    async registration(req, res, next) 
    {
        try 
        {
            const { nickname, sex, email, password } = req.body
            if (!nickname || !sex || !email || !password) 
            {
                return next(ApiError.badRequest('Не все обязательные поля были предоставлены (nickname, sex, email, password)'))
            }
            if (password.length < 6) 
            {
                return next(ApiError.badRequest('Пароль должен быть не менее 6 символов'))
            }
            const candidate = await User.findOne({where: {[require('sequelize').Op.or]: [{ email }, { nickname }]}})
            if (candidate) 
            {
                if (candidate.email === email) 
                {
                    return next(ApiError.badRequest(`Пользователь с email '${email}' уже существует`))
                }
                if (candidate.nickname === nickname) 
                {
                    return next(ApiError.badRequest(`Пользователь с никнеймом '${nickname}' уже существует`))
                }
            }
            const hashPassword = await bcrypt.hash(password, 10);
            const newUser = await User.create({
                nickname,
                sex,
                email,
                password: hashPassword
            })
            await Basket.create({ user_id: newUser.user_id })
            const token = generateJwt(newUser.user_id, newUser.email, newUser.role)
            return res.json({ token })

        } 
        catch (e) 
        {
            next(ApiError.internal('Registration error: ' + e.message))
        }
    }

    async login(req, res, next) 
    {
        try 
        {
            const { email, password } = req.body
            if (!email || !password) 
            {
                return next(ApiError.badRequest('Incorrect email or password'));
            }
            const user = await User.findOne({ where: { email } });
            if (!user) 
            {
                return next(ApiError.internal('Incorrect email or password'));
            }
            if (user.is_banned) 
            {
                return next(ApiError.forbidden('User has been blocked'));
            }
            const isPassCorrect = await bcrypt.compare(password, user.password);
            if (!isPassCorrect) 
            {
                return next(ApiError.internal('Incorrect email or password'));
            }
            const token = generateJwt(user.user_id, user.email, user.role);

            return res.json({ token });

        } 
        catch (e) 
        {
            next(ApiError.internal('Login error: ' + e.message));
        }
    }

    async check(req, res)
    {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }
}

module.exports = new UserController()
