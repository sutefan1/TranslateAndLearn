import {
  ADD_TRANSLATION,
  REMOVE_TRANSLATION,
  CLEAR_TRANSLATIONS,
} from './types';

export const addTranslation = translation => ({
  type: ADD_TRANSLATION,
  payload: translation,
});

export const removeTranslation = translation => ({
  type: REMOVE_TRANSLATION,
  payload: translation,
});

export const clearTranslations = () => ({ type: CLEAR_TRANSLATIONS });
