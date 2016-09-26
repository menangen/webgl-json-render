"use strict";

let express = require('express');

let perlin = require('./js/perlin');
let goldGenerator = require('./js/treasure/goldGenerator.js');

let app = express();
app.use(express.static('.'));

const host = 'localhost';
const port = 5000;

//app.set('view engine', 'jade');

app.get('/json', function (req, res) {
    console.log('Recived JSON request');

    console.time('perlin');

    let altitudeMap = perlin.middle_mountains();
    let treasured_map = goldGenerator(altitudeMap);

    let responseMapJson = {"map": treasured_map}; //console.log(responseMapJson);

    console.timeEnd('perlin');

    res.send(responseMapJson);
});

app.listen(port, host);

console.log(`Started on http://${host}:${port}/`);