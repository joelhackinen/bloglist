const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'kisu',
    author: 'kisufani',
    url: 'nA',
    likes: 999,
  },
  {
    title: 'doge',
    author: 'dogefani',
    url: 'wuh',
    likes: 666,
  },
  {
    title: 'cate',
    author: 'catefani',
    url: 'mau',
    likes: 696,
  },
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'blah', author: 'bloh', 'url': '-.-', likes: 222 })
  await blog.save()
  await blog.remove()

  return blog.id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}