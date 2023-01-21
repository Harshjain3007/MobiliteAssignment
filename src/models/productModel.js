const mongoose = require('mongoose')



const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
      },
  
      description: {
        type: String,
        required: true,
      },
  
      price: {
        type: Number,
        required: true,
      },
      productImage: {
        type: String,
        required: true,
      },
      isDeleted:{
        type:Boolean,
        default:false
      }
},{timeStamps:true})

module.exports = mongoose.model('product',productSchema)