const express = require('express')
const router = express.Router()

const userController  = require('../controller/userController')
const productController = require('../controller/productController')
const adminController = require('../controller/adminController')
const orderController= require('../controller/orderController')
const mid = require('../auth/userAuth')
const mid1 = require('../auth/adminAuth')


router.post('/users',userController. userCreation)
router.post('/login',userController.userLogin)
router.post('/admins',adminController.createAdmin)
router.post('/loginadmin',adminController.adminLogin)
router.post('/products/:adminId',mid1.authenticate,mid1.authorisation,productController.createProduct)
router.get('/getproducts/:userID',mid.authenticate,productController.getProductdetails)
router.get('/getproducts/:adminID',mid1.authenticate,productController.getProductdetails)
router.put('/products/:productId/:adminId',mid1.authenticate,mid1.authorisation,productController.updateProduct)
router.delete('/products/:productId/:adminId',mid1.authenticate,mid1.authorisation, productController.deleteProduct)
router.post('/order/:userID',mid.authenticate,mid.authorisation,orderController.orderCreate)
module.exports = router