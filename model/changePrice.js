const mongoose = require('mongoose');

const clothSchema = mongoose.Schema({
    type: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
    }
});

const clothType = new mongoose.model('clothType', clothSchema);
module.exports = clothType;