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


config({
    path:"./config.env",
});

const corsOptions = {
    origin:true,
    credentials:true,
}

// middlewares
app.use(cors(corsOptions));
app.use(express.json())
app.use(morgan('dev'));

app.use("/api/v1",authRouter);
app.use("/api/v1",categoryRouter);
app.use("/api/v1",productRouter);



app.use('/',(req,res) => {
    res.send("test api working");
})

const PORT = process.env.PORT || 8080;


app.listen(PORT,() => {
    connectDb();
    console.log(`server is running on port ${PORT}`.bgCyan.black);
})