const mongoose = require('mongoose');

const clothSchema = mongoose.Schema({
    price: {
        type: Number,
    },
    front: {
        type: String,
        required: true,
        unique: true,
    },
    back: {
        type: String,
        required: true,
        unique: true,
    },
    cloth_type: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
});

const clothType = new mongoose.model('cloth_type', clothSchema);
module.exports = clothType;