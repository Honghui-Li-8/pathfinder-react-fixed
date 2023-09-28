import { configureStore } from '@reduxjs/toolkit';

import matrixReducer from "./matrix";


const store = configureStore({
  reducer: { matrix: matrixReducer},
});

export default store;
