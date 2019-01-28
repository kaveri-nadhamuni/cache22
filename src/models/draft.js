const mongoose = require('mongoose');

const DraftModelSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    prompt: String,
    content: String,
    date: String

});

module.exports = mongoose.model('DraftModel', DraftModelSchema)