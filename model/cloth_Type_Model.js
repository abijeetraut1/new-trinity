const mongoose = require('mongoose');

const clothSchema = mongoose.Schema({
    price: {
        type: Number,
    },
    front: {
        type: String,
        required: true,
        unique: true,
    },
    back: {
        type: String,
        required: true,
        unique: true,
    },
    cloth_type: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
    },
    slug: String,
});

clothSchema.pre('save', async function (next) {
    this.slug = this.cloth_type.replaceAll(" ", "-"); 
    next();
});

const clothType = new mongoose.model('cloth_type', clothSchema);
module.exports = clothType;