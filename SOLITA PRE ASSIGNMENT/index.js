const config = require('./utils/config')
const express = require('express') 
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const port = 3000

// cors - allow connection from different domains and ports
app.use(cors())


app.use(express.json())

// mongo here...
mongoose.connect(config.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

// Mongoose Scheema and Model here...


// define endpoint
app.get('/stations', (request, response) => {
  response.send('Hello from server side!')
})

// app listen port 3000
app.listen(port, () => {
  console.log('Example app listening on port 3000')
})