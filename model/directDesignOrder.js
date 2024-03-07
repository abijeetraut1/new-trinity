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
    sendStatus: {
        type: Boolean,
        default: false
    },
    orderDate: Date,
});

orderSchema.pre("save", async function (next) {
    const currentDate = new Date();

    // Get the current year, month, and day
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // January is 0, so we add 1
    const day = currentDate.getDate();

    // Format the date as needed
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    
    this.orderDate = currentDate;
    next();
})

const directOrder = new mongoose.model('directOrder', orderSchema);
module.exports = directOrder;