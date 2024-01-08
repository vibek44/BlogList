const blogrouter=require('express').Router()
const Blog=require('../models/bloglist')
const User=require('../models/user')

blogrouter.get('/',async(req,res) => {
  const result = await Blog.find({}).populate('user')
  res.json(result)   
})

blogrouter.post('/',async(req,res) => {
  let blog=req.body
  let user=req.user
  if(!user.id){
    return res.status(401).send({ error:'invalid token' })
  }
  if(!(blog.url && blog.title )){
    return res.status(400).end()
  }
  user=await User.findById(user.id)
  
  if(!blog.likes) {
    const newBlog =new Blog({ ...blog,likes:0,user:user.id })
    const result=await newBlog.save()
    user.blogs=user.blogs.concat(result.id)
    await user.save()
    return res.status(201).send(result) 
  }
  blog=new Blog({ 
    ...blog,
    user:user.id 
  })
  let savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog.id)
  await user.save()
  return res.status(201).json(savedBlog) 
})

blogrouter.put('/:id', async(req,res) => {
    
  const updatedBlog=await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true, runValidators:true, context:'query' }
  )
  res.status(200).json(updatedBlog)
})

blogrouter.delete('/:id', async(req,res) => {
  const blog =await Blog.findById( req.params.id )
  if(!blog){
    return res.status(400).send({ error:'bad request' })
  }
  let user =req.user
  if(!user.id){
    return res.status(401).send({ error:'invalid token' })
  }

  if(blog  && blog.user.toString() === user.id){
    await Blog.findByIdAndDelete(req.params.id) 
    return res.status(200).end()
  }

  if( blog  && blog.user.toString() !== user.id ){
    return res.status(401).send({ error:'invalid user' }) 
  }
})

module.exports=blogrouter