const mongoose=require('mongoose')
const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/bloglist')
const { initialblog,blogsInDb }=require('./test_helper')


const api=supertest(app)


beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObject=initialblog.map((blog) => new Blog(blog))
  const promiseArray=blogObject.map((blog) => blog.save())
  await Promise.all(promiseArray)
})

test('blog list returns current amount of bloglist in JSON format', async() => {
  const response=await api.get('/api/blogs').expect('Content-type',/application\/json/)
  expect(response.body).toHaveLength(initialblog.length)
})

test('unique identifier property of blog post is named id', async() => {
  const response= await api.get('/api/blogs')
  response.body.map(blogs => expect(blogs.id).toBeDefined())
})

test('Post request and total number of blogs is correct', async() => {
  const newblog={
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
  await api
    .post('/api/blogs')
    .send(newblog)
  const response = await blogsInDb()
  const contents = response.map(el => el.title)
  expect(response).toHaveLength(initialblog.length+1)
  expect(contents).toContain('Type wars')
})

test('if likes property misssing default to value 0',async() => {
  const newblog={
    title: 'Type wars',
    author: 'QRobert C. Martiin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',

  }
  const response=await api
    .post('/api/blogs')
    .send(newblog)

  expect(response.body.likes).toBe(0)
})

test('title or url is missing, backend respond with 400', async() => {
  const blog={
    author: 'Michael Chan',
    likes: 7,
  }
  await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)
})

test.only('blog with valid id is deleted successfully', async() => {
  const blogAtStart=await blogsInDb()
  const blogToDelete=blogAtStart[1]
  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogAtEnd=await blogsInDb()
  expect(blogAtEnd).toHaveLength(blogAtStart.length-1)

  const blogTitles=blogAtEnd.map(blog => blog.title)
  expect(blogTitles).not.toContain(blogToDelete.title)

})

afterAll( async() => {
  await mongoose.connection.close()
})
