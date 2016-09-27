/**
 * Created by menangen on 27.09.16.
 */
"use strict";

const getRandom = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

module.exports = {
    getMinUntilMax: getRandom,

    getRandomInInterval: (a, b) => {

        var x = getRandom(0, 10000);

        return a < x && x < b;
    }
};