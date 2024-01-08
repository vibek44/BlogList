const bcrypt = require('bcrypt')
const User = require('../models/user')
const { usersInDB } = require('./test_helper')
const supertest=require('supertest')
const app=require('../app')

const api=supertest(app)

describe('when there is initially one user in db',() => {
  beforeEach(async() => {
    await User.deleteMany({})
    const passwordHash=await bcrypt.hash('aecret', 10)
    const user=new User({ username:'frimpey', passwordHash })
    await user.save()
  })
  test('creation succeds with fresh username',async() => {
    const usersAtStart=await usersInDB()
    const newuser={ username:'siva hannela',name:'shannela',password:'domrew' }
    
    await api
      .post('/api/users')
      .send(newuser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd=await usersInDB()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)

    const usernames=usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newuser.username)

  })
})