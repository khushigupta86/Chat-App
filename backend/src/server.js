// const express = require("express");
import express from "express";

import path from "path";
import cookieParser from "cookie-parser";

import cors from "cors";

import { ENV } from "./lib/env.js"; 
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import { connectDB } from "./lib/db.js";
import { app,server } from "./lib/socket.js";






const __dirname = path.resolve();


const PORT = ENV.PORT || 3000;

app.use(express.json({limit:"5mb"})); //req.body
app.use(cors({origin:ENV.CLIENT_URL,credentials:true}));
app.use(cookieParser());


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


//make ready for deployment
if(ENV.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../chatapp/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(path.resolve(__dirname,"../chatapp/dist/index.html"));
    })
}


server.listen(PORT, () => {
    console.log("Server running on port:" + PORT);
    connectDB();
});                                                  