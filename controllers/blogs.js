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
  const result = await (new Blog(blogToBeAdded)).save()
  response.status(201).json(result)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.find(request.params.id)
  response.json(blog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = request.body
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter