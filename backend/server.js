import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";
import data from "./data.js"

dotenv.config();

mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log('conectado a la base de datos')
    })
    .catch((err) => {
    console.log(err.message)
})

const app = express();

// TEST

app.get('/api/products',(req,res) => {
    res.send(data.products);
});
app.get('/api/products/slug/:slug',(req,res) => {
    const product = data.products.find((x) => x.slug === req.params.slug);
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: 'Producto no encontrado'});
    }
    });
app.get('/api/products/:id',(req,res) => {
    const product = data.products.find((x) => x._id === req.params.id);
    if(product){
        res.send(product);
    } else{
        res.status(404).send({message: 'Producto no encontrado'});
    }
    });

//

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get('/api')

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);



app.use((err, req, res, next) => {
    res.status(500).send({ message: err.message})
})

const port = process.env.PORT || 4000;
app.listen(port, () =>{
    console.log(`server en puerto ${port}`);
})
import App from "./app.js";

class Main {
  constructor() {
    dotenv.config();
  }

  async conexionBD() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Conectado a la base de datos");
    } catch (err) {
      console.log(err.message);
    }
  }

  start() {
    const port = process.env.PORT || 4000;
    const app = new App();
    app.start(port);
  }

  async run() {
    await this.conexionBD();
    this.start();
  }
}
const main = new Main();
main.run();
