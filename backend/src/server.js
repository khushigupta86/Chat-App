// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import path from "path";


import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";



dotenv.config();

const app = express();
const __dirname = path.resolve();


const PORT = process.env.PORT || 3000;


app.use("/api/auth",authRoutes);
app.use("/api/messages",messageRoutes);


//make raedy for deployment
if(process.env.NODE_ENV==="production"){
    app.use(express.static(path.join(__dirname,"../chatapp/dist")));

    app.get("*",(_,res)=>{
        res.sendFile(path.resolve(__dirname,"../chatapp/dist/index.html"));
    })
}



app.listen(PORT, () => 
  console.log("Server is running on port:",+PORT)
);                                                  