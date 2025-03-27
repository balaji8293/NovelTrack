import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// routes

    // POST: http://localhost:5555/books
    
    router.post('/',async(request,response)=>{
        try {
            if(!request.body.title || !request.body.author ||!request.body.publishYear){
                return response.status(400).send({
                    message:'Please share all required fields like- title,author,publishYear'
                })
            }
            const newBook={
                title:request.body.title,
                author:request.body.author,
                publishYear:request.body.publishYear
            }
            const book = await Book.create(newBook);
            console.log(book,'created sussessfully!');
            return response.status(201).send(book);

        } catch (error) {
            console.log('getting error',error.message)
            return response.status(500).send({message:error.message})
            
        }
    })

    // GET: http://localhost        :5555/books

    router.get('/',async(request,response)=>{
        try {
            const books = await Book.find({})
            console.log('count:',books.length,books,'data fetch sussessfully!')
            return response.status(200).json({
                count: books.length,
                data:books
            });
        } catch (error) {
            console.log('getting error',error.message);
            return response.status(500).send({message:error.message})
            
        }
    })

    // GET: http://localhost:555/books/:id

    router.get('/:id',async(request,response)=>{
        try {
            const {id} = request.params;
            const book = await Book.findById(id);
            return response.status(200).json({
                data:book
            })
        } catch (error) {
            console.log(error);
            return response.status(500).send({message:error.message})
            
        }
    })

    // PUT: http://localhost:555/books/:id
    
    router.put('/:id',async(request,response)=>{
        try {
            console.log(request,'xx')
            
            if(!request.body.title || !request.body.author ||!request.body.publishYear){
                return response.status(400).send({
                    message:'Please share all required fields like- title,author,publishYear'
                })
            }
            const {id} = request.params
            const result = await Book.findByIdAndUpdate(id,request.body)
            console.log(result, 'book update successfully!')
            if(!result){
                console.log(result, 'Book not found!!')
                return response.status(204).send({message:'Book not found!'});
            }
            console.log(result, 'book update successfully!')
            return response.status(200).send({message:'Book updated successfully!'});

        } catch (error) {
            console.log(error.message)
            return response.status(500).send({message:error.message})
            
        }
    })

    // DELETE: http://localhost:555/books/:id

    router.delete('/:id',async(request,response)=>{
        try {
            const {id} = request.params;
            const result = await Book.findByIdAndDelete(id);
            
            if(!result){
                console.log(result, 'Book not found!!')
                return response.status(204).send({message:'Book not found!'});
            }
            console.log(result, 'Book deleted successfully!')
            return response.status(200).send({message:'Book deleted successfully!'});
        } catch (error) {
            console.log(error.message)
            return response.status(500).send({message:error.message})
        }
    })
    
    export default router;