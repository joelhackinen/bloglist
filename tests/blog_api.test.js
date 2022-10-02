const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let token
let userId


const createAndLogin = async (username) => {
  const response1 = await api
    .post('/api/users')
    .send({username, password: 'test'})
    .expect(201)
  userId = mongoose.Types.ObjectId(response1.body.id)
  const response2 = await api
    .post('/api/login')
    .send({username, password: 'test'})
    .expect(200)
  token = response2.body.token
  return {userId, token}
}


beforeAll(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})
  await createAndLogin('test')
  await Blog.insertMany(helper.initialBlogs.map(blog => ({...blog, user: userId})))
  console.log(token)
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
  const newBlog = {
    title: 'testtitle',
    author: 'testauthor',
    url: 'tesurl',
    likes: 1
  }
  test('to /api/blogs will not add new blog without token', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)
  })

  test('to /api/blogs are adding a document', async () => {
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs.length).toBe(4)
    expect(blogs.map(r => r.title)).toContain('testtitle')
  })

  test('to /api/blogs will result in adding likes set to 0 when it is not preset', async () => {
    const { likes, ...blogWithoutLikes } = newBlog
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const removeIdAndUser = (blog) => {
      const { id, user, ...withoutId } = blog
      return withoutId
    }

    const response = await api.get('/api/blogs')
    const withoutIds = response.body.map(item => removeIdAndUser(item))
    expect(withoutIds).toContainEqual({...newBlog, likes: 0})
  })

  test('to /api/blogs should fail without fields "title" and "url"', async () => {
    const newBlog1 = { author: 'aaaa', url: 'nfff', likes: 1 }
    const newBlog2 = { title: 'yea', author: 'bbbb', likes: 2 }
    const newBlog3 = { author: 'asdf', likes: 3 }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog1)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog2)
      .expect(400)
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog3)
      .expect(400)
  })
})


describe('DELETE requests', () => {
  const newBlog = {
    title: "rocke",
    author: 'aaallla',
    url: 'nfuuff',
    likes: 98
  }

  test('to /api/blogs/id are working', async () => {
    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    const idToBeDeleted = postResult.body.id
    const beforeDelete = await helper.blogsInDb()

    await api
      .delete(`/api/blogs/${idToBeDeleted}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const afterDelete = await helper.blogsInDb()
    expect(beforeDelete.length).toBe(afterDelete.length+1)
    expect(afterDelete.map(item => item.id)).not.toContain(idToBeDeleted)
  })

  test('to /api/blogs/id will not work with wrong token', async () => {
    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    const idToBeDeleted = postResult.body.id
    const {anotherId, anotherToken} = await createAndLogin('anotherTest')
    await api
      .delete(`/api/blogs/${idToBeDeleted}`)
      .set('Authorization', `bearer ${anotherToken}`)
      .expect(401)
  })
})

describe('PUT requests', () => {
  const newBlog1 = { title: "rocke", author: 'aaallla', url: 'nfuuff', likes: 98 }
  test('to /api/blogs/id are working', async () => {
    const postResult = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog1)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const idToBeChanged = postResult.body.id
    
    const putResult = await api
      .put(`/api/blogs/${idToBeChanged}`)
      .set('Authorization', `bearer ${token}`)
      .send({...newBlog1, title: "MUOKATTU"})
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(putResult.body.title).toEqual("MUOKATTU")
  })
})


afterAll(() => {
  mongoose.connection.close()
})