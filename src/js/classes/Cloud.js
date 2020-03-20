import backgroundColors, {cloudColor} from "../graphics/Background";
import {randomNum} from "../helpers";

const cloudHeight = 8;
const cloudWidth = 28;
const pixelDimension = 10;

export default class {
  constructor(stageProps, context) {
    this.stageProps = stageProps;
    this.context = context;

    this.reset();
  }

  generateRandomPixels() {
    let pixels = [];

    let columnMaxHeight = 3;

    for(let x = 0; x < cloudWidth; x++) {
      pixels[x] = [];


      let columnHeight = randomNum(columnMaxHeight, columnMaxHeight - 3);
      let offsetTop = randomNum(cloudHeight - columnHeight);


      for (let y = 0; y < cloudHeight; y++ ) {
        if(y < offsetTop || y > columnHeight + offsetTop) {
          pixels[x][y] = 'transparent';
        } else {
          pixels[x][y] = backgroundColors[y + 15];
        }
      }


      if(x < cloudWidth / 2) {
        columnMaxHeight++;
      } else {
        columnMaxHeight--;
      }

      columnHeight = null;
      offsetTop = null;
    }

    this.pixels = pixels;
    pixels = null;
  }

  move(deltaTime, speed) {
    if(this.x <= (0 - (cloudWidth * pixelDimension))) {
      this.reset();
    }

    this.x = this.x - ((speed / 4) * deltaTime);
  }

  draw() {
    for(let x = 0; x < this.pixels.length; x++) {
      for (let y = 0; y < this.pixels[x].length; y++) {
        this.context.beginPath();
        this.context.rect(this.x + (x * pixelDimension), this.y + (y * pixelDimension), pixelDimension, pixelDimension);
        this.context.fillStyle = this.pixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }
  }

  reset() {
    this.generateRandomPixels();

    this.x = this.stageProps.width;

    // TODO make random
    this.y = 50;
  }
}
