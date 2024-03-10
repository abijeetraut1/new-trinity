const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    price: {
        type: Number,
    },
    material: {
        type: String,
        required: true,
        unique: true,
    },
});

const cloth_Material = new mongoose.model('cloth_material', materialSchema);
module.exports = cloth_Material;