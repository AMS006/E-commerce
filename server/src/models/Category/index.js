import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    type:{
        type:String,
        trim:true

    },
    categoryImage:{
        type:String
    },
    createdBy:{
        type:mongoose.Schema.ObjectId,
        ref:"users"
    },
    parentId:{
        type:String
    }

},
{timestamps:true}
);
export const CategoryModel = mongoose.model("category",categorySchema)