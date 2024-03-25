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
    slug: String,
});

materialSchema.pre('save', async function (next) {
    this.slug = this.fabric.replaceAll(" ", "-")+price; 
    next();
});


const cloth_Material = new mongoose.model('cloth_fabric', materialSchema);
module.exports = cloth_Material;