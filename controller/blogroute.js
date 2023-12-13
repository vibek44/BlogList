const blogrouter=require('express').Router()
const Blog=require('../models/bloglist')

blogrouter.get('/blogs',(req,res) => {
  Blog.find({})
    .then((result) => res.json(result) )
  
})

blogrouter.post('/blogs',(req,res) => {
  const blog=new Blog(req.body)
  blog.save()
    .then((result)=>res.status(201).json(result))
  
  
})

module.exports=blogrouter