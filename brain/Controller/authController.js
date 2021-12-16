import User from '../schems/UserSchema.js'
import Role from '../schems/RoleSchema.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'

const generateAccessToken = (username, id, roles, balance, photo) => {
    const payload = {
        username, 
        id, 
        roles, 
        balance, 
        photo
    }
    return jwt.sign(payload, config.secret, {expiresIn: "24h"})
}


class authController {    
    async registration(req, res) {
        try {
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.json({error: "Даний логiн все використовується"})
            }
            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, password: hashPassword, roles: [userRole.value]})
            await user.save()
            return res.json('Облiковий запис створено')
        } catch (e) {
            console.log(e)
            return res.json({error: 'Помилка створення облiкового запису'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                // return res.status(400).json({message: `Пользователь ${username} не найден`})
                return res.json({error: `Користувач ${username} не знайден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword){
                //return res.status(400).json({message: `Введен неверный пароль`})
                return res.json({error: 'Помилка вводу пароля'})
            }
            const token = generateAccessToken(user.username, user._id, user.roles, user.balance, user.photo)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Помилка входу'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }    
    }

    async getOne(req,res) {
        try {
            const {token} = req.params
            if (!token) {
                res.status(400).json({message: 'Не виконана авторизацiя'})
            }
            const {username, id, roles, balance, photo} = jwt.verify(token, config.secret)
            const userInfo = {username, id, roles, balance, photo};
            res.json(userInfo)

        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async checkBalance(req,res) {
        try {
            const {username} = req.params;
            if (!username) {
                res.status(400).json({message: 'Не передан логiн'})
            }
            const userinfo = await User.findOne({username: username});
            res.json(userinfo.balance) 
        } catch (e) {
            console.log(e)
            res.status(400).json(e)
        }
    }

    async getUser(req, res) {
        try {
            const {id} = req.params;
            if (!id) {
                res.status(400).json({message: 'Не передан Id'})
            }
            const userinfo = await User.findOne({_id: id});
            res.json(userinfo) 
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async update(req, res) {
        try {
            const user = req.body;
            if (!user._id) {
                res.status(400).json(e)
            }
            const updatedUser = await User.findByIdAndUpdate(user._id, user, {new: true})
        } catch (e) {
            res.status(500).json(e)
        }
    }
}

export default new authController();