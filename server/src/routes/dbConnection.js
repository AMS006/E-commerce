import mongoose from "mongoose";

export default async(req,res) =>{
   return mongoose.connect(process.env.DB_URI);
}