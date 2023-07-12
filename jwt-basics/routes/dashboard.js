const express = require('express');
const dashboard = require('../controllers/dashboard');
const authentication = require('../middleware/authentication');

const router = express.Router();

router.route('/dashboard').get(authentication, dashboard);

module.exports = router;
