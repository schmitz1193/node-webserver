
'use strict';

const express = require('express');
const router = express.Router();

const api = require('./api');
const contact = require('./contact');
const hello = require('./hello');
const home = require('./home');
const random = require('./random');
const secret = require('./secret');
const sendphoto = require('./sendphoto');

router.use(api);
router.use(contact);
router.use(hello);
router.use(home);
router.use(random);
router.use(secret);
router.use(sendphoto);

module.exports = router;


//Root route  -this compiles jade everytime you go to the root?
  // router.get('/', (req, res) => {
  //   res.render('index', {
  //     title: 'to the Greatest Calendar router EVER',
  //     date: new Date()   //.toLocaleDateString() could go here as well and you pass JADE the string
  //   });
  // });

  // router.get('/contact', (req,res) => {
 //   if(req.query.name) {
 //     res.send('<h1>Thanks for contacting</h1>');
 // //   }
 //    res.render('contact')
 //  });

module.exports = router;
