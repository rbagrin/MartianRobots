# MartianRobots

## Setup

Run `npm install` in the root of the project

## Configure project input

In /src/index.ts, there is a section on the top of the file where you can set the Limist of the grid, the list of robots and their initial position and orientation + the instructions each robot should run.

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
