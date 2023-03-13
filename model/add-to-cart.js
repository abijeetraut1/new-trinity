const mongoose = require('mongoose');

const uploadSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    itemId: {
        type: mongoose.Schema.Types.ObjectId
    },
    
});


const cart = new mongoose.model('cart', uploadSchema);
module.exports = cart;