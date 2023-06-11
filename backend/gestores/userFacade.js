import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import expressAsyncHandler from "express-async-handler";
import generadorToken from "../clases/generadorToken.js";
import FacadeFactory from "./FacadeFactory.js";

export default class userFacade extends FacadeFactory {
  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  instance;
  userModel;

  constructor(userModel) {
    super();
    this.userModel = userModel;
  }

  static async getInstance(userModel) {
    if (this.instance == null) {
      this.instance = new userFacade(userModel);
      return this.instance;
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
          token: generadorToken.generarToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: " Email o contraseña invalida" });
  });

  register = expressAsyncHandler(async (req, res) => {
    const nuevoUsuario = userModel.iniciarUserModel();
    const newUser = new nuevoUsuario({
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
      token: generadorToken.generarToken(user),
    });
  });

  //Metodos PUT

  edit = expressAsyncHandler(async (req, res) => {
    const user = await userModel.iniciarUserModel().findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generadorToken.generarToken(user),
      });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  });
}
