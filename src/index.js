const express = require('express')
const mongoose = require('mongoose')
const route  = require('./routes/route')
const multer = require('multer')

const app = express()

app.use(express.json())
app.use(multer().any())

mongoose.set('strictQuery', true)

mongoose.connect('mongodb+srv://HarshJain:harsh321@cluster0.dwkz9.mongodb.net/Store-db')
.then(()=>console.log('MongoDb is connected'))
.catch((err)=>console.log(err))

app.use('/',route)


app.listen(process.env.PORT||3000,function(){
    console.log("Express app is running on port"+ (process.env.PORT||3000));
})
