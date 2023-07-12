const express = require('express');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const login = require('./routes/login');
const dashboard = require('./routes/dashboard');
require('express-async-errors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use(login);
app.use(dashboard);

app.use(notFound);
app.use(errorHandler);
0
const start = async () => {
    try {
        app.listen(port, console.log(`listening on port ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();
