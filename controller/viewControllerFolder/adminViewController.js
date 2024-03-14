const directDesignOrder = require('../../model/admin_designed_tshirt');
const price = require('../../model/cloth_Type_Model');
const user = require("./../../model/signup");
const ordersModel = require("../../model/orderModel");
const productsModel = require("../../model/product");
const sendedDesignModel = require("../../model/sended_design_by_users_model");
const cartsModel = require("./../../model/add-to-cart");
const cloth_fabric = require("./../../model/Cloth_Fabric_Model");
const catchAsync = require('../../utils/catchAsync');

// admin only
exports.products = catchAsync(async (req, res, next) => {
    const ordereditem = await directDesignOrder.find({
        sendStatus: 0
    });
    console.log(ordereditem);
    res.status(200).render('admin_pannel/dashboard_product.pug', {
        ordereditem
    });
})


exports.order = (async (req, res, next) => {
    const orderSend = await directDesignOrder.find({
        sendStatus: 1
    });

    res.status(200).render('admin_pannel/dashboard-view-order-send.pug', {
        orderSend
    })
})

exports.tshrit_price = catchAsync(async (req, res, next) => {
    const changePrice = await price.find({});
    console.log(changePrice)
    res.status(200).render('admin_pannel/clothes_type.pug', {
        changePrice
    })
})

// search feature
exports.search = catchAsync(async (req, res, next) => {
    console.log(req.query.params);
    const searchDesign = await product.find({
        tags: 'chatgpt'
    });
    // console.log('searched', searchItem)
    res.status(200).render('user_pages/search.pug', {
        searchDesign,
        title: req.query.params
    })
})

exports.referralActivate = catchAsync(async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('activateReferral.pug')
})

exports.delivered = catchAsync(async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('user_pages/send.pug')
})


exports.appoint_to_admin = catchAsync(async (req, res, next) => {
    const users = await user.find();
    res.status(200).render("admin_pannel/show_users.pug", {
        users
    })
})

exports.database_clear = catchAsync(async (req, res) => {
    const directDesignOrderLength = await directDesignOrder.find({});
    const priceLength = await price.find({});
    const userLength = await user.find({});
    const ordersModelLength = await ordersModel.find({});
    const productsModelLength = await productsModel.find({});
    const sendedDesignModelLength = await sendedDesignModel.find({});
    const cartsModelLength = await cartsModel.find({});


    const datas = [{
            model: "Designs Order Recived",
            length: directDesignOrderLength.length
        },
        {
            model: "Tshirt price",
            length: priceLength.length
        },
        {
            model: "Users",
            length: userLength.length
        },
        {
            model: "Orders",
            length: ordersModelLength.length
        },
        {
            model: "Products",
            length: productsModelLength.length
        },
        {
            model: "Admin Designed",
            length: sendedDesignModelLength.length
        },
        {
            model: "Carts",
            length: cartsModelLength.length
        }
    ];

    
    res.status(200).render("admin_pannel/Clear_Database.pug", {
        datas
    })
})

exports.tshrit_fabric = catchAsync(async(req, res) => {
    const fabrics = await cloth_fabric.find({});
    console.log(fabrics)
    res.status(200).render("admin_pannel/clothes_fabric.pug", {
        fabrics
    })
})