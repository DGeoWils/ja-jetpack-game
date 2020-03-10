import Walls from "./Walls";
import Background from "../graphics/Background";
import * as dudeGraphics from "../graphics/Dude";
import * as dudetteGraphics from "../graphics/Dudette";

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

  showTitleScreen() {
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
    this.context.font = '40px Courier bold';
    this.context.fillText('JETPACK GAME', midX, midY - 100);

    this.context.font = '20px Courier';
    this.context.fillText('Use \u{1f844} and \u{1f846} to Select a Character', midX, midY - 30);
    this.context.fillText('Press Space to Start', midX, midY + 10);
    
    this.context.closePath();

    // Render "dude" character preview
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 8; y++) {
        this.context.beginPath();
        this.context.rect(midX - 130 + (x * 10), midY + 70 + (y * 10), 10, 10);
        this.context.fillStyle = dudeGraphics.fallingPixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }

    // Render "dudette" character preview
    for (let x = 0; x < 7; x++) {
      for (let y = 0; y < 8; y++) {
        this.context.beginPath();
        this.context.rect(midX + 60 + (x * 10), midY + 70 + (y * 10), 10, 10);
        this.context.fillStyle = dudetteGraphics.fallingPixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }
  }
}
