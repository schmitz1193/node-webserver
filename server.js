  'use strict';
 // var $ = require('public/vendor/jquery/dist/jquery.min.js');
  const express = require('express');
  const app = express();
  const bodyParser = require('body-parser');
  const multer  = require('multer');
  const upload = multer({ dest: 'tmp/uploads' });
  const path = require('path');
  const sassMiddleware = require('node-sass-middleware');
 // const appModule = require('./public/javascript/app.js');

  const PORT = process.env.PORT || 3000;

  //view engine setup  app.set creates a variable that can be used in any file
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
//set up an express variable passed to every res.render..something you want on every rendered page
app.locals.title = 'to the Greatest CAlendar App Ever';

//need to pass object on where or not...?
//app.use(bodyParser.urlencoded({extended: false}));

//SASS set up
  app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'public'),
    dest: path.join(__dirname, 'public'),
    indentedSyntax: true,
    sourceMap: true
}));

  app.use(express.static(path.join(__dirname, 'public')));


//Root route  -this compiles jade everytime you go to the root?
  app.get('/', (req, res) => {
    res.render('index', {
      title: 'to the Greatest Calendar App EVER',
      date: new Date()   //.toLocaleDateString() could go here as well and you pass JADE the string
    });
  });

  app.get('/contact', (req,res) => {
 //   if(req.query.name) {
 //     res.send('<h1>Thanks for contacting</h1>');
 //   }
    res.render('contact')
  });


  app.post('/contact', (req,res) => {
    const name = req.body.name;
    res.send('<h1>Thanks for contacting us ${name}</h1>');
  });

  app.get('/sendphoto', (req,res) => {
    res.render('sendphoto');
  });

  app.post('/sendphoto', upload.single('image'), (req,res) => {
    console.log('body ', req.body, 'file ', req.file);
    res.send('<h1>Thanks for sending us your photo</h1>');
  });


//http.createServer((req,res) => {
  //console.log(req.method, req.url);

  //if (req.url === '/hello') {
    //const msg = '<h1>Hello World!</h1><h2>Goodbye World!</h2>';
    //res.writeHead(200, {
      //'Content-Type': 'text/html'
    //});

    //msg.split('').forEach((char, i) => {
      //setTimeout(() => {
        //res.write(char);
      //}, 1000 * i);
    //});

////    res.write('<h1>Hey HEY<h1>');
    //setTimeout(() => {
    //res.end();
    //}, 20000);

  //} else if (req.url === '/random') {
    //res.end(Math.random().toString());
  //} else {
    //res.writeHead(403);
    //res.end('Access Denied!');
  //}
//})


//Hello World, playing around with it one letter at a time!////////////////
app.get('/hello', (req, res) => {
 const name = req.query.name;
 const msg = `<h1>Hello ${name}!</h1>
<h2>Goodbye ${name}!</h2>`;
console.log('QUERY PARAMS ', req.query);

  res.writeHead(200, {
    'Content-Type': 'text/html'
  });
 // chunk response by character
  msg.split('').forEach((char, i) => {
    setTimeout(() => {
      res.write(char);
    }, 1000 * i);
  });

  // wait for all characters to be sent
  setTimeout(() => {
    res.end();
  }, msg.length * 1000 + 2000);
});
///////////////////////////////////////////////////////////////////////////

//Use the month calendar
app.get('/cal/:year/:month', (req,res) => {
  const month = require('node-cal/lib/month');
  console.log(month.setUpWholeMonth);
  res.send('<pre>' + month.setUpWholeMonth(req.params.year, req.params.month) + '</pre>');

});

//Generate a random number
app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});

//random number between two entered digits
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log('PARAMS ', req.params);
  res.send(getRandomInt(+min, +max).toString());
});

//all remaining options
app.all('*', (req, res) => {
  res.status(403)
     .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});


