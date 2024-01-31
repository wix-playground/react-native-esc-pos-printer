import { PRINTER_LANGUAGE } from '../constants';
/**
 * @param language the language code
 * @returns the language code of the printer depeding ot the passed language param, defaults to EPOS2_LANG_EN
 */
export function getPrinterLanguage(language) {
  let lang;
  if (typeof PRINTER_LANGUAGE[language] === 'number') {
    lang = PRINTER_LANGUAGE[language];
  } else {
    console.warn('An invalid parameter of language was passed.');
    lang = PRINTER_LANGUAGE.EPOS2_LANG_EN;
  }
  return lang;
}
//# sourceMappingURL=getPrinterLanguage.js.map