import { configureStore } from '@reduxjs/toolkit';
// import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './combinedReducer';
import createSagaMiddleware from 'redux-saga';
import saga from '../saga/saga';

const sagaMiddleware = createSagaMiddleware();
const Store = configureStore({
  reducer: rootReducer,
  middleware: [sagaMiddleware],
  //enhancers: composeWithDevTools(),
  // Other configurations as needed
});
sagaMiddleware.run(saga);

export default Store;
