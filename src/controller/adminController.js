const mongoose = require('mongoose')
const adminmodel = require('../models/adminModel')
const jwt = require('jsonwebtoken')


const createAdmin = async function(req,res){
    let data = req.body  
    let {fname, lname,designation,phone,email,password} = data
    let saveddata = await adminmodel.create(data)
    return res.status(201).send({status:true, message:'success',data:saveddata})
}


const adminLogin = async function(req,res){
    const email = req.body.email 
    const password = req.body.password
    const findAdmin = await adminmodel.findOne({email:email,password:password})
    const token = jwt.sign({
          admin_id: findAdmin._id.toString(),
          admin_email:findAdmin.email
    },'this is my secret key')
    res.setHeader('x-api-key',token)
   res.status(200).send({status:true,data:{token:token}})
}

module.exports.createAdmin = createAdmin
module.exports.adminLogin =adminLogin