"use strict";

let perlin = require('./js/perlin/index');
let express = require('express');

let app = express();
const port = 5000;

//app.set('view engine', 'jade');

app.get('/json', function (req, res) {
    console.time('perlin');

    let responseMapJson = {"map": perlin.middle_mountains()}; //console.log(responseMapJson);

    console.timeEnd('perlin');

    res.send(responseMapJson);
});

app.listen(port);

console.log(`Started on port ${port}`);