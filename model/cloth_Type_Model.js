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
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const clothType = new mongoose.model('cloth_type', clothSchema);
module.exports = clothType;