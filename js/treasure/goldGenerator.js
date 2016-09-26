/**
 * Created by menangen on 26.09.16.
 */
"use strict";
let Map = require('../settings');
let get_around_pixels = require('./gridUtils').getAroundPixels;

const pixelObject = {x: 0, y:0, value: 0, map: null};
const rockTypes = new Set([4, 5, 6, 7, 8, 9]);

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

const gaussRandom = (a, b) => {

    var x = getRandom(0, 1000);

    return a < x && x < b;
};

const get_altitude_luck = (pixelObject) => {

    const around_step = 4;
    let gold_luck = 0;
    let gem_luck = 0;

    const pixels_near_center = get_around_pixels(pixelObject, around_step);

    pixels_near_center.forEach((pixel) => {
        const valueInMap = pixelObject.map[pixel[1]][pixel[0]];

        if (valueInMap < 16) {
            gold_luck++; gem_luck++
        }
        else /* Near treasure or bonus! */ {
            if ( valueInMap == 16 || valueInMap == 17) {

                if (getRandom(0, 2) && rockTypes.has(pixelObject.value)) gold_luck++;
                else gold_luck -= Math.pow(around_step * 2, 2)

            }
            else { gem_luck-- }
        }
    });

    return gold_luck > Math.pow(around_step * 2 - 1, 2) - 5 && gem_luck > Math.pow(around_step * 2 - 1, 2) - 5
};

module.exports = (map2DArray) => {
    pixelObject.map = map2DArray;

    for (let y = 0; y < Map.height; y++) {


        for (let x = 0; x < Map.width; x++) {


            pixelObject.x = x;
            pixelObject.y = y;
            pixelObject.value = map2DArray[y][x];

            if (pixelObject.value < 16) {
                if (pixelObject.value > 1) {


                    switch (pixelObject.value) {
                        case 9:
                        case 8:
                            if (gaussRandom(1, 50) && get_altitude_luck(pixelObject)) {

                                if (getRandom(0, 2)) { map2DArray[y][x] = 17 }
                                else { map2DArray[y][x] = 16 }

                            }
                            break;
                        case 7:
                            if (gaussRandom(1, 20) && get_altitude_luck(pixelObject)) {

                                if (getRandom(0, 2)) { map2DArray[y][x] = 17 }
                                else { map2DArray[y][x] = 16 }

                            }
                            break;

                    }

                }
                else {

                }
            }

        }

    }

    return map2DArray;
};