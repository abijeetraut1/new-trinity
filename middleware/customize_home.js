const multer = require("multer");

var starage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(req.body)
        cb(null, "public/background");
    },

    filename: function (req, file, cb) {
        console.log(req.body)
        const name = req.body.backgroundImage.replaceAll(" ", "_") + "_" + file.fieldname + ".png" 
        cb(null, name);
    }
})

module.exports = {
    starage
};