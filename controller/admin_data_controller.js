const customDesignOrder = require("./../model/directDesignOrder");

exports.sended_product_to_user = async(req, res) => {
    const id = req.body.id;
    const sendedCustomDesign = await customDesignOrder.findById({_id: id});
    

    res.status(200).json({
        message: "hello world"
    })
}