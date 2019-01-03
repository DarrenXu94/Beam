class ChargeBeam{
  constructor(){
    this.beamSize = 5;
  }

  show(x,y){
    fill(255);
    noStroke();
    ellipse(x, y, this.beamSize);
    this.update();
  }

  update(){
    if (this.beamSize < 18){
      this.beamSize = this.beamSize + 0.2;

    }
  }
}
