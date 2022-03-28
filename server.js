"use strict";


const Hapi=require('@hapi/hapi');
// const path=require('path');
const users=require('./models/users.js');
const books=require('./models/books.js');
const init=async ()=>{
    const server=Hapi.Server({
        host:'localhost',
        port:8080,
        routes: {
            cors:true
            // cors:{
            //     origin: ['*'], // an array of origins or 'ignore'
            // headers: ['Authorization'], // an array of strings - 'Access-Control-Allow-Headers'
            // exposedHeaders: ['Accept'], // an array of exposed headers - 'Access-Control-Expose-Headers',
            // additionalExposedHeaders: ['Accept'], // an array of additional exposed headers
            // maxAge: 60,
            // credentials: true
            // }
          },
    });

    // await server.register([
    //     {
    //         plugin:require('@hapi/inert')
    //     },
    //     {
    //         plugin:require('@hapi/vision')
    //     }
    // ]);


    server.route([
        {
        method:"GET",
        path:'/',
        handler:(req,res)=>{
            return "Home";
        }
    },
    {
        method:"POST",
        path:'/login',
        handler:async (req,res)=>{
            const username=req.payload.username;
            const password=req.payload.password;
            const login=await users.loginCheck(username,password);
            return login;
        }
    },
    {
        method:"POST",
        path:'/signup',
        handler:async (req,res)=>{
            const name=req.payload.name;
            const email=req.payload.email;
            const username=req.payload.username;
            const password=req.payload.password;
            const phoneno=req.payload.phoneno;
            const usercreated=await users.createUser(name,email,username,password,phoneno);
            return {usercreated:usercreated};
        }
    },
    {
        method:"GET",
        path:'/books',
        handler:async (req,res)=>{
            const books=await users.allBooks();
            return books;
        }
    },
    {
        method:"POST",
        path:'/addbook',
        handler:async (req,res)=>{
            const result=await users.addBook(req.payload.bookname,req.payload.authorname);
            return result;
        }
    },
    {
        method:"POST",
        path:"/createbook",
        handler:async (req,res)=>{
            const username=req.payload.username;
            const bookName=req.payload.bookName;
            const buyDate=req.payload.buyDate;
            const returnDate=req.payload.returnDate;
            await books.createBookTable(username,bookName,buyDate,returnDate);
            return true;
        }
    },
    {
        method:"GET",
        path:"/getbooktable/{username}",
        handler:async (req,res)=>{
            const booktable=await books.getBookTable(req.params.username);
            return booktable;
        }
    },
    {
        method:"GET",
        path:'/getusers',
        handler:async (req,res)=>{
            const allusers=await books.getAllUsers();
            return allusers;
        }
    },
    {
        method:"DELETE",
        path:"/deletebook/{bookname}/{authorname}",
        handler:async (req,res)=>{
            const result=await users.deleteBook(req.params.bookname,req.params.authorname);
            return result;
        }
    },
    {
        method:"DELETE",
        path:"/returnbook/{username}/{bookname}",
        handler:async (req,res)=>{
            const bookname=req.params.bookname;
            const username=req.params.username;
            books.returnBook(username,bookname);
            return true;
        }
    },
]);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
init();