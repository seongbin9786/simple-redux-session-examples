import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import reducers from './modules';

import './index.css';
import Intro from './Intro';

const useReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, useReduxDevTools);

ReactDOM.render(
    <Provider store={store}>
        <Intro />
    </Provider>
    , document.getElementById('root')
);
