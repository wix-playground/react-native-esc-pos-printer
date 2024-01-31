/// <reference types="node" />
import { Buffer } from 'buffer';
export declare class BufferHelper {
    buffers: Buffer[];
    size: number;
    constructor();
    get length(): number;
    concat(buffer: Buffer): BufferHelper;
    empty(): BufferHelper;
    toBuffer(): Buffer;
    toString(encoding: BufferEncoding): string;
    load(stream: any, callback: any): void;
    bytesToString(data: Uint8Array, type: 'base64' | 'hex'): string;
}
//# sourceMappingURL=BufferHelper.d.ts.map