const mongoose = require('mongoose');

const PostModelSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    prompt: String,
    content: String,
    upvotes: Number,
    timestamp: String

});

module.exports = mongoose.model('PostModel', PostModelSchema)