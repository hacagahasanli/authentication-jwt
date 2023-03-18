import { config } from "dotenv"
import jwt from "jsonwebtoken"

config()

export default (req, res, next) => {
    if (req.method === "OPTIONS") next()

    try {
        const token = req.headers?.authorization.split(' ')[1]
        if (!token)
            return res.status(403).json({ message: "Unauthorized user" })

        const decodedData = jwt.verify(token, process.env.SECRET_KEY)
        req.user = decodedData;
        next()
    } catch (err) {
        console.log(err);
        return res.status(403).json({ message: "Unauthorized user" })
    }
}