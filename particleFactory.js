class ParticleFactory{
  constructor(x,y){
    this.x = x;
    this.y = y;

    this.particleList = [];

    this.particleTime = millis();
    this.particleGenerationRate = 200;

    this.particleSpread = 40;
  }

  show(x,y){
    this.x = x;
    this.y = y;
    this.newParticleTimer();
    this.updateParticles();
  }

  newParticleTimer(){
    if (millis() > this.particleTime + this.particleGenerationRate){
      this.createNewParticle();
      this.particleTime = millis();
    }
  }

  createNewParticle(){
    var newParticle = new Particle(this.x+random(-this.particleSpread,this.particleSpread),this.y+random(-this.particleSpread,this.particleSpread),this.x,this.y);
    this.particleList.push(newParticle);
  }

  updateParticles(){
    for (let i = this.particleList.length - 1; i >= 0; i--) {
      this.particleList[i].update(this.x,this.y);
    }
  }
}
