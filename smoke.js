class Smoke{

  constructor(x,y,vx,vy){
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.size = random(3,5);
    this.randomAcceleration = random(1,3);
    // this.toRemove = false;
  }

  show(){
    this.update();
    fill(255);
    ellipse(this.x, this.y, this.size*2);
  }

  update(){
    this.x += this.randomAcceleration*this.vx;
    this.y += this.randomAcceleration*this.vy;
    this.size = this.size - 0.05;
  }

  isFinished(){
    return this.size < 0.1;
  }

  // isFinished(){
  //   return this.x < 0 || this.x > canvasWidth || this.y < 0 || this.y > canvasHeight || this.toRemove;
  // }

}
