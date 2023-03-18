import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken";
import UserService from "../services/UserService.js";
import { config } from "dotenv"

config()

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '24h' })
}
class AuthController {
    async registration(req, res) {
        try {
            const { username, password } = req.body
            const candidate = await UserService.findByUsername(username)
            if (candidate)
                return res.status(400).json({ message: "The user with this username already exists" })

            const hashPassword = bcrypt.hashSync(password, 7)
            const userRole = await Role.findOne({ value: "USER" })

            const user = new User({ username, password: hashPassword, roles: [userRole.value] })
            await user.save()

            return res.json({ message: "User successfully registrated" })
        } catch (err) {
            console.log(err);
            res.status(400).json({ messgae: "Registration Error" })
        }
    }
    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await UserService.findByUsername(username)
            if (!user)
                return res.status(400).json({ message: "The user was not found" })

            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword)
                return res.status(400).json({ message: 'Password is not correct' })

            const token = generateAccessToken(user._id, user.roles)
            return res.json({ token })

        } catch (err) {
            console.log(err);
            res.status(400).json({ messgae: "Login Error" })
        }
    }
    async getUsers(req, res) {
        try {
            const users = await UserService.getAllUsers()
            res.json(users)
        } catch (err) {
            console.log(err);

        }
    }
}

export default new AuthController()