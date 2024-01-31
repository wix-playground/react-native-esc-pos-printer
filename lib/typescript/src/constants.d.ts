import type { PrinterSeriesName, PrinterLanguage, BarcodeType, BarcodeHRI, QRCodeLevel, QRCodeType, EposColor, EposMode, EposHalftone, DrawerKickConnector } from './types';
export declare const nativeConstants: any;
export declare const PRINTING_COMMANDS: {
    COMMAND_ADD_TEXT: any;
    COMMAND_ADD_NEW_LINE: any;
    COMMAND_ADD_TEXT_STYLE: any;
    COMMAND_ADD_TEXT_SIZE: any;
    COMMAND_ADD_TEXT_SMOOTH: any;
    COMMAND_ADD_ALIGN: any;
    COMMAND_ADD_IMAGE: any;
    COMMAND_ADD_IMAGE_BASE_64: any;
    COMMAND_ADD_IMAGE_ASSET: any;
    COMMAND_ADD_BARCODE: any;
    COMMAND_ADD_QRCODE: any;
    COMMAND_ADD_CUT: any;
    COMMAND_ADD_DATA: any;
    COMMAND_ADD_PULSE: any;
};
export declare const EPOS_BOOLEANS: {
    EPOS2_TRUE: any;
    EPOS2_FALSE: any;
};
export declare const PRINTING_ALIGNMENT: {
    left: any;
    right: any;
    center: any;
};
export declare const PRINTER_SERIES: {
    [key in PrinterSeriesName]: number;
};
export declare const FONT_A_CHARS_PER_LINE: Partial<{
    [key in PrinterSeriesName]: {
        58?: number;
        60?: number;
        80?: number;
    };
}>;
export declare const DEFAULT_FONT_A_CHARS_PER_LINE: {
    80: number;
    58: number;
    60: number;
};
export declare const DEFAULT_PAPER_WIDTH = 60;
export declare const PRINTER_LANGUAGE: {
    [key in PrinterLanguage]: number;
};
export declare const BARCODE_TYPE: {
    [key in BarcodeType]: number;
};
export declare const BARCODE_HRI: {
    [key in BarcodeHRI]: number;
};
export declare const QRCODE_TYPE: {
    [key in QRCodeType]: number;
};
export declare const QRCODE_LEVEL: {
    [key in QRCodeLevel]: number;
};
export declare const EPOS_COLOR: {
    [key in EposColor]: number;
};
export declare const EPOS_MODE: {
    [key in EposMode]: number;
};
export declare const EPOS_HALFTONE: {
    [key in EposHalftone]: number;
};
export declare const EPOS_DRAWER_KICK_CONNECTOR: {
    [key in DrawerKickConnector]: number;
};
export declare const PRINT_TIMEOUT_MIN = 5000;
export declare const PRINT_TIMEOUT_MAX = 600000;
//# sourceMappingURL=constants.d.ts.map