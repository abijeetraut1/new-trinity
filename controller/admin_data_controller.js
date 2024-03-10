const customDesignOrder = require("../model/admin_designed_tshirt");
const orderRecorder = require("../model/overAllOrderRecorder");


exports.sended_product_to_user = async(req, res) => {
    const id = req.body.id;
    console.log(req.body);
    const sendedCustomDesign = await customDesignOrder.findOneAndUpdate({_id: id}, {sendStatus: true}, {new: true});
    
    console.log(sendedCustomDesign)

    res.status(200).json({
        message: "hello world"
    })
}