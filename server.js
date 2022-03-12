"use strict";

const Hapi=require('@hapi/hapi');
const path=require('path');

const init=async ()=>{
    const server=Hapi.Server({
        host:'localhost',
        port:8080,
        routes: {
            files: {
              relativeTo: path.join(__dirname, "static"),
            },
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
            return res.file('signup.html');
        }
    },
    {
        method:"POST",
        path:'/login',
        handler:(req,res)=>{
            const username=req.payload.username;
            const password=req.payload.password;
            return res.view('dashboard',{username,password});
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