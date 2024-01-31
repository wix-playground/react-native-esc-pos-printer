import { PrinterDiscoveryError } from '../core';
import type { DiscoveryStartParams, DeviceInfo, DiscoveryStatus } from './types';
declare class PrintersDiscoveryClass {
    timeout: ReturnType<typeof setTimeout> | null;
    status: DiscoveryStatus;
    statusListeners: ((status: DiscoveryStatus) => void)[];
    errorListeners: ((error: PrinterDiscoveryError) => void)[];
    start: ({ timeout, autoStop, filterOption, }?: DiscoveryStartParams) => Promise<void>;
    stop: () => Promise<void>;
    private stopAfterDelay;
    private clearTimeout;
    onStatusChange: (callback: (status: DiscoveryStatus) => void) => () => void;
    onError: (callback: (error: PrinterDiscoveryError) => void) => () => void;
    onDiscovery: (callback: (printers: DeviceInfo[]) => void) => () => void;
    private triggerError;
    private triggerStatusChange;
    private setStatus;
}
export declare const PrintersDiscovery: PrintersDiscoveryClass;
export {};
//# sourceMappingURL=PrintersDiscovery.d.ts.map