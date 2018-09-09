import axios from 'axios';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
} from './types';

import { API_KEY, ROOT_URL } from '../Constants';

export const translate = ({ input, lang: { from, to } }) => async (dispatch) => {
  let {
    data: { text },
  } = await axios.get(
    `${ROOT_URL}?key=${API_KEY}&text=${input}&lang=${from}-${to}`,
  );
  const concatinatedText = text.reduce((prev, current) => prev + current);
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
