import express from "express";
import userModel from "../models/userModel.js";
import Autentificador from "../clases/Autentificador.js";
import userFacade from "../gestores/userFacade.js";

const userRouter = express.Router();

const userGest = await userFacade.getInstance(userModel);

userRouter.post("/login", userGest.login);
userRouter.post("/register", userGest.register);
userRouter.put("/profile", Autentificador.isAuth, userGest.edit);

export default userRouter;
