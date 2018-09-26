import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { sessionService } from 'redux-react-session';

import reducers from './modules';

import './index.css';
import Intro from './Intro';

const useReduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const store = createStore(reducers, useReduxDevTools, applyMiddleware(reduxThunk));

sessionService.initSessionService(store)
    .then(() => console.log('successful!'))
    .catch(() => console.log('fail!'));

ReactDOM.render(
    <Provider store={store}>
        <Intro />
    </Provider>
    , document.getElementById('root')
);
