const dummy = (blogs) => {
  return 1
}

const totalLikes = (listOfBlogs) => {
  return listOfBlogs.reduce((sum, next) => sum + next.likes, 0)
}


module.exports = {
  dummy,
  totalLikes
}