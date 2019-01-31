const mongoose = require('mongoose');
const SubmitStatModelSchema = new mongoose.Schema({
    user_id: String, 
    date: String,
});

module.exports = mongoose.model('SubmitStatModel', SubmitStatModelSchema)