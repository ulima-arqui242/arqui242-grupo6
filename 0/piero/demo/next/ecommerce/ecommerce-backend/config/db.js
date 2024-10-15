const mongoose = require('mongoose')

async function connectDB(){
    try{
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Connected to MongoDB")
    }
    catch(err){
        console.log("Error in MongoDB ", err)
    }
}

module.exports = connectDB