const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body);
        console.log(req.file, req.files);
        cb(null, "/images/product/upload/sticker");
    },

    filename: function (req, file, cb) {
        const filename = "hello.png";
        cb(null, filename);
    }
})

module.exports = {
    multer,
    storage
};