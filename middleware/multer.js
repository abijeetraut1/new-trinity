    const multer = require("multer");


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "public/images/product/upload/sticker");
        },

        filename: function (req, file, cb) {
            const filename = Date.now() + '-' + Math.round(Math.random() * 1E9)+".png";
            cb(null, filename);
        }
    })


    module.exports = {
        multer,
        storage
    };