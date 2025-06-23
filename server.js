//dotenv configration
require("dotenv").config()

//Boiler Plate Code
const express = require("express")
const PORT = process.env.PORT || 2013
const app = express()

//Database connection
const mongo = require("./Config/database")
mongo()

// Middleware to parse json request body
app.use(express.json());                                 
app.use(express.urlencoded({ extended: true }));


const fileUpload = require("express-fileupload")
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//Cloud Connection
const cloudinary = require("./Config/cloudinary")
cloudinary.cloudinaryConnect()

//Landing route
app.get("/",(req,res)=>{
    res.send("Hello World")
})

//connect to route
const Routes = require("./Routes/uploadRout")
app.use("/api/v1",Routes)

//server is running 
app.listen(PORT,()=>console.log(`Server is running on http://localhost:${PORT}`))