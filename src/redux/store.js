// src/redux/store.js
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appointmentSlice from './appointment/slice';

const rootReducer = combineReducers({
  appointment: appointmentSlice.reducer,
  // Add other reducers here if needed
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
