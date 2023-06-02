import express from "express";
import userModel from "../models/userModel.js";
import Autentificador from "../clases/Autentificador.js";
import userGestor from "../gestores/userGestor.js";

const userRouter = express.Router();
const userGest = await userGestor.getInstance( userModel);

userRouter.post("/login", userGest.login);
userRouter.post("/register", userGest.register);
userRouter.put("/profile",Autentificador.isAuth,userGest.edit);

export default userRouter;
