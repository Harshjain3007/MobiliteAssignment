const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const orderSchema = new mongoose.Schema(
   {
 userId:{
         type:ObjectId,
         ref:'user,',
        required:true
    },
   productId:{
         type:ObjectId,
         ref:'product',
         required:true
      },
 quantity:{
         type:Number,
         required:true,
         min:1
      },
totalPrice:{
      type:Number,
      required:true
    },
cancelleble:{
   type:Boolean,
   default:true
},
orderStatus:{
   type:String,
   default:'pending',
   enum:['pending','completed','cancelled']
},
paymentStatus:{
   type:Boolean,
  default:false
},
},{timeStamps:true}
)

module.exports = mongoose.model('order',orderSchema)