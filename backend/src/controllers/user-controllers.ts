import { NextFunction, Response, Request } from "express";
import user from "../models/user.js"
import { hash, compare } from "bcrypt"
import { PassThrough } from "stream";
import { createToken } from "../utils/token-manager.js";
import { COOKIE_NAME } from "../utils/constants.js";


export const getAllUsers = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const users = await user.find();
        return res.status(200).json({message:"OK", users});

    } catch (error) {
        console.log(error);
        
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
}

export const userSignup = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { name, email, password } = req.body;
        const existinguser = await user.findOne({email})
        if (existinguser) {
            return res.status(401).send("User already registered")
        }
        const hashedPassword = await hash(password, 10);
        const User = new user({ name, email, password: hashedPassword });
        await User.save()

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",            
        });

        const token = createToken(User._id.toString(), User.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); 
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly:true, 
            signed: true,
        });
        
        return res.status(201).json({message:"OK", id:User._id.toString()});

    } catch (error) {
        console.log(error);
        
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
}

export const userLogin = async(req:Request, res:Response, next:NextFunction) => {
    try {
        const { email, password } = req.body;
        const User = await user.findOne({email})
        if (!User) {
            return res.status(401).send("User not registered");
        }

        const isPassCorr = await compare(password, User.password);
        if (!isPassCorr) {
            return res.status(403).send("Incorrect password");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: "localhost",
            signed: true,
            path: "/",            
        });

        const token = createToken(User._id.toString(), User.email, "7d")
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); 
        res.cookie(COOKIE_NAME, token, {
            path: "/", 
            domain: "localhost", 
            expires,
            httpOnly:true, 
            signed: true,
        });
        return res.status(200).json({message:"OK", id:User._id.toString()});

    } catch (error) {
        console.log(error);
        
        return res.status(200).json({message:"ERROR", cause: error.message});
    }
}