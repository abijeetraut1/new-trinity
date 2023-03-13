const catchAsync = require('../utils/catchAsync');
const crypto = require('crypto');
const user = require('../model/signup');
const jwt = require('jsonwebtoken');
const AppError = require('../utils/appError');
const {
    hasUncaughtExceptionCaptureCallback
} = require('process');
const {
    promisify
} = require('util');

// cookies section
const createCookies = async (data, res, statusCode) => {
    const token = jwtSignin(data._id);

    const cookieOptions = {
        expires: new Date(
            Date.now() + process.env.jwt_Cookies_Expires_in * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    };

    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
    res.cookie('jwt', token, cookieOptions);

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            data,
        },
    });
}

const jwtSignin = id => {
    return jwt.sign({
        id
    }, process.env.jwtPassword, {
        expiresIn: process.env.jwt_Expires_in
    })
}

exports.signup = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const signin = await user.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    })

    createCookies(signin, res, 200);
});

exports.login = catchAsync(async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        return next(new AppError('please valid email or password', 400));
    }

    const login = await user.findOne({
        email
    }).select('+password');

    if (!login || !(await login.correctPassword(password, login.password))) {
        return console.log('USER NOT FOUND');
    }

    createCookies(login, res, 200);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
    const updateAccountUser = await findOne({
        id: req.user.id
    });

    if (!updateAccountUser) {
        return next(new AppError('user not found', 400));
    }

    updateAccountUser.password = req.body.newPassword;
    updateAccountUser.passwordConfirm = req.body.Password_Confirm;
    updateAccountUser.save();

    createCookies(updateAccountUser, res, 200);
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
    // console.log('email',req.body)
    const email = req.body.email;
    const forgetAccount = await user.findOne({
        email
    });

    if (!forgetAccount) {
        return next(new AppError('The UserEmail not found', 401));
    }

    const resetToken = await forgetAccount.createPasswordResetToken();
    await forgetAccount.save({
        validateBeforeSave: false
    });

    const resetURL = `${req.protocol}://${req.get(  
      'host'
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `forget your password? submit  your patch request with new password and password confirm to: ${resetURL} if you did\'t forget your password then ignore this all `;

    res.status(200).json({
        status: 'sucess',
        message: 'token send to email',
        token: resetURL,
    });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    const token = req.params.resetToken;
    console.log(token)
    const hashToken = crypto
        .createHash('sha256')
        .update(token)
        .digest('hex');

    const forgetPasswordAccount = await user.findOne({
        passwordResetToken: hashToken
    });

    if (!forgetPasswordAccount) {
        return next(new AppError('user not found', 400));
    } else {
        forgetPasswordAccount.password = req.body.newPassword,
            forgetPasswordAccount.passwordConfirm = req.body.passwordConfirm,
            forgetPasswordAccount.passwordResetToken = undefined,
            forgetPasswordAccount.passwordResetExpires = undefined,
            await forgetPasswordAccount.save();
    }

    res.status(200).json({
        status: 'success',
        message: 'password successfully changed'
    })
})

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
    }
    if (!token) {
        // return window.location.assign('/login');
        return next(new AppError('PLEASE RE-LOGIN SESSION EXPIRED', 400));
    }
    const userId = await promisify(jwt.verify)(token, process.env.jwtPassword);
    const cookieUser = await user.findOne({
        id: userId
    });

    if (!cookieUser) {
        return next(new AppError('PLEASE RE-LOGIN', 400));
    }

    req.user = cookieUser;
    next();
})

exports.isUserLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const cookiesId = await promisify(jwt.verify)(token, process.env.jwtPassword);
        const cookieUser = await user.findOne({
            _id: cookiesId.id
        });

        if (!cookieUser) {

            return window.location.assign('/login');
            // return next(new AppError('PLEASE RE-LOGIN', 400));
        }
        res.locals.user = cookieUser;

        return next();
    }
    next();
})

exports.isUserLoggedInForHome = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const cookiesId = await promisify(jwt.verify)(token, process.env.jwtPassword);
        const cookieUser = await user.findById({
            _id: cookiesId.id
        });
        res.locals.user = cookieUser;

        return next();
    }
    next();
})

exports.logout = catchAsync(async (req, res, next) => {
    // res.clearCookie('jwt');
    res.clearCookie('jwt');

    res.status(200).json({
        status: "success"
    })
})

// admin login
exports.adminLogin = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const {
        email,
        password
    } = req.body;

    if (!(email) || !(password)) {
        return next(new AppError('WRONG ADMIN INPUT', 400));
    }

    const adminUser = await user.findOne({
        email,
        role: 'admin'
    }).select('+password');

    if (!(adminUser) || !(await adminUser.correctPassword(password, adminUser.password))) {
        return next(new AppError('CANNOT FIND ADMIN USER', 400));
    }

    createCookies(adminUser, res, 200);
})

exports.isAdminLoggedIn = catchAsync(async (req, res, next) => {
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const cookiesId = await promisify(jwt.verify)(token, process.env.jwtPassword);
        const AdminUser = await user.findOne({
            id: cookiesId,
            role: 'admin'
        });

        console.log(AdminUser)

        if (!AdminUser) {
            return next(new AppError('PLEASE RE-LOGIN', 400));

        }
        res.locals.user = AdminUser;

        return next();
    }
    next();
})



// find the user with email
exports.checkReferral = catchAsync(async (req, res, next) => {
    console.log(req.body.email);
    const checkUser = await user.findOne({
        email: req.body.email
    }).select("-__v -password -role")
    res.status(200).json({
        status: "success",
        checkUser
    })
})

exports.cutoffReg = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const checkUser = await user.findOneAndUpdate({
        _id: req.body.userid
    }, {
        activateReferral: true,
        cutoff: req.body.cutoff
    })
    console.log(checkUser);
    res.status(200).json({
        status: "success",
        checkUser
    })
})

exports.cutoffDelete = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const checkUser = await user.findOneAndUpdate({
        _id: req.body.userid
    }, {
        activateReferral: false,
        cutoff: '0'
    })
    console.log(checkUser);
    res.status(200).json({
        status: "success",
        checkUser
    })
})


exports.checkCode = catchAsync(async (req, res, next) => {
    console.log(req.body);
    const checkUser = await user.findOne({
        activateReferral: true,
        referalCode: req.body.referralCode
    }).select("-__V -password -email -name -role -_id")
    console.log(checkUser);
    res.status(200).json({
        status: "success",
        checkUser
    })
})
