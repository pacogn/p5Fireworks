import "./styles.scss";

import P5 from "p5";
import Firework from "./Firework";

const canvasWidth = 640;
const canvasHeight = 480;

const canvasWidthDiv2 = canvasWidth/2;
const canvasHeightDiv2 = canvasHeight/2;

let gravity;

// -----
const sketch = (p5: P5) => {
    const fireworks: Fireworks[] = [];

    p5.setup = () => {
        const canvas = p5.createCanvas(canvasWidth, canvasHeight);
        canvas.parent("app");

        p5.stroke("#C2C2C2");
        p5.strokeWeight(4);

        gravity = p5.createVector(0, 0.02);

        this.fireworks = [];
        for (let i=0; i<10; i++) {
            this.fireworks.push(new Firework(p5));
        }
    };

    p5.draw = () => {
        p5.background("#222");

        if (p5.random(0,1) > 0.9) {
            this.fireworks.push(new Firework(p5));
        }

        p5.strokeWeight(4);

        this.fireworks.forEach((firework, i, allFw) => {
            if (!firework.finish) {
                firework.update();
                firework.draw();
            }
            else {
                allFw.splice(i, 1); 
            }
        });

        if (window.showFPS) {
            p5.fill(255);
            p5.stroke(0);
            p5.text("FPS: " + p5.frameRate().toFixed(2), 10, p5.height - 10);
            p5.text("FW: " + this.fireworks.length, 10, p5.height - 20);
        }
    };
};

new P5(sketch);
