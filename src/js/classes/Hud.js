export default class Hud {
  constructor() {
    this.score = 0;
  }

  draw(context) {
    context.fillStyle = 'black';
    context.font = '20px Courier';
    context.fillText('Score: ' + this.score, 40, 50);
  }

  incrementScore() {
    this.score += 1;
  }
}
