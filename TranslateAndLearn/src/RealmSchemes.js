export const TranslationSchema = {
  name: 'Translation',
  primaryKey: 'id',
  properties: {
    id: 'int',
    lang: 'Language',
    input: 'string',
    output: 'string',
  },
};

export const LanguageSchema = {
  name: 'Language',
  properties: {
    from: 'string',
    to: 'string',
  },
};
