const mongoose = require('mongoose');
const UserModelSchema = new mongoose.Schema({
    creator_id: String,
    googleid: String, //is creator_id same as googleid
    creator_name: String,
    bio: String,
    stories: String,
    upvotes: String

});

module.exports = mongoose.model('UserModel', UserModelSchema)