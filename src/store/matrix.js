import { createSlice } from "@reduxjs/toolkit";

const initial = () => {
  var blockRows = new Array(40);

  for (var i = 0; i < 40; ++i) {
    var temp = new Array(60);

    for (var j = 0; j < 60; ++j) {
      temp[j] = {
        state: "empty",
        id: i * 100 + j,
      };
    }

    blockRows[i] = temp;
  }

  blockRows[15][15] = {
    ...blockRows[15][15],
    state: "start",
  };

  blockRows[25][45] = {
    ...blockRows[25][45],
    state: "goal",
  };

  return blockRows;
};

const twoDMatrix = initial();
const initialMatrixState = {
  data: twoDMatrix,
  mouseDown: false,
  start: { row: 15, col: 15 },
  goal: { row: 25, col: 45 },
};

const matrixSlice = createSlice({
  name: "matrix",
  initialState: initialMatrixState,
  reducers: {
    setCellState(state, action) {
      var r = action.payload.row;
      var c = action.payload.col;
      state.data[r][c].state = action.payload.state;
      console.log("updated");
    },
  },
});

export const matrixActions = matrixSlice.actions;
export default matrixSlice.reducer;
