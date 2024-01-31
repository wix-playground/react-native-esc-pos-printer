"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPrinterSeriesByName = getPrinterSeriesByName;
var _constants = require("../constants");
function getPrinterSeriesByName(printerName) {
  const keys = Object.keys(_constants.PRINTER_SERIES);
  const seriesName = keys.find(series => {
    const [,, model] = series.split('_');
    return printerName.toLowerCase().includes(model?.toLowerCase?.());
  });
  return seriesName || 'EPOS2_TM_T88';
}
//# sourceMappingURL=getPrinterSeriesByName.js.map