import axios from 'axios';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
} from './types';

import { API_KEY, ROOT_URL } from '../Constants';

export const translate = ({ input, lang: { from, to } }) => async (dispatch) => {
  const url = `${ROOT_URL}?key=${API_KEY}&q=${input}&source=${from}&target=${to}`;
  let {
    data: {
      data: { translations },
    },
  } = await axios.get(url);

  const concatinatedText = translations.reduce(
    (prev, current) => prev + current.translatedText,
    '',
  );
  const payload = {
    lang: {
      from,
      to,
    },
    input,
    output: concatinatedText,
  };
  dispatch({ type: TRANSLATE, payload });
};

export const setTranslationPlaceholder = ({ input, lang: { from, to } }) => ({
  type: SET_TRANSLATION_PLACEHOLDER,
  payload: {
    lang: {
      from,
      to,
    },
    input,
    output: '...',
  },
});

export const removeTranslation = translation => ({
  type: REMOVE_TRANSLATION,
  payload: translation,
});

export const clearTranslations = () => ({ type: CLEAR_TRANSLATIONS });
