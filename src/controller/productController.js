const mongoose = require('mongoose')
const  uploadFile  = require("../aws/uploadFile")


const productModel = require('../models/productModel')
var nodemail = require('nodemailer')

const createProduct = async function(req,res){
    try{ 
    let productdata = req.body 

    let {title,description,price,productImage,isDeleted} = productdata
    let file =req.files
     productdata.productImage = await uploadFile.uploadFile(file[0])

     
  
   let  saveddata = await productModel.create(productdata)
    return res.status(201).send({status:true,message:'success',data:saveddata})
    }catch(error){
            return res.status(500).send({status:false,message:error.message})
    }
}

const getProductdetails = async function(req,res){
    let data = req.query
    let {price,priceSort,priceGreaterthan,priceLessthan,page,limit} = data
    priceSort =parseInt(priceSort)

    if (priceGreaterthan) {
         data.price = { $gt: data.priceGreaterthan };
       }
       if (priceLessthan) {
        data.price = { $lt: data.priceLessthan };
      }

      if(priceGreaterthan&&priceLessthan){
        data.price = {$gt:data.priceGreaterthan,$lt:data.priceLessthan}
      }

      let skip = (page-1)*limit

      let productData = await productModel.find(data).sort({price:priceSort}).limit(limit).skip(skip)

      return res.status(200).send({status:true,message:'success',data:productData})
}

const updateProduct = async function(req,res){
  try{
let productId = req.params.productId
let updateData = req.body



 let {title,description,price,productImage, isDeleted} = updateData


     let updatedData= await productModel.findOneAndUpdate({_id:productId,isDeleted:false},updateData,{new:true})
return res.status(200).send({status:true,message:'success',updatedata:updatedData})
  }catch(error){
    return res.status(500).send({status:false,message:error.message})
  }
}

const deleteProduct = async function(req,res){
  let productId = req.params.productId
  let existId = await productModel.findOne({productId})
  if(!existId||existId.isDeleted==true) return res.status(404).send({status:false,message:'id not found'})
  //let data = req.body
  let deletedProduct = 
  await productModel.findOneAndUpdate({productId },{ $set: { isDeleted: true} }, { new: true });
  return res.status(200).send({status:true,message:'product deleted'})
}




module.exports.createProduct = createProduct
module.exports.getProductdetails = getProductdetails
module.exports.updateProduct = updateProduct
module.exports.deleteProduct = deleteProduct

