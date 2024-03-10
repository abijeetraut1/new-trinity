const directDesignOrder = require('../../model/directDesignOrder');
const price = require('../../model/changePrice');
const user = require("./../../model/signup");
const ordersModel = require("../../model/orderModel");
const productsModel = require("../../model/product");
const sendedDesignModel = require("./../../model/sendedDesign");
const cartsModel = require("./../../model/add-to-cart");

// admin only
exports.products = async (req, res, next) => {
    const ordereditem = await directDesignOrder.find({
        sendStatus: 0
    });
    console.log(ordereditem);
    res.status(200).render('admin_pannel/dashboard_product.pug', {
        ordereditem
    });
}


exports.order = async (req, res, next) => {
    const orderSend = await directDesignOrder.find({
        sendStatus: 1
    });

    console.log(orderSend)
    res.status(200).render('admin_pannel/dashboard-view-order-send.pug', {
        orderSend
    })
}

exports.price = async (req, res, next) => {
    const changePrice = await price.find();
    console.log(changePrice)
    res.status(200).render('admin_pannel/priceChange.pug', {
        changePrice
    })
}

// search feature
exports.search = async (req, res, next) => {
    console.log(req.query.params);
    const searchDesign = await product.find({
        tags: 'chatgpt'
    });
    // console.log('searched', searchItem)
    res.status(200).render('user_pages/search.pug', {
        searchDesign,
        title: req.query.params
    })
}

exports.referralActivate = async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('activateReferral.pug')
}

exports.delivered = async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('user_pages/send.pug')
}


exports.appoint_to_admin = async (req, res, next) => {
    const users = await user.find();
    res.status(200).render("admin_pannel/show_users.pug", {
        users
    })
}

exports.database_clear = async (req, res) => {
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
}