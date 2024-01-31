"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usePrintersDiscovery = usePrintersDiscovery;
var _react = require("react");
var _PrintersDiscovery = require("../PrintersDiscovery");
function usePrintersDiscovery() {
  const [printers, setPrinters] = (0, _react.useState)([]);
  const [isDiscovering, setIsDescovering] = (0, _react.useState)(false);
  const [printerError, setPrinterError] = (0, _react.useState)(null);
  (0, _react.useEffect)(() => {
    const removeListener = _PrintersDiscovery.PrintersDiscovery.onDiscovery(deviceInfo => {
      setPrinters(deviceInfo);
    });
    return () => {
      removeListener();
    };
  }, []);
  (0, _react.useEffect)(() => {
    const removeListener = _PrintersDiscovery.PrintersDiscovery.onStatusChange(status => {
      const isNextDiscovering = status === 'discovering';
      if (isNextDiscovering) {
        setPrinters([]);
        setPrinterError(null);
      }
      setIsDescovering(isNextDiscovering);
    });
    return () => {
      removeListener();
    };
  }, []);
  (0, _react.useEffect)(() => {
    const removeListener = _PrintersDiscovery.PrintersDiscovery.onError(error => {
      setPrinterError(error);
    });
    return () => {
      removeListener();
    };
  }, []);
  const start = (0, _react.useCallback)(params => {
    _PrintersDiscovery.PrintersDiscovery.start(params);
  }, []);
  const stop = (0, _react.useCallback)(() => {
    _PrintersDiscovery.PrintersDiscovery.stop();
  }, []);
  return {
    printers,
    isDiscovering,
    printerError,
    start,
    stop
  };
}
//# sourceMappingURL=usePrintersDiscovery.js.map