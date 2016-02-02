  'use strict';

  const express = require('express');
  const app = express();

  const PORT = process.env.PORT || 3000;


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

//app.get('/cal', (req, res) => {
  //const month = require('node-cal/lib/month');
  //console.log(month);
//});

app.get('/random', (req, res) => {
  res.send(Math.random().toString());
});

app.get('/random/:min/:max', (req, res) => {
  const min = req.params.min;
  const max = req.params.max;
  console.log('PARAMS ', req.params);

  res.end(getRandomInt(+min, +max).toString());
});

app.all('*', (req, res) => {
  res.status(403)
     .send('Access Denied!');
});

app.listen(PORT, () => {
  console.log(`Node.js server started. Listening on port ${PORT}`);
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (min-max)) + min;
}
