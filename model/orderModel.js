const mongoose = require('mongoose');
const product = require('./product');

const orderSchema = mongoose.Schema({
    orderedProduct: {
        type: mongoose.Schema.Types.ObjectId
    },
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
    qnt: {
        type: String,
    },
    color: {
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
    orderDate: Date
});


const order = new mongoose.model('order', orderSchema);
module.exports = order;