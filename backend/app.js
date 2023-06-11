import express from "express";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import data from "./data.js";

class App {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
  }

  setupRoutes() {
    this.app.use("/api/seed", seedRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/products", productRoutes);
    this.app.get("/api/products", (req, res) => {
      res.send(data.products);
    });
    this.app.get("/api/products/slug/:slug", (req, res) => {
      const product = data.products.find((x) => x.slug === req.params.slug);
      if (product) {
        res.send(product);
      } else {
        res.status(404).send({ message: "Producto no encontrado" });
      }
    });
  }

  setupErrorHandling() {
    this.app.use((err, req, res, next) => {
      res.status(500).send({ message: err.message });
    });
  }

  start() {
    const port = process.env.PORT || 4000;
    this.app.listen(port, () => {
      console.log(`Server en puerto ${port}`);
    });
  }
}

export default App;
