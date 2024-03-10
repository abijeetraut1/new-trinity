const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    area: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    qnt: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    front: {
        type: String,
        required: true
    },
    back: {
        type: String,
        required: true
    },
    sticker: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        required: true
    }
});

const order = new mongoose.model("sended_design_by_users", orderSchema);
module.exports = order;