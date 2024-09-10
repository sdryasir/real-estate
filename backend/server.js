import express from 'express'
import 'dotenv/config'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDB } from './config/db.js';
import { v2 as cloudinary } from 'cloudinary';
import productRoutes from './routes/products.routes.js'
import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'

import { error } from './middleware/error.js';
import cors from 'cors'

const corsOptions = {
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
    credentials:true
}

const app = express()
connectDB();

cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API, 
    api_secret: process.env.CLOUDNIARY_SECRET 
});

app.use(cors(corsOptions))

app.use(cookieParser())
// app.use(bodyParser.json())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use('/', productRoutes)
app.use('/', authRoutes)
app.use('/', userRoutes)

app.use('*', (req, res, next)=>{
    res.json({
        mesage:'The requested resource is not found'
    })
})


app.use(error)



app.listen(process.env.PORT, ()=>{
    console.log(`Server is running on port ${process.env.PORT}`);
})