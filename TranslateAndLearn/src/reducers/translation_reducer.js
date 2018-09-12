import _ from 'lodash';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
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
  history: [
    {
      id: 0,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 1,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 2,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 3,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 4,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 5,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 6,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 7,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 8,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 9,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 10,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 11,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 12,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 13,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 14,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 15,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
    {
      id: 16,
      lang: {
        from: 'de',
        to: 'en',
      },
      input: 'Hallo, wie geht es dir?',
      output: 'Hello, how are you?',
    },
  ],
};

export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case TRANSLATE: {
      const newItem = action.payload;
      newItem.id = _.maxBy(state.history, entry => entry.id).id + 1;
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
    default: {
      return state;
    }
  }
};
