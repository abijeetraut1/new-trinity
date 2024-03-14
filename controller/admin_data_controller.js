const customDesignOrder = require("../model/admin_designed_tshirt");
const orderRecorder = require("../model/overAllOrderRecorder");
const Cloth_Fabric_Model = require("../model/Cloth_Fabric_Model");
const Cloth_Type_Model = require("../model/cloth_Type_Model");

const catchAsync = require("../utils/catchAsync");

const statusFunc = (res, statusNumber, message) => {
    res.status(statusNumber).json({
        status: statusNumber,
        message
    });
}

exports.sended_product_to_user = catchAsync(async(req, res) => {
    const id = req.body.id;
    console.log(req.body);
    const sendedCustomDesign = await customDesignOrder.findOneAndUpdate({_id: id}, {sendStatus: true}, {new: true});
    
    console.log(sendedCustomDesign)

    res.status(200).json({
        message: "hello world"
    })
})

exports.add_fabric = catchAsync(async(req, res) => {
    const {fabric, price} = req.body;
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

exports.delete_fabric = catchAsync(async(req, res) => {
    const id = req.body.id;
    await Cloth_Fabric_Model.deleteOne({_id: id}).then(() => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
});

exports.add_cloth_type = catchAsync(async(req, res) => {
    const {cloth_type, description, price} = req.body;
    
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

exports.delete_material_type = catchAsync(async(req, res) => {
    const id = req.body.id;
    await Cloth_Type_Model.deleteOne({_id: id}).then(() => {
        statusFunc(res, 200, "successfull")
    }).catch(err => {
        statusFunc(res, 500, "please refresh")
    });
});