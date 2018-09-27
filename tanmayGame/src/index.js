import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { createStore } from 'redux'
import memoryGame from './ReducerFunctioning'
import { card_shuffling } from './MemGameFunctions';
import { Provider } from 'react-redux'

let store = createStore(memoryGame);
store.dispatch(card_shuffling());

ReactDOM.render(                   // create an ReactDOM for every event from base root id. 
  <Provider store={store}>
    <App />
  </Provider>
  , document.getElementById('root'));
registerServiceWorker();
