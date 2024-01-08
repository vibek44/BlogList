const loginRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt=require('bcrypt')
const config=require('../utils/config')



loginRouter.post('/', async (req,res) => {
  const { username,password } =req.body
  if(username.length<3 || password.length<3){
    return res.status(400).send({ error:'bad request' })
  }
  const user = await User.findOne({ username })
  const correctPassword = user===null
    ? false
    : await bcrypt.compare(password,user.passwordHash)
  if(!(user && correctPassword)){
    res.status(401).send({ error:'invalid username or password' })
  }
  const userForToken={
    username:user.username,
    id:user.id
  }
  const token=jwt.sign(userForToken,config.SECRET,{ expiresIn:60*60 })

  res
    .status(200)
    .send({ token,username:user.username,name:user.name })
  
})


module.exports=loginRouter
