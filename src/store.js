import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import users from './ducks/users';

const reducers = combineReducers({
  users,
});
const middlewares = [reduxThunk];
const enhancer = compose(
  applyMiddleware(...middlewares),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);
export default createStore(reducers, enhancer);
