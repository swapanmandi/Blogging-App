import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import chatRoter from './routes/user.route.js'

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(cookieParser())

app.use(express.urlencoded({
    extended: true,
    limit: '16kb'
}))

app.use(express.json({limit: '16kb'}))

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
      errors: err.errors || [],
    });
  });


app.use("/", chatRoter)


export {app}