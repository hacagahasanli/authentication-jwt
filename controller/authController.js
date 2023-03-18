import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from "bcryptjs"

class AuthController {
    async registration(req, res) {
        try {
            const { username, password } = req.body
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: "The user with this username already exists" })
            }
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
            const candidate = await User.findOne({ username })
            if (!candidate) {
                return res.status(400).json({ message: "The user did not found" })
            }

        } catch (err) {
            console.log(err);
            res.status(400).json({ messgae: "Login Error" })
        }
    }
    async getUsers(req, res) {
        try {
            res.json('server work')
        } catch (err) {
            console.log(err);

        }
    }
}

export default new AuthController()