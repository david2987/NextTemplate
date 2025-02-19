import englishMessages from 'ra-language-english';
import spanishMessages from 'ra-language-spanish';
import polyglotI18nProvider from 'ra-i18n-polyglot';

const messages = {
    'en': englishMessages,
    'es': spanishMessages
};
export const i18nProvider = polyglotI18nProvider(locale => messages['es'] );
