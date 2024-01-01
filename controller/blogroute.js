const blogrouter=require('express').Router()
const Blog=require('../models/bloglist')

blogrouter.get('/api/blogs',async(req,res) => {
  const result = await Blog.find({})
  res.json(result)   
})

blogrouter.post('/api/blogs',async(req,res) => {
  let blog=req.body
  if(!(blog.url && blog.title )){
    return res.status(400).end()
  }
  if(!blog.likes) {
    const newBlog =new Blog({ ...blog,likes:0 })
    const result=await newBlog.save()
    return res.status(201).send(result) 
  }
  blog=new Blog(blog)
  const result=await blog.save()
  res.status(201).json(result) 
})

blogrouter.delete('/api/blogs/:id', async(req,res) => {
  await Blog.findByIdAndDelete(req.params.id)
  return res.status(204).end()
  
})

module.exports=blogrouter