import Walls from "./Walls";
import Background from "../graphics/Background";

const newWallAt = 15;


export default class Level {
  constructor(stageProps, context) {
    this.context = context;
    this.walls = [];

    this.speed = 40;

    this.stageProps = stageProps;
    this.walls.push(new Walls(this.stageProps, context));
    this.walls.push(new Walls(this.stageProps, context));

    this.walls[0].init();
    this.walls[1].init();

    this.walls[0].moving = true;
    this.closerWall = 0;

    this.colorHeight = this.stageProps.height / Background.length;
  }

  update(deltaTime) {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].move(deltaTime, this.speed);
    }

    if (this.walls[1].x < newWallAt) {
      this.walls[0].moving = true;
      this.closerWall = 0;
    }

    if(this.walls[0].x < newWallAt) {
      this.walls[1].moving = true;
      this.closerWall = 1;
    }
  }

  draw() {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].draw();
    }
  }

  increaseSpeed() {
    this.speed += 1
  }

  drawBackground() {
    for (let i=0; i<Background.length; i++) {
      this.context.beginPath();
      this.context.rect(0, (this.colorHeight * i), this.stageProps.width, this.colorHeight);
      this.context.fillStyle = Background[i];
      this.context.fill();
      this.context.closePath();
    }
  }

  endGame(score) {
    const height = 400;
    const width = 600;
    const midX = this.context.canvas.width / 2;
    const midY = this.context.canvas.height / 2;

    const xpos = midX - width / 2;
    const ypos = midY - height / 2;

    this.drawBackground();

    this.context.fillStyle = 'white';
    this.context.beginPath();
    this.context.rect(xpos, ypos, width, height);
    this.context.fill();


    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.font = '36px Courier';
    this.context.fillText('GAME OVER', midX, midY - 50);

    this.context.font = '20px Courier';
    this.context.fillText('Final Score: ' + score, midX, midY);

    this.context.fillText('Press Enter to Play Again', midX, midY + 50);
    this.context.closePath();
  }
}
