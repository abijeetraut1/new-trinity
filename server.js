const app = require('./app');
const port = 4000;
const mongoose = require('mongoose');
const signup = require("./model/signup");

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION CAUGHT 💥💥💥');
    console.log(err.name, err.message);

    process.exit(1);
});

require('dotenv').config({
    path: './config.env'
});

console.log(process.env.NODE_ENV);

// mongodb connection
const connectionInfo = process.env.dbId.replace('<password>', process.env.dbPSW);

mongoose.connect(connectionInfo).then(data => {
    console.log('connected to database')
}).catch(err => {
    console.log('FAILED TO CONNECT');
});

// admin seeding
(async () => {
    await signup.create({
        email: process.env.ADMIN_EMAIL,
        name: process.env.ADMIN_NAME,
        role: process.env.ADMIN_ROLE,
        password: process.env.ADMIN_PASSWORD,
    }).then(() => {
        console.log("Admin seeded successfully");
    }).catch(err => {
        if (err.code === 11000) {
            console.log("Admin already seeded");
        } else {
            console.log("Please restart the server");
        }
    })
})();

const server = app.listen(port, () => {
    console.log('server is running ' + port);
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('unhandled rejection! 💥 💥💥');
    server.close(() => {
        process.exit(1);
    });
});