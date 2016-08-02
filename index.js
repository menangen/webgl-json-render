"use strict";

let perlin = require('./js/perlin/index');
let express = require('express');

let app = express();
app.use(express.static('.'));

const port = 5000;

//app.set('view engine', 'jade');

app.get('/json', function (req, res) {
    console.time('perlin');

    let responseMapJson = {"map": perlin.middle_mountains()}; //console.log(responseMapJson);

    console.timeEnd('perlin');

    res.send(responseMapJson);
});

app.listen(port, 'localhost');

console.log(`Started on port ${port}`);