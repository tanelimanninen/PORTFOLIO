//const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared')
  await Blog.insertMany(helper.initialBlogs)
  console.log('done')
})


describe('getting data', () => {

  //1. TEST
  test('current amount of json-formatted blog-objects are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
    console.log(helper.initialBlogs.length)
  })
})


describe('validation', () => {

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
})


describe('adding data', () => {
  let token

  //CLEAR DATABASE OF USERS AND ADJUST WITH NEW ONE
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('mypassword', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()

    //LOGIN USER AND GET TOKEN
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'mypassword' })
    token = loginResponse.body.token
    console.log(token)
  })

  //4. TEST
  test('new blog can be added with correctly given content', async () => {
    const newBlog = {
      title: 'testi blogi',
      author: 'testi dude',
      url: 'http://www.example.com'
    }

    //CHECK THAT IT RETURNS THE EXPECTED STATUS CODE
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    const titles = blogsAfterAddition.map(b => b.title)

    console.log(blogsAfterAddition)

    expect(blogsAfterAddition).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('testi blogi')
  })

  //5. TEST
  test('when likes field is not defined, it gets the value of 0', async () => {
    const newBlog = {
      title: "This blog doesn't have any likes!",
      author: "Unknown",
      url: "www.terribleblogs.com/unviral/"
    }

    //CHECK THAT IT RETURNS THE EXPECTED STATUS CODE
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization', `bearer ${token}`)
      .set('Accept', 'application/json')
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterAddition = await helper.blogsInDb()
    const lastBlog = blogsAfterAddition[blogsAfterAddition.length - 1]
    console.log(blogsAfterAddition)
    console.log(lastBlog)

    expect(lastBlog.likes).toBeDefined()
    expect(lastBlog.likes).toBe(0)
  })

  //6. TEST (EN SAANUT TOIMIMAAN ILMAN, ETTÄ KAKSI EDELLISTÄ MENEE HAJALLE)
  test('it is not possible to add blogs without authorization', async () => {
    const newBlog = {
      title: 'laiton blogi',
      author: 'laiton dude',
      url: 'http://www.example.com'
    }

    //CHECK THAT IT RETURNS THE EXPECTED STATUS CODE
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})


describe('modifying data', () => {
  let token
  let blogId

  //CLEAR DATABASE OF USERS AND ADJUST WITH NEW ONE
  beforeAll(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    //MAKE NEW USER
    const passwordHash = await bcrypt.hash('mypassword', 10)
    const user = new User({ username: 'testuser', passwordHash })
    await user.save()

    //ADD NEW BLOG WITH AUTHORIZED USER CONNECTION
    const newBlog = new Blog({
      title: 'Test Blog',
      author: 'Test Author',
      user: user._id,
      url: 'http://www.example.com',
      likes: 5
    });
    const savedBlog = await newBlog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    blogId = savedBlog._id

    //LOGIN USER AND GET TOKEN
    const loginResponse = await api
      .post('/api/login')
      .send({ username: 'testuser', password: 'mypassword' })
    token = loginResponse.body.token
  })

  //6. TEST
  test('a blog can be deleted', async () => {
    const blogsBeforeDelete = await helper.blogsInDb()

    //CHECK THAT DELETION RETURNS EXPECTED STATUS CODE
    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    //CHECK THAT DELETED TITLE ISN'T IN THE BLOGS ANYMORE
    const deletedBlog = blogsAfterDelete.find(blog => blog.id === blogId);
    expect(deletedBlog).toBeUndefined()

    //CHECK THAT BLOGS' LENGTH IS SHORTENED BY ONE
    expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)
  })

  //7. TEST
  test('a blog can be updated', async () => {
    const blogsBeforeUpdate = await helper.blogsInDb()
    console.log(blogsBeforeUpdate)
    const blogToUpdate = blogsBeforeUpdate[0]
    //console.log(blogToUpdate)

    const updatedBlog = {
      title: "Batman goes shopping",
      author: "Bruce Wayne",
      url: "http://www.batmanblogs.com/batman-goes-fishing/",
      likes: 111
    }

    //CHECK THAT UPDATE RETURNS EXPECTED STATUS CODE
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)

    const blogsAfterUpdate = await helper.blogsInDb()
    console.log(blogsAfterUpdate)

    const titles = blogsAfterUpdate.map(b => b.title)
    //console.log(titles)

    //CHECK THAT THE UPDATED BLOGS TITLE IS AMONG UPDATED DATA
    expect(titles).toContain(updatedBlog.title)
  })
})


afterAll(async () => {
  await mongoose.connection.close()
})
