const mongoose = require('mongoose');
const PromptModelSchema = new mongoose.Schema({
    prompt: String, 
    timestamp: String

});

module.exports = mongoose.model('PromptModel', PromptModelSchema)