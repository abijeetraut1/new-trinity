const express = require("express");
const router = express.Router();
const admin_data_controller = require("../controller/admin_data_controller");
const n_multer = require("multer");
const {
    multer,
    storage
} = require("./../middleware/admin_pannel_multer");


const upload = multer({
    storage
})

// for home page image upload
var starage = n_multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/background");
    },

    filename: function (req, file, cb) {
        const name = file.fieldname + Date.now() + ".png" 
        cb(null, name);
    }
})

const n_upload = n_multer({
    storage: starage
})


router.patch("/sended_product_to_user", admin_data_controller.sended_product_to_user);

// fabric type
router.post("/add_fabric", admin_data_controller.add_fabric);
router.delete("/delete_fabric", admin_data_controller.delete_fabric);
router.patch("/update_productStatus", admin_data_controller.update_productStatus);
router.post("/add_cloth_type", upload.fields([{
    name: "front",
    maxCount: 1
}, {
    name: "back",
    maxCount: 1
}]), admin_data_controller.add_cloth_type);

router.delete("/delete_cloth_type", admin_data_controller.delete_material_type);
router.post("/change_home_page_appearance", n_upload.single('backgroundImage'), admin_data_controller.change_home_page);

module.exports = router;