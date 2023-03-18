import express from "express"
import { config } from "dotenv"
import { router as authRouter } from "./routes/authRouter.js"
import mongoose from "mongoose"

config()
const DB_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.PASSWORD}@${process.env.DB_NAME}.kt7m4po.mongodb.net/?retryWrites=true&w=majority`
const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect(DB_URL, { useUnifiedTopology: true, useNewUrlParser: true })
        app.listen(process.env.PORT, () => console.log("APP WAS STARTED"))
    } catch (e) {
        console.log(e)
    }
}

start()