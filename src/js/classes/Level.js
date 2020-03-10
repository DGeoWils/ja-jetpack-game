import Walls from "./Walls";

const newWallAt = 15;
const startingSpeed = 1;

export default class Level {
  constructor(stageProps) {
    this.walls = [];
    this.speed = startingSpeed;

    this.stageProps = stageProps;
    this.walls.push(new Walls(this.speed, this.stageProps));
  }

  draw(context, score) {

    this.walls.forEach(wall => {
      wall.move();
      wall.draw(context);
    });

    if(
      this.walls.length < 2 &&
      this.walls[0].x < newWallAt) {
      this.walls.push(new Walls(this.speed, this.stageProps));
    }

    if(this.walls[0].x <= -this.walls[0].wallWidth) {
      this.walls.shift();
    }
  }

  increaseSpeed() {
    this.speed += 0.25
  }
}
