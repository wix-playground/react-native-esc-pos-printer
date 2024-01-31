"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enableLocationAccessAndroid10 = enableLocationAccessAndroid10;
exports.requestAndroidPermissions = requestAndroidPermissions;
var _reactNative = require("react-native");
const {
  EscPosPrinterDiscovery
} = _reactNative.NativeModules;
const discoveryEventEmmiter = new _reactNative.NativeEventEmitter(EscPosPrinterDiscovery);
const platformVersion = _reactNative.Platform.Version;
async function requestAndroidPermissions() {
  if (platformVersion < 23) return true;
  let permissions = [];
  if (platformVersion >= 31) {
    const permissionBluetoothScanGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    const permissionBluetoothConnectGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    if (!permissionBluetoothScanGranted) {
      permissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN);
    }
    if (!permissionBluetoothConnectGranted) {
      permissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT);
    }
  } else if (platformVersion >= 29 && platformVersion <= 30) {
    const permissionFineLocationGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (!permissionFineLocationGranted) {
      permissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    }
  } else {
    const permissionCoarseLocationGranted = await _reactNative.PermissionsAndroid.check(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    if (!permissionCoarseLocationGranted) {
      permissions.push(_reactNative.PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION);
    }
  }
  if (permissions.length > 0) {
    const status = await _reactNative.PermissionsAndroid.requestMultiple(permissions);
    console.log(permissions, status);
    return Object.keys(status).every(key => status[key] === _reactNative.PermissionsAndroid.RESULTS.GRANTED);
  }
  return true;
}
function enableLocationAccessAndroid10() {
  if (platformVersion > 28) {
    let successListener;
    let errorListener;
    function removeListeners() {
      successListener?.remove();
      errorListener?.remove();
      successListener = null;
      errorListener = null;
    }
    return new Promise((res, rej) => {
      successListener = discoveryEventEmmiter.addListener('enableLocationSettingSuccess', () => {
        removeListeners();
        res(true);
      });
      errorListener = discoveryEventEmmiter.addListener('enableLocationSettingFailure', () => {
        removeListeners();
        rej(false);
      });
      EscPosPrinterDiscovery.enableLocationSetting().then(() => {
        removeListeners();
        res(true);
      });
    });
  }
  return Promise.resolve(true);
}
//# sourceMappingURL=permissions.js.map