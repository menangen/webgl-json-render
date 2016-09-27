/**
 * Created by menangen on 27.09.16.
 */
"use strict";
let get_around_pixels = require('../utils/gridUtils').getAroundPixels;

let randomUtil = require('../utils/random');

let isRandomInInterval = randomUtil.getRandomInInterval;
let getRandom = randomUtil.getMinUntilMax;


module.exports = (pixelObject) => {
    const aroundStep = 10;

    if (pixelObject.value.chromeFerrum === 0) {

        let setEmeraldWithLuck = (random) => {
            let luck = 0;

            let step = aroundStep + getRandom(0, 7);
            const pixels_near_center = get_around_pixels(pixelObject, step);

            pixels_near_center.forEach((pixel) => {
                const valueInMap = pixelObject.map.altitude[pixel[1]][pixel[0]];

                if (valueInMap === 33) {
                    luck++
                }
            });

            if (isRandomInInterval(0, random) && luck == 0) {
                pixelObject.map.altitude[pixelObject.y][pixelObject.x] = 33;
            }
        };

        switch (pixelObject.value.altitude) {
            case 9:
                setEmeraldWithLuck(8000);
                break;
            case 8:
                setEmeraldWithLuck(5000);
                break;
            case 7:
                setEmeraldWithLuck(2000);
                break;
            case 6:
                setEmeraldWithLuck(800);
                break;
            case 5:
                setEmeraldWithLuck(200);
                break;
        }
    }
};