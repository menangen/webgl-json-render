'use strict';
let addon = require('/Users/admin/coding/nodejs-native/build/Release/addon');
let Area = {
    width: 650,
    height: 350
};

const small_mountains = () => {

    const octaves = 4;
    const freq = 20.0 * octaves;

    const lacunarity = 2.5;
    const persistence = 0.47;
    const altitude = 3.0;
    const rock_mass = 8;

    let map = [];

    for (let y = 0; y < Area.height; y++) {
        let x_array = [];

        for (let x = 0; x < Area.width; x++) {
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
};

const middle_mountains = () => {

    const lacunarity = 2.14;
    const persistence = 0.5;
    let altitude = 4.5;
    const rock_mass = 7;

    let octaves = 2;
    let freq = 20.0 * octaves;

    let middle_noise = [];

    for (let y = 0; y < Area.height; y++) {
        let x_array = [];

        for (let x = 0; x < Area.width; x++) {
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

    let map = [];

    for (let y = 0; y < Area.height; y++) {
        let x_array = [];

        for (let x = 0; x < Area.width; x++) {
            const perlin_noise = addon.perlin2({
                "x": x / freq,
                "y": y / freq,
                "octaves": octaves,
                "persistence": persistence,
                "lacunarity": lacunarity,
                "base": 0,
                "type": 3
            });

            //let current_altitude = altitude - middle_noise[y][x];

            let value = Math.floor(perlin_noise * rock_mass + altitude);

            if (value > 9) value = 9;
            else if (0 < value < 2) {

                value = 1;

            }
            else {
                value = 0;
            }

            x_array.push( value );
        }
        map.push(x_array);

    }

    return map;
};

module.exports = {
    "small_mountains": small_mountains,
    "middle_mountains": middle_mountains
};