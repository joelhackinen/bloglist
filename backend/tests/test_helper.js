const Blog = require('../models/blog')
const User = require('../models/user')

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

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}




module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb
}