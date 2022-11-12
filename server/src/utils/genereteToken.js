const generateToken = (res,statusCode,user) =>{
    try{
    const token = user.generateJwtToken();
    
    const options = {
        expires : new Date(
            Date.now() + 5 * 24 * 60 * 60 * 1000
        ),
        httpOnly:true
    }
    return res.status(statusCode).cookie('token',token, options).json({success:true, user, token})
    }catch(error){
        return res.status(500).json({message:error.message});
    }
}
export default generateToken