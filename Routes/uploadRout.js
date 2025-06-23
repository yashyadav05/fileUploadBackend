const express = require("express")
const { localFileUpload, cloudinaryFileUpload, videoUpload, imageReducer } = require("../Controller/uploadController")
const router = express.Router()

router.post("/file",localFileUpload)
router.post("/upload",cloudinaryFileUpload)
router.post("/videoUpload",videoUpload)
router.post("/imageReducer",imageReducer)
module.exports = router