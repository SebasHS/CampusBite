import express from "express";

const app = express();

app.get('/api')

const port = process.env.PORT || 5000;
app.listen(port, () =>{
    console.log(`server en puerto ${port}`);
})