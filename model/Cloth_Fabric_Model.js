const mongoose = require('mongoose');

const materialSchema = mongoose.Schema({
    price: {
        type: Number,
        required: true,
    },
    fabric: {
        type: String,
        required: true,
        unique: true,
    },
    slug: String,
});

materialSchema.pre('save', async function (next) {
    this.slug = this.fabric.replaceAll(" ", "-");
    next();
});


const cloth_Material = new mongoose.model('cloth_fabric', materialSchema);
module.exports = cloth_Material;