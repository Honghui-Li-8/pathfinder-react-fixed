import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { matrixActions } from "../../store/matrix";

const Cell = (props) => {
  var col = props.data.id % 100;
  var row = (props.data.id - col) / 100;
  // get cell data
  const dispatch = useDispatch();
  const stateTemp = useSelector((state) => state.matrix.data[row][col].state);

  //const pressDown = useSelector((state) => state.matrix.mouseDown);

  //
  const [state, setState] = useState(stateTemp);
  var color = "DarkGrey";
  const currentKey = props.data.id;

  useEffect(() => {
    setState(stateTemp);
  }, [stateTemp]);

  const clickHandler = () => {
    // left click, set/remove block
    var temp = state
    if (state === "empty") temp = 'block';
    else if (state === "block") temp = 'empty';
    dispatch(matrixActions.setCellState({row:row, col:col, state:temp}));
    setState(temp);
  };

  const rightClickHandler = (event) => {
    event.preventDefault();
  };

  const mouseDownHandler = () => {
    // change mouse down bool
  };

  // calculate color
  if (state === "empty") color = "DarkGrey";
  else if (state === "start") color = "green";
  else if (state === "block") color = "black";
  else if (state === "goal") color = "red";
  else if (state === "visited") color = "Gainsboro";
  else if (state === "frontier") color = "DarkSeaGreen";
  else if (state === "path") color = "DarkOrange";
  else console.log("unknow state: " + state);

  // return
  return (
    <div
      style={{
        height: "20px",
        width: "20px",
        key: currentKey,
        backgroundColor: color,
        float: "left",
        border: ".1px ridge Gray",
      }}
      onClick={clickHandler}
      onContextMenu={rightClickHandler}
      onMouseDown={mouseDownHandler}
    ></div>
  );
};

export default Cell;
