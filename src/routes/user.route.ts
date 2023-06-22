import express from "express";
import { LoginController, getAllUsers, registerController } from "../controllers/user.controller";

export default (router: express.Router) => {
//Create user
    router.post('/signup', registerController);
    
    //Login
    router.post('/login', LoginController);
}