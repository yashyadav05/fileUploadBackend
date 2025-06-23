const mongoose = require("mongoose")
const nodemailer = require("nodemailer")

const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    imgUrl:{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
})

fileSchema.post("save", async function (docs) {
    try {
        console.log("DOCS", docs);

        let transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587, // Add port if required (commonly 587 for TLS)
            secure: false, // true for port 465, false for others
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let sendmail = await transporter.sendMail({
            from: `"Yash" <${process.env.EMAIL_USER}>`, // recommended format
            to: docs.email,
            subject: "New file uploaded",
            html: `<h2>File uploaded</h2><p>See file here : <a href="${docs.imgUrl}">${docs.imgUrl}</a></p>`, // FIXED HERE
        });

        console.log(sendmail);
    } catch (error) {
        console.log("Error sending email:", error);
    }
});


module.exports = mongoose.model("Maindirectory",fileSchema)