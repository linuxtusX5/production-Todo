import { Request, Response } from "express";
import UserModel from "../models/user.models";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

//Get All Users
export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await UserModel.find({});
        return res.status(200).send({
            userCount: users.length,
            success: true,
            message: 'All users data',
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error In Get All users',
            success: false,
            error
        })
    }
}

//Create User Register
export async function registerController(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        //Validation
        if(!email || !password) {
            return res.status(400).send({
                success: false,
                message: "Fill all Fields"
            })
        }

        //Existing User
        const existingUser = await UserModel.findOne({email});
        if(existingUser){
            return res.status(401).send({
                success: false,
                message: "User Already Exist!"
            })
        }
        //hashed Password
        const hashPassword = await bcrypt.hash(password, 8)

        //Save new User
        const user = new UserModel({email, password: hashPassword});
        await user.save();
        return res.status(201).send({
            success: true,
            message: "new Account Created!",
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error In Register!",
            success: false,
            error
        })
    }
}

//Login User
export async function LoginController(req: Request, res: Response) {
    try {
        const { email, password } = req.body

        //validation 
        if(!email || !password){
            return res.status(401).send({
                success: false,
                message: "Please provide email or password!"
            })
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(200).send({
                success: false,
                message: "Email is not registered"
            })
        }
        //password
        const isMatch = await bcrypt.compare(password!, user.password!);
        if(!isMatch){
            return res.status(401).send({
                success: false,
                message: "Invalid username or password!"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET!, {
            expiresIn: '1d',
        });
        return res.status(200).send({
            success: true,
            message: "Login Successfully!",
            token,
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: "Error In Login User",
            success: false,
            error
        })
    }
}
