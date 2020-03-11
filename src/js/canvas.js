import '../scss/app.scss';
import JetMan from "./classes/JetMan";
import Level from "./classes/Level";
import Input from "./classes/Input";
import Hud from "./classes/Hud";
import TitleScreen from './classes/TitleScreen';

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
    this.started = false;
    this.ended = false;

    this.lastUpdate = null;

    this.character = 1;

    this.buildWorld();

    this.input.addListener(this.input.SPACE, (e) => {
      // Start the game if it hasn't been started yet
      if (!this.started && !this.ended) {
        this.started = true;
        this.lastUpdate = performance.now();
        this.update();
      }
    });

    this.input.addListener(this.input.ENTER, (e) => {
      if (this.ended) {
        this.buildWorld();
        this.ended = false;
        this.started = false;
      }
    });

    this.input.addListener(this.input.RT_ARROW, (e) => {
      if (!this.started && !this.ended) {
        this.character = 2;
        this.titleScreen.draw(this.character);
      }
    });

    this.input.addListener(this.input.LT_ARROW, (e) => {
      if (!this.started && !this.ended) {
        this.character = 1;
        this.titleScreen.draw(this.character);
      }
    });
  }

  buildWorld() {
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);

    this.jetman = new JetMan(this.stageProps, this.ctx);
    this.level = new Level(this.stageProps, this.ctx);
    this.hud = new Hud(this.stageProps, this.ctx);
    this.titleScreen = new TitleScreen(this.stageProps, this.ctx);

    this.level.drawBackground();
    this.titleScreen.draw(this.character);
  }

  stop(requestId) {
    cancelAnimationFrame(requestId);
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);
    this.level.endGame(this.hud.score);

    this.started = false;
    this.ended = true;
  }

  update(timestamp) {
    // Calculate the delta time (time passed)
    const currentTime = timestamp || performance.now();
    const deltaTime = (currentTime - this.lastUpdate) / 100;
    this.lastUpdate = timestamp || currentTime;

    // Calculate movement / collisions
    this.jetman.move(deltaTime, this.input.check(this.input.SPACE));
    this.level.update(deltaTime);

    // Render everything
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);

    this.level.drawBackground();
    this.jetman.draw(this.character);
    this.level.draw();

    this.hud.incrementScore();
    this.hud.draw();

    let requestId = requestAnimationFrame((frameTime) => this.update(frameTime));

    if (this.jetman.isCollided(this.level.walls[this.level.closerWall])) {
      this.stop(requestId);
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
