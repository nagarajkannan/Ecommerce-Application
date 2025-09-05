import jwt from 'jsonwebtoken'
const adminauth=(req,res,next)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,messsage:"not authorized login again"})

        }
        const token_decode=jwt.verify(token,process.env.JWT_SECERET_KEY)
        if(token_decode!==process.env.ADMIN_EMAIL+process.env.ADMIN_PASSWORD){
             return res.json({success:false,messsage:"not authorized login again"})

        }
        next()
    } catch (error) {
        console.log(error);
        res.json({success:false,messsage:error.message})
        
        
    }

}

export default adminauth