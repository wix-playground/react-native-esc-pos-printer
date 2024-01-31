import { NativeModules, NativeEventEmitter, Image, Platform } from 'react-native';
import { PRINTING_ALIGNMENT, PRINTING_COMMANDS, EPOS_BOOLEANS, BARCODE_TYPE, BARCODE_HRI, QRCODE_LEVEL, QRCODE_TYPE, PRINT_TIMEOUT_MIN, PRINT_TIMEOUT_MAX } from './constants';
import { BufferHelper, assertImageSource, assertNativeCommands, getNativeCommand, spaceBetween } from './utils';
const {
  EscPosPrinter,
  ThePrinterWrapper
} = NativeModules;
const printEventEmmiter = new NativeEventEmitter(EscPosPrinter);
/**
 * Create an array of commands to send to the printer
 */
class Printing {
  /**
   * Create a new object
   *
   */
  constructor() {
    this._buffer = [];
    this._state = {
      bold: false,
      underline: false,
      smooth: false
    };
    this._currentFontWidth = 1;
  }

  /**
   * Reset the state of the object
   *
   */
  _reset() {
    this._buffer = [];
    this._state = {
      bold: false,
      underline: false,
      smooth: false
    };
  }

  /**
   * Send the current array of commands to the printer
   *
   * @param  {string}   value  String to encode
   * @param  {IPrintParams} params Print params (e.g. timeout)
   * @return {object}          Encoded string as a ArrayBuffer
   *
   */
  _send(value, params) {
    let successListener;
    let errorListener;
    function removeListeners() {
      successListener?.remove();
      errorListener?.remove();
      successListener = null;
      errorListener = null;
    }
    return new Promise((res, rej) => {
      successListener = printEventEmmiter.addListener('onPrintSuccess', status => {
        removeListeners();
        res(status);
      });
      errorListener = printEventEmmiter.addListener('onPrintFailure', status => {
        removeListeners();
        rej(status);
      });
      if (params?.target) {
        ThePrinterWrapper.printBuffer(value, params.target, params).then(data => {
          removeListeners();
          res(data);
        }).catch(e => {
          removeListeners();
          rej(e);
        });
      } else {
        EscPosPrinter.printBuffer(value, params).catch(e => {
          removeListeners();
          rej(e);
        });
      }
    });
  }

  /**
   * Add a command to the buffer
   *
   * @param  {array}   value  Array containing the command to call and parameters
   *
   */
  _queue(value) {
    this._buffer.push(value);
  }

  /**
   * Initialize the printer
   *
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  initialize() {
    this._reset();
    return this;
  }

  /**
   * Print text
   *
   * @param  {string}   value  Text that needs to be printed
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  text(value) {
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_TEXT, [value]]);
    return this;
  }

  /**
   * Print line with right and left text
   *
   * @param  {string}   charsPerLine  Amount of characters in the line for font width 1
   * @param  {number}   params   ISpaceBetweenParams
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  textLine(charsPerLine, params) {
    const text = spaceBetween(Math.ceil(charsPerLine / this._currentFontWidth), params);
    // console.log('text', text, text.length);
    return this.text(text);
  }

  /**
   * Print a newline
   *
   * @param {number}   value   Number of lines to add
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  newline(value) {
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_NEW_LINE, [value || 1]]);
    return this;
  }

  /**
   * Print text, followed by a newline
   *
   * @param  {string}   value  Text that needs to be printed
   * @return {object}          Return the object, for easy chaining commands
   *
   */
  line(value) {
    this.text(value);
    this.newline();
    return this;
  }

  /**
   * Underline text
   *
   * @param  {boolean}   value  true to turn on underline, false to turn off, or 2 for double underline
   * @return {object}           Return the object, for easy chaining commands
   *
   */
  underline(value) {
    if (typeof value === 'undefined') {
      value = !this._state.underline;
    }
    this._state.underline = value;
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_TEXT_STYLE, [this._convertToEposBool(this._state.underline), this._convertToEposBool(this._state.bold)]]);
    return this;
  }

  /**
   * Convert To Esc Pos Bool
   *
   * @param value boolean value to change
   * @returns The equivalent esc pos boolean
   */
  _convertToEposBool(value) {
    const res = value ? EPOS_BOOLEANS.EPOS2_TRUE : EPOS_BOOLEANS.EPOS2_FALSE;
    return res;
  }

  /**
   * Bold text
   *
   * @param  {boolean}          value  true to turn on bold, false to turn off bold
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  bold(value) {
    if (typeof value === 'undefined') {
      value = !this._state.bold;
    }
    this._state.bold = value;
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_TEXT_STYLE, [this._convertToEposBool(this._state.underline), this._convertToEposBool(this._state.bold)]]);
    return this;
  }

  /**
   * Smooth text
   *
   * @param  {boolean}          value  true to turn on smooth, false to turn off smooth
   * @return {object}                  Return the object, for easy chaining commands
   *
   */
  smooth(value) {
    if (typeof value === 'undefined') {
      value = !this._state.smooth;
    }
    this._state.smooth = value;
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_TEXT_SMOOTH, [this._convertToEposBool(this._state.smooth)]]);
    return this;
  }

  /**
   * Change text size
   *
   * @param  {number} height Specifies the vertical scaling factor rate
   * @param  {number} width Specifies the horizontal scaling factor rate
   * @return {object} Return the object, for easy chaining commands
   *
   */
  size(height, width) {
    if (typeof width === 'undefined') {
      width = height;
    }
    this._currentFontWidth = width;
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_TEXT_SIZE, [height || 1, width || 1]]);
    return this;
  }

  /**
   * Change text alignment
   *
   * @param  {string} value left, center or right
   * @return {object} Return the object, for easy chaining commands
   *
   */
  align(value) {
    if (!['left', 'center', 'right'].includes(value)) {
      throw new Error('Unknown alignment');
    }
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_ALIGN, [PRINTING_ALIGNMENT[value]]]);
    return this;
  }
  image(imageSource, {
    width,
    color = 'EPOS2_COLOR_1',
    mode = 'EPOS2_MODE_MONO',
    halftone = 'EPOS2_HALFTONE_DITHER',
    brightness = 1
  }) {
    assertNativeCommands([color, mode, halftone], 'image');
    assertImageSource(imageSource);
    if (width < 1 || width > 65535) {
      throw new Error('The width of image should be from 1 to 65535');
    }
    if (brightness < 0.1 || brightness > 10) {
      throw new Error('The brightness of image should be from 0.1 to 10');
    }
    const image = Image.resolveAssetSource(imageSource);
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_IMAGE, [image, width, getNativeCommand(color), getNativeCommand(mode), getNativeCommand(halftone), brightness]]);
    return this;
  }

  /**
   * Image
   *
   * @param {string} image base64encoded image string
   * @param {number} width Width of the image 1 to 65535
   * @returns
   */
  imageBase64(image, width) {
    console.warn('imageBase64 is depricated and will be removed after release 2+. Use .image() instead');
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_IMAGE_BASE_64, [image, width]]);
    return this;
  }

  /**
   * Image
   *
   * @param {string} image image asset name string
   * @returns
   */
  imageAsset(image, width) {
    console.warn('imageAsset is depricated and will be removed after release 2+. Use .image() instead');
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_IMAGE_ASSET, [image, width]]);
    return this;
  }

  /**
   * Barcode
   *
   * @param {string} value specifies barcode data as a text string.
   * @param {string} type specifies the barcode type.
   * @param {number} width specifies the width of a single module in dots.(2-6)
   * @param {number} height specifies the height of the barcode in dots.(1-255)
   * @param {string} hri specifies the human-robot interaction position.
   * @returns
   */
  barcode({
    value,
    type = 'EPOS2_BARCODE_CODE93',
    hri = 'EPOS2_HRI_BELOW',
    width = 2,
    height = 50
  }) {
    if (!(typeof BARCODE_TYPE[type] === 'number')) {
      throw new Error('Unknown barcode type');
    }
    if (!(typeof BARCODE_TYPE[type] === 'number')) {
      throw new Error('Unknown setting of HRI');
    }
    if (width < 2 || width > 6) {
      console.warn('The width of barcode is form 2 to 6');
      width = 2;
    }
    if (height < 1 || height > 255) {
      console.warn('The height of barcode is form 1 to 255');
      height = 50;
    }
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_BARCODE, [value, BARCODE_TYPE[type], BARCODE_HRI[hri], width, height]]);
    return this;
  }

  /**
   * QR Code
   *
   * @param {string} value specifies QR Code data as a text string.
   * @param {string} level specifies the error correction level.
   * @param {number} width Width of the image 3 to 16.
   * @returns
   */
  qrcode({
    value,
    width,
    type = 'EPOS2_SYMBOL_QRCODE_MODEL_2',
    level = 'EPOS2_LEVEL_M'
  }) {
    if (!(typeof QRCODE_TYPE[type] === 'number')) {
      if (Platform.OS === 'ios' && type === 'EPOS2_SYMBOL_QRCODE_MICRO') {
        throw new Error('QRCODE_MICRO is not supported on iOS');
      } else {
        throw new Error('Unknown type of QR Code');
      }
    }
    if (!(typeof QRCODE_LEVEL[level] === 'number')) {
      throw new Error('Unknown error correction level of QR Code');
    }
    if (width < 3 || width > 16) {
      console.warn('The width of qrcode is form 3 to 16');
      width = 3;
    }
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_QRCODE, [value, QRCODE_TYPE[type], QRCODE_LEVEL[level], width]]);
    return this;
  }

  /**
   * Cut paper
   *
   * @return {object} Return the object, for easy chaining commands
   *
   */
  cut() {
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_CUT, []]);
    return this;
  }

  /**
   * Cut paper
   *
   * @return {object} Return the object, for easy chaining commands
   *
   */
  data(uint8Array) {
    const buffer = new BufferHelper();
    const base64String = buffer.bytesToString(uint8Array, 'base64');
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_DATA, [base64String]]);
    return this;
  }

  /**
   * Add pulse
   *
   * @param {string} pinNumber
   * @return {object} Return the object, for easy chaining commands
   *
   */
  addPulse(drawerKickConnector = 'EPOS2_DRAWER_2PIN') {
    assertNativeCommands([drawerKickConnector], 'addPulse');
    this._queue([PRINTING_COMMANDS.COMMAND_ADD_PULSE, [getNativeCommand(drawerKickConnector)]]);
    return this;
  }
  send(params) {
    const timeout = params?.timeout;
    if (timeout) {
      if (!Number.isInteger(timeout) || timeout < PRINT_TIMEOUT_MIN || timeout > PRINT_TIMEOUT_MAX) {
        throw new Error(`Timeout should be an integer from ${PRINT_TIMEOUT_MIN} to ${PRINT_TIMEOUT_MAX}`);
      }
    }
    return this._send(this._buffer, params);
  }
}
export default Printing;
//# sourceMappingURL=printing.js.map