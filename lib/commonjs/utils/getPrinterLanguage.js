"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrinterLanguage = getPrinterLanguage;
var _constants = require("../constants");
/**
 * @param language the language code
 * @returns the language code of the printer depeding ot the passed language param, defaults to EPOS2_LANG_EN
 */
function getPrinterLanguage(language) {
  let lang;
  if (typeof _constants.PRINTER_LANGUAGE[language] === 'number') {
    lang = _constants.PRINTER_LANGUAGE[language];
  } else {
    console.warn('An invalid parameter of language was passed.');
    lang = _constants.PRINTER_LANGUAGE.EPOS2_LANG_EN;
  }
  return lang;
}
//# sourceMappingURL=getPrinterLanguage.js.map