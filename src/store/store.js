import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './combinedReducer';

const Store = configureStore({
  reducer: rootReducer,
  //enhancers: composeWithDevTools(),
  // Other configurations as needed
});

export default Store;
