const express = require('express');
const router = express.Router();
const multer = require('multer')

const productController = require('../controller/productController');
const authController = require('../controller/userController');
const viewController = require('../controller/viewController');

// router.get('/account', authController.isUserLoggedIn, viewController.products);
// only accessible to page admin
router.get('/dashboard-arrived', authController.isAdminLoggedIn, viewController.products);
router.get('/dashboard-done', authController.isAdminLoggedIn, viewController.order);
router.get('/dashboard-price', authController.isAdminLoggedIn, viewController.price);
router.get('/dashboard-referralActivate', authController.isAdminLoggedIn, viewController.referralActivate);


router.get('/', authController.isUserLoggedInForHome, viewController.homepage);
router.get('/login', viewController.login);
router.get('/delivered', viewController.delivered);
router.get('/design', authController.isUserLoggedIn, authController.protect, viewController.designPage);
router.get('/add-to-cart', authController.isUserLoggedIn, viewController.addToCart);
router.get('/searched/:params', viewController.search);

router.get('/product/order/:material', authController.isUserLoggedIn, viewController.DesignorderPage);
router.get('/product/:slug', authController.isUserLoggedIn, viewController.buypage);
router.get('/product/:slug/order', authController.isUserLoggedIn, viewController.orderPage);


module.exports = router;