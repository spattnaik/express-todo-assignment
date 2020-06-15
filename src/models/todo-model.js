const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    isCompleted: {
        type: Boolean,
        required: true,
        default: false
    }
})
module.exports = mongoose.model('TODO', todoSchema);