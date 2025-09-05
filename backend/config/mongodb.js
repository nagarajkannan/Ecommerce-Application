import mongoose from "mongoose";

const connectDb=async()=>{
     mongoose.connection.on('connected',()=>{
        console.log("Db Connected")
    })
    await mongoose.connect(`${process.env.MONGO_URL}/e-commerce`)
   

}

export default connectDb