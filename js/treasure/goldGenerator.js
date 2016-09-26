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

    var x = getRandom(0, 10000);

    return a < x && x < b;
};

const get_altitude_luck = (pixelObject) => {

    const around_step = 4;
    let gold_luck = 0;
    let gem_luck = 0;

    let pixels_near_center = get_around_pixels(pixelObject, around_step);

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
    let setGoldWithLuck = (pixel, random, superGoldLuck) => {
        if (gaussRandom(0, random) && get_altitude_luck(pixelObject)) {

            map2DArray[pixel.y][pixel.x] = getRandom(0, superGoldLuck) == 0 ? 17 : 16;

        }
    };


    pixelObject.map = map2DArray;

    for (let y = 0; y < Map.height; y++) {


        for (let x = 0; x < Map.width; x++) {


            pixelObject.x = x;
            pixelObject.y = y;
            pixelObject.value = map2DArray[y][x];

            if (pixelObject.value < 16) {

                switch (pixelObject.value) {
                    case 9:
                    case 8:
                        setGoldWithLuck(pixelObject, 40, 2);
                        break;
                    case 7:
                        setGoldWithLuck(pixelObject, 20, 2);
                        break;
                    case 6:
                        setGoldWithLuck(pixelObject, 17, 2);
                        break;
                    case 5:
                        setGoldWithLuck(pixelObject, 15, 3);
                        break;
                    case 4:
                        setGoldWithLuck(pixelObject, 14, 6);
                        break;
                    case 3:
                        setGoldWithLuck(pixelObject, 10, 8);
                        break;
                    case 2:
                        setGoldWithLuck(pixelObject, 9, 10);
                        break;
                    case 1:
                    case 0:
                        setGoldWithLuck(pixelObject, 2, 20);
                        break;

                }

            }

        }

    }

    return map2DArray;
};