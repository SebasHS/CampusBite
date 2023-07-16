import express from "express";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import restauranteRoutes from "./routes/RestauranteRoutes.js";
import pedidoRouter from "./routes/PedidoRoutes.js";
import data from "./data.js";

class App {
  constructor() {
    this.app = express();
    this.setupMiddlewares();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  setupMiddlewares() {
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(express.urlencoded({ limit: "50mb", extended: true }));
  }

  setupRoutes() {
    this.app.use("/api/seed", seedRouter);
    this.app.use("/api/users", userRouter);
    this.app.use("/api/restaurantes", restauranteRoutes);
    this.app.use("/api/products", productRoutes);
    this.app.use("/api/pedidos", pedidoRouter);
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
