

const cleanUp = (matrix, updateCell) => {

  for (var i=0; i< matrix.length; ++i) {
    for (var j=0;j<matrix[0].length; ++j){
      if(shouldBeEarase(matrix[i][j])) {
        console.log("earase");
        updateCell(i,j, "empty");
      }
    }
  }

};


const shouldBeEarase = (state) => {
  var result = true;

  if (state === "start") result = false;
  if (state === "goal") result = false;
  if (state === "empty") result = false;
  if (state === "block") result = false;

  return result;
}



export default cleanUp;