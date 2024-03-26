const express = require('express');
const router = express.Router();
const n_multer = require("multer");

const {
    multer,
    storage
} = require("../middleware/multer");

const upload = multer({
    storage
});

// admin upload tshirt
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

const productController = require('../controller/productController');
const authController = require('../controller/userController');
const adminController = require('../controller/adminController');

router.post('/design/upload', authController.isAdminLoggedIn, n_upload.fields([{name: "front", maxCount: 1}, {name:"back", maxCount: 1}]), productController.uploadDesign);
router.post('/design/changeDestination', productController.changeDatabase);
router.post('/orderrecord', productController.orderRecorder);
router.post('/directorderrecord', authController.isUserLoggedIn,  upload.array('sticker', 6), productController.Design_Order_Record);
router.delete('/design/deleteRequestTshirt', productController.deleteProduct);
router.patch('/updatePrice', productController.changePrice);

router.delete("/deleteAllData", adminController.deleteAllData);

// router.get('/', productController.getAllProduct);
// router.post('/uploadProduct', productController.upload);
// router.post('/upload-image', productController.uploadUserPhoto, adminRender.uploadForm);


// router.get('/:slug', productController.getItem);
// router.get('/:slug/order', authController.protect, productController.buyRecorder)
// router.post('/postimage', authController.protect, productController.uploadUserPhoto, productController.resizeUserPhoto, productController.work)

// transfer set the product is send to user
router.patch("/order-send-to-user", authController.isAdminLoggedIn, productController.send_product_to_users);

module.exports = router;