import express from "express"
import { config } from "dotenv"

config()
const app = express()



const start = () => {
    try {
        app.listen(process.env.PORT, () => console.log("APP WAS STARTED"))
    } catch (e) {
        console.log(e)
    }
}

start()