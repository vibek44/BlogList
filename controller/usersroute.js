
const bcrypt=require('bcrypt')
const userRouter=require('express').Router()
const User=require('../models/user')

userRouter.get('/',async(req,res) => {
  const users=await User.find({}).populate('blogs',{ url:1,title:1,author:1,id:1 })
  return res.json(users)
})

userRouter.post('/',async(req,res) => {
  const { username, name, password }=req.body 
  const saltRounds = 10
  const passwordHash=await bcrypt.hash(password,saltRounds)

  const user=new User({
    username,
    name,
    passwordHash
  })
  const savedUser=await user.save()
  return res.status(201).send(savedUser)
})


module.exports=userRouter
