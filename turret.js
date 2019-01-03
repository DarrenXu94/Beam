class Turret{

  constructor(x,y){
    this.x = x;
    this.y = y;
    this.size = 30;

    this.bulletTime = millis();

    this.chargeBeams = [];

    this.turretAngle;

    this.particleFactories = [];

    // pulses = [];

    this.smokes = [];
    this.smokeSpread = 0.7;
  }


  show(){
    fill(255);
    ellipse(this.x, this.y, this.size*2);
  }

  update(){
    this.moveTurret();
    this.updateBeam();
    this.updatePulse();
    this.updateSmoke();
  }

  moveTurret(){
    push();
    translate(this.x, this.y);
    var a = atan2(mouseY-this.y, mouseX-this.x);
    rotate(a);
    noStroke();
    rect(-10, -5, 75, 10);
    this.turretAngle = a;
    pop();
  }

  startFireTurret(){
    this.chargeBeam();
  }

  chargeBeam(){
    var newchargeBeam = new ChargeBeam(this.x + cos(this.turretAngle)*75,this.y + sin(this.turretAngle)*75);
    this.chargeBeams.push(newchargeBeam);

    var newParticleFactory = new ParticleFactory(this.x + cos(this.turretAngle)*75,this.y + sin(this.turretAngle)*75);
    this.particleFactories.push(newParticleFactory);

  }

  updateBeam(){
    for (let i = this.chargeBeams.length - 1; i >= 0; i--) {
      this.chargeBeams[i].show(this.x + cos(this.turretAngle)*75,this.y + sin(this.turretAngle)*75);
    }

    for (let i = this.particleFactories.length - 1; i >= 0; i--) {
      this.particleFactories[i].show(this.x + cos(this.turretAngle)*75,this.y + sin(this.turretAngle)*75);
    }
  }

  endBeam(){
    this.chargeBeams.splice(0, 1);
    this.particleFactories.splice(0,1);
  }

  createPulse(duration){
    var newPulse = new Pulse(this.x,this.y,this.turretAngle,duration);
    pulses.push(newPulse);
    this.createSmokeCloud(duration);

  }

  updatePulse(){
    for (let i = pulses.length - 1; i >= 0; i--) {
      pulses[i].show();
      if (pulses[i].isFinished()) {
        pulses.splice(i, 1);
      }
    }
  }

  createSmokeCloud(duration){

    var numberOfParticles = map(duration,0,2500,6,30);

    for (let i = 0; i < numberOfParticles; i++) {
      var turretXLocation = this.x + cos(this.turretAngle)*75;
      var turretYLocation = this.y + sin(this.turretAngle)*75;
      var smokeVX = cos(this.turretAngle+random(-this.smokeSpread,this.smokeSpread));
      var smokeVY = sin(this.turretAngle+random(-this.smokeSpread,this.smokeSpread));
      var newSmoke = new Smoke(turretXLocation,turretYLocation,smokeVX,smokeVY);
      this.smokes.push(newSmoke);
    }
  }

  updateSmoke(){
    for (let i = this.smokes.length - 1; i >= 0; i--) {
      this.smokes[i].show();
      if (this.smokes[i].isFinished()) {
        this.smokes.splice(i, 1);
      }
    }
  }

}
