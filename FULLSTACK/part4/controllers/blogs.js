const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//ROUTE 1: GET ALL DATA
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

//ROUTE 2: MAKE NEW BLOG OBJECT
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //MODEL OF NEW OBJECT, IF LIKES ARE NOT DEFINED IT GETS VALUE OF 0
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