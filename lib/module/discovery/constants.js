import { NativeModules, Platform } from 'react-native';
import { remapConstants } from '../core/utils';
const {
  EscPosPrinterDiscovery
} = NativeModules;
export const DEFAULT_DISCOVERY_TIMEOUT = 5000;
const DiscoveryModuleConstants = EscPosPrinterDiscovery.getConstants();
export let DiscoveryDeviceType = function (DiscoveryDeviceType) {
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_ALL"] = DiscoveryModuleConstants.TYPE_ALL] = "TYPE_ALL";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_PRINTER"] = DiscoveryModuleConstants.TYPE_PRINTER] = "TYPE_PRINTER";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_HYBRID_PRINTER"] = DiscoveryModuleConstants.TYPE_HYBRID_PRINTER] = "TYPE_HYBRID_PRINTER";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_DISPLAY"] = DiscoveryModuleConstants.TYPE_DISPLAY] = "TYPE_DISPLAY";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_KEYBOARD"] = DiscoveryModuleConstants.TYPE_KEYBOARD] = "TYPE_KEYBOARD";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_SCANNER"] = DiscoveryModuleConstants.TYPE_SCANNER] = "TYPE_SCANNER";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_SERIAL"] = DiscoveryModuleConstants.TYPE_SERIAL] = "TYPE_SERIAL";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_POS_KEYBOARD"] = DiscoveryModuleConstants.TYPE_POS_KEYBOARD] = "TYPE_POS_KEYBOARD";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_MSR"] = DiscoveryModuleConstants.TYPE_MSR] = "TYPE_MSR";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_GFE"] = DiscoveryModuleConstants.TYPE_GFE] = "TYPE_GFE";
  DiscoveryDeviceType[DiscoveryDeviceType["TYPE_OTHER_PERIPHERAL"] = DiscoveryModuleConstants.TYPE_OTHER_PERIPHERAL] = "TYPE_OTHER_PERIPHERAL";
  return DiscoveryDeviceType;
}({});
export let DiscoveryFilterType = function (DiscoveryFilterType) {
  DiscoveryFilterType[DiscoveryFilterType["FILTER_NAME"] = DiscoveryModuleConstants.FILTER_NAME] = "FILTER_NAME";
  DiscoveryFilterType[DiscoveryFilterType["FILTER_NONE"] = DiscoveryModuleConstants.FILTER_NONE] = "FILTER_NONE";
  return DiscoveryFilterType;
}({});
export let DiscoveryPortType = function (DiscoveryPortType) {
  DiscoveryPortType[DiscoveryPortType["PORTTYPE_ALL"] = DiscoveryModuleConstants.PORTTYPE_ALL] = "PORTTYPE_ALL";
  DiscoveryPortType[DiscoveryPortType["PORTTYPE_TCP"] = DiscoveryModuleConstants.PORTTYPE_TCP] = "PORTTYPE_TCP";
  DiscoveryPortType[DiscoveryPortType["PORTTYPE_BLUETOOTH"] = DiscoveryModuleConstants.PORTTYPE_BLUETOOTH] = "PORTTYPE_BLUETOOTH";
  DiscoveryPortType[DiscoveryPortType["PORTTYPE_USB"] = DiscoveryModuleConstants.PORTTYPE_USB] = "PORTTYPE_USB";
  DiscoveryPortType[DiscoveryPortType["PORTTYPE_BLUETOOTH_LE"] = DiscoveryModuleConstants.PORTTYPE_BLUETOOTH_LE] = "PORTTYPE_BLUETOOTH_LE";
  return DiscoveryPortType;
}({}); // iOS only
export let DiscoveryDeviceModel = function (DiscoveryDeviceModel) {
  DiscoveryDeviceModel[DiscoveryDeviceModel["MODEL_ALL"] = DiscoveryModuleConstants.MODEL_ALL] = "MODEL_ALL";
  return DiscoveryDeviceModel;
}({});
export let DiscoveryBooleanParams = function (DiscoveryBooleanParams) {
  DiscoveryBooleanParams[DiscoveryBooleanParams["TRUE"] = DiscoveryModuleConstants.TRUE] = "TRUE";
  DiscoveryBooleanParams[DiscoveryBooleanParams["FALSE"] = DiscoveryModuleConstants.FALSE] = "FALSE";
  return DiscoveryBooleanParams;
}({});
export const DiscoveryFilterOption = {
  ...DiscoveryDeviceType,
  ...DiscoveryFilterType,
  ...DiscoveryPortType,
  ...DiscoveryDeviceModel,
  ...DiscoveryBooleanParams
};
export let DiscoveryErrorResult = function (DiscoveryErrorResult) {
  DiscoveryErrorResult[DiscoveryErrorResult["ERR_PARAM"] = DiscoveryModuleConstants.ERR_PARAM] = "ERR_PARAM";
  DiscoveryErrorResult[DiscoveryErrorResult["ERR_ILLEGAL"] = DiscoveryModuleConstants.ERR_ILLEGAL] = "ERR_ILLEGAL";
  DiscoveryErrorResult[DiscoveryErrorResult["ERR_MEMORY"] = DiscoveryModuleConstants.ERR_MEMORY] = "ERR_MEMORY";
  DiscoveryErrorResult[DiscoveryErrorResult["ERR_FAILURE"] = DiscoveryModuleConstants.ERR_FAILURE] = "ERR_FAILURE";
  DiscoveryErrorResult[DiscoveryErrorResult["ERR_PROCESSING"] = DiscoveryModuleConstants.ERR_PROCESSING] = "ERR_PROCESSING";
  DiscoveryErrorResult[DiscoveryErrorResult["PERMISSION_ERROR"] = -2] = "PERMISSION_ERROR";
  return DiscoveryErrorResult;
}({});
export const DiscoveryErrorMessageMapping = {
  [DiscoveryErrorResult.ERR_PARAM]: 'An invalid parameter was passed.',
  [DiscoveryErrorResult.ERR_ILLEGAL]: 'Tried to start search when search had been already done.' + (Platform.OS === 'android' ? '\nBluetooth is OFF\nThere is no permission for the position information' : ''),
  [DiscoveryErrorResult.ERR_MEMORY]: 'Memory necessary for processing could not be allo- cated.',
  [DiscoveryErrorResult.ERR_FAILURE]: 'An unknown error occurred.',
  [DiscoveryErrorResult.ERR_PROCESSING]: 'Could not run the process.',
  [DiscoveryErrorResult.PERMISSION_ERROR]: 'Permission error'
};
export const DiscoveryErrorStatusMapping = remapConstants(DiscoveryErrorResult);
export const DiscoveryDeviceTypeMapping = remapConstants(DiscoveryDeviceType);
//# sourceMappingURL=constants.js.map