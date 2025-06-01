import { configureStore } from '@reduxjs/toolkit';
import exampleReducer from './exampleSlice';
import chargeSlice from './charge.slice';

export const store = configureStore({
  reducer: {
    example: exampleReducer,
    charge: chargeSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 