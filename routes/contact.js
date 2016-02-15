//Routes/contact.js

'use strict';

const express = require('express');
const router = express.Router();

//const Contact = require('../models/contact');
const contact = require('../controllers/contact');

router.get('/contact', contact.index);  //sets /contact as the index page
router.post('/contact', contact.new);

module.exports = router;
