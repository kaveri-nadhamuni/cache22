// filepath: ./src/db.js
const mongoose = require("mongoose");
const mongoURL = process.env.ATLAS_SRV;
const options = { useNewUrlParser: true };

// connects to MongoDB
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise; 
const db = mongoose.connection;
// error handler
db.on('error', console.error.bind(console, 'connection error:'));
// optional: run when connection is successful
db.on('connected', function() {
      console.log('database connected');
});

module.exports = db;