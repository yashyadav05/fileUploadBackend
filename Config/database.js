const mongoose = require("mongoose")

const db = async ()=> {
    try{
        await mongoose.connect(process.env.MONGOOSE_URI)
        console.log("Connected to the database")
    }catch(error){
        console.log("Something went wrong")
        console.log(error)
        process.exit(1)
    }
}

module.exports = db