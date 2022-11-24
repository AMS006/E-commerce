import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User';

exports.requireSignIn = async(req,res,next) =>{
    try{
    const {token} =  req.cookies;
    if(!token) return res.status(404).json({message:"Plzz Login"})
    const decodeData = jwt.verify(token, process.env.SECRET_KEY);
    req.user = await UserModel.findById(decodeData.id);
    next();
    }catch(error){
        return res.status(500).json({success:false,message:error.message});
    }
}
exports.isUser = (req,res,next) =>{
    try {
        const role = req.user.role;
        if(role === "admin"){
            return res.status(403).json({message:"Login with User account to access this resource"});
        }
        next();
    } catch (error) {
        return res.status(500).json({message:error});
    }
}
exports.isAdmin = (req,res,next)=>{
        try {
            const role = req.user.role;
            if(role === "user"){
                return res.status(403).json({message:"You are not a authorized user to perform the action"});
            }
            next();
        } catch (error) {
            return res.status(500).json({success:false,message:error.message});
        }
}

