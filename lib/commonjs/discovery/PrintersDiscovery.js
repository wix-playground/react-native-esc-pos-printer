"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PrintersDiscovery = void 0;
var _reactNative = require("react-native");
var _core = require("../core");
var _constants = require("./constants");
const {
  EscPosPrinterDiscovery
} = _reactNative.NativeModules;
const discoveryEventEmmiter = new _reactNative.NativeEventEmitter(EscPosPrinterDiscovery);
class PrintersDiscoveryClass {
  timeout = null;
  status = 'inactive';
  statusListeners = [];
  errorListeners = [];
  start = async ({
    timeout = _constants.DEFAULT_DISCOVERY_TIMEOUT,
    autoStop = true,
    filterOption = {}
  } = {}) => {
    try {
      if (this.status === 'discovering') return;
      if (_reactNative.Platform.OS === 'android' && !(await (0, _core.requestAndroidPermissions)()) || !(await (0, _core.enableLocationAccessAndroid10)())) {
        this.triggerError('PrintersDiscovery.start', new Error(String(_constants.DiscoveryErrorResult.PERMISSION_ERROR)));
        return;
      }
      this.setStatus('discovering');
      await EscPosPrinterDiscovery.startDiscovery(filterOption);
      if (autoStop) {
        this.stopAfterDelay(timeout);
      }
    } catch (error) {
      this.setStatus('inactive');
      this.triggerError('PrintersDiscovery.start', error);
    }
  };
  stop = async () => {
    try {
      if (this.status === 'inactive') return;
      this.clearTimeout();
      await EscPosPrinterDiscovery.stopDiscovery();
      this.setStatus('inactive');
    } catch (error) {
      this.triggerError('PrintersDiscovery.stop', error);
    }
  };
  stopAfterDelay = timeout => {
    this.timeout = setTimeout(() => {
      this.timeout = null;
      this.stop();
    }, timeout);
  };
  clearTimeout = () => {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  };
  onStatusChange = callback => {
    this.statusListeners.push(callback);
    return () => {
      this.statusListeners = this.statusListeners.filter(listener => listener !== callback);
    };
  };
  onError = callback => {
    this.errorListeners.push(callback);
    return () => {
      this.errorListeners = this.errorListeners.filter(listener => listener !== callback);
    };
  };
  onDiscovery = callback => {
    const listener = discoveryEventEmmiter.addListener('onDiscovery', printer => {
      callback(printer.map(info => ({
        ...info,
        deviceType: _constants.DiscoveryDeviceTypeMapping[info.deviceType]
      })));
    });
    return () => {
      listener.remove();
    };
  };
  triggerError = (methodName, error) => {
    const result = !isNaN(Number(error.message)) ? error.message : _constants.DiscoveryErrorResult.ERR_FAILURE;
    const message = _constants.DiscoveryErrorMessageMapping[result];
    const status = _constants.DiscoveryErrorStatusMapping[result];
    const discoveryError = new _core.PrinterDiscoveryError({
      status: status,
      message: message,
      methodName
    });
    this.errorListeners.forEach(listener => listener(discoveryError));
  };
  triggerStatusChange = status => {
    this.statusListeners.forEach(listener => listener(status));
  };
  setStatus = status => {
    this.status = status;
    this.triggerStatusChange(status);
  };
}
function initPrintersClass() {
  return new PrintersDiscoveryClass();
}
const PrintersDiscovery = exports.PrintersDiscovery = initPrintersClass();
//# sourceMappingURL=PrintersDiscovery.js.map