import Realm from 'realm';
import _ from 'lodash';
import { TranslationSchema, LanguageSchema } from '../RealmSchemes';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
  LOAD_STORE,
} from '../actions/types';

const INITAL_STATE = {
  lastTranslation: {
    id: 0,
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
      const newItem = action.payload;
      const item = _.maxBy(state.history, entry => entry.id);
      if (item) {
        newItem.id = item.id + 1;
      } else {
        newItem.id = 0;
      }
      Realm.open({
        schema: [TranslationSchema, LanguageSchema],
      }).then((realm) => {
        realm.write(() => {
          realm.create(TranslationSchema.name, newItem);
        });
      });
      return {
        lastTranslation: action.payload,
        history: [...state.history, newItem],
      };
    }
    case SET_TRANSLATION_PLACEHOLDER: {
      return { ...state, lastTranslation: action.payload };
    }
    case REMOVE_TRANSLATION: {
      return {
        ...state,
        history: _.filter(state.history, item => item.id !== action.payload),
      };
    }
    case CLEAR_TRANSLATIONS: {
      return { ...state, history: [] };
    }
    case LOAD_STORE: {
      return { ...state, history: action.payload };
    }
    default: {
      return state;
    }
  }
};
