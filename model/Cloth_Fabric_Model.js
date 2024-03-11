const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    price: {
        type: Number,
    },
    fabric: {
        type: String,
        required: true,
        unique: true,
    },
});

const cloth_Material = new mongoose.model('cloth_fabric', materialSchema);
module.exports = cloth_Material;