const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
    // id is auto generated by mongo db, hence may not need to be added here
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    dueDate: {
        type: Date,
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    }
})
module.exports = mongoose.model('TODO', todoSchema);