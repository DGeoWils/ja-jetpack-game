import {normalize} from "../helpers";

const startVertical = 90;
const startHorizontal = 10;
const acceleration = 3;
const gravity = 2;

export default class JetMan {
  constructor() {
    this.x = startHorizontal;
    this.y = startVertical;
    this.color = 'blue';
    this.moving = true;
  }

  draw(context) {
    const radius = 25;

    const normalizedX = normalize(this.x, context.canvas.width);
    const normalizedY = normalize(this.y, context.canvas.height);

    context.beginPath();

    context.arc(normalizedX, normalizedY, radius, 0, Math.PI * 2, false);
    context.arc(normalizedX, normalizedY + 10, radius, 0, Math.PI * 2, false);

    context.fillStyle = this.color;
    context.fill();
    context.closePath();
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
}
