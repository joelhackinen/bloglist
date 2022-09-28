const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  Blog.insertMany(helper.initialBlogs)
})

describe('GET requests', () => {
  test('to /api/blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.length).toBe(3)
  })
  test('to /api/blogs find documents with field "id"', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    response.body.forEach(item => {
      expect(item.id).toBeDefined()
    })
  })
})

describe('POST requests', () => {
  test('to /api/blogs are adding a document', async () => {
    const newBlog = {
      title: 'Only for testing purposes', author: 'asdf', url: 'nfff', likes: 39,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const response = await api.get('/api/blogs')
    const titles = response.body.map(r => r.title)
    expect(response.body).toHaveLength(helper.initialBlogs.length + 1)
    expect(titles).toContain('Only for testing purposes')
  })
  test('to /api/blogs will result in adding likes set to 0 when it is not preset', async () => {
    const newBlog = {
      title: 'Testing again', author: 'asdf', url: 'nfff'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const removeId = (blog) => {
      const { id, ...withoutId } = blog
      return withoutId
    }

    const response = await api.get('/api/blogs')
    const withoutIds = response.body.map(item => removeId(item))
    expect(withoutIds).toContainEqual({...newBlog, likes: 0})
  })
  test('to /api/blogs should fail without fields "title" and "url"', async () => {
    const newBlog1 = { author: 'asdf', url: 'nfff', likes: 39 }
    const newBlog2 = { title: 'yea', author: 'asdf', likes: 39 }
    const newBlog3 = { author: 'asdf', likes: 39 }
    await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlog2)
      .expect(400)
    await api
      .post('/api/blogs')
      .send(newBlog3)
      .expect(400)
  })
})


afterAll(() => {
  mongoose.connection.close()
})