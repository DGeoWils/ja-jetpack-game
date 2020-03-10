import Walls from "./Walls";

const newWallAt = 15;
const startingSpeed = 30;

export default class Level {
  constructor(stageProps) {
    this.walls = [];
    this.speed = startingSpeed;

    this.stageProps = stageProps;
    this.walls.push(new Walls(this.speed, this.stageProps));
  }

  update(deltaTime) {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].move(deltaTime, this.speed);
    }

    if (
      this.walls.length < 2 &&
      this.walls[0].x < newWallAt) {
      this.walls.push(new Walls(this.speed, this.stageProps));
    }

    if (this.walls[0].x <= -this.walls[0].wallWidth) {
      this.walls.shift();
    }
  }

  draw(context, score) {
    for (let i = 0; i < this.walls.length; i++) {
      this.walls[i].draw(context)
    }
  }

  increaseSpeed() {
    this.speed += 1
  }
}
