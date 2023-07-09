const express = require('express');
const connectDB = require('./db/connect');
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.static('./public'));
app.use(express.json());

// routes
app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`listening on ${port}`));
    } catch (err) {
        console.log(err);
    }
};

start();
