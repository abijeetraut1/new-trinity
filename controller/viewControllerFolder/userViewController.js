const product = require('../../model/product');
const user = require('../../model/signup');
const cloth_Type_Model = require('../../model/cloth_Type_Model');
const fabric_model = require('../../model/Cloth_Fabric_Model');
const customDesignOrder = require("../../model/user_designed_tshirt");
const landing_page_design_change = require("../../model/landing_page_design_change");

const jwt = require('jsonwebtoken');
const catchAsync = require('../../utils/catchAsync');


exports.homepage = catchAsync(async (req, res, next) => {
    const adminDesign = await product.find({
        role: 'admin'
    }).sort({
        uploadDate: -1
    }).limit(8);

    const landing_page = await landing_page_design_change.find();
    // // const productData = await product.find(-1).limit(4);
    // const productData = await product.find().sort({
    //     uploadDate: -1
    // });
    let totalUsers = await user.find().limit(4);
    totalUsers += 1000;

    console.log(adminDesign)
    
    res.status(200).render('user_pages/landing.pug', {
        landing_page: landing_page[0],
        adminDesign,
        totalUsers,
        title: 'home'
    });
})

exports.buypage = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const products = await product.findOne({
        slug
    });

    res.status(200).render('user_pages/slugView.pug', {
        products,
        title: products.title
    });
})

exports.login = catchAsync(async (req, res, next) => {
    const referalCode = req.query.ref || "";

    res.status(200).render('user_pages/loginFrom.pug', {
        title: 'Account',
        referalCode: referalCode,
    });
})

exports.orderPage = catchAsync(async (req, res, next) => {
    const item = await product.findOne({
        slug: req.params.slug
    })

    res.status(200).render('user_pages/orderPage.pug', {
        item
    });
})

exports.DesignorderPage = catchAsync(async (req, res, next) => {
    const viewPrice = await fabric_model.findOne({
        slug: req.params.material
    });

    console.log(viewPrice);

    const districtsOfNepal = [
        // Province No. 1
        'Bhojpur', 'Dhankuta', 'Ilam', 'Jhapa', 'Khotang', 'Morang', 'Okhaldhunga', 'Panchthar',
        'Sankhuwasabha', 'Solukhumbu', 'Sunsari', 'Taplejung', 'Terhathum', 'Udayapur',

        // Province No. 2
        'Bara', 'Dhanusha', 'Mahottari', 'Parsa', 'Rautahat', 'Sarlahi', 'Saptari', 'Siraha',

        // Bagmati Province
        'Bhaktapur', 'Chitwan', 'Dhading', 'Dolakha', 'Kathmandu', 'Kavrepalanchok', 'Lalitpur',
        'Makwanpur', 'Nuwakot', 'Ramechhap', 'Rasuwa', 'Sindhuli', 'Sindhupalchok',

        // Gandaki Province
        'Baglung', 'Gorkha', 'Kaski', 'Lamjung', 'Manang', 'Mustang', 'Myagdi', 'Nawalpur', 'Parbat',
        'Syangja', 'Tanahun',

        // Lumbini Province
        'Arghakhanchi', 'Banke', 'Bardiya', 'Dang', 'Eastern Rukum', 'Gulmi', 'Kapilvastu', 'Parasi',
        'Palpa', 'Pyuthan', 'Rolpa', 'Rupandehi', 'Western Rukum',

        // Karnali Province
        'Dolpa', 'Humla', 'Jajarkot', 'Jumla', 'Kalikot', 'Mugu', 'Salyan', 'Surkhet', 'Dailekh',
        'Western Dailekh',

        // Sudurpashchim Province
        'Achham', 'Baitadi', 'Bajhang', 'Bajura', 'Dadeldhura', 'Darchula', 'Doti', 'Kailali',
        'Kanchanpur'
    ];

    const states = ["Province No. 1", "Province No. 2", "Bagmati Province", "Gandaki Province", "Lumbini Province", "Karnali Province", "Sudurpashchim Province"]


    districtsOfNepal.sort();
    res.status(200).render('user_pages/DesignorderPage.pug', {
        price: viewPrice.price,
        districtsOfNepal,
        states
    });

})

exports.track_order = catchAsync(async (req, res, next) => {
    const token = res.locals.user;
    console.log(token.id)
    const orders = await customDesignOrder.find({
        userID: token.id
    })


    res.render("user_pages/orders-trackers.pug", {
        orders
    })


})


exports.designPage = catchAsync(async (req, res, next) => {
    const cloth_type_price = await cloth_Type_Model.find({});
    const cloth_material_price = await fabric_model.find({});

    console.log(cloth_type_price)
    console.log(cloth_material_price)

    res.status(200).render('user_pages/design.pug', {
        cloth_type_price,
        cloth_material_price
    });

})

exports.forgetPassword = catchAsync(async (req, res, next) => {
    res.render("./user_pages/ForgetPassword.pug");
})

exports.delivered = catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const product = await customDesignOrder.findOne({
        _id: id
    });
    console.log('product', product)
    res.status(200).render('user_pages/send.pug', {
        product
    })
})

exports.products = catchAsync(async (req, res, next) => {
    const userid = res.locals.user.id;
    const products = await customDesignOrder.find({
        userID: userid,
        sendStatus: false,
        shipped: false,
    });
    console.log(products)
    res.status(200).render('account/products.pug', {
        title: "Account",
        products: products
    });
})

exports.refer = catchAsync(async (req, res, next) => {
    const refCode = res.locals.user.joinedReferalCode;
    const referedUsers = await user.find({
        joinedReferalCode: refCode,
    })
    res.status(200).render('account/refer.pug', {
        title: "Refer",
        totalUsers: referedUsers.length
    });
})


exports.settings = catchAsync(async (req, res, next) => {
    res.status(200).render('account/setting.pug', {
        title: "setting"
    });
})


exports.payout = catchAsync(async (req, res, next) => {
    res.status(200).render('account/payout.pug', {
        title: "payout"
    });
})
exports.order = catchAsync(async (req, res, next) => {
    res.status(200).render('account/orders.pug', {
        title: "order"
    });
})

exports.recived = catchAsync(async (req, res, next) => {
    const userid = res.locals.user.id;
    const products = await customDesignOrder.find({
        userID: userid,
        sendStatus: true,
        shipped: true
    });

    res.status(200).render('account/recived.pug', {
        title: "order",
        products: products
    });
})