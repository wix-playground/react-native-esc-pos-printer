"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertNativeCommands = assertNativeCommands;
var _constants = require("../constants");
function assertNativeCommands(commands, context) {
  commands.forEach(command => {
    if (typeof _constants.nativeConstants[command] !== 'number') {
      throw new Error(`Error: ${command} is not valide property value for ${context}`);
    }
  });
}
//# sourceMappingURL=assertNativeCommands.js.map