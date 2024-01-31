import { getPrinterSeriesByName } from './utils';
import type { PrinerEvents, EventListenerCallback, IPrinter, IPrinterInitParams, PrinterSeriesName, IMonitorStatus } from './types';
import { PRINTER_SERIES, PRINTER_LANGUAGE } from './constants';
export * from './discovery';
import printing from './printing';
declare const _default: {
    init({ target, seriesName, language, }: IPrinterInitParams): Promise<number>;
    instantiate({ target, seriesName, language, }: IPrinterInitParams): Promise<number>;
    connect(target: string): Promise<number>;
    disconnectPrinter(target: string): Promise<number>;
    getPaperWidth(): Promise<80 | 60 | 58>;
    getPrinterCharsPerLine(seriesName: PrinterSeriesName): Promise<{
        fontA: number;
    }>;
    pairingBluetoothPrinter(): Promise<string>;
    disconnect(): void;
    getPrinterStatus(): any;
    startMonitorPrinter(interval?: number): any;
    stopMonitorPrinter(): any;
    addPrinterStatusListener(listener: (status: IMonitorStatus) => void): () => void;
    printing: typeof printing;
};
export { getPrinterSeriesByName, PRINTER_SERIES, PRINTER_LANGUAGE };
export type { PrinerEvents, EventListenerCallback, IPrinter, PrinterSeriesName, };
export default _default;
//# sourceMappingURL=index.d.ts.map