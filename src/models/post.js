const mongoose = require('mongoose');

const PostModelSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    content: String,
    upvotes: String,
    timestamp: String

});

module.exports = mongoose.model('PostModel', PostModelSchema)