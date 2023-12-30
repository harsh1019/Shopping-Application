import mongoose from "mongoose";
import colors from "colors";

export const connectDb = async () => {
    try{
        mongoose.set('strictQuery',false)
        const conn = await mongoose.connect(process.env.MONGO_URL,{
            dbName:"ecommerceDatabase"
        });
        
        console.log(`database connected successfully with ${conn.connection.host}`.bgMagenta.white);   

    }catch(err){
        console.log(`Database connection failed due to ${err}`.bgCyan.white);
    }
};