const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

//const { userExtractor } = require('../utils/middleware')

//ROUTE 1: GET ALL DATA
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })

  response.json(blogs)
})

//ROUTE 2: MAKE NEW BLOG OBJECT
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body

  //GET THE USER WITH TOKEN
  const user = request.user

  if (!user) {
    return response.status(401).json({ error: 'operation not permitted' })
  }

  //MODEL OF NEW OBJECT, IF LIKES ARE NOT DEFINED IT GETS VALUE OF 0
  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0
  })

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
  //GET THE BLOG TO DELETE
  const blog = await Blog.findById(request.params.id)

  const user = request.user

  //CHECK IF USER IS AUTHORIZED
  if (!user || blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Not authorized to delete this' })
  }

  //FILTER OUT THE DELETED BLOG FROM USER OBJECTS BLOGS FIELD
  user.blogs = user.blogs.filter(b => b.toString() !== blog.id.toString() )

  await user.save()
  await blog.deleteOne()

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