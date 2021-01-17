var p5Canvas = [];
var snowflakes = [];
var rain = [];
var sun = 400;
var bubbles = [];
var rainingNow = true;
var bgcolor = "#e5e5e5";
// var weatherToggle = false;

let setRain = (p) => {
    p.setup = function (i) {
        p.createCanvas(lastClickedMon.offsetWidth, lastClickedMon.offsetHeight);
        p.frameRate(60);

        for (i = 0; i < 100; i++) {
            rain[i] = new Rain(p, p.random(50, lastClickedMon.offsetWidth), p.random(0, lastClickedMon.offsetHeight));
        }
        // console.log(lastClickedMon.offsetHeight);
    }
    p.draw = function () {
        p.background(bgcolor);

        //Check if it's raining or sunny
        if (rainingNow == true) {
            //background(100);
            for (i = 0; i < rain.length; i++) {
                rain[i].dropRain();
                rain[i].splash();
            }
        }
    }
}
function Rain(p, x, y) {
    this.x = x;
    this.y = y;
    // this.gravity = 9.8;
    this.length = 20;
    this.r = 0;
    this.opacity = 200;


    this.dropRain = function () {
        p.fill('#666');
        //rect(this.x, this.y,3,15);
        p.ellipse(this.x, this.y, 1, this.length);
        this.y = this.y + 6 //+ frameCount/60;
        if (this.y > y) {
            this.length = this.length - 5;
        }
        if (this.length < 0) {
            this.length = 0;
        }
    }
    this.splash = function () {
        p.strokeWeight(2);
        p.stroke(200, 200 / p.frameCount);
        p.stroke(200, this.opacity);
        p.noFill();
        if (this.y > y) {
            p.ellipse(this.x, y + 5, this.r * 5, this.r / 2);
            this.r++;
            this.opacity = this.opacity - 10;

            //keep the rain dropping
            if (this.opacity < 0) {
                this.y = p.random(0, -100);
                this.length = 20;
                this.r = 0;
                this.opacity = 200;
            }
        }
    }
}
let setSnow = (p) => {
    p.setup = function (i) {
        p.createCanvas(lastClickedMon.offsetWidth, lastClickedMon.offsetHeight);
        p.frameRate(60);
        p.fill(255);
        p.noStroke();
    }
    p.draw = function () {
        p.background('#e5e5e5');

        let t = p.frameCount / 180;

        // create a random number of snowflakes each frame
        for (let i = 0; i < p.random(5); i++) {
            snowflakes.push(new snowflake(p)); // append snowflake object
        }
        // loop through snowflakes with a for..of loop
        for (let flake of snowflakes) {
            flake.update(t); // update snowflake position
            flake.display(); // draw snowflake
        }
    }
}
function snowflake(p) {
    // initialize coordinates
    this.posX = 0;
    this.posY = p.random(0, 0);
    this.initialangle = p.random(0, 2 * p.PI * 3);
    this.size = p.random(1, 6);

    // radius of snowflake spiral
    // chosen so the snowflakes are uniformly spread out in area
    this.radius = p.sqrt(p.random(p.pow(lastClickedMon.offsetWidth / 2, 2)));

    this.update = function (time) {
        // x position follows a circle
        let w = 0.6; // angular speed
        let angle = w * time + this.initialangle;
        this.posX = lastClickedMon.offsetWidth / 2 + this.radius * p.sin(angle);

        // different size snowflakes fall at slightly different y speeds
        this.posY += p.pow(this.size, 0.5);

        // delete snowflake if past end of screen
        if (this.posY > lastClickedMon.offsetHeight) {
            let index = snowflakes.indexOf(this);
            snowflakes.splice(index, 1);
        }
    };

    this.display = function () {
        p.ellipse(this.posX, this.posY, this.size);
    };
}
let setCloud = (p) => {
    p.setup = function (i) {
        p.createCanvas(lastClickedMon.offsetWidth, lastClickedMon.offsetHeight);
        p.frameRate(60);
        for (var i = 0; i < 20; i++) {
            bubbles[i] = new Bubble(p);
        }
    }
    p.draw = function () {
        p.background('#e5e5e5');
        for (var i = 0; i < bubbles.length; i++) {
            bubbles[i].move();
            bubbles[i].display();
        }
    }
}
function Bubble(p) {
    this.x = p.random(0, lastClickedMon.offsetWidth);
    this.y = p.random(0, lastClickedMon.offsetHeight);

    this.display = function () {
        p.stroke(255);
        p.strokeWeight(1);
        p.fill(255);
        p.ellipse(this.x, this.y, 35, 35);
        p.ellipse(this.x + 10, this.y + 10, 35, 35);
        p.ellipse(this.x + 30, this.y + 10, 35, 35);
        p.ellipse(this.x + 30, this.y - 10, 35, 35);
        p.ellipse(this.x + 20, this.y - 10, 35, 35);
        p.ellipse(this.x + 40, this.y, 35, 35);
    }

    this.move = function () {
        this.x = this.x += 1;
        this.y = this.y + p.random(-1, 1);

        if (this.x >= lastClickedMon.offsetWidth) {
            this.x = 0;
        }
    }
}
let setSun = (p) => {
    SWH1 = p.random(5, 10);
    SWH2 = p.random(6, 10);
    SWH3 = p.random(15, 20);
    RDS = p.random(280, 650);

    p.setup = function (i) {
        p.createCanvas(lastClickedMon.offsetWidth, lastClickedMon.offsetHeight);
    }
    p.draw = function () {
        p.noStroke();
        // p.background(229,229,229, 10);
        p.background('#e5e5e5');
        
        // stars in the universe
        p.fill(255, 200, 0);
        p.ellipse(p.mouseX*1.1, p.mouseY*1.8, SWH1, SWH1);
        p.ellipse(p.mouseX*1.3, p.mouseY*2.5, SWH2, SWH2);
        p.ellipse(p.mouseX*2.3, p.mouseY*1.5, SWH3, SWH3);
        p.ellipse(p.mouseX/1.1, p.mouseY/1.8, SWH1, SWH1);
        p.ellipse(p.mouseX/1.3, p.mouseY/2.5, SWH2, SWH2);
        p.ellipse(p.mouseX/2.3, p.mouseY/1.5, SWH3, SWH3);
        
        //glow
        p.fill(200, 130, 10, 20);
        p.ellipse(0, 0, (p.frameCount % 500)*2, (p.frameCount % 500)*2);
        p.ellipse(0, 0, (p.frameCount % 500)*4, (p.frameCount % 500)*4);
        p.ellipse(0, 0, (p.frameCount % 500)*8, (p.frameCount % 500)*8);
        p.ellipse(0, 0, (p.frameCount % 500)*16, (p.frameCount % 500)*16);
        p.ellipse(0, 0, (p.frameCount % 500)*24, (p.frameCount % 500)*24);
        
        //sun
        p.fill(255, 80, 0, 20);
        p.ellipse(0, 0, RDS, RDS);
        // p.fill(250, 200, 0);
        // p.ellipse(5, -11, RDS - 20, RDS - 30);
    }
}