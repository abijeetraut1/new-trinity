const catchAsync = require("../utils/catchAsync");
const directDesignOrderModel = require("./../model/directDesignOrder");
const ordersModel = require("./../model/orderModel");
const productsModel = require("./../model/product");
const usersModel = require("./../model/signup");
const sendedDesignModel = require("./../model/sendedDesign");
const cartsModel = require("./../model/add-to-cart");

const statusFunc = (res, statusNumber, message) => {
    res.status(statusNumber).json({
        status: statusNumber,
        message
    });
}


exports.deleteAllData = catchAsync(async (req, res) => {
    await directDesignOrderModel.deleteMany({});
    await ordersModel.deleteMany({});
    await productsModel.deleteMany({});
    await usersModel.deleteMany({});
    await sendedDesignModel.deleteMany({});
    await cartsModel.deleteMany({});

    res.status(200).json({
        status: 200,
        message: "clear the database",
    })
})

exports.change_user_to_admin = async (req, res, next) => {
    const userId = req.body.id;

    const user = await usersModel.findById({
        _id: userId
    });

    if (user.role === "admin") {
        return statusFunc(res, 200, "failed", "cannot update admin role");
    }

    await usersModel.findOneAndUpdate({
        _id: userId
    }, {
        role: "sub-admin"
    }, {
        new: true
    }).then(() => {
        statusFunc(res, 200, "updated user")
        // res, statusNumber, statusMessage, message
    }).catch(err => {
        statusFunc(res, 501, "failed! please reload");
    })
}


exports.remove_sub_admin = async (req, res, next) => {
    const userId = req.body.id;

    const user = await usersModel.findById({
        _id: userId
    });

    if (user.role === "admin") {
        return statusFunc(res, 200, "failed", "cannot update admin role");
    }

    await usersModel.findOneAndUpdate({
        _id: userId
    }, {
        role: "user"
    }, {
        new: true
    }).then(() => {
        statusFunc(res, 200, "updated sub-admin")
        // res, statusNumber, statusMessage, message
    }).catch(err => {
        statusFunc(res, 501, "failed! please reload");
    })
}


// deleteUser
exports.deleteUser = async (req, res, next) => {
    const userId = req.body.id;

    const user = await usersModel.findById({
        _id: userId
    });

    if (user.role === "admin") {
        return statusFunc(res, 200, "failed", "cannot update admin role");
    }

    await usersModel.deleteOne({
        _id: userId
    }).then(() => {
        statusFunc(res, 200, "user delete successfully");
    }).catch(err => {
        statusFunc(res, 501, "failed! please reload");
    })
}