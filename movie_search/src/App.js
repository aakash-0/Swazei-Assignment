// src/App.js
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import MovieSearch from './components/MovieSearch';

const App = () => {
  return (
    <Provider store={store}>
      <MovieSearch />
    </Provider>
  );
};

export default App;
