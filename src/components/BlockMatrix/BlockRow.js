import React from "react";
import Cell from "./Cell";

const BlockRow = (props) => {
  return (
    <div style={{ height: 20, width: 1300 }}>
      {props.row.map((data) => <Cell data={data} key={data.id}/>)}
    </div>
  );
};

export default BlockRow;
