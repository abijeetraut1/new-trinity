const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const signupSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true,
        require: true,
    },
    name: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: 'user',
    },
    password: {
        type: String,
        require: true
    },
    activateReferral: {
        type: Boolean,
        default: false,
    },
    referalCode:String,
    cutoff:{
        type: Number,
        default: 0
    },
    passwordResetToken: String,
    passwordResetExpires: Date
})

// hash the password
signupSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.referalCode = `${this.name.replaceAll(' ', '-') + "-" + Math.floor(Math.random()*100)}`;
    next();
});



// check the password between entered password and database password
signupSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

// creating the password reset token
signupSchema.methods.createPasswordResetToken = async function () {
    const resetToken = crypto.randomBytes(32).toString('hex'); //  Generate reset token

    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');

    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

    return resetToken;
}

const user = new mongoose.model('user', signupSchema);
module.exports = user;