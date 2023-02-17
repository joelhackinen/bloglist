const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
})


describe('POST requests', () => {
  test('to /api/users succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('to /api/users fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('to /api/users fails with incorrect credentials', async () => {
    const newUser1 = {username: 'ro', name: 'Superuser', password: 'salainen'}
    const newUser2 = {username: 'robo', name: 'Superuser', password: 's'}
    const newUser3 = {name: 'Superuser', password: 'salainen'}
    const result1 = await api
      .post('/api/users')
      .send(newUser1)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result1.body.error).toContain('invalid or missing username')
    const result2 = await api
      .post('/api/users')
      .send(newUser2)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result2.body.error).toContain('invalid or missing password')
    const result3 = await api
      .post('/api/users')
      .send(newUser3)
      .expect(400)
      .expect('Content-Type', /application\/json/)
      
    expect(result3.body.error).toContain('invalid or missing username')
  })
})