const express = require('express');
const router = express.Router();


const productController = require('../controller/productController');
const authController = require('../controller/userController');

router.post('/design/upload', authController.isAdminLoggedIn, productController.uploadDesign);
router.post('/design/changeDestination', productController.changeDatabase);
router.post('/orderrecord', productController.orderRecorder);
router.post('/add-to-cart', productController.addToCart);
router.delete('/cartDelete', productController.cartDelete);
router.post('/directorderrecord', productController.directorderrecord);
router.delete('/design/deleteRequestTshirt', productController.deleteProduct);
router.patch('/updatePrice', productController.changePrice);


// router.get('/', productController.getAllProduct);
// router.post('/uploadProduct', productController.upload);
// router.post('/upload-image', productController.uploadUserPhoto, adminRender.uploadForm);


// router.get('/:slug', productController.getItem);
// router.get('/:slug/order', authController.protect, productController.buyRecorder)
// router.post('/postimage', authController.protect, productController.uploadUserPhoto, productController.resizeUserPhoto, productController.work)

module.exports = router;