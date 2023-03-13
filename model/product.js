const mongoose = require('mongoose');
const user = require('./signup');

const uploadSchema = mongoose.Schema({
    userDbId: {
        type: mongoose.Schema.Types.ObjectId
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    tags: {
        type: [String],
    },
    slug:String,
    price:{
        type: Number,
    },
    fontSize: {
        type:String,
    },
    fontColor:{
        type:String,
    },
    letterSpacing:{
        type:String,
    },
    rotateText:{
        type:String
    },
    // color: {
    //     type: Number,
    //     require: true
    // },
    front: {
        type: String,
    },
    back: {
        type: String,
    },
    sticker: {
        type: String,
    },
    uploaderRole: {
        type: String
    },
    uploadDate: Date
});


uploadSchema.pre('save', function (next) {
    this.tags = this.tags[0].split(',');
    this.uploadDate = Date.now();
    console.log(this.tags);
    next();
})

uploadSchema.pre('save', async function (next) {
    // console.log(`this.userDbId=${this.userDbId} -- this.userDbId.id=${this.userDbId.id}`)
    const extractRole = await user.findOne({
        id: this.userDbId
    })
    this.uploaderRole = extractRole.role;
    next();
});


const upload = new mongoose.model('product', uploadSchema);
module.exports = upload;