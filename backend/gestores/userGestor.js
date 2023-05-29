import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import { generateToken, isAuth } from "../utils.js";

export default class userGestor {
  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  instance;
  userModel;

  constructor(userModel) {
    this.userModel = userModel
  }

  static async getInstance(userModel) {
    if (this.instance == null) {
      this.instance = new userGestor(userModel);
      return this.instance
    } else {
      return this.instance;
    }

  }

  //Metodos POST

  login = expressAsyncHandler(async (req, res) => {
    const user = await userModel
      .iniciarUserModel()
      .findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: " Email o contraseña invalida" });
  })

  register = expressAsyncHandler(async (req, res) => {
    const newUser = new userModel.iniciarUserModel()({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })




}
