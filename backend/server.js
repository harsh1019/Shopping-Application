import express from "express"
const app = express();
import {config} from "dotenv";
import colors from "colors";
import authRouter from "./routes/authRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import productRouter from "./routes/productRoutes.js";
import {connectDb} from "./database/database.js"
import cors from "cors";
import morgan from "morgan";
import path from 'path';
import { URL } from "url";
const __dirname = new URL('.', import.meta.url).pathname;

config({
    path:"./config.env",
});


// middlewares
app.use(cors());
app.use(express.json())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname,'./frontend/build')))

app.use("/api/v1",authRouter);
app.use("/api/v1",categoryRouter);
app.use("/api/v1",productRouter);


// rest api
app.use('*',function(req,res){
   res.sendFile(path.join(__dirname,'./frontend/build/index.html'));
})

const PORT = process.env.PORT || 8080;
const MODE = process.env.DEV_MODE;

app.listen(PORT,() => {
    connectDb();
    console.log(`server is running on ${MODE} mode on port ${PORT}`.bgCyan.black);
})