const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    userID: {
        type: mongoose.Schema.Types.ObjectId,
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
    sendStatus: {
        type: Boolean,
        default: false
    },
    orderDate: {
        type: Date,
    },
});

orderSchema.pre("save", async function (next) {
    const currentDate = new Date();

    this.orderDate = currentDate;
    next();
})

const directOrder = new mongoose.model('user_designed_tshirt', orderSchema);
module.exports = directOrder;