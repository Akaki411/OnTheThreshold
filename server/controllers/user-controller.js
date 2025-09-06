const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign(
        {id, email, role},
        process.env.JWT_PASSWORD_CODE,
        {expiresIn: '24h'}
    )
}


class UserController
{
    async registration(req, res, next) 
    {
        try 
        {
            const { userId, nickname, sex, email, password } = req.body
            if (!nickname || !sex || !email || !password) 
            {
                return next(ApiError.badRequest("Reg data is not exist"))
            }
            if (password.length < 6) 
            {
                return next(ApiError.badRequest('The password must be longer than 6 characters'))
            }
            const user = await User.findOne({where: {user_id: userId, email: email}})
            if(!user)
            {
                return next(ApiError.badRequest('Incorrect user data token'))
            }
            const hashPassword = await bcrypt.hash(password, 10);
            await user.update({
                nickname,
                sex,
                email,
                password: hashPassword,
                is_active: true
            })
            await user.save()
            await Basket.findOrCreate({where: {user_id: user.user_id}, defaults: {user_id: user.user_id}})
            const token = jwt.sign({id: user.user_id, email: user.email, role: user.role}, process.env.JWT_PASSWORD_CODE, {expiresIn: '24h'})
            return res.json({token})
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
            const {email, password} = req.body
            if (!email || !password) 
            {
                return next(ApiError.badRequest('Incorrect email or password'))
            }
            const user = await User.findOne({where: {email}})
            if (!user) 
            {
                return next(ApiError.badRequest('Incorrect email or password'))
            }
            if (user.dataValues.is_banned || !user.dataValues.is_active)
            {
                return next(ApiError.forbidden('User has been blocked'))
            }
            const isPassCorrect = await bcrypt.compare(password, user.dataValues.password)
            if (!isPassCorrect) 
            {
                return next(ApiError.badRequest('Incorrect email or password'))
            }
            const token = jwt.sign({id: user.dataValues.user_id, email: user.dataValues.email, role: user.dataValues.role}, process.env.JWT_PASSWORD_CODE, {expiresIn: '24h'})
            return res.json({token})
        } 
        catch (e) 
        {
            next(ApiError.internal('Login error: ' + e.message))
        }
    }

    async check(req, res)
    {
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return res.json({token})
    }

    async check_nickname(req, res, next)
    {
        const {nickname} = req.query
        if(!nickname)
        {
            return next(ApiError.badRequest('Nickname is not exist'))
        }
        const user = await User.findOne({where: {nickname}, attributes: ["user_id"]})
        return res.json({find: !!user})
    }

    async check_email(req, res, next)
    {
        const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        const {email} = req.query
        if(!email)
        {
            return next(ApiError.badRequest('Email is not exist'))
        }
        if(!isValidEmail(email))
        {
            return next(ApiError.badRequest('Email is not exist'))
        }
        let user = await User.findOne({where: {email}, attributes: ["user_id", "is_active"]})
        if(user && user?.dataValues?.is_active)
        {
            return res.json({find: true})
        }
        else
        {
            if(!user)
            {
                user = await User.create({
                    email: email
                })
            }
            const token = jwt.sign({id: user.dataValues.user_id, email: email}, process.env.JWT_REG_CODE)
            console.log(process.env.DOMAIN + ":3000/registration?token=" + token)
            return res.json({find: false})
        }
    }

    async check_reg_token(req, res, next)
    {
        const {token} = req.query
        if(!token)
        {
            return next(ApiError.badRequest('Token is not exist'))
        }
        try
        {
            const decoded = jwt.verify(token, process.env.JWT_REG_CODE);
            return res.json({
                valid: true,
                email: decoded.email,
                userId: decoded.id
            })
        }
        catch (e)
        {
            return res.json({valid: false})
        }
    }
}

module.exports = new UserController()
