import productModel from "../models/productModel.js";
import FacadeFactory from "./FacadeFactory.js";
import expressAsyncHandler from "express-async-handler";
import { ObjectId } from "mongodb";
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

  getAdminProds = expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;
    const idRestau = query.id;

    const products = await productModel
      .iniciarProductModel()
      .find({
        dealership: { $in: [idRestau] },
      })
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countProducts = await productModel
      .iniciarProductModel()
      .countDocuments({
        dealership: { $in: [idRestau] },
      });
    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      query,
    });
  });
  putCrearProducto = expressAsyncHandler(async (req, res) => {
    const ProductoNuevo = productModel.iniciarProductModel();
    const newProducto = new ProductoNuevo({
      name: "sample name " + Date.now(),
      slug: "sample-name-" + Date.now(),
      image: "/images/p1.jpg",
      price: 0,
      category: "sample category",
      dealership: req.body.id,
      countInStock: 0,
      rating: 0,
      numReviews: 0,
      description: "sample description",
      WeekDay: [1, 2, 3, 4, 5, 6],
    });
    const product = await newProducto.save();
    res.send({ message: "Plato creado", product });
  });

  putEditarProducto = expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const product = await productModel
      .iniciarProductModel()
      .findById(productId);
    if (product) {
      product.name = req.body.name;
      product.slug = req.body.slug;
      product.price = req.body.price;
      product.image = req.body.image;
      product.category = req.body.category;
      product.countInStock = req.body.countInStock;
      product.description = req.body.description;
      product.WeekDay = req.body.WeekDay;
      await product.save();
      res.send({ message: "Plato actualizado" });
    } else {
      res.status(404).send({ message: "Plato no encontrado" });
    }
  });
}
