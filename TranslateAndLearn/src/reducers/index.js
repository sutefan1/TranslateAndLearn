import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import translation from './translation_reducer';

export default createStore(
  combineReducers({
    translation,
  }),
  applyMiddleware(thunk),
);
