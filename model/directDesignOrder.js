const mongoose = require('mongoose');
const product = require('./product');

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    number: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    front: {
        type: String,
        required: true,
    },
    back: {
        type: String,
        required: true,
    },
    sticker: {
        type: [String],
        required: true,
    },
    material: {
        type: String,
        required: true,
    },

    orderDate: Date
});


const directOrder = new mongoose.model('directOrder', orderSchema);
module.exports = directOrder;