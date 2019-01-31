const mongoose = require('mongoose');
const PromptModelSchema = new mongoose.Schema({
    prompt: String
});

module.exports = mongoose.model('PromptModel', PromptModelSchema)