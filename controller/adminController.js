const catchAsync = require("../utils/catchAsync");
const directDesignOrderModel = require("./../model/directDesignOrder");
const ordersModel = require("./../model/orderModel");
const productsModel = require("./../model/product");
const usersModel = require("./../model/signup");
const sendedDesignModel = require("./../model/sendedDesign");
const cartsModel = require("./../model/add-to-cart");


exports.deleteAllData = catchAsync(async (req, res) => {
    const clearDirectDesignDatabase = await directDesignOrderModel.deleteMany({});
    const order = await ordersModel.deleteMany({});
    const products = await productsModel.deleteMany({});
    const userModel = await usersModel.deleteMany({});
    const sendedDesign = await sendedDesignModel.deleteMany({});
    const addToCarts = await cartsModel.deleteMany({});

    res.status(200).json({
        status: 200,
        message: "clear the database",
        clearDirectDesignDatabase,
        order,
        products,
        userModel,
        sendedDesign,
        addToCarts
    })
})