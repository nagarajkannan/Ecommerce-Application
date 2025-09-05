
import cloudinary from 'cloudinary'
import { json } from 'express';
import {productmodel} from '../models/productmodel.js'

//function for add product

export const addproduct=async (req,res)=>{
    try {
        const {name,description,price,category,subCategory,sizes,bestseller,latestcollection}=req.body;
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]
          

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined)
        let imageUrl=await Promise.all(
            images.map(async(item)=>{
                let resutl=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return resutl.secure_url
            })
        )
         const productData={
            name,
            description,
            price:Number(price),
            category,subCategory,
            sizes: JSON.parse(sizes.replace(/'/g, '"')),

           bestseller: bestseller === "true" ? true : false,
           latestcollection:latestcollection==="true"? true:false,

            image:imageUrl,
            date:Date.now()
            
         }
         
         const product=new productmodel(productData)
         await product.save()
         
        
        
        res.json({success:true,message:"product added"})
    } catch (error)
    
     {
        res.json({success:false,message:error.message})
    }

}
//function for listproduct

export const listpproduct=async (req,res)=>{
    try {
        const products=await productmodel.find({})
        res.json({success:true,products})
        
    } catch (error) {
        console.log(error);
        
        res.json({success:false,message:error.message})
        
    }

}
//function for removeproduct

export const removeproduct=async (req,res)=>{
    try {
      await productmodel.findByIdAndDelete(req.body.id)
      res.json({success:true,message:"product removed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }

}

//function for single product info

export const singleproduct=async (req,res)=>{
     try {
        const {productId}=req.body
        const product=await productmodel.findById(productId)
        res.json({success:true,product})
    } catch (error) {
          console.log(error);
    res.json({success:false,messsage:'error'})
        
    }

}