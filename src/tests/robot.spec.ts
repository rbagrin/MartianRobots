import { Robot } from "../models/Robot";
import { Orientation } from "../types/types";
import { getKeyOfScent } from "../utils/util";

describe("Robot", () => {
  const noScents = new Set<string>();
  const maxLimit = 50;

  // TEST TURN LEFT
  describe("Robot executes L", () => {
    it("from orientation N, new orientation should be W, position should not be changed", () => {
      const robot = new Robot(1, 1, Orientation.N, maxLimit, maxLimit);
      robot.executeSetOfInstructions("L", noScents);
      expect(robot.getOrientation()).toBe(Orientation.W);
      expect(robot.getPosition()).toStrictEqual([1, 1]);
    });
    it("from orientation W, new orientation should be S, position should not be changed", () => {
      const robot = new Robot(2, 2, Orientation.W, maxLimit, maxLimit);
      robot.executeSetOfInstructions("L", noScents);
      expect(robot.getOrientation()).toBe(Orientation.S);
      expect(robot.getPosition()).toStrictEqual([2, 2]);
    });
    it("from orientation N, new orientation should be W, position should not be changed", () => {
      const robot = new Robot(3, 3, Orientation.S, maxLimit, maxLimit);
      robot.executeSetOfInstructions("L", noScents);
      expect(robot.getOrientation()).toBe(Orientation.E);
      expect(robot.getPosition()).toStrictEqual([3, 3]);
    });
    it("from orientation N, new orientation should be W, position should not be changed", () => {
      const robot = new Robot(5, 8, Orientation.E, maxLimit, maxLimit);
      robot.executeSetOfInstructions("L", noScents);
      expect(robot.getOrientation()).toBe(Orientation.N);
      expect(robot.getPosition()).toStrictEqual([5, 8]);
    });
  });

  // TEST TURN RIGHT
  describe("Robot executes R", () => {
    it("from orientation N, new orientation should be E, position should not be changed", () => {
      const robot = new Robot(2, 9, Orientation.N, maxLimit, maxLimit);
      robot.executeSetOfInstructions("R", noScents);
      expect(robot.getOrientation()).toBe(Orientation.E);
      expect(robot.getPosition()).toStrictEqual([2, 9]);
    });
    it("from orientation E, new orientation should be S, position should not be changed", () => {
      const robot = new Robot(7, 3, Orientation.E, maxLimit, maxLimit);
      robot.executeSetOfInstructions("R", noScents);
      expect(robot.getOrientation()).toBe(Orientation.S);
      expect(robot.getPosition()).toStrictEqual([7, 3]);
    });
    it("from orientation S, new orientation should be W, position should not be changed", () => {
      const robot = new Robot(2, 8, Orientation.S, maxLimit, maxLimit);
      robot.executeSetOfInstructions("R", noScents);
      expect(robot.getOrientation()).toBe(Orientation.W);
      expect(robot.getPosition()).toStrictEqual([2, 8]);
    });
    it("from orientation W, new orientation should be N, position should not be changed", () => {
      const robot = new Robot(6, 12, Orientation.W, maxLimit, maxLimit);
      robot.executeSetOfInstructions("R", noScents);
      expect(robot.getOrientation()).toBe(Orientation.N);
      expect(robot.getPosition()).toStrictEqual([6, 12]);
    });
  });

  // TEST MOVE FORWARD IN A VALID POSITION
  describe("Robot executes F in a valid position", () => {
    it("moving N from x,y should return x,y+1 and same orientation", () => {
      const robot = new Robot(2, 4, Orientation.N, maxLimit, maxLimit);
      robot.executeSetOfInstructions("F", noScents);
      expect(robot.getOrientation()).toBe(Orientation.N);
      expect(robot.getPosition()).toStrictEqual([2, 5]);
    });
    it("moving S from x,y should return x,y-1 and same orientation", () => {
      const robot = new Robot(8, 10, Orientation.S, maxLimit, maxLimit);
      robot.executeSetOfInstructions("F", noScents);
      expect(robot.getOrientation()).toBe(Orientation.S);
      expect(robot.getPosition()).toStrictEqual([8, 9]);
    });
    it("moving E from x,y should return x+1,y and same orientation", () => {
      const robot = new Robot(2, 12, Orientation.E, maxLimit, maxLimit);
      robot.executeSetOfInstructions("F", noScents);
      expect(robot.getOrientation()).toBe(Orientation.E);
      expect(robot.getPosition()).toStrictEqual([3, 12]);
    });
    it("moving W from x,y should return x-1, y and same orientation", () => {
      const robot = new Robot(10, 19, Orientation.W, maxLimit, maxLimit);
      robot.executeSetOfInstructions("F", noScents);
      expect(robot.getOrientation()).toBe(Orientation.W);
      expect(robot.getPosition()).toStrictEqual([9, 19]);
    });
  });

  // TEST MOVE OUTSIDE THE GRID
  describe("Robot moves outside the grid", () => {
    it("moving N outside the grid should leave a scent and mark the robot as fallen", () => {
      const scents = new Set<string>();
      const robot = new Robot(2, 10, Orientation.N, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.N);
      expect(robot.getPosition()).toStrictEqual([2, 10]);
      expect(robot.hasFallen).toBeTruthy();
      expect(scents.has(getKeyOfScent(2, 11))).toBeTruthy();
    });
    it("moving S outside the grid should leave a scent and mark the robot as fallen", () => {
      const scents = new Set<string>();
      const robot = new Robot(2, 0, Orientation.S, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.S);
      expect(robot.getPosition()).toStrictEqual([2, 0]);
      expect(robot.hasFallen).toBeTruthy();
      expect(scents.has(getKeyOfScent(2, -1))).toBeTruthy();
    });
    it("moving W outside the grid should leave a scent and mark the robot as fallen", () => {
      const scents = new Set<string>();
      const robot = new Robot(0, 5, Orientation.W, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.W);
      expect(robot.getPosition()).toStrictEqual([0, 5]);
      expect(robot.hasFallen).toBeTruthy();
      expect(scents.has(getKeyOfScent(-1, 5))).toBeTruthy();
    });
    it("moving E outside the grid should leave a scent and mark the robot as fallen", () => {
      const scents = new Set<string>();
      const robot = new Robot(10, 3, Orientation.E, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.E);
      expect(robot.getPosition()).toStrictEqual([10, 3]);
      expect(robot.hasFallen).toBeTruthy();
      expect(scents.has(getKeyOfScent(11, 3))).toBeTruthy();
    });
  });

  // TEST TRY TO MOVE OUTSIDE THE GRID, BUT DON'T MOVE DUE THE SCENT
  describe("Robot tries to move outside the grid, but there is scent", () => {
    it("moving N outside the grid towards scent should change nothing", () => {
      const scents = new Set<string>();
      scents.add(getKeyOfScent(2, 11));
      const robot = new Robot(2, 10, Orientation.N, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.N);
      expect(robot.getPosition()).toStrictEqual([2, 10]);
      expect(scents.has(getKeyOfScent(2, 11))).toBeTruthy();
      expect(robot.hasFallen()).toBeFalsy();
    });
    it("moving S outside the grid towards scent should change nothing", () => {
      const scents = new Set<string>();
      scents.add(getKeyOfScent(2, -1));
      const robot = new Robot(2, 0, Orientation.S, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.S);
      expect(robot.getPosition()).toStrictEqual([2, 0]);
      expect(scents.has(getKeyOfScent(2, -1))).toBeTruthy();
      expect(robot.hasFallen()).toBeFalsy();
    });
    it("moving W outside the grid towards scent should change nothing", () => {
      const scents = new Set<string>();
      scents.add(getKeyOfScent(-1, 5));
      const robot = new Robot(0, 5, Orientation.W, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.W);
      expect(robot.getPosition()).toStrictEqual([0, 5]);
      expect(scents.has(getKeyOfScent(-1, 5))).toBeTruthy();
      expect(robot.hasFallen()).toBeFalsy();
    });
    it("moving E outside the grid towards scent should change nothing", () => {
      const scents = new Set<string>();
      scents.add(getKeyOfScent(11, 3));
      const robot = new Robot(10, 3, Orientation.E, 10, 10);
      robot.executeSetOfInstructions("F", scents);
      expect(robot.getOrientation()).toBe(Orientation.E);
      expect(robot.getPosition()).toStrictEqual([10, 3]);
      expect(scents.has(getKeyOfScent(11, 3))).toBeTruthy();
      expect(robot.hasFallen()).toBeFalsy();
    });
  });
});
