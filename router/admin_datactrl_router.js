const express = require("express");
const router = express.Router();
const admin_data_controller = require("../controller/admin_data_controller"); 
// admin_data_controller.js

router.patch("/sended_product_to_user", admin_data_controller.sended_product_to_user);

module.exports = router;