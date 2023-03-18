import User from "../models/User.js";
import Role from "../models/Role.js";

class AuthController {
    async registration() {
        try {
            const { username, password } = req.body
            const candidate = await User.findOne({ username })
            if (candidate) {
                return res.status(400).json({ message: "The user with this username already exists" })
            }
        } catch (err) {
            console.log(err);
            res.status(400).json({ messgae: "Registration Error" })
        }
    }
    async login() {
        try {

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