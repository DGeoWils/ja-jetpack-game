import {normalize} from "../helpers";

// TODO Decrease space between as game goes on?
const spaceBetween = 20;
const wallWidth = 50;
const wallColor = 'green';

export default class Walls {
  constructor(speed, stageProps) {
    this.x = 100;
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
    const normalizedX = normalize(this.x, this.stageProps.width);

    context.beginPath();

    context.rect(normalizedX, 0, wallWidth, this.normalizedRectangle1Height);
    context.rect(normalizedX, this.normalizedRectangle2StartY, wallWidth, this.normalizedRectangle2Height);

    context.fillStyle = wallColor;
    context.fill();
  }

  move() {
    this.x -= this.speed;
  }

  calculateRectangleHeights() {
    const max = Math.ceil(100 - this.spaceBetween);
    const min = Math.floor(0);

    const rectangle1Height = Math.floor(Math.random() * (max - min));
    const rectangle2Height = 100 - rectangle1Height - this.spaceBetween;

    console.log(rectangle1Height);

    return [rectangle1Height, rectangle2Height];
  }
}
