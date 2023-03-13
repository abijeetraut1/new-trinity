const product = require('../model/product');
const sendedProduct = require('../model/sendedDesign');
const user = require('../model/signup');
const order = require('./../model/orderModel');
const price = require('./../model/changePrice');
const cart = require('./../model/add-to-cart');
const jwt = require('jsonwebtoken');
const {
    promisify
} = require('util');


exports.homepage = async (req, res, next) => {
    const adminDesign = await product.find({
        role: 'admin'
    }).sort({
        uploadDate: -1
    }).limit(8);
    // // const productData = await product.find(-1).limit(4);
    // const productData = await product.find().sort({
    //     uploadDate: -1
    // });
    const totalUsers = await user.find().limit(4);
    res.status(200).render('landing.pug', {
        adminDesign,
        totalUsers
    });
}

exports.buypage = async (req, res, next) => {
    const slug = req.params.slug;
    const products = await product.findOne({
        slug
    });
    console.log(products)
    res.status(200).render('slugView.pug', {
        products
    });
}

exports.login = async (req, res, next) => {
    res.status(200).render('loginFrom.pug');
}

exports.orderPage = async (req, res, next) => {
    const item = await product.findOne({
        slug: req.params.slug
    })

    res.status(200).render('orderPage.pug', {
        item
    });
}

exports.DesignorderPage = async (req, res, next) => {
    const viewPrice = await price.findOne({
        type: req.params.material
    });
    console.log(viewPrice);
    res.status(200).render('DesignorderPage.pug',{viewPrice});
}

exports.addToCart = async (req, res, next) => {

    const token = req.cookies.jwt;
    const cookiesId = await promisify(jwt.verify)(token, process.env.jwtPassword);

    const items = await cart.find({
        userId: cookiesId.id
    })
    // let ids = items;
    let products;
    let renderingItem = [];
    let sender;
    items.forEach(async (el,i) => {
        products = await product.findOne({
            _id: el.itemId
        })
        products.deleteID = items[i].id;
        renderingItem.push(products);
    })
    setTimeout(() => {
        res.status(200).render('add-to-cart.pug', {
            renderingItem
        });
    }, 2000);
}


exports.designPage = async (req, res, next) => {
    const changePrice = await price.find();
    res.status(200).render('design.pug', {
        changePrice
    });
}



// admin only
exports.products = async (req, res, next) => {
    const ordereditem = await order.find();
    console.log(ordereditem)
    res.status(200).render('dash_product.pug', {
        ordereditem
    });
}


exports.order = async (req, res, next) => {
    const fromSendItem = await order.find();
    console.log(fromSendItem)
    res.status(200).render('dashWidget.pug', {
        fromSendItem
    })
}

exports.price = async (req, res, next) => {
    const changePrice = await price.find();
    console.log(changePrice)
    res.status(200).render('priceChange.pug', {
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
    res.status(200).render('search.pug', {
        searchDesign
    })
}

exports.referralActivate = async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('activateReferral.pug')
}

exports.delivered = async (req, res, next) => {
    // console.log('searched', searchItem)
    res.status(200).render('send.pug')
}