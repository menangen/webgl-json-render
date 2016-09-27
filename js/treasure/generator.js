/**
 * Created by menangen on 27.09.16.
 */
"use strict";
let Map = require('../settings');
let goldGenerator = require('./goldGenerator.js');
let emeraldGenerator = require('./emeraldGenerator.js');

module.exports = (map) => {
    const pixelObject = {x: 0, y:0, value: {altitude: null, chromeFerrum: null}, map: {altitude: map.altitudeNoise, chrome: map.chromeFerrumNoise}};


    for (let y = 0; y < Map.height; y++) {


        for (let x = 0; x < Map.width; x++) {


            pixelObject.x = x;
            pixelObject.y = y;
            pixelObject.value.altitude = map.altitudeNoise[y][x];
            pixelObject.value.chromeFerrum = map.chromeFerrumNoise[y][x];

            goldGenerator(pixelObject);
            emeraldGenerator(pixelObject);

        }

    }

    return map.altitudeNoise
};