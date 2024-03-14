const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const adminController = require('../controller/adminController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.patch('/updatepassword', userController.protect, userController.updatePassword);
router.patch('/changePassword', userController.changePassword);
router.get('/forgetPassword/:email', userController.forgetPassword);
router.patch('/resetPassword/:resetToken', userController.resetPassword);
router.get('/isloggedin', userController.isUserLoggedIn);
router.get('/logout', userController.protect, userController.logout);
router.post('/adminLogin', userController.adminLogin);
router.post('/finduser', userController.checkReferral);
router.patch('/activateCutoff', userController.cutoffReg);
router.patch('/deactivateCutoff', userController.cutoffDelete);
router.post('/checkCode', userController.checkCode);

router.patch("/appoint-sub-admin", adminController.change_user_to_admin);
router.patch("/remove-sub-admin", adminController.remove_sub_admin);
router.delete("/delete-user", adminController.deleteUser);

module.exports = router;