  'use strict';
 // var $ = require('public/vendor/jquery/dist/jquery.min.js');
  const express = require('express');
  const app = express();

  const PORT = process.env.PORT || 3000;

  app.set('view engine', 'jade');

//Root route  -this compiles jade everytime you go to the root?
  //app.get('/', (req, res) => {
    //res.render('index', {
      //title: 'NodeJS Web Server App',
      //date: new Date()   //.toLocaleDateString() could go here as well and you pass JADE the string
    //});
  //});

  app.get('/Calendar', (req, res) => {
    res.render('index', {
      title: 'to the Greatest Calendar App EVER!',
      date: new Date()
    });
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

app.get('/cal/:year/:month', (req,res) => {
  const month = require('node-cal/lib/month');
  console.log(month.setUpWholeMonth);
  res.send('<pre>' + month.setUpWholeMonth(req.params.year, req.params.month) + '</pre>');

});

app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log('PARAMS ', req.params);

  res.send(getRandomInt(+min, +max).toString());
});

app.all('*', (req, res) => {
  res.status(403)
     .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max-min)) + min;
}
