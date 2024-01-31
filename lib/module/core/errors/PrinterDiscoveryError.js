export class PrinterDiscoveryError extends Error {
  message = '';
  name = 'PrinterDiscoveryError';
  timestamp = 0;
  status = '';
  methodName = '';
  constructor(params) {
    super(params.message);
    Object.assign(this, params);
  }
}
PrinterDiscoveryError.prototype.name = 'PrinterDiscoveryError';
//# sourceMappingURL=PrinterDiscoveryError.js.map