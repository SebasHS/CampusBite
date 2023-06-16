import productModel from "../models/productModel.js";
import FacadeFactory from "./FacadeFactory.js";
import expressAsyncHandler from "express-async-handler";

export default class productFacade extends FacadeFactory {
  // Fachada de las rutas utilizadas por la clase Producto
  instance;
  productModel;

  constructor(productModel) {
    super();
    this.productModel = productModel;
  }

  // Debido a que en JS no se puede privatizar el constructor, supondremos que no se podra llamar al constructor fuera de la clase
  static async getInstance(productModel) {
    if (this.instance == null) {
      this.instance = new productFacade(productModel);
      return this.instance;
    } else {
      return this.instance;
    }
  }

  getTodos = expressAsyncHandler(async (req, res) => {
    const d = new Date();
    const products = await productModel
      .iniciarProductModel()
      .find({ WeekDay: d.getDay() });
    res.send(products);
  });

  getPorId = expressAsyncHandler(async (req, res) => {
    const product = await productModel
      .iniciarProductModel()
      .findById(req.params.id);
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  });

  getPorSlug = expressAsyncHandler(async (req, res) => {
    const product = await productModel
      .iniciarProductModel()
      .findOne({ slug: req.params.slug });
    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: "Producto no encontrado" });
    }
  });
}

