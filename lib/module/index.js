import { NativeModules, NativeEventEmitter, Platform } from 'react-native';
import { getPrinterSeriesByName, getPrinterLanguage } from './utils';
import { PRINTER_SERIES, FONT_A_CHARS_PER_LINE, DEFAULT_FONT_A_CHARS_PER_LINE, DEFAULT_PAPER_WIDTH, PRINTER_LANGUAGE } from './constants';
export * from './discovery';
const {
  EscPosPrinter,
  ThePrinterWrapper
} = NativeModules;
const printEventEmmiter = new NativeEventEmitter(EscPosPrinter);
import printing from './printing';
const _default = {
  init({
    target,
    seriesName,
    language = 'EPOS2_LANG_EN'
  }) {
    const series = PRINTER_SERIES[seriesName];
    const lang = getPrinterLanguage(language);
    return EscPosPrinter.init(target, series, lang);
  },
  instantiate({
    target,
    seriesName,
    language = 'EPOS2_LANG_EN'
  }) {
    const series = PRINTER_SERIES[seriesName];
    const lang = getPrinterLanguage(language);
    return ThePrinterWrapper.init(target, series, lang);
  },
  connect(target) {
    return ThePrinterWrapper.connect(target);
  },
  disconnectPrinter(target) {
    return ThePrinterWrapper.disconnectAndDeallocate(target);
  },
  getPaperWidth() {
    let successListener;
    let errorListener;
    function removeListeners() {
      successListener?.remove();
      errorListener?.remove();
      successListener = null;
      errorListener = null;
    }
    return new Promise((res, rej) => {
      successListener = printEventEmmiter.addListener('onGetPaperWidthSuccess', status => {
        removeListeners();
        res(status);
      });
      errorListener = printEventEmmiter.addListener('onGetPaperWidthFailure', status => {
        removeListeners();
        rej(status);
      });
      EscPosPrinter.getPaperWidth().catch(e => {
        removeListeners();
        rej(e);
      });
    });
  },
  async getPrinterCharsPerLine(seriesName) {
    const paperWidth = (await this.getPaperWidth()) || DEFAULT_PAPER_WIDTH;
    const key = String(paperWidth);
    const seriesCharsPerLineFontA = FONT_A_CHARS_PER_LINE[seriesName];
    const fontAcplForCurrentWidth = seriesCharsPerLineFontA?.[key];
    return {
      fontA: fontAcplForCurrentWidth || DEFAULT_FONT_A_CHARS_PER_LINE[paperWidth]
    };
  },
  pairingBluetoothPrinter() {
    if (Platform.OS === 'ios') {
      return EscPosPrinter.pairingBluetoothPrinter();
    }
    return Promise.resolve('Successs');
  },
  disconnect() {
    EscPosPrinter.disconnect();
  },
  getPrinterStatus() {
    return EscPosPrinter.getPrinterStatus();
  },
  startMonitorPrinter(interval = 5) {
    return EscPosPrinter.startMonitorPrinter(Math.max(5, Math.floor(interval)));
  },
  stopMonitorPrinter() {
    return EscPosPrinter.stopMonitorPrinter();
  },
  addPrinterStatusListener(listener) {
    const statusListener = printEventEmmiter.addListener('onMonitorStatusUpdate', listener);
    return () => {
      statusListener.remove();
    };
  },
  printing
};
export { getPrinterSeriesByName, PRINTER_SERIES, PRINTER_LANGUAGE };
export default _default;
//# sourceMappingURL=index.js.map