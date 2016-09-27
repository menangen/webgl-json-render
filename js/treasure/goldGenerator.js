/**
 * Created by menangen on 26.09.16.
 */
"use strict";

let get_around_pixels = require('../utils/gridUtils').getAroundPixels;
let randomUtil = require('../utils/random');

let isRandomInInterval = randomUtil.getRandomInInterval;
let getRandom = randomUtil.getMinUntilMax;

const goldRockTypes = new Set([4, 5, 6, 7, 8, 9]);


const getAltitudeLuck = (pixelObject) => {

    const aroundStep = 4;
    let goldLuck = 0;
    let gemLuck = 0;

    const pixels_near_center = get_around_pixels(pixelObject, aroundStep);

    pixels_near_center.forEach((pixel) => {
        const valueInMap = pixelObject.map.altitude[pixel[1]][pixel[0]];

        if (valueInMap < 16) {
            goldLuck++; gemLuck++
        }
        else /* Near treasure or bonus! */ {
            if ( valueInMap == 16 || valueInMap == 17) {

                if (getRandom(0, 2) && goldRockTypes.has(pixelObject.value)) goldLuck++;
                else goldLuck -= Math.pow(aroundStep * 2, 2)

            }
            else { gemLuck-- }
        }
    });

    return goldLuck > Math.pow(aroundStep * 2 - 1, 2) - 5 && gemLuck > Math.pow(aroundStep * 2 - 1, 2) - 5
};

module.exports = (pixelObject) => {

    let setGoldWithLuck = (random, superGoldLuck) => {
        if (isRandomInInterval(0, random) && getAltitudeLuck(pixelObject)) {

            pixelObject.map.altitude[pixelObject.y][pixelObject.x] = getRandom(0, superGoldLuck) == 0 ? 17 : 16;

        }
    };


    if (pixelObject.value.altitude < 16) {

        switch (pixelObject.value.altitude) {
            case 9:
            case 8:
                setGoldWithLuck(40, 2);
                break;
            case 7:
                setGoldWithLuck(20, 2);
                break;
            case 6:
                setGoldWithLuck(17, 2);
                break;
            case 5:
                setGoldWithLuck(15, 3);
                break;
            case 4:
                setGoldWithLuck(14, 6);
                break;
            case 3:
                setGoldWithLuck(10, 8);
                break;
            case 2:
                setGoldWithLuck(9, 10);
                break;
            case 1:
            case 0:
                setGoldWithLuck(2, 20);
                break;

        }

    }

};