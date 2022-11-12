import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    cartItems:[
        {
            product:{type:mongoose.Schema.ObjectId, ref:'products', required:true},
            quantity:{type:Number, default:1},
        }
    ]
},
{timestamps:true}
);
export const CartModel = mongoose.model("carts",cartSchema)