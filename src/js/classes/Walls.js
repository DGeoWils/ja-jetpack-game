import {normalize} from "../helpers";
import {colorDarkRed}  from "../graphics/Flame";

// const wallColor = 'green';



export default class Walls {
  constructor(stageProps, context) {
    this.context = context;
    this.wallWidth = 50;
    this.stageProps = stageProps;
    this.spaceBetween = 200;
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

    this.context.rect(this.x, 0, this.wallWidth, this.normalizedRectangle1Height);
    this.context.rect(this.x, this.normalizedRectangle2StartY, this.wallWidth, this.normalizedRectangle2Height);

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

    this.normalizedRectangle1Height = Math.floor(Math.random() * (max - min));
    this.normalizedRectangle2Height = this.stageProps.height - this.normalizedRectangle1Height - this.spaceBetween;
    this.normalizedRectangle2StartY = this.stageProps.height - this.normalizedRectangle2Height;
  }
}
