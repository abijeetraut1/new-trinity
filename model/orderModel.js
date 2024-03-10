const mongoose = require('mongoose');
const product = require('./product');

const orderSchema = mongoose.Schema({
    orderedProduct: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
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
        required: true,
    },
    qnt: {
        type: String,
        required: true,
    },
    color: {
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
        type: String,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
});


const order = new mongoose.model('admin_designed_tshirt', orderSchema);
module.exports = order;