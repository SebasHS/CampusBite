import restauranteModel from "../models/restauranteModel.js";
import FacadeFactory from "./FacadeFactory.js";
import expressAsyncHandler from "express-async-handler";

export default class restauranteFacade extends FacadeFactory {
  // Fachada de las rutas utilizadas por la clase Producto
  instance;
  restauranteModel;

  constructor(restauranteModel) {
    super();
    this.restauranteModel = restauranteModel;
  }

  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  static async getInstance(restauranteModel) {
    if (this.instance == null) {
      this.instance = new restauranteFacade(restauranteModel);
      return this.instance;
    } else {
      return this.instance;
    }
  }
  getHorarios = expressAsyncHandler(async (req, res) => {
    const horario = await restauranteModel
      .iniciarRestauranteModel()
      .find({}, { name: 1, horario: 1, _id: 0, kind: 0 });
    res.send(horario);
  });
  getYapeyNum = expressAsyncHandler(async (req, res) => {
    const yapeyNum = await restauranteModel
      .iniciarRestauranteModel()
      .find({}, { name: 1, yape_img: 1, tlf: 1, _id: 0, kind: 0 });
    res.send(yapeyNum);
  });
}
