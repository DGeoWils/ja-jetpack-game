import '../scss/app.scss';
import JetMan from "./classes/JetMan";
import Level from "./classes/Level";
import Input from "./classes/Input";
import Hud from "./classes/Hud";

class CVS {
  constructor() {
    this.canvas = document.querySelector("canvas");
    this.ctx = this.canvas.getContext('2d');

    this.stageProps = {
      width: 860,
      height: 640
    };

    this.canvas.width = this.stageProps.width;
    this.canvas.height = this.stageProps.height;

    this.input = new Input(document.body);
    this.jetman = new JetMan(this.stageProps);
    this.level = new Level(this.stageProps);
    this.hud = new Hud(this.stageProps);

    this.started = false;
    let x = this.input.addListener(this.input.SPACE, (e) => {
      if(!this.started) {
        this.update();
      }
      this.started = true;
    });
  }

  update() {


    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);

    //player
    this.jetman.move(this.input.check(this.input.SPACE));
    this.jetman.draw(this.ctx);
    this.level.draw(this.ctx, 0);

    this.hud.incrementScore();
    this.hud.draw(this.ctx);

    if (! this.jetman.isCollided(this.level.walls[0])) {
      requestAnimationFrame(() => {
        this.update()
      });
    } else {
        // TODO Prompt end game and feedback / reset game
    }

  }
}

(function () {
  let requestAnimationFrame = window.requestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.msRequestAnimationFrame;

  window.requestAnimationFrame = requestAnimationFrame;

  let cvs = new CVS();
})();

