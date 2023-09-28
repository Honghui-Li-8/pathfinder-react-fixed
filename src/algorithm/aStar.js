// store aStar algo
import PriorityQueue from "../dataStructure/priorityQueue";

const aStar = (matrix, start, goal, updateCell) => {
  const maxRowIndex = matrix.length - 1;
  const maxColIndex = matrix[0].length - 1;
  var found = false;
  var frontier = new PriorityQueue();

  frontier.enqueue({ row: start.row, col: start.col, cost: 0 }, 0);

  // loop body
  while (!frontier.isEmpty() && !found) {
    // pop losest estimat cost node & check ---------------------------------
    const qNode = frontier.popLowest();
    const r = qNode.node.row; // current row
    const c = qNode.node.col; // current col
    const cost = qNode.node.cost + 1; // cost to this cell

    if (isGoal(r, c, goal)) {
      // found goal
      found = true;
      break;
    }

    // not goal, continue seraching
    // mark current as visited cell on board
    if (r === start.row && c === start.col) {
      // do nothing
    } else {
      updateCell(r, c, "visited");
    }

    // expand frontier ------------------------------------------------------
    // up
    if (qNode.node.row > 0) {
      // have cell above ^^
      if (isEmptyCell(matrix[r - 1][c])) {
        // push into queue
        frontier.enqueue(
          { row: r - 1, col: c, cost: cost },
          weightedCost(cost) + getEC(r - 1, c, goal)
        );

        matrix[r - 1][c] = "down"; // mark comed-direction, "down"
        updateCell(r - 1, c, "frontier"); // update board
      }
    }

    // down
    if (qNode.node.row < maxRowIndex) {
      // have cell down vv
      if (isEmptyCell(matrix[r + 1][c])) {
        // push into queue

        frontier.enqueue(
          { row: r + 1, col: c, cost: cost },
          weightedCost(cost) + getEC(r + 1, c, goal)
        );
        matrix[r + 1][c] = "up"; // mark comed-direction, "up"
        updateCell(r + 1, c, "frontier"); // update board
      }
    }

    // left
    if (qNode.node.col > 0) {
      // have cell left <=
      if (isEmptyCell(matrix[r][c - 1])) {
        // push into queue
        frontier.enqueue(
          { row: r, col: c - 1, cost: cost },
          weightedCost(cost) + getEC(r, c - 1, goal)
        );
        matrix[r][c - 1] = "right"; // mark comed-direction, "right"
        updateCell(r, c - 1, "frontier"); // update board
      }
    }

    // right
    if (qNode.node.col < maxColIndex) {
      // have cell right =>
      if (isEmptyCell(matrix[r][c + 1])) {
        // push into queue
        frontier.enqueue(
          { row: r, col: c + 1, cost: cost },
          weightedCost(cost) + getEC(r, c + 1, goal)
        );
        matrix[r][c + 1] = "left"; // mark comed-direction, "left"
        updateCell(r, c + 1, "frontier"); // update board
      }
    }
  } // end of while loop

  // remark goal as goal
  updateCell(goal.row, goal.col, "goal");

  if (found) {
    // found the path to goal
    // trace back
    var row_tb = goal.row;
    var col_tb = goal.col;

    var traceBack = [];

    while (row_tb !== start.row || col_tb !== start.col) {
      // store the path into array
      traceBack.push({ row: row_tb, col: col_tb });

      // back to previous node in path using direction
      if (matrix[row_tb][col_tb] === "left") --col_tb;
      else if (matrix[row_tb][col_tb] === "right") ++col_tb;
      else if (matrix[row_tb][col_tb] === "up") --row_tb;
      else if (matrix[row_tb][col_tb] === "down") ++row_tb;
    } // all path stroed

    // show path from start to goal
    for (var i = traceBack.length - 1; i > 0; --i) {
      updateCell(traceBack[i].row, traceBack[i].col, "path");
    }
    console.log("path = " + (traceBack.length - 1));
  }

  return found;
};

const getEC = (row, col, goal) => {
  // getEstimatedCost;
  return Math.sqrt(
    (goal.row - row) * (goal.row - row) + (goal.col - col) * (goal.col - col)
  );
};

const weightedCost = (cost) => {
  return cost/3;
};

const isGoal = (row, col, goal) => {
  return row === goal.row && col === goal.col;
};

const isEmptyCell = (state) => {
  var isEmpty =
    state !== "left" &&
    state !== "right" &&
    state !== "up" &&
    state !== "down" &&
    state !== "block" &&
    state !== "start";
  return isEmpty;
};

export default aStar;
