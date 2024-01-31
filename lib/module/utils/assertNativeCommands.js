import { nativeConstants } from '../constants';
export function assertNativeCommands(commands, context) {
  commands.forEach(command => {
    if (typeof nativeConstants[command] !== 'number') {
      throw new Error(`Error: ${command} is not valide property value for ${context}`);
    }
  });
}
//# sourceMappingURL=assertNativeCommands.js.map