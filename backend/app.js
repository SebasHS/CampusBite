import express from "express";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";

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
