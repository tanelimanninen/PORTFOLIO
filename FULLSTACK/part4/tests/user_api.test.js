const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })

  await user.save()
})

describe('creating a user', () => {

  //1. TEST
  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'äijä123',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})


describe('validation of a new user', () => {

  //2. TEST
  test('creation fails when username already exists', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'sss',
    }

    //CHECK THAT NEW USER DOESN'T GO THROUGH AND GIVES EXPECTED STATUS CODE
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    //CHECK THAT THE CORRECT ERROR MESSAGE IS SHOWN
    expect(result.body.error).toContain('expected `username` to be unique')

    //CHECK THAT THE DATA LENGTH REMAINS THE SAME BEFORE POST ATTEMPT
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  //3. TEST
  test('creation fails when username is too short', async () => {
    const newUser = {
      username: 'r',
      name: 'Superuser',
      password: 'sss',
    }

    //CHECK THAT NEW USER DOESN'T GO THROUGH AND GIVES EXPECTED STATUS CODE
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    //CHECK THAT THE CORRECT ERROR MESSAGE IS SHOWN
    expect(result.body.error).toContain('Path `username` (`r`) is shorter than the minimum allowed length (3)')
  })

  //4. TEST
  test('creation fails when password field is missing', async () => {
    const newUser = {
      username: 'root2',
      name: 'NotSoSuperuser'
    }

    //CHECK THAT NEW USER DOESN'T GO THROUGH AND GIVES EXPECTED STATUS CODE
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    //CHECK THAT THE CORRECT ERROR MESSAGE IS SHOWN
    expect(result.body.error).toContain('Password is mandatory')
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})