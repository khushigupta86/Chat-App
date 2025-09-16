import User from "../models/user.model.js";
import bycrypt from "bcryptjs";
import { generateToken } from "../lib/utils.js";


export const signup = async (req, res) => {
    const { fullName, email, password } = req.body;
};

try {
   if(!fullName || !email || !password){
    return res.status(400).json({message:"All fields are required"}); 
   }

   if(password.length < 6){
    return res.status(400).json({message:"Password must be at least 6 characters"});
   }

   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   if(!emailRegex.test(email)){
    return res.status(400).json({message:"Please enter a valid email"});
   }

   const user= await User.findOne({email});
    if(user){
        return res.status(400).json({message:"User already exists"});
    }
    
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bycrypt.hash(password,salt);

    const newUser = new User({
        fullName,
        email,
        password:hashedPassword,
    });

    if(newUser){
        // generateToken(newUser._id);
        // await newUser.save();

        const savedUser = await newUser.save();
        generateToken(savedUser._id,res);
        await newUser.save();

        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            email:newUser.email,
            profilePic:newUser.profilePic,
        });
    }
    else{
        res.status(400).json({message:"Invalid user data"});
    }
    


} catch (error) {
    console.log("Error in signup:",error);
    res.status(500).json({message:"Interval Server error"});
}