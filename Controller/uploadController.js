const File = require("../Models/uploadSchema")
const asyncHandler = require("express-async-handler")
const cloudinary = require("cloudinary").v2


const localFileUpload = asyncHandler(async(req,res)=>{
    //fetching file
      const file = req.files.file
      console.log("Check the file : ",file)

      //storing file in local storage
      let path = __dirname+"/file/"+Date.now()+`.${file.name.split(".")[1]}`
      console.log(path)

      file.mv(path,(error)=>{
        console.log(error)
      })

      res.status(200).json({
        success:true,
        message:"File stored at local storage"
      })
})

function checkFileSupported(type,supportedFiletype){
  return supportedFiletype.includes(type)
}

async function uploadFileToCloudinary(file,folder,quality){
   const option = {folder}
   if(quality){
    option.quality = quality
   }
   option.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath,option)
}

const cloudinaryFileUpload = asyncHandler(async(req,res)=>{
     //user input
     const { name,tags,email } = req.body
     console.log(name,tags,email)

     //Files fetching
     const inputFile = req.files.imageFile
     console.log(inputFile)

     const supportedFiletype = ["jpg","jpeg","png"]
     const fileType = inputFile.name.split(".")[1].toLowerCase()

     if(!checkFileSupported(fileType,supportedFiletype)){
      return res.status(400).json({
        success:false,
        message:"Type not supported"
      })
     }

     const response = await uploadFileToCloudinary(inputFile,"codehelp")
  
     const done = await File.create({
      name,
      imgUrl:response.secure_url,
      tags,
      email
     })

     res.json({
      success:true,
      message:"File uploaded successfully"
     })
})

const videoUpload = asyncHandler(async(req,res)=>{
  //user input
     const { name,tags,email } = req.body
     console.log(name,tags,email)

     //Files fetching
     const viFile = req.files.videoFile
     console.log(viFile)

     //Checking file type
     const supportedFiletype = ["mp4","mov",]
     const fileType = viFile.name.split(".")[1].toLowerCase()

     if(!checkFileSupported(fileType,supportedFiletype)){
      return res.status(400).json({
        success:false,
        message:"Type not supported"
      })
     }

    const response = await uploadFileToCloudinary(viFile,"codehelp")
  
     const done = await File.create({
      name,
      imgUrl:response.secure_url,
      tags,
      email
     })

     res.json({
      success:true,
      message:"File uploaded successfully"
     })
})


const imageReducer = asyncHandler(async(req,res)=>{
  //user input
     const { name,tags,email } = req.body
     console.log(name,tags,email)

     //Files fetching
     const inputFile = req.files.imageFile
     console.log(inputFile)

     const supportedFiletype = ["jpg","jpeg","png"]
     const fileType = inputFile.name.split(".")[1].toLowerCase()

     if(!checkFileSupported(fileType,supportedFiletype)){
      return res.status(400).json({
        success:false,
        message:"Type not supported"
      })
     }

     const response = await uploadFileToCloudinary(inputFile,"codehelp",30)
  
     const done = await File.create({
      name,
      imgUrl:response.secure_url,
      tags,
      email
     })

     res.json({
      success:true,
      message:"File uploaded successfully"
     })
})

module.exports = {localFileUpload,cloudinaryFileUpload,videoUpload,imageReducer}