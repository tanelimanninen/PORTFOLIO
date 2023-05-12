
const express = require('express') 
const cors = require('cors')
const app = express()
const port = 3000

// cors - allow connection from different domains and ports
app.use(cors())


app.use(express.json())

// mongo here...
const mongoose = require('mongoose')
const mongoDB = 'mongodb+srv://tanelimanninen:salasana@cluster1.0br92fa.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log("Database test connected")
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