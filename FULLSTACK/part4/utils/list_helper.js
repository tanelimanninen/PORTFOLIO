/* eslint-disable no-unused-vars */
//ALWAYS RETURN 1
const dummy = (blogs) => {
  return 1
}

//COUNT THE TOTAL LIKES OF BLOG-OBJECTS IN BLOGS ARRAY
const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }

  return blogs.reduce(reducer, 0)
}

//FIND BLOG WITH MOST LIKES FROM BLOGS-ARRAY
const favouriteBLog = (blogs) => {
  const mostLikedBlog = blogs.reduce((maxLikesBlog, currentBlog) => {
    return currentBlog.likes > maxLikesBlog.likes ? currentBlog : maxLikesBlog
  })

  const filteredMostLikedBlog = {
    title: mostLikedBlog.title,
    author: mostLikedBlog.author,
    likes: mostLikedBlog.likes
  }

  return filteredMostLikedBlog
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBLog
}