import { config } from "dotenv"
import jwt from "jsonwebtoken"
config()

export default (roles) => {
    return (req, res, next) => {
        if (req.method === "OPTIONS") next()

        try {
            const token = req.headers?.authorization.split(' ')[1]
            if (!token)
                return res.status(403).json({ message: "Unauthorized user" })

            const { roles: userRoles } = jwt.verify(token, process.env.SECRET_KEY)
            let hasRole = false;
            userRoles.forEach(role => {
                if (roles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole)
                return res.status(403).json({ message: "User not allowed for this operation" })
            next()
        } catch (err) {
            console.log(err);
            return res.status(403).json({ message: "Unauthorized user" })
        }
    }
}