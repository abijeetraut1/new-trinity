const express = require('express');
const router = express.Router();

const authController = require('../controller/userController');
const viewController = require('../controller/viewControllerFolder/userViewController');

router.get('/', authController.isUserLoggedInForHome, viewController.homepage);
router.get('/login', viewController.login);
router.get("/forget-password", viewController.forgetPassword);
router.get('/design', authController.isUserLoggedIn, authController.protect, viewController.designPage);
router.get('/delivered/:id', authController.isUserLoggedIn, authController.protect, viewController.delivered);
router.get('/ordered-list', authController.isUserLoggedIn, viewController.track_order);
// router.get('/searched/:params', viewController.search);

router.get('/product/order/:material', authController.isUserLoggedIn, viewController.DesignorderPage);
// router.get('/product/:slug', authController.isUserLoggedIn, viewController.buypage);
router.get('/product/:slug/order', authController.isUserLoggedIn, viewController.orderPage);

// account section
router.get("/account/products", authController.isUserLoggedIn, viewController.products);
router.get("/account/refer", authController.isUserLoggedIn, viewController.refer);
router.get("/account/settings", authController.isUserLoggedIn, viewController.settings);
// router.get("/account/order", authController.isUserLoggedIn, viewController.account_section);
router.get("/account/payout", authController.isUserLoggedIn, viewController.payout);

module.exports = router;