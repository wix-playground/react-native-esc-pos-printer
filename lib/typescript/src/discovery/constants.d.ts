export declare const DEFAULT_DISCOVERY_TIMEOUT = 5000;
export declare enum DiscoveryDeviceType {
    TYPE_ALL,
    TYPE_PRINTER,
    TYPE_HYBRID_PRINTER,
    TYPE_DISPLAY,
    TYPE_KEYBOARD,
    TYPE_SCANNER,
    TYPE_SERIAL,
    TYPE_POS_KEYBOARD,
    TYPE_MSR,
    TYPE_GFE,
    TYPE_OTHER_PERIPHERAL
}
export declare enum DiscoveryFilterType {
    FILTER_NAME,
    FILTER_NONE
}
export declare enum DiscoveryPortType {
    PORTTYPE_ALL,
    PORTTYPE_TCP,
    PORTTYPE_BLUETOOTH,
    PORTTYPE_USB,
    PORTTYPE_BLUETOOTH_LE
}
export declare enum DiscoveryDeviceModel {
    MODEL_ALL
}
export declare enum DiscoveryBooleanParams {
    TRUE,
    FALSE
}
export declare const DiscoveryFilterOption: {
    readonly [x: number]: string;
    readonly TRUE: DiscoveryBooleanParams.TRUE;
    readonly FALSE: DiscoveryBooleanParams.FALSE;
    readonly MODEL_ALL: DiscoveryDeviceModel.MODEL_ALL;
    readonly PORTTYPE_ALL: DiscoveryPortType.PORTTYPE_ALL;
    readonly PORTTYPE_TCP: DiscoveryPortType.PORTTYPE_TCP;
    readonly PORTTYPE_BLUETOOTH: DiscoveryPortType.PORTTYPE_BLUETOOTH;
    readonly PORTTYPE_USB: DiscoveryPortType.PORTTYPE_USB;
    readonly PORTTYPE_BLUETOOTH_LE: DiscoveryPortType.PORTTYPE_BLUETOOTH_LE;
    readonly FILTER_NAME: DiscoveryFilterType.FILTER_NAME;
    readonly FILTER_NONE: DiscoveryFilterType.FILTER_NONE;
    readonly TYPE_ALL: DiscoveryDeviceType.TYPE_ALL;
    readonly TYPE_PRINTER: DiscoveryDeviceType.TYPE_PRINTER;
    readonly TYPE_HYBRID_PRINTER: DiscoveryDeviceType.TYPE_HYBRID_PRINTER;
    readonly TYPE_DISPLAY: DiscoveryDeviceType.TYPE_DISPLAY;
    readonly TYPE_KEYBOARD: DiscoveryDeviceType.TYPE_KEYBOARD;
    readonly TYPE_SCANNER: DiscoveryDeviceType.TYPE_SCANNER;
    readonly TYPE_SERIAL: DiscoveryDeviceType.TYPE_SERIAL;
    readonly TYPE_POS_KEYBOARD: DiscoveryDeviceType.TYPE_POS_KEYBOARD;
    readonly TYPE_MSR: DiscoveryDeviceType.TYPE_MSR;
    readonly TYPE_GFE: DiscoveryDeviceType.TYPE_GFE;
    readonly TYPE_OTHER_PERIPHERAL: DiscoveryDeviceType.TYPE_OTHER_PERIPHERAL;
};
export declare enum DiscoveryErrorResult {
    ERR_PARAM,
    ERR_ILLEGAL,
    ERR_MEMORY,
    ERR_FAILURE,
    ERR_PROCESSING,
    PERMISSION_ERROR = -2
}
export declare const DiscoveryErrorMessageMapping: {
    [x: number]: string;
    [-2]: string;
};
export declare const DiscoveryErrorStatusMapping: Record<string, "ERR_PARAM" | "ERR_ILLEGAL" | "ERR_MEMORY" | "ERR_FAILURE" | "ERR_PROCESSING" | "PERMISSION_ERROR">;
export declare const DiscoveryDeviceTypeMapping: Record<string, "TYPE_ALL" | "TYPE_PRINTER" | "TYPE_HYBRID_PRINTER" | "TYPE_DISPLAY" | "TYPE_KEYBOARD" | "TYPE_SCANNER" | "TYPE_SERIAL" | "TYPE_POS_KEYBOARD" | "TYPE_MSR" | "TYPE_GFE" | "TYPE_OTHER_PERIPHERAL">;
//# sourceMappingURL=constants.d.ts.map