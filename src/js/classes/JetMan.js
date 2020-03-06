import {normalize} from "../helpers";

const startVertical = 90;
const startHorizontal = 10;
const acceleration = 3;
const gravity = 2;
const radius = 25;


export default class JetMan {
  constructor(stageProps) {
    this.x = startHorizontal;
    this.y = startVertical;
    this.color = 'blue';
    this.boundingBox = {
      top: normalize(startVertical, stageProps.height) - radius,
      bottom: normalize(startVertical, stageProps.height) + radius,
      left: normalize(startHorizontal, stageProps.width) - radius,
      right: normalize(startHorizontal, stageProps.width) - radius,
    };
    this.moving = true;
  }

  draw(context) {
    const normalizedX = normalize(this.x, context.canvas.width);
    const normalizedY = normalize(this.y, context.canvas.height);

    this.updateBoundingBox(normalizedX, normalizedY, radius);

    context.beginPath();

    context.arc(normalizedX, normalizedY, radius, 0, Math.PI * 2, false);
    context.arc(normalizedX, normalizedY + 10, radius, 0, Math.PI * 2, false);

    context.fillStyle = this.color;
    context.fill();
    context.closePath();
  }

  updateBoundingBox(normalizedX, normalizedY, radius) {
    this.boundingBox.top = normalizedY - radius;
    this.boundingBox.bottom = normalizedY + radius;
    this.boundingBox.left = normalizedX - radius;
    this.boundingBox.right = normalizedX + radius;
  }

  move(spaceDown) {
    spaceDown ? this.accelerate() : this.drop();
  }

  accelerate() {
    // TODO Add Acceleration Physics

    if(this.y > 0) {
      this.y -= 1;
    }
  }

  drop() {
    //TODO Add Gravity Physics

    if(this.y < 100) {
      this.y += 1;
    }
  }

  isCollided(wall) {
    return this.boundingBox.right > wall.left
        && this.boundingBox.left < wall.right
        && (this.boundingBox.top < wall.normalizedRectangle1Height || this.boundingBox.bottom > wall.normalizedRectangle2StartY)
  }
}
