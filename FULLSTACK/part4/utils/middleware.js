const logger = require('./logger')

//MIDDLEWARE 1: LOG INFO ABOUT REQUESTS COMING TO THE SERVER
const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

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

module.exports = {
  requestLogger,
  errorHandler
}