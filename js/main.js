/**
 * Created by menangen on 08.07.16.
 */
let x = 0;

const pixiDrawer = {
    stage: new PIXI.Container(),
    graphics: new PIXI.Graphics(),
    renderer: new PIXI.WebGLRenderer({ width: 2000, height: 1000, clearBeforeRender: true }),
    drawPixel (x, y, pixelBlockData, size = pixiDrawer.Square.size) {
        let color = pixelBlockData === "red" ? 0xBB0000 : pixels[pixelBlockData];

        if(typeof color === 'undefined') {
            // does not exist
            color = 0x000000;
        }

        pixiDrawer.graphics.beginFill(color);
        pixiDrawer.graphics.drawRect(
            pixelBlockData === "red" ? x : x * size,
            pixelBlockData === "red" ? y : y * size,
            size, size);
    },
    drawError () {
        drawPixel(0, 0, "red", 120);
        pixiDrawer.addToStage();
    },
    clearStage() {
        console.info("Destroy");

        this.stage.removeChild(this.graphics);

        this.graphics.destroy(true);
        this.stage.destroy(true);

        delete this.graphics;
        delete this.stage;

        this.stage = new PIXI.Container();
        this.graphics = new PIXI.Graphics();

        this.stage.addChild(this.graphics);
    },
    addToStage () {
        x++;

        try {

            this.renderer.render(this.stage, null, true, null, true);
            this.clearStage();

        } catch (e) {
            console.error(e)
        }
    },
    Square: { size: 3 },
    appendToBody() {
        document.body.appendChild(pixiDrawer.renderer.view);
        this.stage.addChild(pixiDrawer.graphics);
    }
};

loadingJSON = async function () {

    console.log('Request JSON');
    let response;

    try {
        response = await fetch('http://localhost:5000/json');
    } catch (e) {
        console.error("Error loading /json");
        pixiDrawer.drawError();
        return
    }

    try {
        const jsonMap = await response.json();

        if (Array.isArray(jsonMap)) {
            //console.log(jsonMap, Map.height);

            const height = Map.height, width = Map.width;
            let x = 0, y = 0;



            for (let pixelBlockData of jsonMap) {
                if (x === height) { y++; x = 0 }

                pixiDrawer.drawPixel(x, y, pixelBlockData);

                x++;
            }

            pixiDrawer.addToStage()
        }
        else {
            //console.log(jsonMap.map);
            const map = jsonMap.map;

            const Area = {width: map[0].length, height: map.length};

            for (let y = 0; y < Area.height; y++) {
                for (let x = 0; x < Area.width; x++) {

                    const pixelBlockData = map[y][x];
                    pixiDrawer.drawPixel(x, y, pixelBlockData);
                }
            }

            pixiDrawer.addToStage()
        }

    } catch (e) {
        console.error("Can't parse JSON!", e);

        return pixiDrawer.drawError()
    }
};

document.addEventListener('DOMContentLoaded', async function () {
    setPixelsColor();

    pixiDrawer.appendToBody();

    await loadingJSON();

    document.addEventListener('click', loadingJSON);
}, false);

