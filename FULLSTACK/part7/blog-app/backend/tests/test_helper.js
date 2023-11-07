const Blog = require("../models/blog");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "Batman goes fishing",
    author: "Bruce Wayne",
    url: "http://www.batmanblogs.com/batman-goes-fishing/",
    likes: 6000000,
  },
  {
    title: "Ei niitä hevosia tänne!",
    author: "Merimies",
    url: "http://www.hevoset.com/",
    likes: 120,
  },
  {
    title: "100 Greatest SinäTuubaPaska's of All Time",
    author: "Taneli Manninen & Atte Jämsen",
    url: "http://www.example.com",
    likes: 345000,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = { initialBlogs, blogsInDb, usersInDb };
