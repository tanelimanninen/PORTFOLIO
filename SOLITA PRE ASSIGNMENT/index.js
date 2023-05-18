const config = require('./utils/config')
const express = require('express') 
const cors = require('cors')
const app = express()
const fs = require('fs');
const mongoose = require('mongoose')
const http = require('http')
const csv = require('csvtojson');
const { MongoClient } = require('mongodb')
const path = require('path');

// create an HTTP server
const server = http.createServer(app)

// cors - allow connection from different domains and ports
app.use(cors())

app.use(express.json())

// MongoDB connection setup
const MONGODB_URI = config.MONGODB_URI;
const DB_NAME = 'helsinki_espoo_citybikes'; // existing database name

// mongo here...
mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => {
    console.log('Error connection to MongoDB:', error.message)
  })

// Mongoose Model here...


// Endpoint to GET the stations data
app.get('/stations', async (request, response) => {
  try {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    console.log('Connected to MongoDB');

    // Use the default database or provide a specific database name
    const db = client.db(DB_NAME);

    // Fetch the stations collection data
    const stations = await db.collection('stations').find().toArray();

    response.json(stations);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    response.status(500).json({ error: 'Failed to fetch stations' });
  }
});


// Endpoint to import CSV file to MongoDB
app.post('/import-csv', async (req, res) => {
  try {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    /*console.log('Connected to MongoDB');*/

    // Use the default database or provide a specific database name
    const db = client.db(DB_NAME);

    // Read and import CSV file data to MongoDB
    const jsonArray = await csv().fromFile(req.body.path);
    const result = await db.collection('stations').insertMany(jsonArray);

    console.log('CSV file successfully imported to MongoDB. Total documents:', result.insertedCount);
    client.close();

    res.status(200).json({ message: 'CSV import initiated' });
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    res.status(500).json({ error: 'Failed to import CSV to MongoDB' });
  }
});

app.use(express.static(path.join(__dirname, './citybike-app/build/')));

// app listen port 3000
server.listen(config.PORT, () => {
  console.log(`Example app listening on port ${config.PORT}`)
})