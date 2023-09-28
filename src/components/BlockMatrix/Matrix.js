import React from "react";
import BlockRow from "./BlockRow";

var blockRows = new Array(40);

for (var i = 0; i < 40; ++i) {
  var temp = new Array(60);

  for (var j = 0; j < 60; ++j) {
    temp[j] = {
      state: 'e',
      id: (i  * 100 + j),
    };
  }

  blockRows[i] = temp;
}

blockRows[15][15] = {
  ...blockRows[15][15],
  state: 's',
};

const Matrix = (props) => {
  return (
    <center>
      <h1>Testing ver0</h1>
      <br />
      <br />
      {blockRows.map((currentRow) => {
        return <BlockRow row={currentRow} key={currentRow[0].id} />;
      })}
    </center>
  );
};

export default Matrix;
