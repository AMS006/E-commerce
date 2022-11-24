import express from 'express'
import dbConnection from './routes/dbConnection'
import dotenv from 'dotenv'
import product from './routes/product'
import user from './routes/User'
import category from './routes/category'
import cart from './routes/cart'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import cors from 'cors'
import path from 'path'

dotenv.config();
const ecom = express();

const PORT = 4000;
ecom.use(cookieParser());
ecom.use(bodyParser.urlencoded({ extended: true }))
ecom.use(express.json());
ecom.use(cors({
    origin:"http://localhost:3000",
    methods: ['GET', 'PUT', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-csrf-token'],
    credentials: true,
    maxAge: 5000,
    exposedHeaders: ['*', 'Authorization', ]
}));
process.on("uncaughtException", (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})
ecom.get('/' , (_,res) =>{
    return res.status(200).send("Server is Running")
})
ecom.use('/api/v1/category',category)
ecom.use('/api/v1/product', product)
ecom.use('/api/v1/user',user)
ecom.use('/api/v1/cart',cart);
ecom.use('/public', express.static(path.join(__dirname, 'uploads')))
ecom.listen(PORT, () =>{
    console.log("Server is Running");
    dbConnection().then( ()=>{
        console.log("Database Connected");
    }
    ).catch(()=>{
        console.log("Database Connection Failed")
    })
})
process.on("unhandledRejection", (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
    process.exit(1);
});
