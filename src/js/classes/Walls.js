import {normalize} from "../helpers";

// TODO Decrease space between as game goes on?
const spaceBetween = 40;
const wallWidth = 50;
const wallColor = 'green';

export default class Walls {
  constructor(speed, stageProps) {
    this.x = stageProps.width;
    this.wallWidth = wallWidth;
    this.stageProps = stageProps;

    this.speed = speed;
    this.spaceBetween = spaceBetween;

    let rectangleHeights = this.calculateRectangleHeights();

    this.normalizedRectangle1Height = normalize(rectangleHeights[0], stageProps.height);
    this.normalizedRectangle2Height = normalize(rectangleHeights[1], stageProps.height);
    this.normalizedRectangle2StartY = stageProps.height - this.normalizedRectangle2Height;
  }

  draw(context) {
    // const normalizedX = normalize(this.x, this.stageProps.width);

    this.left = this.x;
    this.right = this.x + wallWidth;

    context.beginPath();

    context.rect(this.x, 0, wallWidth, this.normalizedRectangle1Height);
    context.rect(this.x, this.normalizedRectangle2StartY, wallWidth, this.normalizedRectangle2Height);

    context.fillStyle = wallColor;
    context.fill();
  }


  move(deltaTime, speed) {
    this.x -= speed * deltaTime;
  }

  calculateRectangleHeights() {
    const max = Math.ceil(100 - this.spaceBetween);
    const min = Math.floor(0);

    const rectangle1Height = Math.floor(Math.random() * (max - min));
    const rectangle2Height = 100 - rectangle1Height - this.spaceBetween;

    return [rectangle1Height, rectangle2Height];
  }
}
