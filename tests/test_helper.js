const User=require('../models/user')
const Blog=require('../models/bloglist')


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

const blogsInDb= async () => {
  const blogs= await Blog.find({})
  return blogs.map(blog => blog.toJSON())
  
  
}

const usersInDB=async () => {
  const users=await User.find({})
  return users.map(u => u.toJSON())
}


module.exports={
  initialblog,
  blogsInDb,
  usersInDB
}