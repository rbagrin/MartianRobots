# MartianRobots

## Setup

Run `npm install` in the root of the project

## Configure project input

There is a section on the top of the **/src/index.ts** file where you can set the limits of the grid, the list of robots and their initial position and orientation + the instructions each robot should run. Set the _X_, _Y_ and the _ROBOTS_INPUT_ constants, then run the project.

### Example:

To set up a 5 X 3 grid and the robots used in example, use the following:

```
const [X, Y] = [5, 3];

const ROBOTS_INPUT: [[number, number, string], string][] = [
  [[1, 1, "E"], "RFRFRFRF"],
  [[3, 2, "N"], "FRRFLLFFRRFLL"],
  [[0, 3, "W"], "LLFFFLFLFL"],
];
```

## Run Project

Once the input is configured run `npm start`

## Run the tests

Run `npm test`
