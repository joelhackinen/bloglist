const authRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')


authRouter.post('/', async (request, response) => {
  const { token: oldToken } = request.body

  const decodedToken = jwt.verify(oldToken, process.env.SECRET)

  if (!decodedToken) {
    return response.status(401).json({
      error: 'token expired'
    })
  }

  const user = await User.findById(decodedToken.id.toString())
  console.log(user)
  if (!user) {
    return response.status(401).json({
      error: 'user not found'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60 }
  )

  response
    .status(200)
    .send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports = authRouter