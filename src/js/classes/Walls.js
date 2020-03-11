import {colorDarkRed}  from "../graphics/Flame";

// const wallColor = 'green';



export default class Walls {
  constructor(stageProps, context) {
    this.context = context;
    this.wallWidth = 50;
    this.stageProps = stageProps;
    this.spaceBetween = 250;
  }

  init() {
    this.moving = false;
    this.x = this.stageProps.width;

    this.calculateRectangleHeights();
  }

  draw() {
    this.left = this.x;
    this.right = this.x + this.wallWidth;

    this.context.beginPath();

    this.context.rect(this.x, 0, this.wallWidth, this.rectangle1Height);
    this.context.rect(this.x, this.rectangle2StartY, this.wallWidth, this.rectangle2Height);

    this.context.fillStyle = colorDarkRed;
    this.context.fill();
  }


  move(deltaTime, speed) {
    if (this.moving) {
      this.x -= speed * deltaTime;

      if (this.x < (0 - this.wallWidth)) {
        this.init();
      }
    }
  }

  calculateRectangleHeights() {
    const max = Math.ceil(this.stageProps.height - this.spaceBetween);
    const min = Math.floor(0);

    this.rectangle1Height = Math.floor(Math.random() * (max - min));
    this.rectangle2Height = this.stageProps.height - this.rectangle1Height - this.spaceBetween;
    this.rectangle2StartY = this.stageProps.height - this.rectangle2Height;
  }
}
