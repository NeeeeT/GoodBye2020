var p5Canvas = [];
var rain = [];
// var lastClickedMon = document.getElementsByTagName('html');
var rainingNow = true;
var bgcolor = "#e5e5e5";

let setRain = (p) => {
    p.setup =  function(i) {
        p.createCanvas(lastClickedMon.offsetWidth, lastClickedMon.offsetHeight);
        p.frameRate(60);

        for (i = 0; i < 100; i++) {
            rain[i] = new Rain(p, p.random(50, lastClickedMon.offsetWidth), p.random(0, lastClickedMon.offsetHeight));
        }
        console.log(lastClickedMon.offsetHeight);
    }
    p.draw = function() {
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