const mongoose = require('mongoose');

const landing_page_schema = mongoose.Schema({
    highlightText: {
        type: String,
    },
    supportingText: {
        type: String,
    },
});

const landing_page = new mongoose.model('landing_page_design_change', landing_page_schema);
module.exports = landing_page;