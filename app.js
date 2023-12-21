const config=require('./utils/config')
const cors=require('cors')
const express=require('express')
const blogrouter=require('./controller/blogroute')
const app=express()
const mongoose=require('mongoose')


mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected'))
  .catch(() => console.log('error connection'))

app.use(cors())
app.use(express.json())

app.use('/api',blogrouter)




module.exports=app