import jwt from 'jsonwebtoken'
import { userModel } from '../models/usermodel.js'
export const myprofile=async(req,res)=>{
    try {
        const {token}=req.headers
        if(!token){
            return res.json({success:false,message:"id not found"})
        }
        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        const user=await  userModel.findById(decode.id)
        if (!user) {
      return res.status(404).json({ success: false, message: "User not found" })
    }
    res.json({ success: true, user })
    

    } catch (error) {
     console.error(error)
    res.status(500).json({ success: false, message: "Server error" })   
    }

}