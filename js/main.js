/**
 * Created by menangen on 08.07.16.
 */

loadingJSON = function () {

    $.ajax({
        type: 'GET',
        url: 'http://127.0.0.1:5000/json',
        dataType: 'json',
        context: $('body'),
        success: function(data){
            // console.log(data.map);
            let map = data.map;

            let Area = {width: map[0].length, height: map.length};

            for (let y = 0; y < Area.height; y++) {
                for (let x = 0; x < Area.width; x++) {

                    var pixelBlockData = map[y][x];
                    var color = pixels[pixelBlockData];

                    if(typeof color === 'undefined') {
                        // does not exist
                        color = 0x000000;
                    }


                    graphics.beginFill(color);


                    graphics.drawRect(x * Square.size, y * Square.size, Square.size, Square.size);
                }
            }


            stage.addChild(graphics);

            renderer.render(stage);



        },
        error: function(xhr, type){
            alert('Ajax error!')
        }
    })

};


$(document).ready(function() {
    setPixelsColor();
    loadingJSON();

    window.WebGLArea = {width: 2200, height: 1000};
    window.Square = {size: 3};

    window.renderer = new PIXI.WebGLRenderer(WebGLArea.width, WebGLArea.height);
    document.body.appendChild(renderer.view);

    window.stage = new PIXI.Container();

    window.graphics = new PIXI.Graphics();


    $("body").on("click", loadingJSON);
});