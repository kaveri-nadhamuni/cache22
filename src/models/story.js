const mongoose = require('mongoose');
const StoryModelSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    content: String,
    upvotes: String,
    timestamp: String

});

module.exports = mongoose.model('StoryModel',StoryModelSchema)