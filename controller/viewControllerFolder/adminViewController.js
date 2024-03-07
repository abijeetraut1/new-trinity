const directDesignOrder = require('../../model/directDesignOrder');

// admin only
exports.products = async (req, res, next) => {
    const ordereditem = await directDesignOrder.find({sendStatus: 0});
    console.log(ordereditem);
    res.status(200).render('admin_pannel/dash_product.pug', {
        ordereditem
    });
}


exports.order = async (req, res, next) => {
    const orderSend = await directDesignOrder.find({sendStatus: 1});

    console.log(orderSend)
    res.status(200).render('admin_pannel/dashboard-view-order-send.pug', {
        orderSend
    })
}

exports.price = async (req, res, next) => {
    const changePrice = await price.find();
    console.log(changePrice.length)
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
        title:req.query.params
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
