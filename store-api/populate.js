const connectDB = require('./db/connect');
const Product = require('./models/product');
const jsonProducts = require('./products.json');
require('dotenv').config();

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await Product.deleteMany();
        await Product.create(jsonProducts);
        console.log('done');
        process.exit(0);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

start();
