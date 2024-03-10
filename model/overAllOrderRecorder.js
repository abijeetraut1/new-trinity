const mongoose = require('mongoose');

const overall_ordered_items_schema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    }
});

const overall_ordered_item = new mongoose.model('overall_order_items', overall_ordered_items_schema);
module.exports = overall_ordered_item;