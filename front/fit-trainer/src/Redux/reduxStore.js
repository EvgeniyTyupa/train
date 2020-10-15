import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import {userReducer} from './userReducer';
import {reducer as formReducer} from 'redux-form';

let reducers = combineReducers({
    form: formReducer,
    user:userReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare));

window.store = store;

export default store;