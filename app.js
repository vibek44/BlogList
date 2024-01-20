const config=require('./utils/config')
const express=require('express')
require('express-async-errors')
const app=express()
const cors=require('cors')
const middleware=require('./middleware')
const loginRouter=require('./controller/login')
const userRouter=require('./controller/usersroute')
const blogRouter=require('./controller/blogroute')

const mongoose=require('mongoose')


mongoose.connect(config.MONGODB_URI)
  .then(() => console.log('connected'))
  .catch(() => console.log('error connection'))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)
//app.use('/api/blogs',middleware.userExtractor,blogRouter)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports=app

