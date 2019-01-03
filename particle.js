class Particle{
  constructor(x,y,destX,destY){
    this.x = x;
    this.y = y;
    this.destX = destX;
    this.destY = destY;
    this.bodySize = 3;

    this.agility = 50;
  }

  update(destX,destY){
    this.destX = destX;
    this.destY = destY;
    this.draw();
    this.gravitate();
  }

  draw(){
    fill(255);
    noStroke();
    ellipse(this.x, this.y, this.bodySize);
  }

  gravitate(){
    this.x += (this.destX - this.x)/this.agility;
    this.y += (this.destY - this.y)/this.agility;
  }
}
