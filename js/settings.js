/**
 * Created by menangen on 08.07.16.
 */
setPixelsColor = function () {
    window.pixels = [];

    pixels[0] = 0x372915;
    pixels[1] = 0x59410e;
    pixels[2] = 0x44371c;
    pixels[3] = 0x393428;
    pixels[4] = 0x3c3b3a;
    pixels[5] = 0x3c3b3F;
    pixels[6] = 0x2c2b2a;
    pixels[7] = 0x202022;
    pixels[8] = 0x1D1D1F;
    pixels[9] = 0x14141A;
    pixels[10] = 0x473843; // Path finder

    // gold [10:hex]
    pixels[16] = 0xAA7700; // Simple
    pixels[17] = 0xFFFF00; // Cool
    
    // gemstones [20:hex]
    pixels[32] = 0x8ddbfd; // Diamond
    pixels[33] = 0x22AA33; // Emerald
    pixels[34] = 0x222299; // Sapphire
    pixels[35] = 0xae1a32; // Ruby
    pixels[36] = 0x3f6167; // Aquamarine


    console.log("Color table loaded");
};