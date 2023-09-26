const blogssRouter = require('express').Router()
const Blog = require('../models/blog')

//ROUTE 1: GET ALL DATA
blogssRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogssRouter.post('/', async (request, response, next) => {
  const body = request.body

  //MODEL OF NEW OBJECT WITH ADDITION, IF LIKES ARE NOT DEFINED IT GETS VALUE OF 0
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })

  const savedBlog = await blog.save()
  try {
    response.status(201).json(savedBlog)
  } catch(exception) {
    next(exception)
  }
  //response.json(savedBlog)
})

module.exports = blogssRouter