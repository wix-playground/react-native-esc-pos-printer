import { useCallback, useEffect, useState } from 'react';
import { PrintersDiscovery } from '../PrintersDiscovery';
export function usePrintersDiscovery() {
  const [printers, setPrinters] = useState([]);
  const [isDiscovering, setIsDescovering] = useState(false);
  const [printerError, setPrinterError] = useState(null);
  useEffect(() => {
    const removeListener = PrintersDiscovery.onDiscovery(deviceInfo => {
      setPrinters(deviceInfo);
    });
    return () => {
      removeListener();
    };
  }, []);
  useEffect(() => {
    const removeListener = PrintersDiscovery.onStatusChange(status => {
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
  useEffect(() => {
    const removeListener = PrintersDiscovery.onError(error => {
      setPrinterError(error);
    });
    return () => {
      removeListener();
    };
  }, []);
  const start = useCallback(params => {
    PrintersDiscovery.start(params);
  }, []);
  const stop = useCallback(() => {
    PrintersDiscovery.stop();
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