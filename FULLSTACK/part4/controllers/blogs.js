const blogssRouter = require('express').Router()
const Blog = require('../models/blog')

//ROUTE 1: GET ALL DATA
blogssRouter.get('/', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

blogssRouter.post('/', (request, response) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = blogssRouter