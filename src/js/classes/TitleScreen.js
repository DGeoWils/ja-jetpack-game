import * as dudeGraphics from "../graphics/Dude";
import * as dudetteGraphics from "../graphics/Dudette";
import { Characters } from "./JetMan";
import { colorBlack } from "../colors";

const previewWidth = 7;
const previewHeight = 8;

export default class TitleScreen {
  constructor(stageProps, context) {
    this.context = context;
    this.stageProps = stageProps;

    this.width = 600;
    this.height = 400;
    this.midX = this.context.canvas.width / 2;
    this.midY = this.context.canvas.height / 2;
  }

  draw(currentCharacter) {
    const posX = this.midX - this.width / 2;
    const posY = this.midY - this.height / 2;

    // white background
    this.context.fillStyle = 'white';
    this.context.beginPath();
    this.context.rect(posX, posY, this.width, this.height);
    this.context.fill();

    // game title
    this.context.fillStyle = 'black';
    this.context.textAlign = 'center';
    this.context.font = '40px Courier bold';
    this.context.fillText('JETPACK GAME', this.midX, this.midY - 100);

    // screen instructions
    this.context.font = '20px Courier';
    this.context.fillText('Use \u{1f844} and \u{1f846} to Select a Character', this.midX, this.midY - 30);
    this.context.fillText('Press Space to Start', this.midX, this.midY + 10);

    this.context.closePath();

    // 'dude' character preview
    for (let x = 0; x < previewWidth; x++) {
      for (let y = 0; y < previewHeight; y++) {
        this.context.beginPath();
        this.context.rect(this.midX - 110 + (x * 10), this.midY + 60 + (y * 10), 10, 10);
        this.context.fillStyle = dudeGraphics.fallingPixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }

    // 'dudeette' character preview
    for (let x = 0; x < previewWidth; x++) {
      for (let y = 0; y < previewHeight; y++) {
        this.context.beginPath();
        this.context.rect(this.midX + 40 + (x * 10), this.midY + 60 + (y * 10), 10, 10);
        this.context.fillStyle = dudetteGraphics.fallingPixels[x][y];
        this.context.fill();
        this.context.closePath();
      }
    }

    // select the active character
    if (currentCharacter == 1) {
      // select 'dude'
      this.context.beginPath();
      this.context.rect(this.midX - 110, this.midY + 60, previewWidth * 10, previewHeight * 10);
      this.context.strokeStyle = colorBlack;
      this.context.lineWidth = 3;
      this.context.stroke();
    } else if (currentCharacter == 2) {
      // select 'dudette'
      this.context.beginPath();
      this.context.rect(this.midX + 40, this.midY + 60, previewWidth * 10, previewHeight * 10);
      this.context.strokeStyle = colorBlack;
      this.context.stroke();
    }
    
  }
}