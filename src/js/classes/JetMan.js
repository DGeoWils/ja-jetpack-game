import * as dudeCharacter from "../graphics/Dude";
import * as dudetteCharacter from "../graphics/Dudette";

import {flame, flameColors} from "../graphics/Flame";

const acceleration = 30;
const gravity = 24;
const maxVelocity = 36;
const radius = 25;
const pixelDimension = 10;

const pixelsWide = 7;
const pixelsHigh = 13;

const boundingBoxColor = 'orange';

const startVertical = 90;
const startHorizontal = 150;
const safetyFactor = 30;

export default class JetMan {
  constructor(stageProps, context) {
    this.context = context;

    this.stageProps = stageProps;

    this.x = startHorizontal;
    this.y = startVertical;
    this.velocityY = 0;

    this.character = 1;

    this.width = pixelsWide * pixelDimension;
    this.height = pixelsHigh * pixelDimension;

    this.jetting = false;

    this.boundingBox = {
      top: startVertical + safetyFactor,
      bottom: startVertical + this.height - safetyFactor,
      left: startHorizontal + safetyFactor,
      right: startHorizontal + this.width - safetyFactor
    };
  }

  draw(currentCharacter) {
    // this.context.beginPath();
    // this.context.rect(this.x, this.y, this.width, this.height);
    // this.context.fillStyle = 'green';
    // this.context.fill();
    // this.context.closePath();

    if (currentCharacter == 1) {
      this.drawDude();
    } else if (currentCharacter == 2) {
      this.drawDudette();
    }

    this.drawBoundingBox();
  }

  updateBoundingBox() {
    this.boundingBox.top = this.y + safetyFactor;
    this.boundingBox.bottom = this.y + this.height - safetyFactor;
    this.boundingBox.left = this.x + safetyFactor;
    this.boundingBox.right = this.x + this.width - safetyFactor;
  }

  drawBoundingBox() {
    this.context.beginPath();
    this.context.rect(this.boundingBox.left, this.boundingBox.top, this.boundingBox.right - this.boundingBox.left, this.boundingBox.bottom - this.boundingBox.top);
    this.context.strokeStyle = boundingBoxColor;
    this.context.stroke();
    this.context.closePath();
  }

  drawDude() {
    let pixels;
    if (this.jetting) {
      pixels = dudeCharacter.jettingPixels;
      this.drawFlame();
    } else {
      pixels = dudeCharacter.fallingPixels;
    }

    for (let x = 0; x < pixelsWide; x++) {
      for (let y = 0; y < pixelsHigh; y++) {
        this.context.beginPath();
        this.context.rect(this.x + (x * pixelDimension), this.y + (y * pixelDimension), pixelDimension, pixelDimension);
        this.context.fillStyle = pixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }
  }

  drawDudette() {
    let pixels;
    if (this.jetting) {
      pixels = dudetteCharacter.jettingPixels;
      this.drawFlame();
    }
    else {
      pixels = dudetteCharacter.fallingPixels;
    }

    for (let x = 0; x < pixelsWide; x++) {
      for (let y = 0; y < pixelsHigh; y++) {
        this.context.beginPath();
        this.context.rect(this.x + (x * pixelDimension), this.y + (y * pixelDimension), pixelDimension, pixelDimension);
        this.context.fillStyle = pixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }
  }

  drawFlame() {
    for(let x=0; x < 3; x++) {
      for(let y=0; y < 4; y++) {
        this.context.beginPath();
        this.context.rect(this.x - (x * pixelDimension), this.y + ((8 + y) * pixelDimension), pixelDimension, pixelDimension);
        this.context.fillStyle = flame[x][y] ? flameColors[Math.floor(Math.random() * flameColors.length)] : 'transparent';
        this.context.fill();
        this.context.closePath();
      }
    }
  }

  update(deltaTime, spaceDown) {
    // Move the player according to velocity
    this.y -= this.velocityY * deltaTime;

    // If player is holding space, accelerate upwards
    if (spaceDown) {
      this.jetting = true;
      this.velocityY += acceleration * deltaTime;
    }
    else {
      this.jetting = false;
    }

    // Apply gravity if max velocity hasn't been reached
    if (this.velocityY > -maxVelocity) {
      this.velocityY -= gravity * deltaTime;
    }

    // Prevent the player from leaving the screen
    if ((this.y + this.height) > this.stageProps.height) {
      this.y = this.stageProps.height - this.height;
      this.velocityY = 0;
    } else if (this.y < 0) {
      this.y = 0;
      this.velocityY = 0;
    }

    this.updateBoundingBox(this.x, this.y, radius);
  }

  isCollided(wall) {
    return this.boundingBox.right > wall.left
        && this.boundingBox.left < wall.right
        && (this.boundingBox.top < wall.rectangle1Height || this.boundingBox.bottom > wall.rectangle2StartY)
  }
}
