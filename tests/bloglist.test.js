const supertest=require('supertest')
const app=require('../app')
const Blog=require('../models/bloglist')

const api=supertest(app)

const initialblog=[
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
       
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 62,
  },
]

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




