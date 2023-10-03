const jwt = require('jsonwebtoken')
const logger = require('./logger')
const User = require('../models/user')

const decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET)
  } catch (error) {
    return null
  }
}

//FUNCTION TO GET THE USER FROM THE TOKEN
const getUserFromToken = async (token) => {
  const decodedToken = decodeToken(token)
  if (!decodedToken || !decodedToken.id) {
    return null
  }

  const user = await User.findById(decodedToken.id);
  return user
}


//MIDDLEWARE 1: LOG INFO ABOUT REQUESTS COMING TO THE SERVER
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//MIDDLEWARE 2: HANDLE SPECIFIC ERRORS
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  logger.error(error.name)

  //CONDITION 1: IF NEW BLOG VALIDATION HAS ERRORS
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  //CONDITION 2: IF USER TOKEN HAS ERRORS
  else if (error.name ===  'JsonWebTokenError') {
    return response.status(400).json({ error: 'token missing or invalid' })
  }

  next(error)
}

//MIDDLEWARE 3: GET THE USER TOKEN
const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')

  if (authorization && authorization.startsWith('bearer ')) {
    request.token = authorization.replace('bearer ', '')
  } else {
    request.token = null
  }

  console.log('Extracted token:', request.token)
  next()
}

//MIDDLEWARE 4: FIND OUT THE USER GIVING A REQUEST
const userExtractor = async (request, response, next) => {
  const token = request.token

  if (!token) {
    request.user = null
  } else {
    const user = await getUserFromToken(token)
    request.user = user
  }

  next()
}


module.exports = {
  requestLogger,
  errorHandler,
  tokenExtractor,
  userExtractor
}