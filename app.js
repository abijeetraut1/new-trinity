const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const cookiesParser = require('cookie-parser');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/ErrorHandler');
const rateLimit = require('express-rate-limit');

// router
const apiRouter = require('./router/apiRouter');
const userRouter = require('./router/userRouter');
const viewRouter = require('./router/viewRouter');
const {
    urlencoded
} = require('express');

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try again in an hour!'
});

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', limiter);
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: false }));

app.use(cookiesParser());

// app.use('/adminPannel', adminRotuer);
app.use('/', viewRouter);
app.use('/api/v1/product', apiRouter);
app.use('/api/v1/user', userRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`cannot find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);
module.exports = app;