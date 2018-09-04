import { combineReducers, createStore } from 'redux';
import history from './history_reducer';
// import translation from '../reducers/translation_reducer';

export default createStore(
  combineReducers({
    history,
  }),
);
