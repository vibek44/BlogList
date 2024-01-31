const testingRouter = require('express').Router()
const Blog = require('../models/bloglist')
const User = require('../models/user')

testingRouter.post('/resetdb',async(req,res) => {
  await User.deleteMany({})
  await Blog.deleteMany({})
  res.status(204).end()

})

module.exports = testingRouter