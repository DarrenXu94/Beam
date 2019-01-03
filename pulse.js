class Pulse{
  constructor(x,y,turretAngle,duration){
    this.x = x;
    this.y = y;
    this.turretAngle = turretAngle;
    this.pulseTime = millis();
    this.fill = 255;
    this.duration = duration;
  }

  show(){
    this.draw();
  }

  draw(){
    if (millis() > this.pulseTime + this.duration){
      this.fill = this.fill - 3;
    }
    this.implementFlashing();
  }

  isFinished(){
    return this.fill < 0;
  }

  implementFlashing(){
    if (this.fill < 200){
      if (this.flashBeam()){
        this.drawBeam();
      }
    } else {
      this.drawBeam();
    }
  }

  drawBeam(){
    // push();
    // translate(this.x, this.y);
    // rotate(this.turretAngle);
    // noStroke();
    // fill(255,this.fill);
    // rect(-10, -5, 1500, 10);
    // pop();
    // rect(this.x + cos(this.turretAngle)*75,this.y + sin(this.turretAngle)*75,this.x + cos(this.turretAngle)*750,this.y + sin(this.turretAngle)*750)

    push();
    stroke(255,this.fill);
    strokeWeight(10);  // Beastly

    line(this.x,this.y,this.x + cos(this.turretAngle)*1500,this.y + sin(this.turretAngle)*1500);
    pop();
  }

  flashBeam(){
    var flashTime = millis();
    return flashTime%5<2
  }

  hitAsteroid(asteroid){
    // Calculates intersection and gradient
    var beamEndX = this.x + cos(this.turretAngle)*1500;
    var beamEndY = this.y + sin(this.turretAngle)*1500;

    var mouse = new createVector(beamEndX, beamEndY);

    var p = createVector(this.x, this.y);
    var x0 = asteroid.pos.x;
    var y0 = asteroid.pos.y;
    var radius = asteroid.r;

    var sub = mouse.sub(p);
    var a = sub.y / sub.x;
    var b = p.y - a * p.x;
    var AA = (1 + a * a);
    var BB = (2 * a *( b - y0) - 2 * x0);
    var CC = (x0 * x0 + (b - y0) * (b - y0)) - (radius * radius);
    var delta = BB * BB - 4 * AA * CC;
    if (delta >= 0) {
      if (beamEndX > this.x && asteroid.pos.x > this.x || beamEndX < this.x && asteroid.pos.x < this.x){
        return true;
      } else {
        return false
      }
    } else {
      return false;
    }
  }
}
