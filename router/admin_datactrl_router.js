const express = require("express");
const router = express.Router();
const admin_data_controller = require("../controller/admin_data_controller");
const {
    multer,
    storage
} = require("./../middleware/admin_pannel_multer");

const upload = multer({
    storage
})


router.patch("/sended_product_to_user", admin_data_controller.sended_product_to_user);

// fabric type
router.post("/add_fabric", admin_data_controller.add_fabric);
router.delete("/delete_fabric", admin_data_controller.delete_fabric);
router.patch("/update_productStatus", admin_data_controller.update_productStatus);
// material type
router.post("/add_cloth_type", upload.fields([{
    name: "front",
    maxCount: 1
}, {
    name: "back",
    maxCount: 1
}]), admin_data_controller.add_cloth_type);

router.delete("/delete_cloth_type", admin_data_controller.delete_material_type);

module.exports = router;