const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRouter = require('./auth');
const notesRouter = require('./notes'); // Implement similar to previous example, with user linkage
const connectToDB = require('./db');


connectToDB().then(async () => {
  const app = express();
  app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow all methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin'], // Explicitly allow these headers
    credentials: true // This might be necessary if your requests include credentials like cookies or authorization headers
  }));
  // mongoose.connect('mongodb+srv://arturpoghosyan1907:qQTSHk5ZrrndadTe@cluster0.ttyltps.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

  app.use(express.json());
  app.use(authRouter);
  app.use(notesRouter);

  app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

})