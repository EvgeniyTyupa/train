import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import userReducer from './userReducer';

let reducers = combineReducers({
    userReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));
window.store = store;

export default store;