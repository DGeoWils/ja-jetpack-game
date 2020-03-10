export default class Hud {
  constructor(stageProps, context) {
    this.score = 0;
    this.context = context;
  }

  draw() {
    this.context.fillStyle = 'black';
    this.context.font = '20px Courier';
    this.context.textAlign = 'center';
    this.context.fillText('Score: ' + this.score, 80, 50);
  }

  incrementScore() {
    this.score += 1;
  }
}
