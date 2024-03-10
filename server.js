const app = require('./app');
const port = 4000;
const mongoose = require('mongoose');
const signupModel = require("./model/signup");
const clothTypeModel = require("./model/cloth_Type_Model");
const clothMaterialModel = require("./model/Cloth_Material_Model");


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

const clothingItems = [{
        back: 'full_sleeve_back',
        front: 'full_sleeve_front',
        name: "full_sleeve",
        price: 100
    },
    {
        back: 'hoodie_back',
        front: 'hoodie_front',
        name: "hoodie",
        price: 100
    },
    {
        back: 'hsrn_tshirt_back',
        front: 'hsrn_tshirt_front',
        name: "hsrn_tshirt",
        price: 100
    },
    {
        back: 'kids_back',
        front: 'kids_front',
        name: "kids",
        price: 100
    },
    {
        back: 'sweatshirt_back',
        front: 'sweatshirt_front',
        name: "sweatshirt",
        price: 100
    },
    {
        back: 'tank_back',
        front: 'tank_front',
        name: "tank",
        price: 100
    },
    {
        back: 'tshirt_back',
        front: 'tshirt_front',
        name: "tshirt",
        price: 100
    },
    {
        back: 'v_neck_back',
        front: 'v_neck_front',
        name: "v_neck",
        price: 100
    },
    {
        back: 'women_full_sleeve_back',
        front: 'women_full_sleeve_front',
        name: "women_full",
        price: 100
    },
    {
        back: 'women_tee_back',
        front: 'women_tee_front',
        name: "women_tee",
        price: 100
    }
];

const material = [{
    material: "polyster",
    price: 500
}, {
    material: "cotton",
    price: 800
}];

// admin seeding
(async () => {
    try {
        await signupModel.create({
            email: process.env.ADMIN_EMAIL,
            name: process.env.ADMIN_NAME,
            role: process.env.ADMIN_ROLE,
            password: process.env.ADMIN_PASSWORD,
        });
        console.log("Admin seeded successfully");
    } catch (err) {
        if (err.code === 11000) {
            console.log("Admin already seeded");
        } else {
            console.log("Please restart the server");
        }
    }
})();

clothingItems.forEach(async el => {
    await clothTypeModel.create({
        back: el.back,
        front: el.front,
        price: el.price,
        name: el.name,
    }).then((data) => {
        console.log("Cloth_Type seeded successfully");
    }).catch(err => {
        if (err.code === 11000) {
            console.log("Cloth_Type already seeded");
        } else {
            console.log("Please restart the server");
        }
    });
})


material.forEach(async el => {
    await clothMaterialModel.create({
        price: el.price,
        material: el.material,
    }).then((data) => {
        console.log("Cloth_Material seeded successfully");
    }).catch(err => {
        if (err.code === 11000) {
            console.log("Cloth_Material already seeded");
        } else {
            console.log("Please restart the server");
        }
    });
});


const server = app.listen(port, () => {
    console.log('server is running ' + port);
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message, err.stack);
    console.log('unhandled rejection! 💥 💥💥');
    server.close(() => {
        process.exit(1);
    });
});