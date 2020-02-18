import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import getRData from './reducers';
import thunk from 'redux-thunk';
import routes from './routes';

require("../assets/stylesheets/main.scss");

let store = createStore(
    getRData,
    null,
    applyMiddleware(
        thunk
    ));

ReactDOM.render(
    <Provider store={store}>
        {routes()}
    </Provider>,
    document.getElementById('target')
);
