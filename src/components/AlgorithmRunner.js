import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { matrixActions } from "../store/matrix";
import cleanUp from "../algorithm/cleanUp";

const AlgorithmRunner = (props) => {
  const dispatch = useDispatch();
  // get matrix dada
  var matrix = useSelector((state) => state.matrix.data);
  const start = useSelector((state) => state.matrix.start);
  const goal = useSelector((state) => state.matrix.goal);

  // event handler
  const updateCell = (row, col, state) => {
    setTimeout(()=> {dispatch(matrixActions.setCellState({ row: row, col: col, state: state }));},1);
    console.log("new new update: ["+row+","+col+"]");
  };

  const runAlgoHandler = () => {
    // get matrix data
    var matrixData = new Array(40);
    for (var i = 0; i < 40; ++i) {
      var tempRow = new Array(60);
      for (var j = 0; j < 60; ++j) {
        tempRow[j] = matrix[i][j].state;
      }

      matrixData[i] = tempRow;
    }

    const founded = props.algorithm(matrixData, start, goal, updateCell);
    if (founded) console.log("found");
    else console.log("not found");
  };

  const cleanUpHandler = () => {
    // get matrix data
    var matrixData = new Array(40);
    for (var i = 0; i < 40; ++i) {
      var tempRow = new Array(60);
      for (var j = 0; j < 60; ++j) {
        tempRow[j] = matrix[i][j].state;
      }

      matrixData[i] = tempRow;
    }
    console.log("cleaning");
    cleanUp(matrixData, updateCell);
  };

  // componet body
  return (
    <div>
      <button onClick={runAlgoHandler}>Run Algorithm</button>
      <button onClick={cleanUpHandler}>clean up</button>
    </div>
  );
};

export default AlgorithmRunner;
