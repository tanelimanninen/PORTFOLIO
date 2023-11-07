const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
  const body = request.body;

  //CONDITION 1: IF PASSWORD IS MISSING
  if (!body.password) {
    return response.status(400).json({
      error: "Password is mandatory",
    });
  }
  //CONDITION 2: IF PASSWORD IS SHORTER THAN 3 characters
  else if (body.password.length < 3) {
    return response.status(400).json({
      error: "Password must be at least 3 characters",
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  try {
    const savedUser = await user.save();
    response.status(201).json(savedUser);
  } catch (exception) {
    next(exception);
  }
});

module.exports = usersRouter;
