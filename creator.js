const mongoose = require('mongoose');
const StoryModelSchema = new mongoose.Schema({
    creator_id: String,
    creator_name: String,
    bio: String,
    stories: String,
    upvotes: String

});

module.exports = mongoose.model('CreatorModel',CreatorModelSchema)