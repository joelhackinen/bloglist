const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  return listOfBlogs.reduce((sum, next) => sum + next.likes, 0)
}

const favouriteBlog = (listOfBlogs) => {
  return listOfBlogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (listOfBlogs) => {
  const authors = _.countBy(listOfBlogs, 'author')
  const zipped = _.zip(Object.keys(authors), Object.values(authors))
  const asList = zipped.reduce((prev, current) => (prev[1] > current[1]) ? prev : current)
  return {author: asList[0], blogs: asList[1]}
}

const mostLikes = (listOfBlogs) => {
  let authorWithMostLikes = ''
  let likesSum = 0
  const grouped = _.groupBy(listOfBlogs, 'author')
  Object.keys(grouped).forEach((author) => {
    let sum = (grouped[author]).reduce((sum, current) => sum + current.likes, 0)
    if (sum > likesSum) {
      likesSum = sum
      authorWithMostLikes = author
    }
  })
  return { author: authorWithMostLikes, likes: likesSum }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}