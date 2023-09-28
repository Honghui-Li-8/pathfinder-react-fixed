import React from 'react';
import Matrix from './components/BlockMatrix/Matrix';
import AlgorithmRunner from './components/AlgorithmRunner';
import aStar from './algorithm/aStar';


function App() {
  var algorithm = aStar;
  return (
    <React.Fragment>
      <Matrix />
      <AlgorithmRunner algorithm={algorithm} />
    </React.Fragment>
  );
}

export default App;
