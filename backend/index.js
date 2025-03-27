    import express, { request, response } from "express";
    import {PORT,MONGODBURL} from './config.js'
    import mongoose from "mongoose";
    import { Book } from "./models/bookModel.js";
    import booksRoute from "./routes/booksRoute.js";
    import cors from 'cors';

    const app = express()

    // is middleware for parsing request body   
    app.use(express.json());

    //is middleware for handle cors policy.
    //Option 1: allow all origins with default of cors (*)
    app.use(cors());

    //Option 2: custom origins allow
    // app.use(cors({
    //     origin:'http://localhost:3000',
    //     methods:['GET','POST','PUT','DELETE'],
    //     allowedHeaders:['Content-Type']
    // }))

    app.use('/books',booksRoute);
    
    app.get('/',(request,response)=>{
        console.log('request is : ',request);
        return response.status(234).send('Welcome to mern stack project');
    })



    // database connection 

    mongoose.connect(MONGODBURL ).then(()=>{
        console.log('connected to database!')
        app.listen(PORT,()=>{
            console.log('App is listning to port',{PORT })
        })
    }).catch((error)=>{
        console.log(error,'throwing error')
    })