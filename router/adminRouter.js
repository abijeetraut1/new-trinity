const express = require("express");
const router = express.Router();

const authController = require("./../controller/userController");
const adminController = require("./../controller/adminController");
const adminPageViewController = require("../controller/viewControllerFolder/adminViewController")

// router.get('/account', authController.isUserLoggedIn, viewController.products);
// only accessible to page admin
router.get('/dashboard_products', authController.isAdminLoggedIn, adminPageViewController.products);
router.get('/dashboard-dispatched', authController.isAdminLoggedIn, adminPageViewController.order);
router.get('/dashboard-price', authController.isAdminLoggedIn, adminPageViewController.price);
router.get('/dashboard-referralActivate', authController.isAdminLoggedIn, adminPageViewController.referralActivate);
router.get("/dashboard-show-users", adminPageViewController.appoint_to_admin);
router.get("/dashboard-database-clear", adminPageViewController.database_clear);

module.exports = router;