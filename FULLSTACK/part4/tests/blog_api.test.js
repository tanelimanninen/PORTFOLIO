const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
  await Blog.insertMany(helper.initialBlogs)
  console.log('done')
})

//1. TEST
test('current amount of json-formatted blog-objects are returned', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
  console.log(helper.initialBlogs.length)
})


afterAll(async () => {
  await mongoose.connection.close()
})
