import { OrderModel } from "../../models/Order";

// for placing new order
exports.createOrder = async(req,res) =>{
    try{
    const {
        shippingDetails,
        orderDetails,
        paymentDetails,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        orderStatus,

    } = req.body;
    const order = await OrderModel.create({
        shippingDetails,
        orderDetails,
        paymentDetails,
        itemPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        orderStatus,
        orderDate:new Date(Date.now()),
        user : req.user._id
    })
    
    return res.status(201).json({message:"Order made succefully", order});
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}
// For getting my orders
exports.getMyOrder = async(req,res) =>{
    try{
    const orders = OrderModel.find({user:req.user_id});
    if(!orders){
        return res.status(400).json({success:false, message:"No order Found"});
    }

    return res.status(201).json({orders});
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
// For getting all order --Admin
exports.getAllOrder = async(req,res) =>{
    try {
        const orders = await OrderModel.find();
        if(!orders){
            return res.status(400).json({message:"No order found"});
        }
        return res.status(201).json({orders});
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

