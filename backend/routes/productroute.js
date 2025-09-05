    import express from 'express'
    import { addproduct, listpproduct, removeproduct, singleproduct } from '../controllers/productcontroller.js'
    import upload from '../middleware/multer.js'
import adminauth from '../middleware/adminauth.js'
    const productrouter=express.Router()

    productrouter.post('/addproduct',adminauth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct)
    productrouter.post("/removeproduct",adminauth,removeproduct)
    productrouter.post("/single",singleproduct)
    productrouter.get("/list",listpproduct)

    export default productrouter