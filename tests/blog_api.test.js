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
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogs.map(r => r.title)
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
    const newBlog1 = { author: 'aaaa', url: 'nfff', likes: 1 }
    const newBlog2 = { title: 'yea', author: 'bbbb', likes: 2 }
    const newBlog3 = { author: 'asdf', likes: 3 }
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

describe('DELETE requests', () => {
  const newBlog1 = { title: "rocke", author: 'aaallla', url: 'nfuuff', likes: 98 }
  test('to /api/blogs/id are working', async () => {
    const postResult = await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(201)
    const idToBeDeleted = postResult.body.id
    const beforeDelete = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${idToBeDeleted}`)
      .expect(204)

    const afterDelete = await helper.blogsInDb()
    expect(beforeDelete.length).toBe(afterDelete.length+1)
    expect(afterDelete.map(item => item.id)).not.toContain(idToBeDeleted)
  })
})

describe('PUT requests', () => {
  const newBlog1 = { title: "rocke", author: 'aaallla', url: 'nfuuff', likes: 98 }
  test('to /api/blogs/id are working', async () => {
    const postResult = await api
      .post('/api/blogs')
      .send(newBlog1)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const idToBeChanged = postResult.body.id
    
    const putResult = await api
      .put(`/api/blogs/${idToBeChanged}`)
      .send({...newBlog1, title: "MUOKATTU"})
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(putResult.body.title).toEqual("MUOKATTU")
  })
})




afterAll(() => {
  mongoose.connection.close()
})