'use strict';

const app = require('express')();
const bodyParser = require('body-parser');  //process for forms
const mongoose = require('mongoose');

const routes = require('./routes/');  //slash as the end indicated you look in index first

const PORT = process.env.PORT || 3000;  //set up environment port if nonne given default to 3000


//set up mongodb URL

const MONGODB_HOST = process.env.MONGODB_HOST || `localhost`;
const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
const MONGODB_USER = process.env.MONGODB_USER || '';
const MONGODB_PASS = process.env.MONGODB_PASS || '';
const MONGODB_NAME = process.env.MONGODB_NAME || `node-webserver`;

const MONGODB_AUTH = MONGODB_USER
  ? `${MONGODB_USER}:${MONGODB_PASS}@`
  : '';

const MONGODB_URL = `mongodb://${MONGODB_AUTH}${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_NAME}`;
/////////////////////////

app.set('view engine', 'jade');  //set up engine to compile JADE

app.locals.title = 'THE Super Cool App';

app.use(bodyParser.urlencoded({ extended: false }));  //urlencoded parse url
app.use(bodyParser.json()); //parse json

app.use(routes);  //allows you to use the diferent routes

mongoose.connect(MONGODB_URL);

mongoose.connection.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Node.js server started. Listening on port ${PORT}`);
  });
});
