import {normalize} from "../helpers";

const startVertical = 90;
const startHorizontal = 10;
const acceleration = 6;
const gravity = 2;
const maxVelocity = 8;

export default class JetMan {
  constructor() {
    this.x = startHorizontal;
    this.y = startVertical;
    this.velocityX = 0;
    this.velocityY = 0;
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

  move(delta) {
    // Move the player according to velocity
    this.y -= this.velocityY * delta;
    this.x -= this.velocityX * delta;
    
    // Prevent the player from falling off the top and bottom of the screen
    if (this.y > 100) {
      this.y = 100;
    } else if (this.y < 0) {
      this.y = 0;
    }

    // Apply gravity if max velocity hasn't been reached
    if (this.velocityY > -maxVelocity) {
      this.velocityY -= gravity * delta;
    }
  }

  jump() {
    this.velocityY = acceleration;
  }
}
