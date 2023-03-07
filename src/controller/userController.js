const mongoose =require('mongoose')

const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
var nodemailer = require('nodemailer')

// const userCreation = async function(req,res){
//     try{
//     let data = req.body 
// let {fname,lname,phone,email,password,city} = req.body

// var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     type: "SMTP",
//     host: "smtp.gmail.com",
//     secure: true,
//     auth: {
//       user: 'hjain3007@gmail.com',
//       pass: 'bockhnwdeaiepmzq'
//     }
//   });
  
//   var mailOptiocomns = {
//     from: 'hjain3007@gmail.com',
//     to: email,
//     subject: 'Sending Email to test Node.js nodemailer',
//     text: 'That was easy to test!'
//   };

const userCreation = async function (req, res) {
  const { fname,lname,phone,email,city} = req.body;

  try {

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'hjain3007@gmail.com',
        pass: 'bockhnwdeaiepmzq'
      },
    });
   
    const mailOptions = {
      from:'hjain3007@gmail.com',
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset for your account.</p>`,
    };
    await transporter.sendMail(mailOptions);

    res.status(200).send({ message: 'otp sent to your email' });
  } catch (error) {
    res.status(500).send({ message: 'Internal server error' });
  }
};


  
//   let saveddata = await userModel.create(data)
  
//   return res.status(200).send({status:true,message:'account created succesfully otp sent on your gmail',data:saveddata})
  
//   }catch(err or){
//     return res.status(500).send({status:false,message:error.message})
//   }
// }






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
