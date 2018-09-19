import axios from 'axios';
import Realm from 'realm';
import {
  TRANSLATE,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
  SET_TRANSLATION_PLACEHOLDER,
  LOAD_STORE,
} from './types';

import { ROOT_URL, TRANSLATE_URL } from '../Constants';
import API_KEY from '../ApiKey';
import { TranslationSchema, LanguageSchema } from '../RealmSchemes';

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

export const removeTranslation = id => (dispatch) => {
  Realm.open({ schema: [TranslationSchema, LanguageSchema] }).then((realm) => {
    let tranlation = realm.objectForPrimaryKey(TranslationSchema.name, id);
    if (tranlation) {
      realm.write(() => {
        realm.delete(tranlation);
      });
      dispatch({
        type: REMOVE_TRANSLATION,
        payload: id,
      });
    } else {
      dispatch({
        type: REMOVE_TRANSLATION,
        payload: -1,
      });
    }
  });
};

export const clearTranslations = () => (dispatch) => {
  Realm.open({ schema: [TranslationSchema, LanguageSchema] }).then((realm) => {
    realm.write(() => {
      realm.deleteModel(TranslationSchema.name);
    });

    dispatch({ type: CLEAR_TRANSLATIONS });
  });
};

export const loadStore = () => (dispatch) => {
  Realm.open({ schema: [TranslationSchema, LanguageSchema] }).then((realm) => {
    const history = realm.objects('Translation');

    if (history.length > 0) {
      dispatch({
        type: LOAD_STORE,
        payload: history,
      });
    }
    console.log(history);
  });
};
