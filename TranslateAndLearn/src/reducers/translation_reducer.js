import _ from 'lodash';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
} from '../actions/types';

const INITAL_STATE = {
  lastTranslation: {
    lang: {
      from: 'de',
      to: 'en',
    },
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
    case SET_TRANSLATION_PLACEHOLDER: {
      return { ...state, lastTranslation: action.payload };
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
