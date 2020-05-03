import P5 from "p5";

export default class Particle {
	p5: P5;
	pos: P5.Vector;
	vel: P5.Vector;
	acc: P5.Vector;
    g: P5.Vector;
    livespan: number;
    trail: P5.Vector[];

	constructor(p5: P5, _x?: number=0, _y?: number=0, _gravity?:P5.Vector, _color?: P5.color, livespan?:number=-1)
	{
		this.p5 = p5;

		this.pos = p5.createVector(_x, _y);
		this.vel = p5.createVector(0, 0);
		this.acc = p5.createVector(0, 0);
        this.g = _gravity;
        this.trail = [];

		if (typeof _color == "undefined") _color = p5.color(255,0,0);
	}

	applyForce(force: P5.Vector) {
		this.acc.add(force);
	}

	update() {
        if (this.g)
            this.applyForce(this.g);

		this.vel.add(this.acc);
		this.pos.add(this.vel);
		this.vel.mult(0);
	}
 
	draw() {
        // this.p5.stroke(this.color);
        const p5 = this.p5;

        if (this.livespan > -1) {
            this.livespan-=4;
        }

		this.p5.point(this.pos.x, this.pos.y);
	}

    setDecay(livespan: number) {
        this.livespan = livespan;
    }
}
