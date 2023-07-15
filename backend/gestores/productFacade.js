import productModel from "../models/productModel.js";
import FacadeFactory from "./FacadeFactory.js";
import expressAsyncHandler from "express-async-handler";
const PAGE_SIZE = 10;

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

  getCategorias = expressAsyncHandler(async (req, res) => {
    const categories = await productModel
      .iniciarProductModel()
      .find()
      .distinct("category");
    res.send(categories);
  });

  getFiltros = expressAsyncHandler(async (req, res) => {
    const d = new Date();
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const order = query.order || "";
    const searchQuery = query.query || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};

    const products = await productModel
      .iniciarProductModel()
      .find({
        ...queryFilter,
        ...categoryFilter,
        WeekDay: d.getDay(),
      })
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await productModel
      .iniciarProductModel()
      .countDocuments({
        ...queryFilter,
        ...categoryFilter,
        WeekDay: d.getDay(),
      });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  });
}
