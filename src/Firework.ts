import P5 from "p5";
import Particle from "./Particle";

enum Phases {
    launch,
    explode,
    done
}

const palette = [
    '#613163',
    '#BC87BF',
    '#57AEA5',
    '#ADCFCE',
    '#3985B6',
];

export default class Firework {
    p5: P5;

    shell: Particle;
    stars: Particle[];
    phase: Phases;
    g: P5.Vector;
    finish:  boolean;
    color: P5.Color;

    constructor(p5: P5, _x:number, _y:number, _g?:P5.Vector) {
        this.p5 = p5;

        _x = p5.random(p5.width);
        _y = p5.height;

        if (typeof _g === "undefined") _g = p5.createVector(0,0.2);

        this.shell = new Particle(p5, _x, _y, _g);
        this.stars = [];
        this.fire();
        this.g = _g;
        this.finish = false;

        const r = Math.floor(p5.random(0, palette.length));
        const c = palette[r];
        this.color = p5.color(c);
    }

    fire() {
        this.phase = Phases.launch;
        this.shell.acc.set(
            this.p5.random(-0.3,  0.3),
            this.p5.random(-14.0, -6.0)
        );
    }

    update() {
        switch(this.phase) {
            case Phases.launch:
                const rndXForce = this.p5.createVector(this.p5.random(-0.3, 0.3), 0);
                this.shell.applyForce(rndXForce);
                this.shell.update();
                break;

            case Phases.explode:
                this.stars.forEach((star, i, allStars) => {
                    if (star.livespan > 0) {
                        star.update();
                    }
                    else {
                       allStars.splice(i, 1); 
                    }
                });
                break;
        }
    }

    draw() {
        switch(this.phase) {
            case Phases.launch:
                if (this.shell.acc.y < -1.5) {
                    const p5 = this.p5;
                    // const c = p5.color(200,200,200, alpha);
                    // p5.stroke(c);

                    this.shell.draw();
                }
                else 
                    this.explode();
            break;

            case Phases.explode:
                if (this.stars.length > 0) {
                    this.stars.forEach(star => {
                        const alpha = (star.livespan > -1) ? star.livespan : 0;

                        if (this.p5.random(0,1) < 0.8)
                            this.p5.stroke(this.color);
                        else 
                            this.p5.stroke(this.p5.color(255,255,255));
                        star.draw();
                    })

                }
                else {
                    this.phase = Phases.done;
                }
            break;

            case Phases.done:
                this.finish = true;
            break;
        }
    }

    done() {
    }

    private explode() {
        const p5 = this.p5;

        this.phase = Phases.explode;

        const maxStars = p5.random(20,30);

        for (let i=0; i < maxStars; ++i) {
            const x = this.shell.pos.x;
            const y = this.shell.pos.y;
            const g = p5.createVector(0, 0.05);

            const dVx = p5.random(-1,1);
            const dVy = p5.random(-1,1);
            const v = p5.createVector(dVx, dVy);
            const c = p5.color(0,0,255);

            const star = new Particle(p5, x, y, g, c);
            star.setDecay(255);

            const r = 3;
            star.acc.set(
                this.p5.random(-1*r, r),
                this.p5.random(-1*r, r)
            );

            this.stars.push(star);
        }
    }

}
