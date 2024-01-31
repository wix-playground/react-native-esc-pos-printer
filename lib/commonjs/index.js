"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  getPrinterSeriesByName: true,
  PRINTER_SERIES: true,
  PRINTER_LANGUAGE: true
};
Object.defineProperty(exports, "PRINTER_LANGUAGE", {
  enumerable: true,
  get: function () {
    return _constants.PRINTER_LANGUAGE;
  }
});
Object.defineProperty(exports, "PRINTER_SERIES", {
  enumerable: true,
  get: function () {
    return _constants.PRINTER_SERIES;
  }
});
exports.default = void 0;
Object.defineProperty(exports, "getPrinterSeriesByName", {
  enumerable: true,
  get: function () {
    return _utils.getPrinterSeriesByName;
  }
});
var _reactNative = require("react-native");
var _utils = require("./utils");
var _constants = require("./constants");
var _discovery = require("./discovery");
Object.keys(_discovery).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _discovery[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _discovery[key];
    }
  });
});
var _printing = _interopRequireDefault(require("./printing"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const {
  EscPosPrinter,
  ThePrinterWrapper
} = _reactNative.NativeModules;
const printEventEmmiter = new _reactNative.NativeEventEmitter(EscPosPrinter);
const _default = {
  init({
    target,
    seriesName,
    language = 'EPOS2_LANG_EN'
  }) {
    const series = _constants.PRINTER_SERIES[seriesName];
    const lang = (0, _utils.getPrinterLanguage)(language);
    return EscPosPrinter.init(target, series, lang);
  },
  instantiate({
    target,
    seriesName,
    language = 'EPOS2_LANG_EN'
  }) {
    const series = _constants.PRINTER_SERIES[seriesName];
    const lang = (0, _utils.getPrinterLanguage)(language);
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
    const paperWidth = (await this.getPaperWidth()) || _constants.DEFAULT_PAPER_WIDTH;
    const key = String(paperWidth);
    const seriesCharsPerLineFontA = _constants.FONT_A_CHARS_PER_LINE[seriesName];
    const fontAcplForCurrentWidth = seriesCharsPerLineFontA?.[key];
    return {
      fontA: fontAcplForCurrentWidth || _constants.DEFAULT_FONT_A_CHARS_PER_LINE[paperWidth]
    };
  },
  pairingBluetoothPrinter() {
    if (_reactNative.Platform.OS === 'ios') {
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
  printing: _printing.default
};
var _default2 = exports.default = _default;
//# sourceMappingURL=index.js.map