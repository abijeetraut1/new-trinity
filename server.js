const app = require('./app');
const port = 4000;
const mongoose = require('mongoose');
const signupModel = require("./model/signup");
const clothTypeModel = require("./model/cloth_Type_Model");
const clothMaterialModel = require("./model/Cloth_Fabric_Model");
const landing_page = require("./model/landing_page_design_change.js");

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
        cloth_type: "full_sleeve",
        description: "A classic full-sleeve shirt suitable for everyday wear.",
        price: 100
    },
    {
        back: 'hoodie_back',
        front: 'hoodie_front',
        cloth_type: "hoodie",
        description: "Stay warm and stylish with this comfortable hoodie.",
        price: 100
    },
    {
        back: 'hsrn_tshirt_back',
        front: 'hsrn_tshirt_front',
        cloth_type: "hsrn_tshirt",
        description: "A trendy t-shirt featuring a unique design.",
        price: 100
    },
    {
        back: 'kids_back',
        front: 'kids_front',
        cloth_type: "kids",
        description: "Adorable and comfortable clothing for kids.",
        price: 100
    },
    {
        back: 'sweatshirt_back',
        front: 'sweatshirt_front',
        cloth_type: "sweatshirt",
        description: "Stay cozy during chilly days with this stylish sweatshirt.",
        price: 100
    },
    {
        back: 'tank_back',
        front: 'tank_front',
        cloth_type: "tank",
        description: "Perfect for hot weather, this tank top offers both comfort and style.",
        price: 100
    },
    {
        back: 'tshirt_back',
        front: 'tshirt_front',
        cloth_type: "tshirt",
        description: "A classic t-shirt suitable for various occasions and activities.",
        price: 100
    },
    {
        back: 'v_neck_back',
        front: 'v_neck_front',
        cloth_type: "v_neck",
        description: "Add a touch of style to your wardrobe with this v-neck t-shirt.",
        price: 100
    },
    {
        back: 'women_full_sleeve_back',
        front: 'women_full_sleeve_front',
        cloth_type: "women_full",
        description: "A stylish and comfortable full-sleeve shirt designed for women.",
        price: 100
    },
    {
        back: 'women_tee_back',
        front: 'women_tee_front',
        cloth_type: "women_tee",
        description: "Stay chic and comfortable with this trendy women's tee.",
        price: 100
    }
];



const material = [{
    price: 500,
    fabric: "polyster",
}, {
    price: 800,
    fabric: "cotton",
}];

const highlightText = "The easy way to design and sell t-shirts online";
const supportingText = "We do production, shipping and customer service - and you keep the profit!";

(async () => {
    // highlightText
    try {
        await landing_page.create({
            highlightText: highlightText,
            supportingText: supportingText
        })
        console.log("landing page text seeded");
    } catch (err) {
        if (err.code === 11000) {
            console.log("Admin already seeded");
        } else {
            console.log("Please restart the server");
        }
    }
})();

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
        cloth_type: el.cloth_type,
        description: el.description
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
    console.log(el.price, el.fabric)
    await clothMaterialModel.create({
        price: el.price,
        fabric: el.fabric,
    }).then((data) => {
        console.log("Cloth_Fabric seeded successfully");
    }).catch(err => {
        if (err.code === 11000) {
            console.log("Cloth_Fabric already seeded");
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