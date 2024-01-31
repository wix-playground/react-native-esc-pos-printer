import type { DeviceInfo, DiscoveryStartParams } from '../types';
import type { PrinterDiscoveryError } from '../../core/errors';
export declare function usePrintersDiscovery(): {
    printers: DeviceInfo[];
    isDiscovering: boolean;
    printerError: PrinterDiscoveryError;
    start: (params?: DiscoveryStartParams) => void;
    stop: () => void;
};
//# sourceMappingURL=usePrintersDiscovery.d.ts.map