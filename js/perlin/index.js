'use strict';
let addon = require('/Users/menangen/source/nodejs-native/build/Release/addon');
let Map = require('../settings');


module.exports = {

    small_mountains: () => {

        const octaves = 4;
        const freq = 20.0 * octaves;

        const lacunarity = 2.5;
        const persistence = 0.47;
        const altitude = 3.0;
        const rock_mass = 8;

        let map = [];

        for (let y = 0; y < Map.height; y++) {
            let x_array = [];

            for (let x = 0; x < Map.width; x++) {
                const perlin_noise = addon.perlin2({
                    "x": x / freq,
                    "y": y / freq,
                    "octaves": octaves,
                    "persistence": persistence,
                    "lacunarity": lacunarity,
                    "base": 0,
                    "type": 0
                });

                let value = 1 + Math.floor(perlin_noise * rock_mass + altitude);

                if (value > 5) {
                    if (value == 6) value = 5;
                    else value = 6
                }
                if (value < 2) {
                    //value = int(snoise2(width_loop / freq, height_loop / freq, octaves = 8, lacunarity = 1.5) * 30 + 3)
                    //value = int(snoise2(width_loop / freq * 2, height_loop / freq * 2, octaves = 3, persistence = 0.5, lacunarity = 2.5) * 20 + value)

                    value = 1;

                    //if (value > 1) value = 1;
                    //else value = 0;
                }

                x_array.push( value );
            }
            map.push(x_array);

        }

        return map;
    },

    middle_mountains: () => {

        let altitudeMap = [];
        let chromeFerrumMap = [];

        const lacunarity = 2.14;
        var persistence = 0.5;
        let altitude = 4.5;
        const rock_mass = 7;

        let octaves = 2;
        let freq = 20.0 * octaves;

        let middle_noise = [];

        for (let y = 0; y < Map.height; y++) {
            let x_array = [];

            for (let x = 0; x < Map.width; x++) {
                const perlin_noise = addon.perlin2({
                    "x": x / freq,
                    "y": y / freq,
                    "octaves": octaves,
                    "persistence": persistence,
                    "lacunarity": 1.9,
                    "base": 0,
                    "type": 2
                });

                let gain = perlin_noise * 2.0 + 0.8;

                x_array.push( gain );
            }
            middle_noise.push(x_array);

        }

        octaves = 5;
        freq = 80.0 * octaves;

        for (let y = 0; y < Map.height; y++) {
            let xAltitudeArray = [];

            for (let x = 0; x < Map.width; x++) {
                let perlin_noise = addon.perlin2({
                    "x": x / freq,
                    "y": y / freq,
                    "octaves": octaves,
                    "persistence": persistence,
                    "lacunarity": lacunarity,
                    "base": 0,
                    "type": 3
                });

                let current_altitude = altitude - middle_noise[y][x];

                let value = Math.floor(perlin_noise * rock_mass + current_altitude);

                if (value > 9) value = 9;
                if (value < 0) value = 0;

                if (value == 0) {

                    const sandOctaves = 4;
                    const sandFreq = 4.0 * sandOctaves;
                    const sandNoise = addon.perlin2({
                        "x": x / sandFreq,
                        "y": y / sandFreq,
                        "octaves": sandOctaves,
                        "persistence": 0.3,
                        "lacunarity": 2.7,
                        "base": 0,
                        "type": 0
                    });

                    value = Math.floor(sandNoise * 0.6 + 0.9);
                    if (value < 0) value = 0;
                }

                xAltitudeArray.push( value );


            }
            altitudeMap.push(xAltitudeArray);

        }

        for (let y = 0; y < Map.height; y++) {
            let xChromeArray = [];

            for (let x = 0; x < Map.width; x++) {
                const chemicalNoiseOctaves = 2;

                // Chrome and Ferrum
                const freqChrome = 25.0 * chemicalNoiseOctaves;
                const persistence = 2.5;

                const perlin_noise = addon.perlin2({
                    "x": x / freqChrome,
                    "y": y / freqChrome,
                    "octaves": chemicalNoiseOctaves,
                    "persistence": persistence,
                    /* TODO: fix nodeJS native addon for removing lacunarity and etc */
                    "lacunarity": 2.0,
                    "base": 0,
                    "type": 0
                });

                let value = Math.floor(perlin_noise * 3.5 + 2.0);

                if (value > 3) value = 3;
                if (value < 0) value = 0;

                xChromeArray.push( value );
            }
            chromeFerrumMap.push(xChromeArray);
        }



        return {altitudeNoise: altitudeMap, chromeFerrumNoise: chromeFerrumMap};
    }


};