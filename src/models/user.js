const mongoose = require('mongoose');
const UserModelSchema = new mongoose.Schema({
    googleid: String, 
    name: String,
    submitStatus: Boolean,
});

module.exports = mongoose.model('UserModel', UserModelSchema)