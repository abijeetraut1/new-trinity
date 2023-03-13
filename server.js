const app = require('./app');
const port = 80;
const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
    console.log('UNCAUGHT EXCEPTION CAUGHT 💥💥💥');
    console.log(err.name, err.message);

    process.exit(1);
});

require('dotenv').config({
    path: './config.env'
});

console.log(process.env.NODE_ENV);

const connectionInfo = process.env.dbId.replace('<password>', process.env.dbPSW);

mongoose.connect(connectionInfo).then(data => {
    console.log('connected to database')
}).catch(err => {
    console.log('FAILED TO CONNECT');
})

const server = app.listen(port, () => {
    console.log('server is running');
})

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log('unhandled rejection! 💥 💥💥');
    server.close(() => {
        process.exit(1);
    });
});