import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {userModel} from '../models/usermodel.js'
import { productmodel } from '../models/productmodel.js'


const createToken=(id)=>{
    return jwt.sign({id},process.env.JWT_SECERET_KEY)
}                                                                                              
export const loginuser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User not Exist!.." });
    }

    const isMatch = await bcrypt.compare(String(password), user.password);
    if (isMatch) {
      const token = createToken(user._id);
      res.json({
        success: true,
        token,
        role: user.role   
      });
    } else {
      res.json({ success: false, message: "Invalid credentials!.." });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};


//router for register
export const registeruser=async(req,res)=>{
  try {
    const {name,email,password}=req.body;
    const exist=await userModel.findOne({email})
    if(exist){
        return res.json({success:false,message:"user already exist"})
    }
    //validating email format and strong password
    if(!validator.isEmail(email)){
        return res.json({success:false,message:
            "please enter a valid email"
        })
    }
    if(password.length < 8){
        return res.json({success:false,message:"Your password must greater than 8 characters"})
    }
    //hassing the password
    const salt=await bcrypt.genSalt(10)
    const hashedPassword=await bcrypt.hash(String(password),salt)

    const newuser= new userModel({
        name,
        email,
        password:hashedPassword
    })
    const user=await newuser.save()
    const token=createToken(user._id)
    res.json({success:true,token})

    


    
  } catch (error) {
    console.log(error);
    res.json({success:false,message:'error'})
    
    
  }
}
//router for admin login
export const adminlogin=async(req,res)=>{
    try {
        const {email,password}=req.body
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
             const token=jwt.sign(email+password,process.env.JWT_SECERET_KEY)
             res.json({success:true,token})
        }
    } catch (error) {
        console.log(error);
    res.json({success:false,messsage:'error'})
    }
   
    
}

