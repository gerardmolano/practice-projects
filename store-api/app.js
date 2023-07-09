const express = require('express');
const connectDB = require('./db/connect');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const products = require('./routes/products');
require('express-async-errors');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

app.use('/api/v1/products', products);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`listening on ${port}`));
    } catch(err) {
        console.log(err);
    }   
};

start();
