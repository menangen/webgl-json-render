"use strict";

let express = require('express');

let perlin = require('./js/perlin');
let treasureGenerator = require('./js/treasure/generator.js');

let app = express();
app.use(express.static('.'));

const host = 'localhost';
const port = 5000;

//app.set('view engine', 'jade');

app.get('/json', function (req, res) {
    console.log('Recived JSON request');

    console.time('perlin');

    let mapObject = perlin.middle_mountains();
    let treasuredMap = treasureGenerator(mapObject);

    let responseMapJson = {"map": treasuredMap}; //console.log(responseMapJson);

    console.timeEnd('perlin');

    res.send(responseMapJson);
});

app.listen(port, host);

console.log(`Started on http://${host}:${port}/`);