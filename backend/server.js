import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import userRouter from "./routes/userRoutes.js";

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