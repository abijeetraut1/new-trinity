const customDesignOrder = require("../model/user_designed_tshirt");
const orderRecorder = require("../model/overAllOrderRecorder");
const Cloth_Fabric_Model = require("../model/Cloth_Fabric_Model");
const Cloth_Type_Model = require("../model/cloth_Type_Model");
const landing_page_design_change = require("../model/landing_page_design_change");

const catchAsync = require("../utils/catchAsync");

const statusFunc = (res, statusNumber, message) => {
    res.status(statusNumber).json({
        status: statusNumber,
        message
    });
}

exports.sended_product_to_user = catchAsync(async (req, res) => {
    const id = req.body.id;
    console.log(req.body);
    const sendedCustomDesign = await customDesignOrder.findOneAndUpdate({
        _id: id
    }, {
        sendStatus: true
    }, {
        new: true
    });

    console.log(sendedCustomDesign)

    res.status(200).json({
        message: "hello world"
    })
})

exports.add_fabric = catchAsync(async (req, res) => {
    const {
        fabric,
        price
    } = req.body;
    console.log(req.body)
    await Cloth_Fabric_Model.create({
        price,
        fabric,
    }).then(() => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
});

exports.delete_fabric = catchAsync(async (req, res) => {
    const id = req.body.id;
    await Cloth_Fabric_Model.deleteOne({
        _id: id
    }).then(() => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
});

exports.add_cloth_type = catchAsync(async (req, res) => {
    const {
        cloth_type,
        description,
        price
    } = req.body;

    await Cloth_Type_Model.create({
        price: price,
        front: req.files.front[0].filename,
        back: req.files.back[0].filename,
        cloth_type: cloth_type,
        description: description
    }).then(data => {
        console.log(data)
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
})

exports.delete_material_type = catchAsync(async (req, res) => {
    const id = req.body.id;
    await Cloth_Type_Model.deleteOne({
        _id: id
    }).then(() => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
});

exports.update_productStatus = catchAsync(async (req, res) => {
    const {
        id,
        sendStatus,
        shippingStatus
    } = req.body;

    await customDesignOrder.findByIdAndUpdate({
        _id: id
    }, {
        sendStatus: sendStatus,
        shipped: shippingStatus
    }).then(data => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
})

exports.change_home_page = catchAsync(async (req, res) => {
    const filename = req.file.filename;
    const {
        highlight_text,
        supporting_text
    } = req.body;

    // find the item
    const find_premade_designs = await landing_page_design_change.find();

    if (find_premade_designs.length === 0) {
        await landing_page_design_change.create({
            image: filename,
            highlightText: highlight_text,
            supportingText: supporting_text
        }).then(data => {
            statusFunc(res, 200, "home page updated");
        }).catch(err => {
            statusFunc(res, 200, "please reload 🤷‍♂️");
        })
    }else{
        find_premade_designs[0].image = filename;
        find_premade_designs[0].highlightText = highlight_text;
        find_premade_designs[0].supportingText = supporting_text;

        find_premade_designs[0].save();
        statusFunc(res, 200, "home page updated");
    }

})