import itemcollection from "./item.collection.schema.js";
import mongoose from "mongoose";
import User from "./login.schema.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv'
dotenv.config()


export const productdetails= async (req, res) => {
    try {
        const newProduct = req.body;
    const result = await itemcollection.create(newProduct);
    res.status(200).json({message:"product created",data:result});
        
    } catch (error) {
        
        console.log("product create error" ,error)
    }
    
}


export const getproductdetails=async(req,res)=>{
    try {
        const query = {};
            const cursor = itemcollection.find(query);
            const product = await cursor.exec();
            res.status(200).json({message:"get product",data:product});
        
    } catch (error) {
        console.log("get error" ,error)
        
    }
}

export const deleteproductdetails=async(req,res)=>{
try {
    const deleteId = req.params.id
   console.log(deleteId)
    const result = await itemcollection.deleteOne({ _id: new mongoose.Types.ObjectId(deleteId) })
    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "product not found" })
    }
    res.status(200).json({ message: "deleted  successfully" })
} catch (error) {
    console.log(error)
    
}
  

}


 export const registerUser =async (req, res) => {
    try {
        const {username, Email, password}= req.body
        const hashPassword= await bcrypt.hash(password, 10)
        console.log("hashPassword",hashPassword);

        const newUser= new User({username, Email, password:hashPassword})
        await newUser.save()
        res.status(200).json({message:"user registered successfully", data:newUser})
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Register failed , internal error"})
    }
}



  export const loginform =async (req, res) => {

        try {
            const { Email, password } = req.body
            const user = await User.findOne({ Email })
            if (!user) {
                return res.status(401).json({ message: "user not found" })
            }
            const passwordMatch =await bcrypt.compare(password, user.password)
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid user password" })
            }
            const token= jwt.sign({_id:user._id},process.env.JWT_SECERT)
            console.log("token",token)
            res.status(200).json({ message: "Login successfully", "token":token })
    
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: "Login failed , internal error" })
        }
    
    }


    
export const getUserById=async(req,res)=>{
    try {
        const userId= req.user._id
        const user= await User.findById(userId)
        res.status(200).json(user)
    } catch (error) {
        console.log(err);
        res.status(500).json({err:" Error in get user by id"})
    }

}
