import mongoose from "mongoose";
import validator from "validator";
import bcrypt from 'bcryptjs'
import  jwt  from "jsonwebtoken";
import crypto from 'crypto';
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true
        },
        phoneNumber:{
            type:Number,
            trim:true
        },
        password:{
            type:String,
            required:[true,"Enter your password"],
            select:false,
            trim:true
        },
        avatar:{
           type:String
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        resetPasswordToken:String,
        resetPasswordExpire:String
    },
    {
        timestamps:true
    }
);
userSchema.methods.generateJwtToken = function(){
    return jwt.sign({id:this._id},process.env.SECRET_KEY,{expiresIn:'5d'});
}
userSchema.methods.getResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(20).toString("hex");

    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    // Token will expire in 10 minutes
    this.resetPasswordExpire = Date.now + 10 * 60 * 1000;

    // console.log(this.resetPasswordToken);
    return resetToken;
}
userSchema.pre("save", async function(next){
    const user = this
    if(!user.isModified("password")){
        next()
    }
    user.password = await bcrypt.hash(user.password,10)
})
export const UserModel = mongoose.model("users",userSchema);