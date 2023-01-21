const jwt =require('jsonwebtoken')
const mongoose = require('mongoose')
const adminmodel = require('../models/adminModel')


const authenticate =  async function(req,res,next){
    
    let token = req.headers["x-Api-key"]
    if(!token) token = req.headers["x-api-key"]
    if(!token) return res.status(401).send({status : false, msg : "You are not logged in(token Missing)"})
    let decodeToken = jwt.verify(token, "this is my secret key")
    if(!decodeToken) return res.status(403).send({status : false,  msg: "Token is invalid"})
    req.decodeToken=decodeToken  //taking author Id from the token and store it into author_id key to use further in the code
    next()
}

const authorisation =async function(req,res,next){
        let adminId = req.params.adminId
        
        let adminDetail =await adminmodel.findById(adminId)
        if(!adminDetail) return res.status(404).send({staus : false, msg : "No such admin"})
        // let decodeToken = jwt.verify(token,"this is my secret key")

        if(adminDetail.adminId != req.decodeToken.admin_Id) 
        return res.status(403).send({status : false, msg : "You are not authorised"})
        next()
}

module.exports.authenticate = authenticate
module.exports.authorisation =authorisation
