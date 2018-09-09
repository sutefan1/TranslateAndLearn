import axios from 'axios';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
} from './types';
import { API_KEY, ROOT_URL } from '../Constants';

export const translate = input => async (dispatch) => {
  let {
    data: { text },
  } = await axios.get(`${ROOT_URL}?key=${API_KEY}&text=${input}&lang=de-en`);
  const concatinatedText = text.reduce((prev, current) => prev + current);
  const payload = {
    input,
    output: concatinatedText,
  };
  dispatch({ type: TRANSLATE, payload });
};

export const setTranslationPlaceholder = input => ({
  type: SET_TRANSLATION_PLACEHOLDER,
  payload: {
    input,
    output: '...',
  },
});

export const removeTranslation = translation => ({
  type: REMOVE_TRANSLATION,
  payload: translation,
});

export const clearTranslations = () => ({ type: CLEAR_TRANSLATIONS });
