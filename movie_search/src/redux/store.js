import { configureStore } from '@reduxjs/toolkit';
import movieReducer from '../redux/slices/movieSlice';

export const store = configureStore({
  reducer: {
    movies: movieReducer
  }
});