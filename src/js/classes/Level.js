import Walls from "./Walls";

const newWallAt = 15;

export default class Level {
  constructor(stageProps) {
    this.walls = [];
    this.stageProps = stageProps;
    this.walls.push(new Walls(1, this.stageProps));
  }

  draw(context, score) {
    // TODO increase speed?


    this.walls.forEach(wall => {
      wall.move();
      wall.draw(context);
    });

    if(
      this.walls.length < 2 &&
      this.walls[0].x < newWallAt) {
      this.walls.push(new Walls(1, this.stageProps));
    }

    if(this.walls[0].x <= -this.walls[0].wallWidth) {
      this.walls.shift();
    }
  }
}
