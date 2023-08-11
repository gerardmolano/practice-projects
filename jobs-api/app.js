require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
// security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');

// middlware
const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');
const authentication = require('./middleware/authentication');

// routes
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

const app = express();
const port = process.env.PORT || 5000;

// middlware
app.set('trusy proxy', 1);
app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per winowMs
}));

app.use(express.json());
app.use(helmet());
app.use(cors());

// routes
app.use(authRouter);
app.use('/api/v1/jobs', authentication, jobsRouter);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`server is listening on ${port}`));
    } catch (error) {
        console.log(error);
    }
};

start();
