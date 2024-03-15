const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    name: {
        type: String,
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
    alt_number: {
        type: Number,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    ward_no: {
        type: Number,
        required: true,
    },
    toll_name: {
        type: String,
        required: true,
    },
    land_mark: {
        type: String,
        required: true,
    },
    material: {
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
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        default: "white"
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