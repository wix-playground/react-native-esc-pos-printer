import { NativeEventEmitter, NativeModules, Platform } from 'react-native';
import { PrinterDiscoveryError, enableLocationAccessAndroid10, requestAndroidPermissions } from '../core';
import { DEFAULT_DISCOVERY_TIMEOUT, DiscoveryErrorMessageMapping, DiscoveryErrorStatusMapping, DiscoveryErrorResult, DiscoveryDeviceTypeMapping } from './constants';
const {
  EscPosPrinterDiscovery
} = NativeModules;
const discoveryEventEmmiter = new NativeEventEmitter(EscPosPrinterDiscovery);
class PrintersDiscoveryClass {
  timeout = null;
  status = 'inactive';
  statusListeners = [];
  errorListeners = [];
  start = async ({
    timeout = DEFAULT_DISCOVERY_TIMEOUT,
    autoStop = true,
    filterOption = {}
  } = {}) => {
    try {
      if (this.status === 'discovering') return;
      if (Platform.OS === 'android' && !(await requestAndroidPermissions()) || !(await enableLocationAccessAndroid10())) {
        this.triggerError('PrintersDiscovery.start', new Error(String(DiscoveryErrorResult.PERMISSION_ERROR)));
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
        deviceType: DiscoveryDeviceTypeMapping[info.deviceType]
      })));
    });
    return () => {
      listener.remove();
    };
  };
  triggerError = (methodName, error) => {
    const result = !isNaN(Number(error.message)) ? error.message : DiscoveryErrorResult.ERR_FAILURE;
    const message = DiscoveryErrorMessageMapping[result];
    const status = DiscoveryErrorStatusMapping[result];
    const discoveryError = new PrinterDiscoveryError({
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
export const PrintersDiscovery = initPrintersClass();
//# sourceMappingURL=PrintersDiscovery.js.map