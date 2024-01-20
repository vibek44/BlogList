const blogrouter=require('express').Router()
const Blog=require('../models/bloglist')
const User=require('../models/user')
const middleware=require('../middleware')

blogrouter.get('/',async(req,res) => {
  const result = await Blog.find({}).populate('user',{ username:1, name:1 })
  return res.json(result)   
})

blogrouter.post('/', middleware.userExtractor, async(req,res) => {
  let blog=req.body
  let user=req.user
  if(!user.id){
    return res.status(401).send({ error:'invalid token' })
  }
  if(!(blog.url && blog.title )){
    return res.status(400).send({ error:'title or url missing' })
  }
  user=await User.findById(user.id)
  
  if(!blog.likes) {
    blog =new Blog({ ...blog,likes:0,user:user.id })
    let result=await blog.save()
    user.blogs=user.blogs.concat(result.id)
    await user.save()
    
    return res.status(201).send({ id:result.id,
      title:result.title,
      author:result.author,
      likes:result.likes,
      url:result.url,
      user:{ name:user.name,username:user.username } 
    }) 
  }

  blog=new Blog({ 
    ...blog,
    user:user.id 
  })
  let savedBlog=await blog.save()
  user.blogs=user.blogs.concat(savedBlog.id)
  await user.save()
  return res.status(201).json({ id:savedBlog.id,
    title:savedBlog.title,
    author:savedBlog.author,
    likes:savedBlog.likes,
    url:savedBlog.url,
    user:{ name:user.name,username:user.username } }) 
})

blogrouter.put('/:id',middleware.userExtractor, async(req,res) => {
  const user=req.user
  if(!user.id){
    return res.status(401).send({ error:'invalid token' })
  }
  const updatedBlog=await Blog.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new:true, runValidators:true, context:'query' }
  ).populate('user',{ username:1, name:1 })
  res.status(200).json(updatedBlog)
})

blogrouter.delete('/:id',middleware.userExtractor, async(req,res) => {
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