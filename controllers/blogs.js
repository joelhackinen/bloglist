const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const blog = request.body
  const blogToBeAdded = blog.hasOwnProperty('likes')
    ? new Blog(blog)
    : new Blog({...blog, likes: 0})
  if (blog.hasOwnProperty('title') && blog.hasOwnProperty('url')) {
    const result = await (new Blog(blogToBeAdded)).save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter