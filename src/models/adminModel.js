const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true,
        unique:true
    },
    lname:{
        type:String,
        required:true,
    },
    designation:{
        type:String,
        default:'admin'
    },
    phone:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requred:true,
        unique:true
    }
},{timestamps:true})

module.exports=mongoose.model('admin',adminSchema)

