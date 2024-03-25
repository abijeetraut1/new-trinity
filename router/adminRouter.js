const express = require("express");
const router = express.Router();

const authController = require("./../controller/userController");
const adminController = require("./../controller/adminController");
const adminPageViewController = require("../controller/viewControllerFolder/adminViewController")

// router.get('/account', authController.isUserLoggedIn, viewController.products);
// only accessible to page admin
router.get('/dashboard_products', authController.isAdminLoggedIn, adminPageViewController.products);
router.get('/dashboard_products/:id', authController.isAdminLoggedIn, adminPageViewController.singleProductWithId);
router.get('/dashboard-dispatched', authController.isAdminLoggedIn, adminPageViewController.order);
router.get('/dashboard-material-type', authController.isAdminLoggedIn, adminPageViewController.tshrit_price);
router.get('/dashboard-fabric', authController.isAdminLoggedIn, adminPageViewController.tshrit_fabric);
router.get('/dashboard-referralActivate', authController.isAdminLoggedIn, adminPageViewController.referralActivate);
router.get("/dashboard-show-users", authController.isAdminLoggedIn, adminPageViewController.appoint_to_admin);
router.get("/change-home-page", authController.isAdminLoggedIn, adminPageViewController.change_image_page_layout);
router.get("/dashboard-database-clear", authController.isAdminLoggedIn, adminPageViewController.database_clear);


module.exports = router;