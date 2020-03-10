import {normalize} from "../helpers";

const startVertical = 90;
const startHorizontal = 10;
const acceleration = 5.2;
const gravity = 3;
const maxVelocity = 8;
const radius = 25;


export default class JetMan {
  constructor(stageProps) {
    this.x = startHorizontal;
    this.y = startVertical;
    this.velocityX = 0;
    this.velocityY = 0;
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

  move(deltaTime, spaceDown) {
    // Move the player according to velocity
    this.y -= this.velocityY * deltaTime;
    this.x -= this.velocityX * deltaTime;
    
    // If player is holding space, accelerate upwards
    if (spaceDown) {
      this.velocityY += acceleration * deltaTime;
    }
  
    // Apply gravity if max velocity hasn't been reached
    if (this.velocityY > -maxVelocity) {
      this.velocityY -= gravity * deltaTime;
    }

    // Prevent the player from leaving the screen
    if (this.y > 100) {
      this.y = 100;
      this.velocityY = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }
  }

  jump() {
    this.velocityY = acceleration;
  }

  isCollided(wall) {
    return this.boundingBox.right > wall.left
        && this.boundingBox.left < wall.right
        && (this.boundingBox.top < wall.normalizedRectangle1Height || this.boundingBox.bottom > wall.normalizedRectangle2StartY)
  }
}
