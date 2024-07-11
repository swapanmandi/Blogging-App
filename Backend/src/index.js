import { app } from "./app.js";
import connectDB from "./db/index.js";
import dotenv from 'dotenv'

const PORT = 3000 || process.env.PORT

dotenv.config({
    path: "./.env"
})

connectDB()

app.listen(PORT, ()=>{
    console.log(`Server is Listening on PORT: ${PORT}`)
})