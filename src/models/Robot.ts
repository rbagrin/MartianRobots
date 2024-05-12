import { Direction, Orientation } from "../types/types";
import { LeftOrientationSwitch, RightOrientationSwitch, getKeyOfScent } from "../utils/util";

export class Robot {
  // Robot coordinates and orientation
  private x: number;
  private y: number;
  private orientation: Orientation;

  // Robot states
  private isFallen: boolean;

  // Grid upper limits (considering lower limits are both 0)
  private xLimit: number;
  private yLimit: number;

  constructor(x: number, y: number, orientation: Orientation, xLimit: number, yLimit: number) {
    this.x = x;
    this.y = y;
    this.orientation = orientation;

    this.xLimit = xLimit;
    this.yLimit = yLimit;

    this.isFallen = this.isOutsideOfGrid(this.x, this.y);
  }

  public getPosition(): [number, number] {
    return [this.x, this.y];
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public hasFallen(): boolean {
    return this.isFallen;
  }

  public executeSetOfInstructions(instructions: string, scents: Set<string>): void {
    for (let i = 0; i < instructions.length; i++) {
      const direction = instructions[i] as Direction;

      this.executeSingleInstruction(direction, scents);
    }
  }

  private executeSingleInstruction(direction: Direction, scents: Set<string>): void {
    // if robot is fallen - ignore instruction
    if (this.isFallen) return;

    switch (direction) {
      case Direction.L: {
        // turn left
        this.orientation = LeftOrientationSwitch[this.orientation];
        // no movement involved when turning left
        return;
      }
      case Direction.R: {
        this.orientation = RightOrientationSwitch[this.orientation];
        // no movement involved when turning right
        return;
      }
      case Direction.F: {
        this.move(scents);
        return;
      }
      // TODO: add extra instructions here if needed
      default: {
        // do nothing
        break;
      }
    }
  }

  private isOutsideOfGrid(x: number, y: number): boolean {
    // check if position is in the limits of the grid
    return x < 0 || x > this.xLimit || y < 0 || y > this.yLimit;
  }

  private move(scents: Set<string>): void {
    // initialize the potential new position coordinates with the current position's coordinates
    let newX = this.x;
    let newY = this.y;

    // update potential new position coordinates according to the orientation
    switch (this.orientation) {
      case Orientation.N: {
        newY++;
        break;
      }
      case Orientation.S: {
        newY--;
        break;
      }
      case Orientation.E: {
        newX++;
        break;
      }
      case Orientation.W: {
        newX--;
        break;
      }
      default: {
        break;
      }
    }

    // if the new potential position has scent, don't move! Nothing should happen!
    const keyOfNewPotentialPosition = getKeyOfScent(newX, newY);
    if (scents.has(keyOfNewPotentialPosition)) return;

    // if robot will move to the new position, first check if it will fall by moving to the new position
    if (this.isOutsideOfGrid(newX, newY)) {
      // if the robot will fall, mark the robot as fallen,
      // don't update the current coordinates as we need them to show the last known position
      this.isFallen = true;

      // mark the cell as having a scent and terminate execution
      // all the other instructions given to this robot will be ignored
      scents.add(keyOfNewPotentialPosition);

      return;
    }

    // if by moving to the new position robot does not fall, just make the move
    // no other thing should be marked
    this.x = newX;
    this.y = newY;
  }

  public toString(): string {
    const output: (string | number)[] = [this.x, this.y, this.orientation];
    if (this.hasFallen) output.push("LOST");
    return output.join(" ");
  }
}
