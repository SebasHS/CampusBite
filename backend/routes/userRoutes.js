import express from "express";
import userModel from "../models/userModel.js";
import Autentificador from "../clases/Autentificador.js";
import userFacade from "../gestores/userFacade.js";

const userRouter = express.Router();

const userGestor = await userFacade.getInstance(userModel);

userRouter.post("/login", userGestor.login);
userRouter.post("/register", userGestor.register);
userRouter.put("/profile", Autentificador.isAuth, userGestor.edit);

export default userRouter;
