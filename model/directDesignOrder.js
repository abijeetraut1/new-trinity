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
    },
    front: {
        type: String,
    },
    back: {
        type: String,
    },
    sticker: {
        type: String,
    },
    material: {
        type: String,
    },
    payment: {
        type: String,
    },

    orderDate: Date
});


const directOrder = new mongoose.model('directOrder', orderSchema);
module.exports = directOrder;