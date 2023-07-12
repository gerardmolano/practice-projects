require('dotenv').config();
require('express-async-errors');
const express = require('express');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => res.status(200).send('app'));

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        app.listen(port, console.log(`server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
