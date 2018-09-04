import _ from 'lodash';
import {
  ADD_TRANSLATION,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case ADD_TRANSLATION: {
      return [...state, action.payload];
    }
    case REMOVE_TRANSLATION: {
      return _.filter(state, item => item.de !== action.payload.de);
    }
    case CLEAR_TRANSLATIONS: {
      return [];
    }
    default: {
      return state;
    }
  }
};
