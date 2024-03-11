const product = require('../../model/product');
const user = require('../../model/signup');
const cloth_Type_Model = require('../../model/cloth_Type_Model');
const cloth_material_model = require('../../model/Cloth_Fabric_Model');
const cart = require('../../model/add-to-cart');

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
    let totalUsers = await user.find().limit(4);
    totalUsers += 1000;
    res.status(200).render('user_pages/landing.pug', {
        adminDesign,
        totalUsers,
        title: 'home'
    });
}

exports.buypage = async (req, res, next) => {
    const slug = req.params.slug;
    const products = await product.findOne({
        slug
    });
    console.log(products)
    res.status(200).render('user_pages/slugView.pug', {
        products,
        title: products.title
    });
}

exports.login = async (req, res, next) => {
    res.status(200).render('user_pages/loginFrom.pug', {
        title: 'Account'
    });
}

exports.orderPage = async (req, res, next) => {
    const item = await product.findOne({
        slug: req.params.slug
    })

    res.status(200).render('user_pages/orderPage.pug', {
        item
    });
}

exports.DesignorderPage = async (req, res, next) => {
    try {
        const viewPrice = await cloth_Type_Model.findOne({
            type: req.params.material
        });
        console.log(viewPrice);
        res.status(200).render('user_pages/DesignorderPage.pug', {
            viewPrice
        });
    } catch (err) {
        console.log(err)
    }
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
    items.forEach(async (el, i) => {
        products = await product.findOne({
            _id: el.itemId
        })
        products.deleteID = items[i].id;
        renderingItem.push(products);
    })
    setTimeout(() => {
        res.status(200).render('user_pages/add-to-cart.pug', {
            renderingItem
        });
    }, 2000);
}


exports.designPage = async (req, res, next) => {
    const cloth_type_price = await cloth_Type_Model.find({});
    const cloth_material_price = await cloth_material_model.find({});
    
    console.log(cloth_material_price)
    
    res.status(200).render('user_pages/design.pug', {
        cloth_type_price,
        cloth_material_price
    });
}