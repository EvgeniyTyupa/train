import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { userReducer } from './reducers/userReducer';
import { commonReducer } from "./reducers/commonReducer";
import { exerciseReducer } from './reducers/exerciseReducer';
import { workoutReducer } from './reducers/workoutReducer';
import { reducer as formReducer } from 'redux-form';
import rootSaga from './sagas/sagas';

let reducers = combineReducers({
    form: formReducer,
    user:userReducer,
    common: commonReducer,
    exercises: exerciseReducer,
    workouts: workoutReducer
});

const sagaMiddleware = createSagaMiddleware();
let store = createStore(reducers, compose(
    applyMiddleware(sagaMiddleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  ));

sagaMiddleware.run(rootSaga);

window.store = store;

export default store;