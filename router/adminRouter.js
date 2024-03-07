const express = require("express");
const router = express.Router();

const authController = require("./../controller/userController");
const adminPageViewController = require("../controller/viewControllerFolder/adminViewController")

// router.get('/account', authController.isUserLoggedIn, viewController.products);
// only accessible to page admin
router.get('/dashboard-arrived', authController.isAdminLoggedIn, adminPageViewController.products);
router.get('/dashboard-dispatched', authController.isAdminLoggedIn, adminPageViewController.order);
router.get('/dashboard-price', authController.isAdminLoggedIn, adminPageViewController.price);
router.get('/dashboard-referralActivate', authController.isAdminLoggedIn, adminPageViewController.referralActivate);

module.exports = router;