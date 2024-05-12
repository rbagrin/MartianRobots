import { Robot } from "./models/Robot";
import { Orientation } from "./types/types";

/* ######################################################## */
/* #####################  INPUT START ##################### */
/* ######################################################## */
const [X, Y] = [5, 3];

const ROBOTS_INPUT: [[number, number, string], string][] = [
  [[1, 1, "E"], "RFRFRFRF"],
  [[3, 2, "N"], "FRRFLLFFRRFLL"],
  [[0, 3, "W"], "LLFFFLFLFL"],
];
/* ######################################################## */
/* ###################### INPUT END ####################### */
/* ######################################################## */

const robots: Robot[] = [];
const scents = new Set<string>();

// Read input and execute sequentially instructions of each robot
for (const [[x, y, orienation], instructions] of ROBOTS_INPUT) {
  const robot = new Robot(x, y, orienation as Orientation, X, Y);
  robots.push(robot);

  robot.executeSetOfInstructions(instructions, scents);
}

// Print final positions of each robot
for (const robot of robots) {
  console.log(robot.toString());
}
