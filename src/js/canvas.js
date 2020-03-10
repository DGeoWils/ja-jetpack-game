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

    this.lastUpdate = null;

    this.started = false;
    let x = this.input.addListener(this.input.SPACE, (e) => {
      // Start the game if it hasn't been started yet
      if (!this.started) {
        this.started = true;
        this.lastUpdate = new Date().getTime();
        this.update();
        return;
      }

      // Trigger player jump
      this.jetman.jump();
    });
  }

  update() {
    // Calculate the delta time (time passed)
    const currentTime = new Date().getTime();
    const deltaTime = (currentTime - this.lastUpdate) / 100;
    this.lastUpdate = currentTime;

    // Calculate movement / collisions
    this.jetman.move(deltaTime);

    // Render everything
    this.ctx.clearRect(0, 0, this.stageProps.width, this.stageProps.height);
    this.jetman.draw(this.ctx);
    this.level.draw(this.ctx, 0);

    // TODO Check Collisions


    // TODO Create hud (score etc.)
    // this.hud.draw(this.ctx);


    requestAnimationFrame(() => {
      this.update()
    });
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
