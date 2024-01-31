import type { IMonitorStatus, ImageSource, BarcodeParams, QRCodeParams, ImagePrintParams, DrawerKickConnector, IPrintParams, ISpaceBetweenParams } from './types';
type TCommandValue = [string, any[]];
type TScalingFactors = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
/**
 * Create an array of commands to send to the printer
 */
declare class Printing {
    private _buffer;
    private _state;
    private _currentFontWidth;
    /**
     * Create a new object
     *
     */
    constructor();
    /**
     * Reset the state of the object
     *
     */
    _reset(): void;
    /**
     * Send the current array of commands to the printer
     *
     * @param  {string}   value  String to encode
     * @param  {IPrintParams} params Print params (e.g. timeout)
     * @return {object}          Encoded string as a ArrayBuffer
     *
     */
    _send(value: any, params?: IPrintParams): Promise<IMonitorStatus>;
    /**
     * Add a command to the buffer
     *
     * @param  {array}   value  Array containing the command to call and parameters
     *
     */
    _queue(value: TCommandValue): void;
    /**
     * Initialize the printer
     *
     * @return {object}          Return the object, for easy chaining commands
     *
     */
    initialize(): this;
    /**
     * Print text
     *
     * @param  {string}   value  Text that needs to be printed
     * @return {object}          Return the object, for easy chaining commands
     *
     */
    text(value: string): this;
    /**
     * Print line with right and left text
     *
     * @param  {string}   charsPerLine  Amount of characters in the line for font width 1
     * @param  {number}   params   ISpaceBetweenParams
     * @return {object}          Return the object, for easy chaining commands
     *
     */
    textLine(charsPerLine: number, params: ISpaceBetweenParams): this;
    /**
     * Print a newline
     *
     * @param {number}   value   Number of lines to add
     * @return {object}          Return the object, for easy chaining commands
     *
     */
    newline(value?: number): this;
    /**
     * Print text, followed by a newline
     *
     * @param  {string}   value  Text that needs to be printed
     * @return {object}          Return the object, for easy chaining commands
     *
     */
    line(value: string): this;
    /**
     * Underline text
     *
     * @param  {boolean}   value  true to turn on underline, false to turn off, or 2 for double underline
     * @return {object}           Return the object, for easy chaining commands
     *
     */
    underline(value?: boolean): this;
    /**
     * Convert To Esc Pos Bool
     *
     * @param value boolean value to change
     * @returns The equivalent esc pos boolean
     */
    _convertToEposBool(value: boolean): any;
    /**
     * Bold text
     *
     * @param  {boolean}          value  true to turn on bold, false to turn off bold
     * @return {object}                  Return the object, for easy chaining commands
     *
     */
    bold(value?: boolean): this;
    /**
     * Smooth text
     *
     * @param  {boolean}          value  true to turn on smooth, false to turn off smooth
     * @return {object}                  Return the object, for easy chaining commands
     *
     */
    smooth(value?: boolean): this;
    /**
     * Change text size
     *
     * @param  {number} height Specifies the vertical scaling factor rate
     * @param  {number} width Specifies the horizontal scaling factor rate
     * @return {object} Return the object, for easy chaining commands
     *
     */
    size(height: TScalingFactors, width?: TScalingFactors): this;
    /**
     * Change text alignment
     *
     * @param  {string} value left, center or right
     * @return {object} Return the object, for easy chaining commands
     *
     */
    align(value: 'left' | 'center' | 'right'): this;
    image(imageSource: ImageSource, { width, color, mode, halftone, brightness, }: ImagePrintParams): this;
    /**
     * Image
     *
     * @param {string} image base64encoded image string
     * @param {number} width Width of the image 1 to 65535
     * @returns
     */
    imageBase64(image: string, width: number): this;
    /**
     * Image
     *
     * @param {string} image image asset name string
     * @returns
     */
    imageAsset(image: string, width?: number): this;
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
    barcode({ value, type, hri, width, height, }: BarcodeParams): this;
    /**
     * QR Code
     *
     * @param {string} value specifies QR Code data as a text string.
     * @param {string} level specifies the error correction level.
     * @param {number} width Width of the image 3 to 16.
     * @returns
     */
    qrcode({ value, width, type, level, }: QRCodeParams): this;
    /**
     * Cut paper
     *
     * @return {object} Return the object, for easy chaining commands
     *
     */
    cut(): this;
    /**
     * Cut paper
     *
     * @return {object} Return the object, for easy chaining commands
     *
     */
    data(uint8Array: Uint8Array): this;
    /**
     * Add pulse
     *
     * @param {string} pinNumber
     * @return {object} Return the object, for easy chaining commands
     *
     */
    addPulse(drawerKickConnector?: DrawerKickConnector): this;
    send(params?: IPrintParams): Promise<IMonitorStatus>;
}
export default Printing;
//# sourceMappingURL=printing.d.ts.map