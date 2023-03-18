import User from "../models/User.js";

class UserService {
    async findByUsername(username) {
        const catchedUsername = await User.findOne({ username })
        return catchedUsername
    }
    async getAllUsers() {
        const users = await User.find()
        return users
    }
}

export default new UserService()