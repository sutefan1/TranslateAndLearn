import _ from 'lodash';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
} from '../actions/types';

const INITAL_STATE = {
  lastTranslation: {
    input: 'Hallo, wie geht es dir?',
    output: 'Hello, how are you?',
  },
  history: [],
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case TRANSLATE: {
      return {
        lastTranslation: action.payload,
        history: [...state.history, action.payload],
      };
    }
    case REMOVE_TRANSLATION: {
      return {
        ...state,
        history: _.filter(
          state.history,
          item => item.input !== action.payload.input,
        ),
      };
    }
    case CLEAR_TRANSLATIONS: {
      return { ...state, history: [] };
    }
    default: {
      return state;
    }
  }
};
