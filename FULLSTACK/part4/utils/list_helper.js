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

//FIND THE AUTHOR WITH MOST BLOGS WRITTEN
const mostBlogs = (blogs) => {
  const blogCounts = blogs.reduce((counts, blog) => {
    const author = blog.author
    //GET COUNT OF SPECIFIC AUTHOR (IF AUTHOR IS NEW TO COUNTS-OBJECT, SET IT TO 0)
    counts[author] = (counts[author] || 0) + 1

    if (counts[author] > counts.maxBlogs) {
      counts.maxBlogs = counts[author]
      counts.mostBlogsAuthor = author
    }
    return counts
  }, { maxBlogs: -1 })

  return {
    author: blogCounts.mostBlogsAuthor,
    blogs: blogCounts.maxBlogs
  }
}


module.exports = {
  dummy,
  totalLikes,
  favouriteBLog,
  mostBlogs
}