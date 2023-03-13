const multer = require('multer');
const sharp = require('sharp');
const catchAsync = require('../utils/catchAsync');
const product = require('../model/product');
const order = require('../model/sendedDesign');
const orderRecived = require('../model/orderModel');
const addToCart = require('../model/add-to-cart');
const changePrice = require('../model/changePrice');
const directOrder = require('../model/directDesignOrder');
const AppError = require('../utils/appError');


const jwt = require('jsonwebtoken');
const {
    promisify
} = require('util');

require('dotenv').config({
    path: './config.env'
});
const {
    Vonage
} = require('@vonage/server-sdk')
const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET
})

const from = "Vonage APIs"
const to = process.env.ALERT_NUMBER

// multer configuration
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    console.log('file', req.file);
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload only images.', 400), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
        .resize(500, 500) // 727 * 900 
        .toFormat('jpeg')
        .jpeg({
            quality: 90
        })
        .toFile(`./public/images/product/${req.file.filename}`);

    next();
});


exports.getAllProduct = catchAsync(async (req, res, next) => {
    const getProduct = await product.find().limit(4);
    res.status(200).json({
        status: "message",
        getProduct
    })
})

exports.getItem = catchAsync(async (req, res, next) => {
    const slug = req.params.slug;
    const getItem = await product.findOne({
        slug
    });

    res.status(200).json({
        status: 'success',
        getItem
    })
});

exports.getItem = catchAsync(async (req, res, next) => {
    if (req.body.imageData && req.body.imageName && req.body.imagePrice) {
        let name = req.body.imageName.replace(' ', '-').toLowerCase();
        const base64Image = req.body.imageData;
        const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        const type = matches[1];
        const data = Buffer.from(matches[2], 'base64');

        let file = await sharp(data)
            .resize(727, 900) // 727 * 900 
            .toFormat('jpeg')
            .jpeg({
                quality: 90
            })
            .toFile(`./public/images/product/upload/${name}-${req.body.imagePrice}.png`);
    }

    res.status(200).json({
        status: 'success'
    })
});

saveSticker = async (imageBase64, tshirtName) => {
    console.log('shirtname', tshirtName)
    const base64Image = imageBase64;
    const matches = base64Image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    const type = matches[1];
    const data = Buffer.from(matches[2], 'base64');

    let file = await sharp(data)
        // .resize(727, 900) // 727 * 900 
        .toFormat('jpeg')
        .jpeg({
            quality: 90
        })
        .toFile(`./public/images/product/upload/${tshirtName}`);
}


// when user gives the order 
exports.uploadDesign = catchAsync(async (req, res, next) => {
    console.log(req.body);

    const token = req.cookies.jwt;
    const cookiesId = await promisify(jwt.verify)(token, process.env.jwtPassword);

    let imageName = req.body.title.replaceAll(' ', '-').toLowerCase();
    let tshirtName = `${imageName}-${Date.now()}`;
    let designInfo;

    saveSticker(req.body.frontImage, `/tshirt/front/${tshirtName}_front.png`);
    saveSticker(req.body.backImage, `/tshirt/back/${tshirtName}_back.png`);


    let data = {
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        price: req.body.markupPrice,
        slug: req.body.slug,
        fontSize: req.body.fontSize,
        letterSpacing: req.body.letterSpacing,
        rotateText: req.body.rotateText,
        front: `${tshirtName}_front`,
        back: `${tshirtName}_back`,
        sticker: `${tshirtName}`
    }
    if (req.body.sticker != 'null') {
        data.sticker= `${tshirtName}-sticker`
        saveSticker(req.body.sticker, `/sticker/${tshirtName}-sticker.png`);
    }

    designInfo = await product.create(data);


    // await vonage.sms.send({
    //     to,
    //     from,
    //     text: `${req.body.name} send an order contact no = ${req.body.contact} \n \n`
    // })


    res.status(200).json({
        status: 'success',
        // designInfo
    })
});

/*
    const product = require('../model/product');
    const order = require('../model/sendedDesign');
    const orderRecived = require('../model/orderModel');
*/

exports.changeDatabase = catchAsync(async (req, res, next) => {
    const copyContentFrom = await orderRecived.findOne({
        _id: req.body.idTransfer
    }).select("-_id -orderedProduct -__v");

    await order.create({
        email: copyContentFrom.email,
        number: copyContentFrom.number,
        name: copyContentFrom.name,
        area: copyContentFrom.area,
        city: copyContentFrom.city,
        address: copyContentFrom.address,
        size: copyContentFrom.size,
        qnt: copyContentFrom.qnt,
        color: copyContentFrom.color,
    });

    await orderRecived.deleteOne({
        _id: req.body.idTransfer
    })

    res.status(200).json({
        status: 'success',
    })
});

exports.orderRecorder = catchAsync(async (req, res, next) => {
    const imagesTransfer = await product.findOne({
        _id: req.body.productId
    });

    console.log('imagesTransfer', imagesTransfer)

    const orderArrived = await orderRecived.create({
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        city: req.body.city,
        address: req.body.address,
        area: req.body.area,
        size: req.body.size,
        qnt: req.body.qnt,
        color: req.body.color,
        orderedProduct: req.body.productId,
        front: imagesTransfer.front,
        back: imagesTransfer.back,
        sticker: imagesTransfer.sticker
    })

    // console.log('orderArrived', orderArrived)

    res.status(200).json({
        status: 'success',
        orderArrived,
    })
});


exports.deleteProduct = catchAsync(async (req, res, next) => {
    console.log(req.body);
    await product.deleteOne({
        id: req.body.deleteDataDbId
    });

    res.status(200).json({
        status: 'success'
    })
});


// when administer send the requested design to the user
exports.chagneDesign = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const designInfo = await order.create({
        uploader: req.body.uploader,
        title: req.body.title,
        description: req.body.description,
        tags: req.body.tags,
        color: req.body.color,
        price: req.body.price
    });


    res.status(200).json({
        status: 'success',
        designInfo
    })
});



// price change
exports.changePrice = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const priceChange = await changePrice.findOneAndUpdate({
        _id: req.body.id
    }, {
        price: req.body.price
    });
    console.log(priceChange);


    res.status(200).json({
        status: 'success',
        priceChange
    })
});

exports.directorderrecord = catchAsync(async (req, res, next) => {
    console.log(req.body);
    let imageName = req.body.name.replaceAll(' ', '-').toLowerCase();
    let tshirtName = `${imageName}-${Date.now()}`;

    
    let upload = {
        email: req.body.email,
        name: req.body.name,
        number: req.body.number,
        area: req.body.number,
        address: req.body.address,
        city: req.body.city,
        size: req.body.size,
        material: req.body.material,
    }
    
    if(req.body.paymeny){
        saveSticker(req.body.paymeny, `/payment/${tshirtName}_payment.png`);
        upload.payment = `${imageName}_payment.png`;
    }
    
    
    if(req.body.front && req.body.back){
        saveSticker(req.body.front, `/tshirt/front/${tshirtName}_front.png`);
        saveSticker(req.body.back, `/tshirt/back/${tshirtName}_back.png`);
    
        upload.front =  `${tshirtName}_front`;
        upload.back = `${tshirtName}_back`;
    }

    if (req.body.sticker) {
        upload.sticker = `${tshirtName}-sticker`;
        saveSticker(req.body.sticker, `/sticker/${tshirtName}-sticker.png`);
    }

    const record = await directOrder.create(
        upload
    );
    
    res.status(200).json({
        status: 'success',
        record
    })
});



exports.addToCart = catchAsync(async (req, res, next) => {
    const addToCarted = await addToCart.create({
        userId: req.body.user,
        itemId: req.body.product
    })

    res.status(200).json({
        status: 'success',
        addToCarted
    })
});


exports.cartDelete = catchAsync(async (req, res, next) => {
    console.log(req.body.deleteDataDbId)
    await addToCart.deleteOne({
        _id: req.body.deleteDataDbId
    })
    res.status(200).json({
        status: 'success'
    })
});