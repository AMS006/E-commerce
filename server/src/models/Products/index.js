import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
        name:{
            type:String, 
            required:[true, "Enter the name of product"], 
            trim:true
        },

        description:{
            type:String,
            required:[true, "Enter the description of product"]
        },
        price:{
            type:Number,
            required:[true, "Enter Price of Product"],
            maxLength:[8, "Price cannot be greater then 8 digits"]
        },
        productImages:[
            {
                img:String
            }
        ],
        reviews:[
            {
                user:{type:mongoose.Schema.ObjectId},
                rating:{type:Number, required:true},
                comment:{type:String, required:true}
            }
        ],
        rating:{
            type:Number,
            default:0
        },
        category:{
            type: mongoose.Schema.ObjectId,
            ref:"category",
            required:true
        },
        stock:{
            type:Number,
            required:true,
            default:1,
        },
        createdBy:{
            type:mongoose.Schema.ObjectId,
            ref:"users",
            required:true
        }
    },
    {timestamps:true}
);
export const ProductModel = mongoose.model("products", ProductSchema);