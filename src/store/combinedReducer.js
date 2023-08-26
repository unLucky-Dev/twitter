import { combineReducers } from '@reduxjs/toolkit';
import commonStore from './reducer';

const rootReducer = combineReducers({
  commonStore,
});

export default rootReducer;
