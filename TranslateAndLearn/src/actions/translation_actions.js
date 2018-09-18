import axios from 'axios';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
  SET_HISTORY,
  LOAD_STORE,
} from './types';

import { ROOT_URL, TRANSLATE_URL } from '../Constants';
import API_KEY from '../ApiKey';

export const translate = ({ input, lang: { from, to } }) => async (dispatch) => {
  try {
    const url = `${ROOT_URL.GOOGLE}${TRANSLATE_URL}?key=${
      API_KEY.GOOGLE
    }&q=${input}&source=${from}&target=${to}`;
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
  } catch (err) {
    console.log(err);
    let {
      data: { text },
    } = await axios.get(
      `${ROOT_URL.YANDEX}?key=${
        API_KEY.YANDEX
      }&text=${input}&lang=${from}-${to}`,
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
  }
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

export const removeTranslation = id => ({
  type: REMOVE_TRANSLATION,
  payload: id,
});

export const clearTranslations = () => ({ type: CLEAR_TRANSLATIONS });

export const setHistory = history => ({ type: SET_HISTORY, payload: history });

export const loadStore = () => (dispatch) => {
  // TODO realm load
};
