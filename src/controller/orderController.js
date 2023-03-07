const mongoose = require('mongoose')

const ordermodel = require('../models/orderModel')

const qr = require('qrcode')

const orderCreate = async function(req,res){
    let orderdata = req.body
    let {productId,quantity,totalPrice,cancelleble,orderStatus,paymentStatus} = orderdata
    if((req.body.orderStatus=="completed")&&(req.body.paymentStatus==false)){
        return res.status(400).send({status:false,message:'Please initiate the payment. your order is completed'})
    }
    
    let createdOrder = await ordermodel.create(orderdata)
    return res.status(201).send({message:'order successfull',orderdata:createdOrder})
}

const generateQr = async text=>{
    try{
        await qr.toFile('./qr.png',text)

    }catch(error){
        console.log(error);
    }
}

generateQr('localhost:3000/order')



module.exports.orderCreate = orderCreate