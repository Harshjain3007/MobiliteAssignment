const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const mongoose = require('mongoose')

const authenticate = async function(req,res,next){

    let token = req.headers["x-Api-key"]
    if(!token) token = req.headers["x-api-key"]
    if(!token) return res.status(401).send({status : false, msg : "You are not logged in(token Missing)"})
    let decodeToken = jwt.verify(token, "this is my secret key")
    if(!decodeToken) return res.status(403).send({status : false,  msg: "Token is invalid"})
    req.decodeToken=decodeToken  //taking author Id from the token and store it into author_id key to use further in the code
    next()
}


const authorisation = async function(req,res,next){
   
        let userId = req.params.userId
        
        let userDetail =await userModel.findById(userId)
        if(!userDetail) return res.status(404).send({staus : false, msg : "No such user"})
        // let decodeToken = jwt.verify(token,"this is my secret key")

        if(userDetail.userId != req.decodeToken.user_Id) 
        return res.status(403).send({status : false, msg : "You are not authorised"})
        next()
    }


module.exports.authenticate = authenticate
module.exports.authorisation = authorisation