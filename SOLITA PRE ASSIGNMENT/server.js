const index = require('./index') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')

const server = http.createServer(index)

server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})