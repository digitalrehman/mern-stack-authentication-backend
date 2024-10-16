import mongoose from "mongoose";

async function dbConnection (){
    try{
        let conf = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Connected to MongoDB at ${conf.connection.host}:${conf.connection.port}`)
    }catch(e){
        console.log(e)
    }
}

export default dbConnection;