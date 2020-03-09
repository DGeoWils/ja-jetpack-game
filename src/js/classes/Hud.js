export default class Hud {
  constructor() {
    this.score = 0;
  }

  draw(context) {
    context.fillStyle = 'black';
    context.font = '20px Courier';
    context.textAlign = 'center';
    context.fillText('Score: ' + this.score, 60, 50);
  }

  incrementScore() {
    this.score += 1;
  }

  endGame(context) {

    const height = 400;
    const width = 600;
    const midX = context.canvas.width / 2;
    const midY = context.canvas.height / 2;

    const xpos = midX - width / 2;
    const ypos = midY - height / 2;

    context.fillStyle = 'white';
    context.rect(xpos, ypos, width, height);
    context.fill();

    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.font = '36px Courier';
    context.fillText('GAME OVER', midX, midY - 50);

    context.font = '20px Courier';
    context.fillText('Final Score: ' + this.score, midX, midY);

    context.fillText('Press Enter to Play Again', midX, midY + 50);
  }
}
