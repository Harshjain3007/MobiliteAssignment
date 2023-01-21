const mongoose =require('mongoose')

const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')

const userCreation = async function(req,res){
    try{
    let data = req.body 
let {fname,lname,phone,email,password,city} = req.body

var transporter = nodemailer.createTransport({
    service: 'gmail',
    type: "SMTP",
    host: "smtp.gmail.com",
    secure: true,
    auth: {
      user: 'writeYourGmailId@gmail.com',
      pass: 'YourGmailPassword'
    }
  });
  
  var mailOptions = {
    from: 'xyz.khan704@gmail.com',
    to: req.body.email,
    subject: 'Sending Email to test Node.js nodemailer',
    text: 'That was easy to test!'
  };
  
   let saveddata = await userModel.create(data)
  
  return res.status(200).send({status:true,message:'account created succesfully otp sent on your gmail',data:saveddata})
  
  }catch(error){
    return res.status(500).send({status:false,message:error.message})
  }
}






const userLogin = async function(req,res){
    const email = req.body.email;
    const password = req.body.password;
    const findUser = await userModel.findOne({email : email, password : password})

    const token = jwt.sign({
        author_Id : findUser._id.toString(),
        author_email : findUser.email
    }, "this is my secret key")
    res.setHeader("x-api-key",token)
    res.status(200).send({status : true, data : {token : token}});
}

module.exports.userCreation = userCreation
module.exports.userLogin = userLogin