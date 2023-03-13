const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: {
        type: String,
    },
    number: {
        type: Number,
    },
    name: {
        type: String,
    },
    area: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
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


const order = new mongoose.model("sendedItem", orderSchema);
module.exports = order;