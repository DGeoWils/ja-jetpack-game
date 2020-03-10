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
    this.started = false;
    this.ended = false;

    this.lastUpdate = null;
    
    this.buildWorld();

    let x = this.input.addListener(this.input.SPACE, (e) => {
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
  }

  buildWorld() {
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);

    this.jetman = new JetMan(this.stageProps);
    this.level = new Level(this.stageProps);
    this.hud = new Hud(this.stageProps);
  }

  stop(requestId) {
    cancelAnimationFrame(requestId);

    this.hud.endGame(this.ctx);

    this.started = false;
    this.ended = true;
  }

  update() {
    // Calculate the delta time (time passed)
    const currentTime = performance.now();
    const deltaTime = (currentTime - this.lastUpdate) / 100;
    this.lastUpdate = currentTime;

    // Calculate movement / collisions
    this.jetman.move(deltaTime, this.input.check(this.input.SPACE));
    this.level.update(deltaTime);

    // Render everything
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);
    this.jetman.draw(this.ctx);
    this.level.draw(this.ctx, 0);

    this.hud.incrementScore();
    this.hud.draw(this.ctx);

    let requestId = requestAnimationFrame(() => {
      if (this.hud.score % 500 === 0) {
        this.level.increaseSpeed();
      }

      this.update()
    });

    if (this.jetman.isCollided(this.level.walls[0])) {
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
