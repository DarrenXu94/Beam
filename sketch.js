var canvasHeight;
var canvasWidth;

var turret;

var time;

var bulletList = [];

var asteroids = [];

var pulses = [];

setup = function() {
  canvasWidth = windowWidth;
  canvasHeight = windowHeight;
  createCanvas(canvasWidth, canvasHeight);
  turret = new Turret(canvasWidth/2,canvasHeight/2);
  time = millis();
}

draw = function() {
  background(15);
  updateTurret();
  showInsutrctions();
  checkBeamCollsion();
  updateAsteroids();
  createAsteroids();

}

updateTurret = function(){
  turret.show();
  turret.update();
}

createAsteroids = function(){
  if (asteroids.length < 5){
    // for (var i = 0; i < 5; i++) {
        asteroids.push(new Asteroid());
      // }
  }

}

checkBeamCollsion = function(){
  for (let j = pulses.length - 1; j >= 0; j--) {
    for (let i = asteroids.length - 1; i >= 0; i--) {
      if (pulses[j].hitAsteroid(asteroids[i])){
        asteroids[i].toDelete = true;
        var newAsteroids = asteroids[i].createSmallerAsteroids();
        asteroids = asteroids.concat(newAsteroids);
      }
    }
  }
}

updateAsteroids = function(){
  for (let i = asteroids.length - 1; i >= 0; i--) {
    asteroids[i].show();
    if (asteroids[i].isFinished()) {
      asteroids.splice(i, 1);
    }
  }
}

mousePressed = function() {
  turret.startFireTurret();
  time = millis();
}

mouseReleased = function(){
  var endTime = millis();
  var durationOfClick = endTime - time;
  turret.endBeam();
  turret.createPulse(durationOfClick)
}

showInsutrctions = function(){
  textSize(20);
  fill(255);
  text("Click and hold", 10, 30);
}
