const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')

//ROUTE 1: GET ALL DATA
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('bearer ')) {
    return authorization.replace('bearer ', '')
  }
  return null
}

//ROUTE 2: MAKE NEW BLOG OBJECT
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  //GET THE FIRST USER FROM DATA
  const user = await User.findById(decodedToken.id)

  //MODEL OF NEW OBJECT, IF LIKES ARE NOT DEFINED IT GETS VALUE OF 0
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0
  })

  //THIS WORKS WITH CONCAT
  try {
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
})

//ROUTE 3: DELETE ONE BLOG OBJECT
blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

//ROUTE 4: UPDATE DATA ON ONE BLOG OBJECT
blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  //MODEL OF OBJECT, IF LIKES ARE NOT DEFINED IT GETS VALUE OF 0
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(201).json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})


module.exports = blogsRouter