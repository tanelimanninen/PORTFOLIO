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

//2. TEST
test('identification field of the returned blogs is called `id`', async () => {
  const response = await api.get('/api/blogs')
  const blogs = response.body
  console.log(blogs)

  //GO THROUGH AN ARRAY OF RETURNED BLOGS AND EXPECT THEM TO HAVE IDS
  blogs.forEach(blog => {
    expect(blog).toBeDefined()
  })
})

//3. TEST
test('new blog can be added with given content', async () => {
  const newBlog = {
    title: 'testi blogi',
    author: 'testi dude',
    url: 'http://www.example.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  const titles = blogsAfterAddition.map(b => b.title)
  const authors = blogsAfterAddition.map(b => b.author)

  console.log(blogsAfterAddition)

  expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)
  expect(titles).toContain('testi blogi')
  expect(authors).toContain('testi dude')
})

//4. TEST
test('when likes field is not defined, it gets the value of 0', async () => {
  const newBlog = {
    title: "This blog doesn't have any likes!",
    author: "Unknown",
    url: "www.terribleblogs.com/unviral/"
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfterAddition = await helper.blogsInDb()
  const lastBlog = blogsAfterAddition[blogsAfterAddition.length - 1]
  console.log(blogsAfterAddition)
  console.log(lastBlog)

  expect(lastBlog.likes).toBeDefined()
  expect(lastBlog.likes).toBe(0)
})

//5. TEST
test('when title/url is undefined, it returns status code 400 bad request', async () => {
  const newBlog = {
    author: "Author",
    url: "www.blogwithoutatitle.com/",
    likes: 200
  }

  //CHECK THAT IT RETURNS THE EXPECTED STATUS CODE
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  //CHECK THAT NOTHING ISN'T ADDED TO THE DATA
  const blogsAfterAddition = await helper.blogsInDb()
  expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length)
})


afterAll(async () => {
  await mongoose.connection.close()
})
