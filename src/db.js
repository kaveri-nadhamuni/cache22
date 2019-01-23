// filepath: ./src/db.js
const mongoose = require("mongoose");
const mongoURL = 'mongodb+srv://admin:165612q@cluster0-oq6hw.mongodb.net/test?retryWrites=true';
const options = { useMongoClient: true };

// connects to MongoDB
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise; 
const dbConnection = mongoose.connection;
// error handler
dbConnection.on('error', console.error.bind(console, 'connection error:'));
// optional: run when connection is successful
dbConnection.on('connected', function() {
      console.log('database connected');
});

module.exports = db;