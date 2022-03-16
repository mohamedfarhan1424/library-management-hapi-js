"use strict";

const Hapi=require('@hapi/hapi');
const path=require('path');
const users=require('./models/users.js');

const init=async ()=>{
    const server=Hapi.Server({
        host:'localhost',
        port:8080,
        routes: {
            files: {
              relativeTo: path.join(__dirname, "static"),
            },
            cors:true
          },
    });

    await server.register([
        {
            plugin:require('@hapi/inert')
        },
        {
            plugin:require('@hapi/vision')
        }
    ]);

    server.views({
        engines:{
            hbs:require('handlebars')
        },
        path:path.join(__dirname,'dynamic'),
        layout:'default',
    })

    server.route([
        {
        method:"GET",
        path:'/',
        handler:(req,res)=>{
            return res.file('welcome.html');
        }
    },
    {
        method:"GET",
        path:'/signup',
        handler:(req,res)=>{
            return res.view('signup',{usercreated:undefined});
        }
    },
    {
        method:"POST",
        path:'/login',
        handler:async (req,res)=>{
            const username=req.payload.username;
            const password=req.payload.password;
            const login=await users.loginCheck(username,password);
            return {login:login};
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
    }
]);

    await server.start();
    console.log(`Server started at ${server.info.uri}`);
};
process.on("unhandledRejection", (err) => {
    console.log(err);
    process.exit(1);
  });
init();