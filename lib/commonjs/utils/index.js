"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  BufferHelper: true,
  getPrinterSeriesByName: true,
  assertNativeCommands: true,
  getNativeCommand: true,
  getPrinterLanguage: true,
  spaceBetween: true
};
Object.defineProperty(exports, "BufferHelper", {
  enumerable: true,
  get: function () {
    return _BufferHelper.BufferHelper;
  }
});
Object.defineProperty(exports, "assertNativeCommands", {
  enumerable: true,
  get: function () {
    return _assertNativeCommands.assertNativeCommands;
  }
});
Object.defineProperty(exports, "getNativeCommand", {
  enumerable: true,
  get: function () {
    return _getNativeCommand.getNativeCommand;
  }
});
Object.defineProperty(exports, "getPrinterLanguage", {
  enumerable: true,
  get: function () {
    return _getPrinterLanguage.getPrinterLanguage;
  }
});
Object.defineProperty(exports, "getPrinterSeriesByName", {
  enumerable: true,
  get: function () {
    return _getPrinterSeriesByName.getPrinterSeriesByName;
  }
});
Object.defineProperty(exports, "spaceBetween", {
  enumerable: true,
  get: function () {
    return _spaceBetween.spaceBetween;
  }
});
var _BufferHelper = require("./BufferHelper");
var _getPrinterSeriesByName = require("./getPrinterSeriesByName");
var _validateImageSource = require("./validateImageSource");
Object.keys(_validateImageSource).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _validateImageSource[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _validateImageSource[key];
    }
  });
});
var _assertNativeCommands = require("./assertNativeCommands");
var _getNativeCommand = require("./getNativeCommand");
var _getPrinterLanguage = require("./getPrinterLanguage");
var _spaceBetween = require("./spaceBetween");
//# sourceMappingURL=index.js.map