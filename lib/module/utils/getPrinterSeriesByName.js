import { PRINTER_SERIES } from '../constants';
export function getPrinterSeriesByName(printerName) {
  const keys = Object.keys(PRINTER_SERIES);
  const seriesName = keys.find(series => {
    const [,, model] = series.split('_');
    return printerName.toLowerCase().includes(model?.toLowerCase?.());
  });
  return seriesName || 'EPOS2_TM_T88';
}
//# sourceMappingURL=getPrinterSeriesByName.js.map