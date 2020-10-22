import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunkMiddleWare from 'redux-thunk';
import multi from 'redux-multi';
import { userReducer } from './userReducer';
import { exerciseReducer } from './exerciseReducer';
import { workoutReducer } from './workoutReducer';
import { reducer as formReducer } from 'redux-form';

let reducers = combineReducers({
    form: formReducer,
    user:userReducer,
    exercises: exerciseReducer,
    workouts: workoutReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleWare, multi));

window.store = store;

export default store;