/* eslint-disable-next-line */
import {legacy_createStore, applyMiddleware, compose} from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './rootReducer';

const store = legacy_createStore(rootReducer, compose(applyMiddleware(thunk)));

export default store;
