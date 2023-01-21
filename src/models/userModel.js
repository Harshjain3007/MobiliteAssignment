const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        unique:true
    },
    lname:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,
    }

},{timeStamps:true})

module.exports =  mongoose.model('user',userSchema)