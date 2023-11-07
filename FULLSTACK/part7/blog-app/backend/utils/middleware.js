const jwt = require("jsonwebtoken");
const logger = require("./logger");
const User = require("../models/user");

//MIDDLEWARE 1: LOG INFO ABOUT REQUESTS COMING TO THE SERVER
const requestLogger = (request, response, next) => {
  logger.info("Method:", request.method);
  logger.info("Path:  ", request.path);
  logger.info("Body:  ", request.body);
  logger.info("---");
  next();
};

//MIDDLEWARE 2: HANDLE SPECIFIC ERRORS
const errorHandler = (error, request, response, next) => {
  logger.error(error.message);
  logger.error(error.name);

  //CONDITION 1: IF NEW BLOG VALIDATION HAS ERRORS
  if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  //CONDITION 2: IF GIVEN ID IS UNRECOGNIZABLE
  else if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  //CONDITION 2: IF USER TOKEN HAS ERRORS
  else if (error.name === "JsonWebTokenError") {
    return response.status(400).json({ error: "token missing or invalid" });
  }
  //CONDITION 3: IF USER TOKEN TIME EXPIRES (15MIN)
  else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  }

  next(error);
};

//MIDDLEWARE 3: HANDLE UNKNOWN ENDPOINT REQUESTS
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

//FUNCTION TO RETRIEVE THE USER TOKEN FROM REQUEST
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

//MIDDLEWARE 4: GET THE USER TOKEN
const tokenExtractor = (request, response, next) => {
  request.token = getTokenFrom(request);
  console.log("Extracted token:", request.token);

  next();
};

//MIDDLEWARE 5: FIND OUT THE USER GIVING A REQUEST
const userExtractor = async (request, response, next) => {
  const token = getTokenFrom(request);

  //IF TOKEN EXISTS
  if (token) {
    const decodedToken = jwt.verify(token, process.env.SECRET);
    //IF TOKEN IS INVALID
    if (!decodedToken.id) {
      return response.status(401).json({ error: "token invalid" });
    }

    request.user = await User.findById(decodedToken.id);
  }

  next();
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};
