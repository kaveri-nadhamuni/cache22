const mongoose = require('mongoose');
const UserModelSchema = new mongoose.Schema({
    googleid: String, //is creator_id same as googleid
    name: String,
    bio: String,
    stories: String,
    upvotes: String

});

module.exports = mongoose.model('UserModel', UserModelSchema)