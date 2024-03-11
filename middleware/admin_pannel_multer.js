const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/product_img");
    },

    filename: function (req, file, cb) {
        const name = req.body.cloth_type.replaceAll(" ", "_") + "_" + file.fieldname + ".png" 
        const filename = name;
        cb(null, filename);
    }
})


module.exports = {
    multer,
    storage
};