import { ProductModel } from "../../models/products";
import ApiFeature from '../../utils/apiFeatures'
//--admin
exports.createProduct =  async (req,res) =>{
    try{
    const {name,description,stock,price,category} = req.body
    // console.log(req.files)
    let productImages = [];
    if(req.files.length>0){
        productImages = req.files.map((file) => {
            return {img:file.filename}
        })
    }
    const product = await ProductModel.create({
        name,
        description,
        stock,
        price,
        category,
        productImages,
        createdBy:req.user._id
    });
    return res.status(201).json({success:true, product});
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}
exports.getAllProducts =  async (req,res,next) =>{
    try{
        const filteredProduct = new ApiFeature(ProductModel.find(),req.query).search().filter().pagination();
        let products = await filteredProduct.query;
        if(!products){
            return res.status(404).json({success:false,message:"No Product found"});
        }
        return res.status(201).json({success:true, products});
    
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

exports.getProduct = async (req,res,next) =>{
    try{
    const {_id} = req.params;

    const product = await ProductModel.findById(_id);
    // console.log(product);
    if(!product) return next(new ErrorHandler("Product Not found", 404))

    return res.status(201).json({success:true, product});
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}
exports.deleteProduct = async(req,res) =>{
    try{
    const {_id} = req.params;
    
    const product = await ProductModel.findByIdAndDelete(_id);
    return res.status(201).json({success:true, product});
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

exports.updateProduct = async(req,res) =>{
    try{
    const {_id} = req.params;
    const data = req.body.data
    const product = await ProductModel.findByIdAndUpdate(_id,{$set:data}, {new:true})

    return res.status(201).json({success:true, product});
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}