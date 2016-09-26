/**
 * Created by menangen on 26.09.16.
 */
"use strict";
let Map = require('../settings');

module.exports = {

    getAroundPixels: (pixelObject, offset) => {
        /* Returned List: [pixel, pixel...] */

        const resultPixelsSet = new Set();

        const wSquare = (offset * 2) + 1;
        const sPixels = Math.pow(wSquare, 2);

        const centerPixelNumber = (sPixels - 1) / 2;

        for (let pixelIdInSquare = 0; pixelIdInSquare < sPixels; pixelIdInSquare++) {
            const x = (pixelIdInSquare % wSquare) - (offset - pixelObject.x);
            const y = Math.floor(pixelIdInSquare / wSquare) - (offset - pixelObject.y);

            // Pixel in area?
            if ((Map.width > x && x > -1) && (Map.height > y && y > -1) && (pixelIdInSquare != centerPixelNumber)){
                resultPixelsSet.add([x, y])
            }

        }

        return resultPixelsSet
    }

};