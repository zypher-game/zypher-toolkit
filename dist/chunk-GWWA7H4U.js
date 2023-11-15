"use client";
import {
  require_cjs,
  require_cjs2,
  require_decode_uri_component,
  require_detect_browser,
  require_filter_obj,
  require_split_on_first,
  require_strict_uri_encode,
  require_tslib
} from "./chunk-RAEXENFV.js";
import {
  __commonJS,
  __esm,
  __export,
  __require,
  __toCommonJS
} from "./chunk-O3ZY5NC2.js";

// node_modules/@stablelib/int/lib/int.js
var require_int = __commonJS({
  "node_modules/@stablelib/int/lib/int.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function imulShim(a, b) {
      var ah = a >>> 16 & 65535, al = a & 65535;
      var bh = b >>> 16 & 65535, bl = b & 65535;
      return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
    }
    exports.mul = Math.imul || imulShim;
    function add(a, b) {
      return a + b | 0;
    }
    exports.add = add;
    function sub(a, b) {
      return a - b | 0;
    }
    exports.sub = sub;
    function rotl(x, n) {
      return x << n | x >>> 32 - n;
    }
    exports.rotl = rotl;
    function rotr(x, n) {
      return x << 32 - n | x >>> n;
    }
    exports.rotr = rotr;
    function isIntegerShim(n) {
      return typeof n === "number" && isFinite(n) && Math.floor(n) === n;
    }
    exports.isInteger = Number.isInteger || isIntegerShim;
    exports.MAX_SAFE_INTEGER = 9007199254740991;
    exports.isSafeInteger = function(n) {
      return exports.isInteger(n) && (n >= -exports.MAX_SAFE_INTEGER && n <= exports.MAX_SAFE_INTEGER);
    };
  }
});

// node_modules/@stablelib/binary/lib/binary.js
var require_binary = __commonJS({
  "node_modules/@stablelib/binary/lib/binary.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var int_1 = require_int();
    function readInt16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) << 16 >> 16;
    }
    exports.readInt16BE = readInt16BE;
    function readUint16BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 0] << 8 | array[offset + 1]) >>> 0;
    }
    exports.readUint16BE = readUint16BE;
    function readInt16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) << 16 >> 16;
    }
    exports.readInt16LE = readInt16LE;
    function readUint16LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint16LE = readUint16LE;
    function writeUint16BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 8;
      out[offset + 1] = value >>> 0;
      return out;
    }
    exports.writeUint16BE = writeUint16BE;
    exports.writeInt16BE = writeUint16BE;
    function writeUint16LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(2);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      return out;
    }
    exports.writeUint16LE = writeUint16LE;
    exports.writeInt16LE = writeUint16LE;
    function readInt32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3];
    }
    exports.readInt32BE = readInt32BE;
    function readUint32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset] << 24 | array[offset + 1] << 16 | array[offset + 2] << 8 | array[offset + 3]) >>> 0;
    }
    exports.readUint32BE = readUint32BE;
    function readInt32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset];
    }
    exports.readInt32LE = readInt32LE;
    function readUint32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      return (array[offset + 3] << 24 | array[offset + 2] << 16 | array[offset + 1] << 8 | array[offset]) >>> 0;
    }
    exports.readUint32LE = readUint32LE;
    function writeUint32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 24;
      out[offset + 1] = value >>> 16;
      out[offset + 2] = value >>> 8;
      out[offset + 3] = value >>> 0;
      return out;
    }
    exports.writeUint32BE = writeUint32BE;
    exports.writeInt32BE = writeUint32BE;
    function writeUint32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      out[offset + 0] = value >>> 0;
      out[offset + 1] = value >>> 8;
      out[offset + 2] = value >>> 16;
      out[offset + 3] = value >>> 24;
      return out;
    }
    exports.writeUint32LE = writeUint32LE;
    exports.writeInt32LE = writeUint32LE;
    function readInt64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readInt32BE(array, offset);
      var lo = readInt32BE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64BE = readInt64BE;
    function readUint64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var hi = readUint32BE(array, offset);
      var lo = readUint32BE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64BE = readUint64BE;
    function readInt64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readInt32LE(array, offset);
      var hi = readInt32LE(array, offset + 4);
      return hi * 4294967296 + lo - (lo >> 31) * 4294967296;
    }
    exports.readInt64LE = readInt64LE;
    function readUint64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var lo = readUint32LE(array, offset);
      var hi = readUint32LE(array, offset + 4);
      return hi * 4294967296 + lo;
    }
    exports.readUint64LE = readUint64LE;
    function writeUint64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32BE(value / 4294967296 >>> 0, out, offset);
      writeUint32BE(value >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64BE = writeUint64BE;
    exports.writeInt64BE = writeUint64BE;
    function writeUint64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      writeUint32LE(value >>> 0, out, offset);
      writeUint32LE(value / 4294967296 >>> 0, out, offset + 4);
      return out;
    }
    exports.writeUint64LE = writeUint64LE;
    exports.writeInt64LE = writeUint64LE;
    function readUintBE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintBE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintBE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintBE = readUintBE;
    function readUintLE(bitLength, array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("readUintLE supports only bitLengths divisible by 8");
      }
      if (bitLength / 8 > array.length - offset) {
        throw new Error("readUintLE: array is too short for the given bitLength");
      }
      var result = 0;
      var mul = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        result += array[i] * mul;
        mul *= 256;
      }
      return result;
    }
    exports.readUintLE = readUintLE;
    function writeUintBE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintBE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintBE value must be an integer");
      }
      var div = 1;
      for (var i = bitLength / 8 + offset - 1; i >= offset; i--) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintBE = writeUintBE;
    function writeUintLE(bitLength, value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(bitLength / 8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      if (bitLength % 8 !== 0) {
        throw new Error("writeUintLE supports only bitLengths divisible by 8");
      }
      if (!int_1.isSafeInteger(value)) {
        throw new Error("writeUintLE value must be an integer");
      }
      var div = 1;
      for (var i = offset; i < offset + bitLength / 8; i++) {
        out[i] = value / div & 255;
        div *= 256;
      }
      return out;
    }
    exports.writeUintLE = writeUintLE;
    function readFloat32BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset);
    }
    exports.readFloat32BE = readFloat32BE;
    function readFloat32LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat32(offset, true);
    }
    exports.readFloat32LE = readFloat32LE;
    function readFloat64BE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset);
    }
    exports.readFloat64BE = readFloat64BE;
    function readFloat64LE(array, offset) {
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(array.buffer, array.byteOffset, array.byteLength);
      return view.getFloat64(offset, true);
    }
    exports.readFloat64LE = readFloat64LE;
    function writeFloat32BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value);
      return out;
    }
    exports.writeFloat32BE = writeFloat32BE;
    function writeFloat32LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(4);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat32(offset, value, true);
      return out;
    }
    exports.writeFloat32LE = writeFloat32LE;
    function writeFloat64BE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value);
      return out;
    }
    exports.writeFloat64BE = writeFloat64BE;
    function writeFloat64LE(value, out, offset) {
      if (out === void 0) {
        out = new Uint8Array(8);
      }
      if (offset === void 0) {
        offset = 0;
      }
      var view = new DataView(out.buffer, out.byteOffset, out.byteLength);
      view.setFloat64(offset, value, true);
      return out;
    }
    exports.writeFloat64LE = writeFloat64LE;
  }
});

// node_modules/@stablelib/wipe/lib/wipe.js
var require_wipe = __commonJS({
  "node_modules/@stablelib/wipe/lib/wipe.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function wipe(array) {
      for (var i = 0; i < array.length; i++) {
        array[i] = 0;
      }
      return array;
    }
    exports.wipe = wipe;
  }
});

// node_modules/@stablelib/chacha/lib/chacha.js
var require_chacha = __commonJS({
  "node_modules/@stablelib/chacha/lib/chacha.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    var ROUNDS = 20;
    function core(out, input, key) {
      var j0 = 1634760805;
      var j1 = 857760878;
      var j2 = 2036477234;
      var j3 = 1797285236;
      var j4 = key[3] << 24 | key[2] << 16 | key[1] << 8 | key[0];
      var j5 = key[7] << 24 | key[6] << 16 | key[5] << 8 | key[4];
      var j6 = key[11] << 24 | key[10] << 16 | key[9] << 8 | key[8];
      var j7 = key[15] << 24 | key[14] << 16 | key[13] << 8 | key[12];
      var j8 = key[19] << 24 | key[18] << 16 | key[17] << 8 | key[16];
      var j9 = key[23] << 24 | key[22] << 16 | key[21] << 8 | key[20];
      var j10 = key[27] << 24 | key[26] << 16 | key[25] << 8 | key[24];
      var j11 = key[31] << 24 | key[30] << 16 | key[29] << 8 | key[28];
      var j12 = input[3] << 24 | input[2] << 16 | input[1] << 8 | input[0];
      var j13 = input[7] << 24 | input[6] << 16 | input[5] << 8 | input[4];
      var j14 = input[11] << 24 | input[10] << 16 | input[9] << 8 | input[8];
      var j15 = input[15] << 24 | input[14] << 16 | input[13] << 8 | input[12];
      var x0 = j0;
      var x1 = j1;
      var x2 = j2;
      var x3 = j3;
      var x4 = j4;
      var x5 = j5;
      var x6 = j6;
      var x7 = j7;
      var x8 = j8;
      var x9 = j9;
      var x10 = j10;
      var x11 = j11;
      var x12 = j12;
      var x13 = j13;
      var x14 = j14;
      var x15 = j15;
      for (var i = 0; i < ROUNDS; i += 2) {
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 32 - 12 | x4 << 12;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x2 = x2 + x6 | 0;
        x14 ^= x2;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x10 = x10 + x14 | 0;
        x6 ^= x10;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x3 = x3 + x7 | 0;
        x15 ^= x3;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x11 = x11 + x15 | 0;
        x7 ^= x11;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x1 = x1 + x5 | 0;
        x13 ^= x1;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x9 = x9 + x13 | 0;
        x5 ^= x9;
        x5 = x5 >>> 32 - 7 | x5 << 7;
        x0 = x0 + x4 | 0;
        x12 ^= x0;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x8 = x8 + x12 | 0;
        x4 ^= x8;
        x4 = x4 >>> 32 - 7 | x4 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 32 - 16 | x15 << 16;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 12 | x5 << 12;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 16 | x12 << 16;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 12 | x6 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 32 - 16 | x13 << 16;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 12 | x7 << 12;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 32 - 16 | x14 << 16;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 32 - 12 | x4 << 12;
        x2 = x2 + x7 | 0;
        x13 ^= x2;
        x13 = x13 >>> 32 - 8 | x13 << 8;
        x8 = x8 + x13 | 0;
        x7 ^= x8;
        x7 = x7 >>> 32 - 7 | x7 << 7;
        x3 = x3 + x4 | 0;
        x14 ^= x3;
        x14 = x14 >>> 32 - 8 | x14 << 8;
        x9 = x9 + x14 | 0;
        x4 ^= x9;
        x4 = x4 >>> 32 - 7 | x4 << 7;
        x1 = x1 + x6 | 0;
        x12 ^= x1;
        x12 = x12 >>> 32 - 8 | x12 << 8;
        x11 = x11 + x12 | 0;
        x6 ^= x11;
        x6 = x6 >>> 32 - 7 | x6 << 7;
        x0 = x0 + x5 | 0;
        x15 ^= x0;
        x15 = x15 >>> 32 - 8 | x15 << 8;
        x10 = x10 + x15 | 0;
        x5 ^= x10;
        x5 = x5 >>> 32 - 7 | x5 << 7;
      }
      binary_1.writeUint32LE(x0 + j0 | 0, out, 0);
      binary_1.writeUint32LE(x1 + j1 | 0, out, 4);
      binary_1.writeUint32LE(x2 + j2 | 0, out, 8);
      binary_1.writeUint32LE(x3 + j3 | 0, out, 12);
      binary_1.writeUint32LE(x4 + j4 | 0, out, 16);
      binary_1.writeUint32LE(x5 + j5 | 0, out, 20);
      binary_1.writeUint32LE(x6 + j6 | 0, out, 24);
      binary_1.writeUint32LE(x7 + j7 | 0, out, 28);
      binary_1.writeUint32LE(x8 + j8 | 0, out, 32);
      binary_1.writeUint32LE(x9 + j9 | 0, out, 36);
      binary_1.writeUint32LE(x10 + j10 | 0, out, 40);
      binary_1.writeUint32LE(x11 + j11 | 0, out, 44);
      binary_1.writeUint32LE(x12 + j12 | 0, out, 48);
      binary_1.writeUint32LE(x13 + j13 | 0, out, 52);
      binary_1.writeUint32LE(x14 + j14 | 0, out, 56);
      binary_1.writeUint32LE(x15 + j15 | 0, out, 60);
    }
    function streamXOR(key, nonce, src2, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      if (key.length !== 32) {
        throw new Error("ChaCha: key size must be 32 bytes");
      }
      if (dst.length < src2.length) {
        throw new Error("ChaCha: destination is shorter than source");
      }
      var nc;
      var counterLength;
      if (nonceInplaceCounterLength === 0) {
        if (nonce.length !== 8 && nonce.length !== 12) {
          throw new Error("ChaCha nonce must be 8 or 12 bytes");
        }
        nc = new Uint8Array(16);
        counterLength = nc.length - nonce.length;
        nc.set(nonce, counterLength);
      } else {
        if (nonce.length !== 16) {
          throw new Error("ChaCha nonce with counter must be 16 bytes");
        }
        nc = nonce;
        counterLength = nonceInplaceCounterLength;
      }
      var block = new Uint8Array(64);
      for (var i = 0; i < src2.length; i += 64) {
        core(block, nc, key);
        for (var j = i; j < i + 64 && j < src2.length; j++) {
          dst[j] = src2[j] ^ block[j - i];
        }
        incrementCounter(nc, 0, counterLength);
      }
      wipe_1.wipe(block);
      if (nonceInplaceCounterLength === 0) {
        wipe_1.wipe(nc);
      }
      return dst;
    }
    exports.streamXOR = streamXOR;
    function stream(key, nonce, dst, nonceInplaceCounterLength) {
      if (nonceInplaceCounterLength === void 0) {
        nonceInplaceCounterLength = 0;
      }
      wipe_1.wipe(dst);
      return streamXOR(key, nonce, dst, dst, nonceInplaceCounterLength);
    }
    exports.stream = stream;
    function incrementCounter(counter, pos, len) {
      var carry = 1;
      while (len--) {
        carry = carry + (counter[pos] & 255) | 0;
        counter[pos] = carry & 255;
        carry >>>= 8;
        pos++;
      }
      if (carry > 0) {
        throw new Error("ChaCha: counter overflow");
      }
    }
  }
});

// node_modules/@stablelib/constant-time/lib/constant-time.js
var require_constant_time = __commonJS({
  "node_modules/@stablelib/constant-time/lib/constant-time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function select(subject, resultIfOne, resultIfZero) {
      return ~(subject - 1) & resultIfOne | subject - 1 & resultIfZero;
    }
    exports.select = select;
    function lessOrEqual(a, b) {
      return (a | 0) - (b | 0) - 1 >>> 31 & 1;
    }
    exports.lessOrEqual = lessOrEqual;
    function compare2(a, b) {
      if (a.length !== b.length) {
        return 0;
      }
      var result = 0;
      for (var i = 0; i < a.length; i++) {
        result |= a[i] ^ b[i];
      }
      return 1 & result - 1 >>> 8;
    }
    exports.compare = compare2;
    function equal(a, b) {
      if (a.length === 0 || b.length === 0) {
        return false;
      }
      return compare2(a, b) !== 0;
    }
    exports.equal = equal;
  }
});

// node_modules/@stablelib/poly1305/lib/poly1305.js
var require_poly1305 = __commonJS({
  "node_modules/@stablelib/poly1305/lib/poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 16;
    var Poly1305 = function() {
      function Poly13052(key) {
        this.digestLength = exports.DIGEST_LENGTH;
        this._buffer = new Uint8Array(16);
        this._r = new Uint16Array(10);
        this._h = new Uint16Array(10);
        this._pad = new Uint16Array(8);
        this._leftover = 0;
        this._fin = 0;
        this._finished = false;
        var t0 = key[0] | key[1] << 8;
        this._r[0] = t0 & 8191;
        var t1 = key[2] | key[3] << 8;
        this._r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        var t2 = key[4] | key[5] << 8;
        this._r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        var t3 = key[6] | key[7] << 8;
        this._r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        var t4 = key[8] | key[9] << 8;
        this._r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this._r[5] = t4 >>> 1 & 8190;
        var t5 = key[10] | key[11] << 8;
        this._r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        var t6 = key[12] | key[13] << 8;
        this._r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        var t7 = key[14] | key[15] << 8;
        this._r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this._r[9] = t7 >>> 5 & 127;
        this._pad[0] = key[16] | key[17] << 8;
        this._pad[1] = key[18] | key[19] << 8;
        this._pad[2] = key[20] | key[21] << 8;
        this._pad[3] = key[22] | key[23] << 8;
        this._pad[4] = key[24] | key[25] << 8;
        this._pad[5] = key[26] | key[27] << 8;
        this._pad[6] = key[28] | key[29] << 8;
        this._pad[7] = key[30] | key[31] << 8;
      }
      Poly13052.prototype._blocks = function(m, mpos, bytes) {
        var hibit = this._fin ? 0 : 1 << 11;
        var h0 = this._h[0], h1 = this._h[1], h2 = this._h[2], h3 = this._h[3], h4 = this._h[4], h5 = this._h[5], h6 = this._h[6], h7 = this._h[7], h8 = this._h[8], h9 = this._h[9];
        var r0 = this._r[0], r1 = this._r[1], r2 = this._r[2], r3 = this._r[3], r4 = this._r[4], r5 = this._r[5], r6 = this._r[6], r7 = this._r[7], r8 = this._r[8], r9 = this._r[9];
        while (bytes >= 16) {
          var t0 = m[mpos + 0] | m[mpos + 1] << 8;
          h0 += t0 & 8191;
          var t1 = m[mpos + 2] | m[mpos + 3] << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          var t2 = m[mpos + 4] | m[mpos + 5] << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          var t3 = m[mpos + 6] | m[mpos + 7] << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          var t4 = m[mpos + 8] | m[mpos + 9] << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          var t5 = m[mpos + 10] | m[mpos + 11] << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          var t6 = m[mpos + 12] | m[mpos + 13] << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          var t7 = m[mpos + 14] | m[mpos + 15] << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          var c = 0;
          var d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          var d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          var d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          var d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          var d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          var d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          var d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          var d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          var d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          var d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this._h[0] = h0;
        this._h[1] = h1;
        this._h[2] = h2;
        this._h[3] = h3;
        this._h[4] = h4;
        this._h[5] = h5;
        this._h[6] = h6;
        this._h[7] = h7;
        this._h[8] = h8;
        this._h[9] = h9;
      };
      Poly13052.prototype.finish = function(mac, macpos) {
        if (macpos === void 0) {
          macpos = 0;
        }
        var g = new Uint16Array(10);
        var c;
        var mask;
        var f;
        var i;
        if (this._leftover) {
          i = this._leftover;
          this._buffer[i++] = 1;
          for (; i < 16; i++) {
            this._buffer[i] = 0;
          }
          this._fin = 1;
          this._blocks(this._buffer, 0, 16);
        }
        c = this._h[1] >>> 13;
        this._h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this._h[i] += c;
          c = this._h[i] >>> 13;
          this._h[i] &= 8191;
        }
        this._h[0] += c * 5;
        c = this._h[0] >>> 13;
        this._h[0] &= 8191;
        this._h[1] += c;
        c = this._h[1] >>> 13;
        this._h[1] &= 8191;
        this._h[2] += c;
        g[0] = this._h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this._h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++) {
          g[i] &= mask;
        }
        mask = ~mask;
        for (i = 0; i < 10; i++) {
          this._h[i] = this._h[i] & mask | g[i];
        }
        this._h[0] = (this._h[0] | this._h[1] << 13) & 65535;
        this._h[1] = (this._h[1] >>> 3 | this._h[2] << 10) & 65535;
        this._h[2] = (this._h[2] >>> 6 | this._h[3] << 7) & 65535;
        this._h[3] = (this._h[3] >>> 9 | this._h[4] << 4) & 65535;
        this._h[4] = (this._h[4] >>> 12 | this._h[5] << 1 | this._h[6] << 14) & 65535;
        this._h[5] = (this._h[6] >>> 2 | this._h[7] << 11) & 65535;
        this._h[6] = (this._h[7] >>> 5 | this._h[8] << 8) & 65535;
        this._h[7] = (this._h[8] >>> 8 | this._h[9] << 5) & 65535;
        f = this._h[0] + this._pad[0];
        this._h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this._h[i] + this._pad[i] | 0) + (f >>> 16) | 0;
          this._h[i] = f & 65535;
        }
        mac[macpos + 0] = this._h[0] >>> 0;
        mac[macpos + 1] = this._h[0] >>> 8;
        mac[macpos + 2] = this._h[1] >>> 0;
        mac[macpos + 3] = this._h[1] >>> 8;
        mac[macpos + 4] = this._h[2] >>> 0;
        mac[macpos + 5] = this._h[2] >>> 8;
        mac[macpos + 6] = this._h[3] >>> 0;
        mac[macpos + 7] = this._h[3] >>> 8;
        mac[macpos + 8] = this._h[4] >>> 0;
        mac[macpos + 9] = this._h[4] >>> 8;
        mac[macpos + 10] = this._h[5] >>> 0;
        mac[macpos + 11] = this._h[5] >>> 8;
        mac[macpos + 12] = this._h[6] >>> 0;
        mac[macpos + 13] = this._h[6] >>> 8;
        mac[macpos + 14] = this._h[7] >>> 0;
        mac[macpos + 15] = this._h[7] >>> 8;
        this._finished = true;
        return this;
      };
      Poly13052.prototype.update = function(m) {
        var mpos = 0;
        var bytes = m.length;
        var want;
        if (this._leftover) {
          want = 16 - this._leftover;
          if (want > bytes) {
            want = bytes;
          }
          for (var i = 0; i < want; i++) {
            this._buffer[this._leftover + i] = m[mpos + i];
          }
          bytes -= want;
          mpos += want;
          this._leftover += want;
          if (this._leftover < 16) {
            return this;
          }
          this._blocks(this._buffer, 0, 16);
          this._leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this._blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (var i = 0; i < bytes; i++) {
            this._buffer[this._leftover + i] = m[mpos + i];
          }
          this._leftover += bytes;
        }
        return this;
      };
      Poly13052.prototype.digest = function() {
        if (this._finished) {
          throw new Error("Poly1305 was finished");
        }
        var mac = new Uint8Array(16);
        this.finish(mac);
        return mac;
      };
      Poly13052.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._r);
        wipe_1.wipe(this._h);
        wipe_1.wipe(this._pad);
        this._leftover = 0;
        this._fin = 0;
        this._finished = true;
        return this;
      };
      return Poly13052;
    }();
    exports.Poly1305 = Poly1305;
    function oneTimeAuth(key, data) {
      var h = new Poly1305(key);
      h.update(data);
      var digest2 = h.digest();
      h.clean();
      return digest2;
    }
    exports.oneTimeAuth = oneTimeAuth;
    function equal(a, b) {
      if (a.length !== exports.DIGEST_LENGTH || b.length !== exports.DIGEST_LENGTH) {
        return false;
      }
      return constant_time_1.equal(a, b);
    }
    exports.equal = equal;
  }
});

// node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js
var require_chacha20poly1305 = __commonJS({
  "node_modules/@stablelib/chacha20poly1305/lib/chacha20poly1305.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var chacha_1 = require_chacha();
    var poly1305_1 = require_poly1305();
    var wipe_1 = require_wipe();
    var binary_1 = require_binary();
    var constant_time_1 = require_constant_time();
    exports.KEY_LENGTH = 32;
    exports.NONCE_LENGTH = 12;
    exports.TAG_LENGTH = 16;
    var ZEROS = new Uint8Array(16);
    var ChaCha20Poly1305 = function() {
      function ChaCha20Poly13052(key) {
        this.nonceLength = exports.NONCE_LENGTH;
        this.tagLength = exports.TAG_LENGTH;
        if (key.length !== exports.KEY_LENGTH) {
          throw new Error("ChaCha20Poly1305 needs 32-byte key");
        }
        this._key = new Uint8Array(key);
      }
      ChaCha20Poly13052.prototype.seal = function(nonce, plaintext, associatedData, dst) {
        if (nonce.length > 16) {
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        }
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        var resultLength = plaintext.length + this.tagLength;
        var result;
        if (dst) {
          if (dst.length !== resultLength) {
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          }
          result = dst;
        } else {
          result = new Uint8Array(resultLength);
        }
        chacha_1.streamXOR(this._key, counter, plaintext, result, 4);
        this._authenticate(result.subarray(result.length - this.tagLength, result.length), authKey, result.subarray(0, result.length - this.tagLength), associatedData);
        wipe_1.wipe(counter);
        return result;
      };
      ChaCha20Poly13052.prototype.open = function(nonce, sealed, associatedData, dst) {
        if (nonce.length > 16) {
          throw new Error("ChaCha20Poly1305: incorrect nonce length");
        }
        if (sealed.length < this.tagLength) {
          return null;
        }
        var counter = new Uint8Array(16);
        counter.set(nonce, counter.length - nonce.length);
        var authKey = new Uint8Array(32);
        chacha_1.stream(this._key, counter, authKey, 4);
        var calculatedTag = new Uint8Array(this.tagLength);
        this._authenticate(calculatedTag, authKey, sealed.subarray(0, sealed.length - this.tagLength), associatedData);
        if (!constant_time_1.equal(calculatedTag, sealed.subarray(sealed.length - this.tagLength, sealed.length))) {
          return null;
        }
        var resultLength = sealed.length - this.tagLength;
        var result;
        if (dst) {
          if (dst.length !== resultLength) {
            throw new Error("ChaCha20Poly1305: incorrect destination length");
          }
          result = dst;
        } else {
          result = new Uint8Array(resultLength);
        }
        chacha_1.streamXOR(this._key, counter, sealed.subarray(0, sealed.length - this.tagLength), result, 4);
        wipe_1.wipe(counter);
        return result;
      };
      ChaCha20Poly13052.prototype.clean = function() {
        wipe_1.wipe(this._key);
        return this;
      };
      ChaCha20Poly13052.prototype._authenticate = function(tagOut, authKey, ciphertext, associatedData) {
        var h = new poly1305_1.Poly1305(authKey);
        if (associatedData) {
          h.update(associatedData);
          if (associatedData.length % 16 > 0) {
            h.update(ZEROS.subarray(associatedData.length % 16));
          }
        }
        h.update(ciphertext);
        if (ciphertext.length % 16 > 0) {
          h.update(ZEROS.subarray(ciphertext.length % 16));
        }
        var length2 = new Uint8Array(8);
        if (associatedData) {
          binary_1.writeUint64LE(associatedData.length, length2);
        }
        h.update(length2);
        binary_1.writeUint64LE(ciphertext.length, length2);
        h.update(length2);
        var tag = h.digest();
        for (var i = 0; i < tag.length; i++) {
          tagOut[i] = tag[i];
        }
        h.clean();
        wipe_1.wipe(tag);
        wipe_1.wipe(length2);
      };
      return ChaCha20Poly13052;
    }();
    exports.ChaCha20Poly1305 = ChaCha20Poly1305;
  }
});

// node_modules/@stablelib/hash/lib/hash.js
var require_hash = __commonJS({
  "node_modules/@stablelib/hash/lib/hash.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function isSerializableHash(h) {
      return typeof h.saveState !== "undefined" && typeof h.restoreState !== "undefined" && typeof h.cleanSavedState !== "undefined";
    }
    exports.isSerializableHash = isSerializableHash;
  }
});

// node_modules/@stablelib/hmac/lib/hmac.js
var require_hmac = __commonJS({
  "node_modules/@stablelib/hmac/lib/hmac.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hash_1 = require_hash();
    var constant_time_1 = require_constant_time();
    var wipe_1 = require_wipe();
    var HMAC = function() {
      function HMAC2(hash, key) {
        this._finished = false;
        this._inner = new hash();
        this._outer = new hash();
        this.blockSize = this._outer.blockSize;
        this.digestLength = this._outer.digestLength;
        var pad = new Uint8Array(this.blockSize);
        if (key.length > this.blockSize) {
          this._inner.update(key).finish(pad).clean();
        } else {
          pad.set(key);
        }
        for (var i = 0; i < pad.length; i++) {
          pad[i] ^= 54;
        }
        this._inner.update(pad);
        for (var i = 0; i < pad.length; i++) {
          pad[i] ^= 54 ^ 92;
        }
        this._outer.update(pad);
        if (hash_1.isSerializableHash(this._inner) && hash_1.isSerializableHash(this._outer)) {
          this._innerKeyedState = this._inner.saveState();
          this._outerKeyedState = this._outer.saveState();
        }
        wipe_1.wipe(pad);
      }
      HMAC2.prototype.reset = function() {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
          throw new Error("hmac: can't reset() because hash doesn't implement restoreState()");
        }
        this._inner.restoreState(this._innerKeyedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
      };
      HMAC2.prototype.clean = function() {
        if (hash_1.isSerializableHash(this._inner)) {
          this._inner.cleanSavedState(this._innerKeyedState);
        }
        if (hash_1.isSerializableHash(this._outer)) {
          this._outer.cleanSavedState(this._outerKeyedState);
        }
        this._inner.clean();
        this._outer.clean();
      };
      HMAC2.prototype.update = function(data) {
        this._inner.update(data);
        return this;
      };
      HMAC2.prototype.finish = function(out) {
        if (this._finished) {
          this._outer.finish(out);
          return this;
        }
        this._inner.finish(out);
        this._outer.update(out.subarray(0, this.digestLength)).finish(out);
        this._finished = true;
        return this;
      };
      HMAC2.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      };
      HMAC2.prototype.saveState = function() {
        if (!hash_1.isSerializableHash(this._inner)) {
          throw new Error("hmac: can't saveState() because hash doesn't implement it");
        }
        return this._inner.saveState();
      };
      HMAC2.prototype.restoreState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner) || !hash_1.isSerializableHash(this._outer)) {
          throw new Error("hmac: can't restoreState() because hash doesn't implement it");
        }
        this._inner.restoreState(savedState);
        this._outer.restoreState(this._outerKeyedState);
        this._finished = false;
        return this;
      };
      HMAC2.prototype.cleanSavedState = function(savedState) {
        if (!hash_1.isSerializableHash(this._inner)) {
          throw new Error("hmac: can't cleanSavedState() because hash doesn't implement it");
        }
        this._inner.cleanSavedState(savedState);
      };
      return HMAC2;
    }();
    exports.HMAC = HMAC;
    function hmac(hash, key, data) {
      var h = new HMAC(hash, key);
      h.update(data);
      var digest2 = h.digest();
      h.clean();
      return digest2;
    }
    exports.hmac = hmac;
    exports.equal = constant_time_1.equal;
  }
});

// node_modules/@stablelib/hkdf/lib/hkdf.js
var require_hkdf = __commonJS({
  "node_modules/@stablelib/hkdf/lib/hkdf.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var hmac_1 = require_hmac();
    var wipe_1 = require_wipe();
    var HKDF = function() {
      function HKDF2(hash, key, salt, info) {
        if (salt === void 0) {
          salt = new Uint8Array(0);
        }
        this._counter = new Uint8Array(1);
        this._hash = hash;
        this._info = info;
        var okm = hmac_1.hmac(this._hash, salt, key);
        this._hmac = new hmac_1.HMAC(hash, okm);
        this._buffer = new Uint8Array(this._hmac.digestLength);
        this._bufpos = this._buffer.length;
      }
      HKDF2.prototype._fillBuffer = function() {
        this._counter[0]++;
        var ctr = this._counter[0];
        if (ctr === 0) {
          throw new Error("hkdf: cannot expand more");
        }
        this._hmac.reset();
        if (ctr > 1) {
          this._hmac.update(this._buffer);
        }
        if (this._info) {
          this._hmac.update(this._info);
        }
        this._hmac.update(this._counter);
        this._hmac.finish(this._buffer);
        this._bufpos = 0;
      };
      HKDF2.prototype.expand = function(length2) {
        var out = new Uint8Array(length2);
        for (var i = 0; i < out.length; i++) {
          if (this._bufpos === this._buffer.length) {
            this._fillBuffer();
          }
          out[i] = this._buffer[this._bufpos++];
        }
        return out;
      };
      HKDF2.prototype.clean = function() {
        this._hmac.clean();
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._counter);
        this._bufpos = 0;
      };
      return HKDF2;
    }();
    exports.HKDF = HKDF;
  }
});

// node_modules/@stablelib/random/lib/source/browser.js
var require_browser = __commonJS({
  "node_modules/@stablelib/random/lib/source/browser.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.BrowserRandomSource = void 0;
    var QUOTA = 65536;
    var BrowserRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        const browserCrypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (browserCrypto && browserCrypto.getRandomValues !== void 0) {
          this._crypto = browserCrypto;
          this.isAvailable = true;
          this.isInstantiated = true;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Browser random byte generator is not available.");
        }
        const out = new Uint8Array(length2);
        for (let i = 0; i < out.length; i += QUOTA) {
          this._crypto.getRandomValues(out.subarray(i, i + Math.min(out.length - i, QUOTA)));
        }
        return out;
      }
    };
    exports.BrowserRandomSource = BrowserRandomSource;
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// node_modules/@stablelib/random/lib/source/node.js
var require_node = __commonJS({
  "node_modules/@stablelib/random/lib/source/node.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.NodeRandomSource = void 0;
    var wipe_1 = require_wipe();
    var NodeRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.isInstantiated = false;
        if (typeof __require !== "undefined") {
          const nodeCrypto = require_crypto();
          if (nodeCrypto && nodeCrypto.randomBytes) {
            this._crypto = nodeCrypto;
            this.isAvailable = true;
            this.isInstantiated = true;
          }
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable || !this._crypto) {
          throw new Error("Node.js random byte generator is not available.");
        }
        let buffer = this._crypto.randomBytes(length2);
        if (buffer.length !== length2) {
          throw new Error("NodeRandomSource: got fewer bytes than requested");
        }
        const out = new Uint8Array(length2);
        for (let i = 0; i < out.length; i++) {
          out[i] = buffer[i];
        }
        (0, wipe_1.wipe)(buffer);
        return out;
      }
    };
    exports.NodeRandomSource = NodeRandomSource;
  }
});

// node_modules/@stablelib/random/lib/source/system.js
var require_system = __commonJS({
  "node_modules/@stablelib/random/lib/source/system.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SystemRandomSource = void 0;
    var browser_1 = require_browser();
    var node_1 = require_node();
    var SystemRandomSource = class {
      constructor() {
        this.isAvailable = false;
        this.name = "";
        this._source = new browser_1.BrowserRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Browser";
          return;
        }
        this._source = new node_1.NodeRandomSource();
        if (this._source.isAvailable) {
          this.isAvailable = true;
          this.name = "Node";
          return;
        }
      }
      randomBytes(length2) {
        if (!this.isAvailable) {
          throw new Error("System random byte generator is not available.");
        }
        return this._source.randomBytes(length2);
      }
    };
    exports.SystemRandomSource = SystemRandomSource;
  }
});

// node_modules/@stablelib/random/lib/random.js
var require_random = __commonJS({
  "node_modules/@stablelib/random/lib/random.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.randomStringForEntropy = exports.randomString = exports.randomUint32 = exports.randomBytes = exports.defaultRandomSource = void 0;
    var system_1 = require_system();
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.defaultRandomSource = new system_1.SystemRandomSource();
    function randomBytes(length2, prng = exports.defaultRandomSource) {
      return prng.randomBytes(length2);
    }
    exports.randomBytes = randomBytes;
    function randomUint32(prng = exports.defaultRandomSource) {
      const buf = randomBytes(4, prng);
      const result = (0, binary_1.readUint32LE)(buf);
      (0, wipe_1.wipe)(buf);
      return result;
    }
    exports.randomUint32 = randomUint32;
    var ALPHANUMERIC = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    function randomString(length2, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      if (charset.length < 2) {
        throw new Error("randomString charset is too short");
      }
      if (charset.length > 256) {
        throw new Error("randomString charset is too long");
      }
      let out = "";
      const charsLen = charset.length;
      const maxByte = 256 - 256 % charsLen;
      while (length2 > 0) {
        const buf = randomBytes(Math.ceil(length2 * 256 / maxByte), prng);
        for (let i = 0; i < buf.length && length2 > 0; i++) {
          const randomByte = buf[i];
          if (randomByte < maxByte) {
            out += charset.charAt(randomByte % charsLen);
            length2--;
          }
        }
        (0, wipe_1.wipe)(buf);
      }
      return out;
    }
    exports.randomString = randomString;
    function randomStringForEntropy(bits, charset = ALPHANUMERIC, prng = exports.defaultRandomSource) {
      const length2 = Math.ceil(bits / (Math.log(charset.length) / Math.LN2));
      return randomString(length2, charset, prng);
    }
    exports.randomStringForEntropy = randomStringForEntropy;
  }
});

// node_modules/@stablelib/sha256/lib/sha256.js
var require_sha256 = __commonJS({
  "node_modules/@stablelib/sha256/lib/sha256.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 32;
    exports.BLOCK_SIZE = 64;
    var SHA256 = function() {
      function SHA2562() {
        this.digestLength = exports.DIGEST_LENGTH;
        this.blockSize = exports.BLOCK_SIZE;
        this._state = new Int32Array(8);
        this._temp = new Int32Array(64);
        this._buffer = new Uint8Array(128);
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        this.reset();
      }
      SHA2562.prototype._initState = function() {
        this._state[0] = 1779033703;
        this._state[1] = 3144134277;
        this._state[2] = 1013904242;
        this._state[3] = 2773480762;
        this._state[4] = 1359893119;
        this._state[5] = 2600822924;
        this._state[6] = 528734635;
        this._state[7] = 1541459225;
      };
      SHA2562.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
      };
      SHA2562.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._temp);
        this.reset();
      };
      SHA2562.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) {
          dataLength = data.length;
        }
        if (this._finished) {
          throw new Error("SHA256: can't update because hash was finished.");
        }
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
          while (this._bufferLength < this.blockSize && dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          if (this._bufferLength === this.blockSize) {
            hashBlocks(this._temp, this._state, this._buffer, 0, this.blockSize);
            this._bufferLength = 0;
          }
        }
        if (dataLength >= this.blockSize) {
          dataPos = hashBlocks(this._temp, this._state, data, dataPos, dataLength);
          dataLength %= this.blockSize;
        }
        while (dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        return this;
      };
      SHA2562.prototype.finish = function(out) {
        if (!this._finished) {
          var bytesHashed = this._bytesHashed;
          var left = this._bufferLength;
          var bitLenHi = bytesHashed / 536870912 | 0;
          var bitLenLo = bytesHashed << 3;
          var padLength = bytesHashed % 64 < 56 ? 64 : 128;
          this._buffer[left] = 128;
          for (var i = left + 1; i < padLength - 8; i++) {
            this._buffer[i] = 0;
          }
          binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
          binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
          hashBlocks(this._temp, this._state, this._buffer, 0, padLength);
          this._finished = true;
        }
        for (var i = 0; i < this.digestLength / 4; i++) {
          binary_1.writeUint32BE(this._state[i], out, i * 4);
        }
        return this;
      };
      SHA2562.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      };
      SHA2562.prototype.saveState = function() {
        if (this._finished) {
          throw new Error("SHA256: cannot save finished state");
        }
        return {
          state: new Int32Array(this._state),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      };
      SHA2562.prototype.restoreState = function(savedState) {
        this._state.set(savedState.state);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) {
          this._buffer.set(savedState.buffer);
        }
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
      };
      SHA2562.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.state);
        if (savedState.buffer) {
          wipe_1.wipe(savedState.buffer);
        }
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
      };
      return SHA2562;
    }();
    exports.SHA256 = SHA256;
    var K = new Int32Array([
      1116352408,
      1899447441,
      3049323471,
      3921009573,
      961987163,
      1508970993,
      2453635748,
      2870763221,
      3624381080,
      310598401,
      607225278,
      1426881987,
      1925078388,
      2162078206,
      2614888103,
      3248222580,
      3835390401,
      4022224774,
      264347078,
      604807628,
      770255983,
      1249150122,
      1555081692,
      1996064986,
      2554220882,
      2821834349,
      2952996808,
      3210313671,
      3336571891,
      3584528711,
      113926993,
      338241895,
      666307205,
      773529912,
      1294757372,
      1396182291,
      1695183700,
      1986661051,
      2177026350,
      2456956037,
      2730485921,
      2820302411,
      3259730800,
      3345764771,
      3516065817,
      3600352804,
      4094571909,
      275423344,
      430227734,
      506948616,
      659060556,
      883997877,
      958139571,
      1322822218,
      1537002063,
      1747873779,
      1955562222,
      2024104815,
      2227730452,
      2361852424,
      2428436474,
      2756734187,
      3204031479,
      3329325298
    ]);
    function hashBlocks(w, v, p, pos, len) {
      while (len >= 64) {
        var a = v[0];
        var b = v[1];
        var c = v[2];
        var d = v[3];
        var e = v[4];
        var f = v[5];
        var g = v[6];
        var h = v[7];
        for (var i = 0; i < 16; i++) {
          var j = pos + i * 4;
          w[i] = binary_1.readUint32BE(p, j);
        }
        for (var i = 16; i < 64; i++) {
          var u = w[i - 2];
          var t1 = (u >>> 17 | u << 32 - 17) ^ (u >>> 19 | u << 32 - 19) ^ u >>> 10;
          u = w[i - 15];
          var t2 = (u >>> 7 | u << 32 - 7) ^ (u >>> 18 | u << 32 - 18) ^ u >>> 3;
          w[i] = (t1 + w[i - 7] | 0) + (t2 + w[i - 16] | 0);
        }
        for (var i = 0; i < 64; i++) {
          var t1 = (((e >>> 6 | e << 32 - 6) ^ (e >>> 11 | e << 32 - 11) ^ (e >>> 25 | e << 32 - 25)) + (e & f ^ ~e & g) | 0) + (h + (K[i] + w[i] | 0) | 0) | 0;
          var t2 = ((a >>> 2 | a << 32 - 2) ^ (a >>> 13 | a << 32 - 13) ^ (a >>> 22 | a << 32 - 22)) + (a & b ^ a & c ^ b & c) | 0;
          h = g;
          g = f;
          f = e;
          e = d + t1 | 0;
          d = c;
          c = b;
          b = a;
          a = t1 + t2 | 0;
        }
        v[0] += a;
        v[1] += b;
        v[2] += c;
        v[3] += d;
        v[4] += e;
        v[5] += f;
        v[6] += g;
        v[7] += h;
        pos += 64;
        len -= 64;
      }
      return pos;
    }
    function hash(data) {
      var h = new SHA256();
      h.update(data);
      var digest2 = h.digest();
      h.clean();
      return digest2;
    }
    exports.hash = hash;
  }
});

// node_modules/@stablelib/x25519/lib/x25519.js
var require_x25519 = __commonJS({
  "node_modules/@stablelib/x25519/lib/x25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.sharedKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.scalarMultBase = exports.scalarMult = exports.SHARED_KEY_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = void 0;
    var random_1 = require_random();
    var wipe_1 = require_wipe();
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 32;
    exports.SHARED_KEY_LENGTH = 32;
    function gf(init) {
      const r = new Float64Array(16);
      if (init) {
        for (let i = 0; i < init.length; i++) {
          r[i] = init[i];
        }
      }
      return r;
    }
    var _9 = new Uint8Array(32);
    _9[0] = 9;
    var _121665 = gf([56129, 1]);
    function car25519(o) {
      let c = 1;
      for (let i = 0; i < 16; i++) {
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
      }
      o[0] += c - 1 + 37 * (c - 1);
    }
    function sel25519(p, q, b) {
      const c = ~(b - 1);
      for (let i = 0; i < 16; i++) {
        const t = c & (p[i] ^ q[i]);
        p[i] ^= t;
        q[i] ^= t;
      }
    }
    function pack25519(o, n) {
      const m = gf();
      const t = gf();
      for (let i = 0; i < 16; i++) {
        t[i] = n[i];
      }
      car25519(t);
      car25519(t);
      car25519(t);
      for (let j = 0; j < 2; j++) {
        m[0] = t[0] - 65517;
        for (let i = 1; i < 15; i++) {
          m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
          m[i - 1] &= 65535;
        }
        m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
        const b = m[15] >> 16 & 1;
        m[14] &= 65535;
        sel25519(t, m, 1 - b);
      }
      for (let i = 0; i < 16; i++) {
        o[2 * i] = t[i] & 255;
        o[2 * i + 1] = t[i] >> 8;
      }
    }
    function unpack25519(o, n) {
      for (let i = 0; i < 16; i++) {
        o[i] = n[2 * i] + (n[2 * i + 1] << 8);
      }
      o[15] &= 32767;
    }
    function add(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] + b[i];
      }
    }
    function sub(o, a, b) {
      for (let i = 0; i < 16; i++) {
        o[i] = a[i] - b[i];
      }
    }
    function mul(o, a, b) {
      let v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
      v = a[0];
      t0 += v * b0;
      t1 += v * b1;
      t2 += v * b2;
      t3 += v * b3;
      t4 += v * b4;
      t5 += v * b5;
      t6 += v * b6;
      t7 += v * b7;
      t8 += v * b8;
      t9 += v * b9;
      t10 += v * b10;
      t11 += v * b11;
      t12 += v * b12;
      t13 += v * b13;
      t14 += v * b14;
      t15 += v * b15;
      v = a[1];
      t1 += v * b0;
      t2 += v * b1;
      t3 += v * b2;
      t4 += v * b3;
      t5 += v * b4;
      t6 += v * b5;
      t7 += v * b6;
      t8 += v * b7;
      t9 += v * b8;
      t10 += v * b9;
      t11 += v * b10;
      t12 += v * b11;
      t13 += v * b12;
      t14 += v * b13;
      t15 += v * b14;
      t16 += v * b15;
      v = a[2];
      t2 += v * b0;
      t3 += v * b1;
      t4 += v * b2;
      t5 += v * b3;
      t6 += v * b4;
      t7 += v * b5;
      t8 += v * b6;
      t9 += v * b7;
      t10 += v * b8;
      t11 += v * b9;
      t12 += v * b10;
      t13 += v * b11;
      t14 += v * b12;
      t15 += v * b13;
      t16 += v * b14;
      t17 += v * b15;
      v = a[3];
      t3 += v * b0;
      t4 += v * b1;
      t5 += v * b2;
      t6 += v * b3;
      t7 += v * b4;
      t8 += v * b5;
      t9 += v * b6;
      t10 += v * b7;
      t11 += v * b8;
      t12 += v * b9;
      t13 += v * b10;
      t14 += v * b11;
      t15 += v * b12;
      t16 += v * b13;
      t17 += v * b14;
      t18 += v * b15;
      v = a[4];
      t4 += v * b0;
      t5 += v * b1;
      t6 += v * b2;
      t7 += v * b3;
      t8 += v * b4;
      t9 += v * b5;
      t10 += v * b6;
      t11 += v * b7;
      t12 += v * b8;
      t13 += v * b9;
      t14 += v * b10;
      t15 += v * b11;
      t16 += v * b12;
      t17 += v * b13;
      t18 += v * b14;
      t19 += v * b15;
      v = a[5];
      t5 += v * b0;
      t6 += v * b1;
      t7 += v * b2;
      t8 += v * b3;
      t9 += v * b4;
      t10 += v * b5;
      t11 += v * b6;
      t12 += v * b7;
      t13 += v * b8;
      t14 += v * b9;
      t15 += v * b10;
      t16 += v * b11;
      t17 += v * b12;
      t18 += v * b13;
      t19 += v * b14;
      t20 += v * b15;
      v = a[6];
      t6 += v * b0;
      t7 += v * b1;
      t8 += v * b2;
      t9 += v * b3;
      t10 += v * b4;
      t11 += v * b5;
      t12 += v * b6;
      t13 += v * b7;
      t14 += v * b8;
      t15 += v * b9;
      t16 += v * b10;
      t17 += v * b11;
      t18 += v * b12;
      t19 += v * b13;
      t20 += v * b14;
      t21 += v * b15;
      v = a[7];
      t7 += v * b0;
      t8 += v * b1;
      t9 += v * b2;
      t10 += v * b3;
      t11 += v * b4;
      t12 += v * b5;
      t13 += v * b6;
      t14 += v * b7;
      t15 += v * b8;
      t16 += v * b9;
      t17 += v * b10;
      t18 += v * b11;
      t19 += v * b12;
      t20 += v * b13;
      t21 += v * b14;
      t22 += v * b15;
      v = a[8];
      t8 += v * b0;
      t9 += v * b1;
      t10 += v * b2;
      t11 += v * b3;
      t12 += v * b4;
      t13 += v * b5;
      t14 += v * b6;
      t15 += v * b7;
      t16 += v * b8;
      t17 += v * b9;
      t18 += v * b10;
      t19 += v * b11;
      t20 += v * b12;
      t21 += v * b13;
      t22 += v * b14;
      t23 += v * b15;
      v = a[9];
      t9 += v * b0;
      t10 += v * b1;
      t11 += v * b2;
      t12 += v * b3;
      t13 += v * b4;
      t14 += v * b5;
      t15 += v * b6;
      t16 += v * b7;
      t17 += v * b8;
      t18 += v * b9;
      t19 += v * b10;
      t20 += v * b11;
      t21 += v * b12;
      t22 += v * b13;
      t23 += v * b14;
      t24 += v * b15;
      v = a[10];
      t10 += v * b0;
      t11 += v * b1;
      t12 += v * b2;
      t13 += v * b3;
      t14 += v * b4;
      t15 += v * b5;
      t16 += v * b6;
      t17 += v * b7;
      t18 += v * b8;
      t19 += v * b9;
      t20 += v * b10;
      t21 += v * b11;
      t22 += v * b12;
      t23 += v * b13;
      t24 += v * b14;
      t25 += v * b15;
      v = a[11];
      t11 += v * b0;
      t12 += v * b1;
      t13 += v * b2;
      t14 += v * b3;
      t15 += v * b4;
      t16 += v * b5;
      t17 += v * b6;
      t18 += v * b7;
      t19 += v * b8;
      t20 += v * b9;
      t21 += v * b10;
      t22 += v * b11;
      t23 += v * b12;
      t24 += v * b13;
      t25 += v * b14;
      t26 += v * b15;
      v = a[12];
      t12 += v * b0;
      t13 += v * b1;
      t14 += v * b2;
      t15 += v * b3;
      t16 += v * b4;
      t17 += v * b5;
      t18 += v * b6;
      t19 += v * b7;
      t20 += v * b8;
      t21 += v * b9;
      t22 += v * b10;
      t23 += v * b11;
      t24 += v * b12;
      t25 += v * b13;
      t26 += v * b14;
      t27 += v * b15;
      v = a[13];
      t13 += v * b0;
      t14 += v * b1;
      t15 += v * b2;
      t16 += v * b3;
      t17 += v * b4;
      t18 += v * b5;
      t19 += v * b6;
      t20 += v * b7;
      t21 += v * b8;
      t22 += v * b9;
      t23 += v * b10;
      t24 += v * b11;
      t25 += v * b12;
      t26 += v * b13;
      t27 += v * b14;
      t28 += v * b15;
      v = a[14];
      t14 += v * b0;
      t15 += v * b1;
      t16 += v * b2;
      t17 += v * b3;
      t18 += v * b4;
      t19 += v * b5;
      t20 += v * b6;
      t21 += v * b7;
      t22 += v * b8;
      t23 += v * b9;
      t24 += v * b10;
      t25 += v * b11;
      t26 += v * b12;
      t27 += v * b13;
      t28 += v * b14;
      t29 += v * b15;
      v = a[15];
      t15 += v * b0;
      t16 += v * b1;
      t17 += v * b2;
      t18 += v * b3;
      t19 += v * b4;
      t20 += v * b5;
      t21 += v * b6;
      t22 += v * b7;
      t23 += v * b8;
      t24 += v * b9;
      t25 += v * b10;
      t26 += v * b11;
      t27 += v * b12;
      t28 += v * b13;
      t29 += v * b14;
      t30 += v * b15;
      t0 += 38 * t16;
      t1 += 38 * t17;
      t2 += 38 * t18;
      t3 += 38 * t19;
      t4 += 38 * t20;
      t5 += 38 * t21;
      t6 += 38 * t22;
      t7 += 38 * t23;
      t8 += 38 * t24;
      t9 += 38 * t25;
      t10 += 38 * t26;
      t11 += 38 * t27;
      t12 += 38 * t28;
      t13 += 38 * t29;
      t14 += 38 * t30;
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      c = 1;
      v = t0 + c + 65535;
      c = Math.floor(v / 65536);
      t0 = v - c * 65536;
      v = t1 + c + 65535;
      c = Math.floor(v / 65536);
      t1 = v - c * 65536;
      v = t2 + c + 65535;
      c = Math.floor(v / 65536);
      t2 = v - c * 65536;
      v = t3 + c + 65535;
      c = Math.floor(v / 65536);
      t3 = v - c * 65536;
      v = t4 + c + 65535;
      c = Math.floor(v / 65536);
      t4 = v - c * 65536;
      v = t5 + c + 65535;
      c = Math.floor(v / 65536);
      t5 = v - c * 65536;
      v = t6 + c + 65535;
      c = Math.floor(v / 65536);
      t6 = v - c * 65536;
      v = t7 + c + 65535;
      c = Math.floor(v / 65536);
      t7 = v - c * 65536;
      v = t8 + c + 65535;
      c = Math.floor(v / 65536);
      t8 = v - c * 65536;
      v = t9 + c + 65535;
      c = Math.floor(v / 65536);
      t9 = v - c * 65536;
      v = t10 + c + 65535;
      c = Math.floor(v / 65536);
      t10 = v - c * 65536;
      v = t11 + c + 65535;
      c = Math.floor(v / 65536);
      t11 = v - c * 65536;
      v = t12 + c + 65535;
      c = Math.floor(v / 65536);
      t12 = v - c * 65536;
      v = t13 + c + 65535;
      c = Math.floor(v / 65536);
      t13 = v - c * 65536;
      v = t14 + c + 65535;
      c = Math.floor(v / 65536);
      t14 = v - c * 65536;
      v = t15 + c + 65535;
      c = Math.floor(v / 65536);
      t15 = v - c * 65536;
      t0 += c - 1 + 37 * (c - 1);
      o[0] = t0;
      o[1] = t1;
      o[2] = t2;
      o[3] = t3;
      o[4] = t4;
      o[5] = t5;
      o[6] = t6;
      o[7] = t7;
      o[8] = t8;
      o[9] = t9;
      o[10] = t10;
      o[11] = t11;
      o[12] = t12;
      o[13] = t13;
      o[14] = t14;
      o[15] = t15;
    }
    function square(o, a) {
      mul(o, a, a);
    }
    function inv25519(o, inp) {
      const c = gf();
      for (let i = 0; i < 16; i++) {
        c[i] = inp[i];
      }
      for (let i = 253; i >= 0; i--) {
        square(c, c);
        if (i !== 2 && i !== 4) {
          mul(c, c, inp);
        }
      }
      for (let i = 0; i < 16; i++) {
        o[i] = c[i];
      }
    }
    function scalarMult(n, p) {
      const z = new Uint8Array(32);
      const x = new Float64Array(80);
      const a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
      for (let i = 0; i < 31; i++) {
        z[i] = n[i];
      }
      z[31] = n[31] & 127 | 64;
      z[0] &= 248;
      unpack25519(x, p);
      for (let i = 0; i < 16; i++) {
        b[i] = x[i];
      }
      a[0] = d[0] = 1;
      for (let i = 254; i >= 0; --i) {
        const r = z[i >>> 3] >>> (i & 7) & 1;
        sel25519(a, b, r);
        sel25519(c, d, r);
        add(e, a, c);
        sub(a, a, c);
        add(c, b, d);
        sub(b, b, d);
        square(d, e);
        square(f, a);
        mul(a, c, a);
        mul(c, b, e);
        add(e, a, c);
        sub(a, a, c);
        square(b, a);
        sub(c, d, f);
        mul(a, c, _121665);
        add(a, a, d);
        mul(c, c, a);
        mul(a, d, f);
        mul(d, b, x);
        square(b, e);
        sel25519(a, b, r);
        sel25519(c, d, r);
      }
      for (let i = 0; i < 16; i++) {
        x[i + 16] = a[i];
        x[i + 32] = c[i];
        x[i + 48] = b[i];
        x[i + 64] = d[i];
      }
      const x32 = x.subarray(32);
      const x16 = x.subarray(16);
      inv25519(x32, x32);
      mul(x16, x16, x32);
      const q = new Uint8Array(32);
      pack25519(q, x16);
      return q;
    }
    exports.scalarMult = scalarMult;
    function scalarMultBase(n) {
      return scalarMult(n, _9);
    }
    exports.scalarMultBase = scalarMultBase;
    function generateKeyPairFromSeed(seed) {
      if (seed.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`x25519: seed must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      const secretKey = new Uint8Array(seed);
      const publicKey = scalarMultBase(secretKey);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed;
    function generateKeyPair(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair;
    function sharedKey(mySecretKey, theirPublicKey, rejectZero = false) {
      if (mySecretKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect secret key length");
      }
      if (theirPublicKey.length !== exports.PUBLIC_KEY_LENGTH) {
        throw new Error("X25519: incorrect public key length");
      }
      const result = scalarMult(mySecretKey, theirPublicKey);
      if (rejectZero) {
        let zeros = 0;
        for (let i = 0; i < result.length; i++) {
          zeros |= result[i];
        }
        if (zeros === 0) {
          throw new Error("X25519: invalid shared key");
        }
      }
      return result;
    }
    exports.sharedKey = sharedKey;
  }
});

// node_modules/uint8arrays/esm/src/compare.js
function compare(a, b) {
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] < b[i]) {
      return -1;
    }
    if (a[i] > b[i]) {
      return 1;
    }
  }
  if (a.byteLength > b.byteLength) {
    return 1;
  }
  if (a.byteLength < b.byteLength) {
    return -1;
  }
  return 0;
}
var init_compare = __esm({
  "node_modules/uint8arrays/esm/src/compare.js"() {
  }
});

// node_modules/uint8arrays/esm/src/util/as-uint8array.js
function asUint8Array(buf) {
  if (globalThis.Buffer != null) {
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  }
  return buf;
}
var init_as_uint8array = __esm({
  "node_modules/uint8arrays/esm/src/util/as-uint8array.js"() {
  }
});

// node_modules/uint8arrays/esm/src/alloc.js
function allocUnsafe(size = 0) {
  if (globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null) {
    return asUint8Array(globalThis.Buffer.allocUnsafe(size));
  }
  return new Uint8Array(size);
}
var init_alloc = __esm({
  "node_modules/uint8arrays/esm/src/alloc.js"() {
    init_as_uint8array();
  }
});

// node_modules/uint8arrays/esm/src/concat.js
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = allocUnsafe(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return asUint8Array(output);
}
var init_concat = __esm({
  "node_modules/uint8arrays/esm/src/concat.js"() {
    init_alloc();
    init_as_uint8array();
  }
});

// node_modules/uint8arrays/esm/src/equals.js
function equals(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_equals = __esm({
  "node_modules/uint8arrays/esm/src/equals.js"() {
  }
});

// node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name2) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode6(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name2} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode6
  };
}
var src, _brrp__multiformats_scope_baseX, base_x_default;
var init_base_x = __esm({
  "node_modules/multiformats/esm/vendor/base-x.js"() {
    src = base;
    _brrp__multiformats_scope_baseX = src;
    base_x_default = _brrp__multiformats_scope_baseX;
  }
});

// node_modules/multiformats/esm/src/bytes.js
var empty, equals2, coerce, fromString, toString;
var init_bytes = __esm({
  "node_modules/multiformats/esm/src/bytes.js"() {
    empty = new Uint8Array(0);
    equals2 = (aa, bb) => {
      if (aa === bb)
        return true;
      if (aa.byteLength !== bb.byteLength) {
        return false;
      }
      for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
          return false;
        }
      }
      return true;
    };
    coerce = (o) => {
      if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
        return o;
      if (o instanceof ArrayBuffer)
        return new Uint8Array(o);
      if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      }
      throw new Error("Unknown type, must be binary type");
    };
    fromString = (str) => new TextEncoder().encode(str);
    toString = (b) => new TextDecoder().decode(b);
  }
});

// node_modules/multiformats/esm/src/bases/base.js
var Encoder, Decoder, ComposedDecoder, or, Codec, from, baseX, decode, encode, rfc4648;
var init_base = __esm({
  "node_modules/multiformats/esm/src/bases/base.js"() {
    init_base_x();
    init_bytes();
    Encoder = class {
      constructor(name2, prefix, baseEncode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
      }
      encode(bytes) {
        if (bytes instanceof Uint8Array) {
          return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
    Decoder = class {
      constructor(name2, prefix, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        if (prefix.codePointAt(0) === void 0) {
          throw new Error("Invalid prefix character");
        }
        this.prefixCodePoint = prefix.codePointAt(0);
        this.baseDecode = baseDecode;
      }
      decode(text) {
        if (typeof text === "string") {
          if (text.codePointAt(0) !== this.prefixCodePoint) {
            throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
          }
          return this.baseDecode(text.slice(this.prefix.length));
        } else {
          throw Error("Can only multibase decode strings");
        }
      }
      or(decoder) {
        return or(this, decoder);
      }
    };
    ComposedDecoder = class {
      constructor(decoders) {
        this.decoders = decoders;
      }
      or(decoder) {
        return or(this, decoder);
      }
      decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
          return decoder.decode(input);
        } else {
          throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
        }
      }
    };
    or = (left, right) => new ComposedDecoder({
      ...left.decoders || { [left.prefix]: left },
      ...right.decoders || { [right.prefix]: right }
    });
    Codec = class {
      constructor(name2, prefix, baseEncode, baseDecode) {
        this.name = name2;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name2, prefix, baseEncode);
        this.decoder = new Decoder(name2, prefix, baseDecode);
      }
      encode(input) {
        return this.encoder.encode(input);
      }
      decode(input) {
        return this.decoder.decode(input);
      }
    };
    from = ({ name: name2, prefix, encode: encode5, decode: decode6 }) => new Codec(name2, prefix, encode5, decode6);
    baseX = ({ prefix, name: name2, alphabet: alphabet2 }) => {
      const { encode: encode5, decode: decode6 } = base_x_default(alphabet2, name2);
      return from({
        prefix,
        name: name2,
        encode: encode5,
        decode: (text) => coerce(decode6(text))
      });
    };
    decode = (string2, alphabet2, bitsPerChar, name2) => {
      const codes = {};
      for (let i = 0; i < alphabet2.length; ++i) {
        codes[alphabet2[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(end * bitsPerChar / 8 | 0);
      let bits = 0;
      let buffer = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes[string2[i]];
        if (value === void 0) {
          throw new SyntaxError(`Non-${name2} character`);
        }
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & buffer >> bits;
        }
      }
      if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    };
    encode = (data, alphabet2, bitsPerChar) => {
      const pad = alphabet2[alphabet2.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet2[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += alphabet2[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while (out.length * bitsPerChar & 7) {
          out += "=";
        }
      }
      return out;
    };
    rfc4648 = ({ name: name2, prefix, bitsPerChar, alphabet: alphabet2 }) => {
      return from({
        prefix,
        name: name2,
        encode(input) {
          return encode(input, alphabet2, bitsPerChar);
        },
        decode(input) {
          return decode(input, alphabet2, bitsPerChar, name2);
        }
      });
    };
  }
});

// node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity;
var init_identity = __esm({
  "node_modules/multiformats/esm/src/bases/identity.js"() {
    init_base();
    init_bytes();
    identity = from({
      prefix: "\0",
      name: "identity",
      encode: (buf) => toString(buf),
      decode: (str) => fromString(str)
    });
  }
});

// node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2;
var init_base2 = __esm({
  "node_modules/multiformats/esm/src/bases/base2.js"() {
    init_base();
    base2 = rfc4648({
      prefix: "0",
      name: "base2",
      alphabet: "01",
      bitsPerChar: 1
    });
  }
});

// node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8;
var init_base8 = __esm({
  "node_modules/multiformats/esm/src/bases/base8.js"() {
    init_base();
    base8 = rfc4648({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3
    });
  }
});

// node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10;
var init_base10 = __esm({
  "node_modules/multiformats/esm/src/bases/base10.js"() {
    init_base();
    base10 = baseX({
      prefix: "9",
      name: "base10",
      alphabet: "0123456789"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16, base16upper;
var init_base16 = __esm({
  "node_modules/multiformats/esm/src/bases/base16.js"() {
    init_base();
    base16 = rfc4648({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4
    });
    base16upper = rfc4648({
      prefix: "F",
      name: "base16upper",
      alphabet: "0123456789ABCDEF",
      bitsPerChar: 4
    });
  }
});

// node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32, base32upper, base32pad, base32padupper, base32hex, base32hexupper, base32hexpad, base32hexpadupper, base32z;
var init_base32 = __esm({
  "node_modules/multiformats/esm/src/bases/base32.js"() {
    init_base();
    base32 = rfc4648({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5
    });
    base32upper = rfc4648({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5
    });
    base32pad = rfc4648({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5
    });
    base32padupper = rfc4648({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5
    });
    base32hex = rfc4648({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5
    });
    base32hexupper = rfc4648({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5
    });
    base32hexpad = rfc4648({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5
    });
    base32hexpadupper = rfc4648({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5
    });
    base32z = rfc4648({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5
    });
  }
});

// node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36, base36upper;
var init_base36 = __esm({
  "node_modules/multiformats/esm/src/bases/base36.js"() {
    init_base();
    base36 = baseX({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
    });
    base36upper = baseX({
      prefix: "K",
      name: "base36upper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc, base58flickr;
var init_base58 = __esm({
  "node_modules/multiformats/esm/src/bases/base58.js"() {
    init_base();
    base58btc = baseX({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    });
    base58flickr = baseX({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
    });
  }
});

// node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64, base64pad, base64url, base64urlpad;
var init_base64 = __esm({
  "node_modules/multiformats/esm/src/bases/base64.js"() {
    init_base();
    base64 = rfc4648({
      prefix: "m",
      name: "base64",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6
    });
    base64pad = rfc4648({
      prefix: "M",
      name: "base64pad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      bitsPerChar: 6
    });
    base64url = rfc4648({
      prefix: "u",
      name: "base64url",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bitsPerChar: 6
    });
    base64urlpad = rfc4648({
      prefix: "U",
      name: "base64urlpad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      bitsPerChar: 6
    });
  }
});

// node_modules/multiformats/esm/src/bases/base256emoji.js
var base256emoji_exports = {};
__export(base256emoji_exports, {
  base256emoji: () => base256emoji
});
function encode2(data) {
  return data.reduce((p, c) => {
    p += alphabetBytesToChars[c];
    return p;
  }, "");
}
function decode2(str) {
  const byts = [];
  for (const char of str) {
    const byt = alphabetCharsToBytes[char.codePointAt(0)];
    if (byt === void 0) {
      throw new Error(`Non-base256emoji character: ${char}`);
    }
    byts.push(byt);
  }
  return new Uint8Array(byts);
}
var alphabet, alphabetBytesToChars, alphabetCharsToBytes, base256emoji;
var init_base256emoji = __esm({
  "node_modules/multiformats/esm/src/bases/base256emoji.js"() {
    init_base();
    alphabet = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
    alphabetBytesToChars = alphabet.reduce((p, c, i) => {
      p[i] = c;
      return p;
    }, []);
    alphabetCharsToBytes = alphabet.reduce((p, c, i) => {
      p[c.codePointAt(0)] = i;
      return p;
    }, []);
    base256emoji = from({
      prefix: "\u{1F680}",
      name: "base256emoji",
      encode: encode2,
      decode: decode2
    });
  }
});

// node_modules/multiformats/esm/vendor/varint.js
function encode3(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode3.bytes = offset - oldOffset + 1;
  return out;
}
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var encode_1, MSB, REST, MSBALL, INT, decode3, MSB$1, REST$1, N1, N2, N3, N4, N5, N6, N7, N8, N9, length, varint, _brrp_varint, varint_default;
var init_varint = __esm({
  "node_modules/multiformats/esm/vendor/varint.js"() {
    encode_1 = encode3;
    MSB = 128;
    REST = 127;
    MSBALL = ~REST;
    INT = Math.pow(2, 31);
    decode3 = read;
    MSB$1 = 128;
    REST$1 = 127;
    N1 = Math.pow(2, 7);
    N2 = Math.pow(2, 14);
    N3 = Math.pow(2, 21);
    N4 = Math.pow(2, 28);
    N5 = Math.pow(2, 35);
    N6 = Math.pow(2, 42);
    N7 = Math.pow(2, 49);
    N8 = Math.pow(2, 56);
    N9 = Math.pow(2, 63);
    length = function(value) {
      return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
    };
    varint = {
      encode: encode_1,
      decode: decode3,
      encodingLength: length
    };
    _brrp_varint = varint;
    varint_default = _brrp_varint;
  }
});

// node_modules/multiformats/esm/src/varint.js
var decode4, encodeTo, encodingLength;
var init_varint2 = __esm({
  "node_modules/multiformats/esm/src/varint.js"() {
    init_varint();
    decode4 = (data, offset = 0) => {
      const code2 = varint_default.decode(data, offset);
      return [
        code2,
        varint_default.decode.bytes
      ];
    };
    encodeTo = (int, target, offset = 0) => {
      varint_default.encode(int, target, offset);
      return target;
    };
    encodingLength = (int) => {
      return varint_default.encodingLength(int);
    };
  }
});

// node_modules/multiformats/esm/src/hashes/digest.js
var create, decode5, equals3, Digest;
var init_digest = __esm({
  "node_modules/multiformats/esm/src/hashes/digest.js"() {
    init_bytes();
    init_varint2();
    create = (code2, digest2) => {
      const size = digest2.byteLength;
      const sizeOffset = encodingLength(code2);
      const digestOffset = sizeOffset + encodingLength(size);
      const bytes = new Uint8Array(digestOffset + size);
      encodeTo(code2, bytes, 0);
      encodeTo(size, bytes, sizeOffset);
      bytes.set(digest2, digestOffset);
      return new Digest(code2, size, digest2, bytes);
    };
    decode5 = (multihash) => {
      const bytes = coerce(multihash);
      const [code2, sizeOffset] = decode4(bytes);
      const [size, digestOffset] = decode4(bytes.subarray(sizeOffset));
      const digest2 = bytes.subarray(sizeOffset + digestOffset);
      if (digest2.byteLength !== size) {
        throw new Error("Incorrect length");
      }
      return new Digest(code2, size, digest2, bytes);
    };
    equals3 = (a, b) => {
      if (a === b) {
        return true;
      } else {
        return a.code === b.code && a.size === b.size && equals2(a.bytes, b.bytes);
      }
    };
    Digest = class {
      constructor(code2, size, digest2, bytes) {
        this.code = code2;
        this.size = size;
        this.digest = digest2;
        this.bytes = bytes;
      }
    };
  }
});

// node_modules/multiformats/esm/src/hashes/hasher.js
var from2, Hasher;
var init_hasher = __esm({
  "node_modules/multiformats/esm/src/hashes/hasher.js"() {
    init_digest();
    from2 = ({ name: name2, code: code2, encode: encode5 }) => new Hasher(name2, code2, encode5);
    Hasher = class {
      constructor(name2, code2, encode5) {
        this.name = name2;
        this.code = code2;
        this.encode = encode5;
      }
      digest(input) {
        if (input instanceof Uint8Array) {
          const result = this.encode(input);
          return result instanceof Uint8Array ? create(this.code, result) : result.then((digest2) => create(this.code, digest2));
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
  }
});

// node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var sha, sha256, sha512;
var init_sha2_browser = __esm({
  "node_modules/multiformats/esm/src/hashes/sha2-browser.js"() {
    init_hasher();
    sha = (name2) => async (data) => new Uint8Array(await crypto.subtle.digest(name2, data));
    sha256 = from2({
      name: "sha2-256",
      code: 18,
      encode: sha("SHA-256")
    });
    sha512 = from2({
      name: "sha2-512",
      code: 19,
      encode: sha("SHA-512")
    });
  }
});

// node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var code, name, encode4, digest, identity2;
var init_identity2 = __esm({
  "node_modules/multiformats/esm/src/hashes/identity.js"() {
    init_bytes();
    init_digest();
    code = 0;
    name = "identity";
    encode4 = coerce;
    digest = (input) => create(code, encode4(input));
    identity2 = {
      code,
      name,
      encode: encode4,
      digest
    };
  }
});

// node_modules/multiformats/esm/src/codecs/raw.js
var init_raw = __esm({
  "node_modules/multiformats/esm/src/codecs/raw.js"() {
    init_bytes();
  }
});

// node_modules/multiformats/esm/src/codecs/json.js
var textEncoder, textDecoder;
var init_json = __esm({
  "node_modules/multiformats/esm/src/codecs/json.js"() {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
  }
});

// node_modules/multiformats/esm/src/cid.js
var CID, parseCIDtoBytes, toStringV0, toStringV1, DAG_PB_CODE, SHA_256_CODE, encodeCID, cidSymbol, readonly, hidden, version, deprecate, IS_CID_DEPRECATION;
var init_cid = __esm({
  "node_modules/multiformats/esm/src/cid.js"() {
    init_varint2();
    init_digest();
    init_base58();
    init_base32();
    init_bytes();
    CID = class {
      constructor(version2, code2, multihash, bytes) {
        this.code = code2;
        this.version = version2;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = /* @__PURE__ */ new Map();
        Object.defineProperties(this, {
          byteOffset: hidden,
          byteLength: hidden,
          code: readonly,
          version: readonly,
          multihash: readonly,
          bytes: readonly,
          _baseCache: hidden,
          asCID: hidden
        });
      }
      toV0() {
        switch (this.version) {
          case 0: {
            return this;
          }
          default: {
            const { code: code2, multihash } = this;
            if (code2 !== DAG_PB_CODE) {
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            }
            if (multihash.code !== SHA_256_CODE) {
              throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
            }
            return CID.createV0(multihash);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            const { code: code2, digest: digest2 } = this.multihash;
            const multihash = create(code2, digest2);
            return CID.createV1(this.code, multihash);
          }
          case 1: {
            return this;
          }
          default: {
            throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
          }
        }
      }
      equals(other) {
        return other && this.code === other.code && this.version === other.version && equals3(this.multihash, other.multihash);
      }
      toString(base3) {
        const { bytes, version: version2, _baseCache } = this;
        switch (version2) {
          case 0:
            return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
          default:
            return toStringV1(bytes, _baseCache, base3 || base32.encoder);
        }
      }
      toJSON() {
        return {
          code: this.code,
          version: this.version,
          hash: this.multihash.bytes
        };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
      }
      get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(value) {
        if (value instanceof CID) {
          return value;
        } else if (value != null && value.asCID === value) {
          const { version: version2, code: code2, multihash, bytes } = value;
          return new CID(version2, code2, multihash, bytes || encodeCID(version2, code2, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
          const { version: version2, multihash, code: code2 } = value;
          const digest2 = decode5(multihash);
          return CID.create(version2, code2, digest2);
        } else {
          return null;
        }
      }
      static create(version2, code2, digest2) {
        if (typeof code2 !== "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (version2) {
          case 0: {
            if (code2 !== DAG_PB_CODE) {
              throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
            } else {
              return new CID(version2, code2, digest2, digest2.bytes);
            }
          }
          case 1: {
            const bytes = encodeCID(version2, code2, digest2.bytes);
            return new CID(version2, code2, digest2, bytes);
          }
          default: {
            throw new Error("Invalid version");
          }
        }
      }
      static createV0(digest2) {
        return CID.create(0, DAG_PB_CODE, digest2);
      }
      static createV1(code2, digest2) {
        return CID.create(1, code2, digest2);
      }
      static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) {
          throw new Error("Incorrect length");
        }
        return cid;
      }
      static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
          throw new Error("Incorrect length");
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest2 = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest2) : CID.createV1(specs.codec, digest2);
        return [
          cid,
          bytes.subarray(specs.size)
        ];
      }
      static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
          const [i, length2] = decode4(initialBytes.subarray(offset));
          offset += length2;
          return i;
        };
        let version2 = next();
        let codec = DAG_PB_CODE;
        if (version2 === 18) {
          version2 = 0;
          offset = 0;
        } else if (version2 === 1) {
          codec = next();
        }
        if (version2 !== 0 && version2 !== 1) {
          throw new RangeError(`Invalid CID version ${version2}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
          version: version2,
          codec,
          multihashCode,
          digestSize,
          multihashSize,
          size
        };
      }
      static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
      }
    };
    parseCIDtoBytes = (source, base3) => {
      switch (source[0]) {
        case "Q": {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(`${base58btc.prefix}${source}`)
          ];
        }
        case base58btc.prefix: {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(source)
          ];
        }
        case base32.prefix: {
          const decoder = base3 || base32;
          return [
            base32.prefix,
            decoder.decode(source)
          ];
        }
        default: {
          if (base3 == null) {
            throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
          }
          return [
            source[0],
            base3.decode(source)
          ];
        }
      }
    };
    toStringV0 = (bytes, cache, base3) => {
      const { prefix } = base3;
      if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
      }
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    toStringV1 = (bytes, cache, base3) => {
      const { prefix } = base3;
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    DAG_PB_CODE = 112;
    SHA_256_CODE = 18;
    encodeCID = (version2, code2, multihash) => {
      const codeOffset = encodingLength(version2);
      const hashOffset = codeOffset + encodingLength(code2);
      const bytes = new Uint8Array(hashOffset + multihash.byteLength);
      encodeTo(version2, bytes, 0);
      encodeTo(code2, bytes, codeOffset);
      bytes.set(multihash, hashOffset);
      return bytes;
    };
    cidSymbol = Symbol.for("@ipld/js-cid/CID");
    readonly = {
      writable: false,
      configurable: false,
      enumerable: true
    };
    hidden = {
      writable: false,
      enumerable: false,
      configurable: false
    };
    version = "0.0.0-dev";
    deprecate = (range, message) => {
      if (range.test(version)) {
        console.warn(message);
      } else {
        throw new Error(message);
      }
    };
    IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  }
});

// node_modules/multiformats/esm/src/index.js
var init_src = __esm({
  "node_modules/multiformats/esm/src/index.js"() {
    init_cid();
    init_varint2();
    init_bytes();
    init_hasher();
    init_digest();
  }
});

// node_modules/multiformats/esm/src/basics.js
var bases, hashes;
var init_basics = __esm({
  "node_modules/multiformats/esm/src/basics.js"() {
    init_identity();
    init_base2();
    init_base8();
    init_base10();
    init_base16();
    init_base32();
    init_base36();
    init_base58();
    init_base64();
    init_base256emoji();
    init_sha2_browser();
    init_identity2();
    init_raw();
    init_json();
    init_src();
    bases = {
      ...identity_exports,
      ...base2_exports,
      ...base8_exports,
      ...base10_exports,
      ...base16_exports,
      ...base32_exports,
      ...base36_exports,
      ...base58_exports,
      ...base64_exports,
      ...base256emoji_exports
    };
    hashes = {
      ...sha2_browser_exports,
      ...identity_exports2
    };
  }
});

// node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name2, prefix, encode5, decode6) {
  return {
    name: name2,
    prefix,
    encoder: {
      name: name2,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode6 }
  };
}
var string, ascii, BASES, bases_default;
var init_bases = __esm({
  "node_modules/uint8arrays/esm/src/util/bases.js"() {
    init_basics();
    init_alloc();
    string = createCodec("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    ascii = createCodec("ascii", "a", (buf) => {
      let string2 = "a";
      for (let i = 0; i < buf.length; i++) {
        string2 += String.fromCharCode(buf[i]);
      }
      return string2;
    }, (str) => {
      str = str.substring(1);
      const buf = allocUnsafe(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    BASES = {
      utf8: string,
      "utf-8": string,
      hex: bases.base16,
      latin1: ascii,
      ascii,
      binary: ascii,
      ...bases
    };
    bases_default = BASES;
  }
});

// node_modules/uint8arrays/esm/src/from-string.js
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return asUint8Array(globalThis.Buffer.from(string2, "utf-8"));
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var init_from_string = __esm({
  "node_modules/uint8arrays/esm/src/from-string.js"() {
    init_bases();
    init_as_uint8array();
  }
});

// node_modules/uint8arrays/esm/src/to-string.js
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  if ((encoding === "utf8" || encoding === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null) {
    return globalThis.Buffer.from(array.buffer, array.byteOffset, array.byteLength).toString("utf8");
  }
  return base3.encoder.encode(array).substring(1);
}
var init_to_string = __esm({
  "node_modules/uint8arrays/esm/src/to-string.js"() {
    init_bases();
  }
});

// node_modules/uint8arrays/esm/src/xor.js
function xor(a, b) {
  if (a.length !== b.length) {
    throw new Error("Inputs should have the same length");
  }
  const result = allocUnsafe(a.length);
  for (let i = 0; i < a.length; i++) {
    result[i] = a[i] ^ b[i];
  }
  return asUint8Array(result);
}
var init_xor = __esm({
  "node_modules/uint8arrays/esm/src/xor.js"() {
    init_alloc();
    init_as_uint8array();
  }
});

// node_modules/uint8arrays/esm/src/index.js
var src_exports = {};
__export(src_exports, {
  compare: () => compare,
  concat: () => concat,
  equals: () => equals,
  fromString: () => fromString2,
  toString: () => toString2,
  xor: () => xor
});
var init_src2 = __esm({
  "node_modules/uint8arrays/esm/src/index.js"() {
    init_compare();
    init_concat();
    init_equals();
    init_from_string();
    init_to_string();
    init_xor();
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/delay.js
var require_delay = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/delay.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.delay = void 0;
    function delay(timeout) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(true);
        }, timeout);
      });
    }
    exports.delay = delay;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/misc.js
var require_misc = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/misc.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_THOUSAND = exports.ONE_HUNDRED = void 0;
    exports.ONE_HUNDRED = 100;
    exports.ONE_THOUSAND = 1e3;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/time.js
var require_time = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/time.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ONE_YEAR = exports.FOUR_WEEKS = exports.THREE_WEEKS = exports.TWO_WEEKS = exports.ONE_WEEK = exports.THIRTY_DAYS = exports.SEVEN_DAYS = exports.FIVE_DAYS = exports.THREE_DAYS = exports.ONE_DAY = exports.TWENTY_FOUR_HOURS = exports.TWELVE_HOURS = exports.SIX_HOURS = exports.THREE_HOURS = exports.ONE_HOUR = exports.SIXTY_MINUTES = exports.THIRTY_MINUTES = exports.TEN_MINUTES = exports.FIVE_MINUTES = exports.ONE_MINUTE = exports.SIXTY_SECONDS = exports.THIRTY_SECONDS = exports.TEN_SECONDS = exports.FIVE_SECONDS = exports.ONE_SECOND = void 0;
    exports.ONE_SECOND = 1;
    exports.FIVE_SECONDS = 5;
    exports.TEN_SECONDS = 10;
    exports.THIRTY_SECONDS = 30;
    exports.SIXTY_SECONDS = 60;
    exports.ONE_MINUTE = exports.SIXTY_SECONDS;
    exports.FIVE_MINUTES = exports.ONE_MINUTE * 5;
    exports.TEN_MINUTES = exports.ONE_MINUTE * 10;
    exports.THIRTY_MINUTES = exports.ONE_MINUTE * 30;
    exports.SIXTY_MINUTES = exports.ONE_MINUTE * 60;
    exports.ONE_HOUR = exports.SIXTY_MINUTES;
    exports.THREE_HOURS = exports.ONE_HOUR * 3;
    exports.SIX_HOURS = exports.ONE_HOUR * 6;
    exports.TWELVE_HOURS = exports.ONE_HOUR * 12;
    exports.TWENTY_FOUR_HOURS = exports.ONE_HOUR * 24;
    exports.ONE_DAY = exports.TWENTY_FOUR_HOURS;
    exports.THREE_DAYS = exports.ONE_DAY * 3;
    exports.FIVE_DAYS = exports.ONE_DAY * 5;
    exports.SEVEN_DAYS = exports.ONE_DAY * 7;
    exports.THIRTY_DAYS = exports.ONE_DAY * 30;
    exports.ONE_WEEK = exports.SEVEN_DAYS;
    exports.TWO_WEEKS = exports.ONE_WEEK * 2;
    exports.THREE_WEEKS = exports.ONE_WEEK * 3;
    exports.FOUR_WEEKS = exports.ONE_WEEK * 4;
    exports.ONE_YEAR = exports.ONE_DAY * 365;
  }
});

// node_modules/@walletconnect/time/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_misc(), exports);
    tslib_1.__exportStar(require_time(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/convert.js
var require_convert = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/convert.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fromMiliseconds = exports.toMiliseconds = void 0;
    var constants_1 = require_constants();
    function toMiliseconds(seconds) {
      return seconds * constants_1.ONE_THOUSAND;
    }
    exports.toMiliseconds = toMiliseconds;
    function fromMiliseconds(miliseconds) {
      return Math.floor(miliseconds / constants_1.ONE_THOUSAND);
    }
    exports.fromMiliseconds = fromMiliseconds;
  }
});

// node_modules/@walletconnect/time/dist/cjs/utils/index.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/utils/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_delay(), exports);
    tslib_1.__exportStar(require_convert(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/watch.js
var require_watch = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Watch = void 0;
    var Watch = class {
      constructor() {
        this.timestamps = /* @__PURE__ */ new Map();
      }
      start(label) {
        if (this.timestamps.has(label)) {
          throw new Error(`Watch already started for label: ${label}`);
        }
        this.timestamps.set(label, { started: Date.now() });
      }
      stop(label) {
        const timestamp = this.get(label);
        if (typeof timestamp.elapsed !== "undefined") {
          throw new Error(`Watch already stopped for label: ${label}`);
        }
        const elapsed = Date.now() - timestamp.started;
        this.timestamps.set(label, { started: timestamp.started, elapsed });
      }
      get(label) {
        const timestamp = this.timestamps.get(label);
        if (typeof timestamp === "undefined") {
          throw new Error(`No timestamp found for label: ${label}`);
        }
        return timestamp;
      }
      elapsed(label) {
        const timestamp = this.get(label);
        const elapsed = timestamp.elapsed || Date.now() - timestamp.started;
        return elapsed;
      }
    };
    exports.Watch = Watch;
    exports.default = Watch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/watch.js
var require_watch2 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/watch.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IWatch = void 0;
    var IWatch = class {
    };
    exports.IWatch = IWatch;
  }
});

// node_modules/@walletconnect/time/dist/cjs/types/index.js
var require_types = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_watch2(), exports);
  }
});

// node_modules/@walletconnect/time/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/time/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_utils(), exports);
    tslib_1.__exportStar(require_watch(), exports);
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/@walletconnect/utils/node_modules/query-string/index.js
var require_query_string = __commonJS({
  "node_modules/@walletconnect/utils/node_modules/query-string/index.js"(exports) {
    "use strict";
    var strictUriEncode = require_strict_uri_encode();
    var decodeComponent = require_decode_uri_component();
    var splitOnFirst = require_split_on_first();
    var filterObject = require_filter_obj();
    var isNullOrUndefined = (value) => value === null || value === void 0;
    var encodeFragmentIdentifier = Symbol("encodeFragmentIdentifier");
    function encoderForArrayFormat(options) {
      switch (options.arrayFormat) {
        case "index":
          return (key) => (result, value) => {
            const index = result.length;
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[", index, "]"].join("")];
            }
            return [
              ...result,
              [encode5(key, options), "[", encode5(index, options), "]=", encode5(value, options)].join("")
            ];
          };
        case "bracket":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), "[]"].join("")];
            }
            return [...result, [encode5(key, options), "[]=", encode5(value, options)].join("")];
          };
        case "colon-list-separator":
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, [encode5(key, options), ":list="].join("")];
            }
            return [...result, [encode5(key, options), ":list=", encode5(value, options)].join("")];
          };
        case "comma":
        case "separator":
        case "bracket-separator": {
          const keyValueSep = options.arrayFormat === "bracket-separator" ? "[]=" : "=";
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            value = value === null ? "" : value;
            if (result.length === 0) {
              return [[encode5(key, options), keyValueSep, encode5(value, options)].join("")];
            }
            return [[result, encode5(value, options)].join(options.arrayFormatSeparator)];
          };
        }
        default:
          return (key) => (result, value) => {
            if (value === void 0 || options.skipNull && value === null || options.skipEmptyString && value === "") {
              return result;
            }
            if (value === null) {
              return [...result, encode5(key, options)];
            }
            return [...result, [encode5(key, options), "=", encode5(value, options)].join("")];
          };
      }
    }
    function parserForArrayFormat(options) {
      let result;
      switch (options.arrayFormat) {
        case "index":
          return (key, value, accumulator) => {
            result = /\[(\d*)\]$/.exec(key);
            key = key.replace(/\[\d*\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = {};
            }
            accumulator[key][result[1]] = value;
          };
        case "bracket":
          return (key, value, accumulator) => {
            result = /(\[\])$/.exec(key);
            key = key.replace(/\[\]$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "colon-list-separator":
          return (key, value, accumulator) => {
            result = /(:list)$/.exec(key);
            key = key.replace(/:list$/, "");
            if (!result) {
              accumulator[key] = value;
              return;
            }
            if (accumulator[key] === void 0) {
              accumulator[key] = [value];
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
        case "comma":
        case "separator":
          return (key, value, accumulator) => {
            const isArray = typeof value === "string" && value.includes(options.arrayFormatSeparator);
            const isEncodedArray = typeof value === "string" && !isArray && decode6(value, options).includes(options.arrayFormatSeparator);
            value = isEncodedArray ? decode6(value, options) : value;
            const newValue = isArray || isEncodedArray ? value.split(options.arrayFormatSeparator).map((item) => decode6(item, options)) : value === null ? value : decode6(value, options);
            accumulator[key] = newValue;
          };
        case "bracket-separator":
          return (key, value, accumulator) => {
            const isArray = /(\[\])$/.test(key);
            key = key.replace(/\[\]$/, "");
            if (!isArray) {
              accumulator[key] = value ? decode6(value, options) : value;
              return;
            }
            const arrayValue = value === null ? [] : value.split(options.arrayFormatSeparator).map((item) => decode6(item, options));
            if (accumulator[key] === void 0) {
              accumulator[key] = arrayValue;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], arrayValue);
          };
        default:
          return (key, value, accumulator) => {
            if (accumulator[key] === void 0) {
              accumulator[key] = value;
              return;
            }
            accumulator[key] = [].concat(accumulator[key], value);
          };
      }
    }
    function validateArrayFormatSeparator(value) {
      if (typeof value !== "string" || value.length !== 1) {
        throw new TypeError("arrayFormatSeparator must be single character string");
      }
    }
    function encode5(value, options) {
      if (options.encode) {
        return options.strict ? strictUriEncode(value) : encodeURIComponent(value);
      }
      return value;
    }
    function decode6(value, options) {
      if (options.decode) {
        return decodeComponent(value);
      }
      return value;
    }
    function keysSorter(input) {
      if (Array.isArray(input)) {
        return input.sort();
      }
      if (typeof input === "object") {
        return keysSorter(Object.keys(input)).sort((a, b) => Number(a) - Number(b)).map((key) => input[key]);
      }
      return input;
    }
    function removeHash(input) {
      const hashStart = input.indexOf("#");
      if (hashStart !== -1) {
        input = input.slice(0, hashStart);
      }
      return input;
    }
    function getHash(url) {
      let hash = "";
      const hashStart = url.indexOf("#");
      if (hashStart !== -1) {
        hash = url.slice(hashStart);
      }
      return hash;
    }
    function extract(input) {
      input = removeHash(input);
      const queryStart = input.indexOf("?");
      if (queryStart === -1) {
        return "";
      }
      return input.slice(queryStart + 1);
    }
    function parseValue(value, options) {
      if (options.parseNumbers && !Number.isNaN(Number(value)) && (typeof value === "string" && value.trim() !== "")) {
        value = Number(value);
      } else if (options.parseBooleans && value !== null && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
        value = value.toLowerCase() === "true";
      }
      return value;
    }
    function parse(query, options) {
      options = Object.assign({
        decode: true,
        sort: true,
        arrayFormat: "none",
        arrayFormatSeparator: ",",
        parseNumbers: false,
        parseBooleans: false
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const formatter = parserForArrayFormat(options);
      const ret = /* @__PURE__ */ Object.create(null);
      if (typeof query !== "string") {
        return ret;
      }
      query = query.trim().replace(/^[?#&]/, "");
      if (!query) {
        return ret;
      }
      for (const param of query.split("&")) {
        if (param === "") {
          continue;
        }
        let [key, value] = splitOnFirst(options.decode ? param.replace(/\+/g, " ") : param, "=");
        value = value === void 0 ? null : ["comma", "separator", "bracket-separator"].includes(options.arrayFormat) ? value : decode6(value, options);
        formatter(decode6(key, options), value, ret);
      }
      for (const key of Object.keys(ret)) {
        const value = ret[key];
        if (typeof value === "object" && value !== null) {
          for (const k of Object.keys(value)) {
            value[k] = parseValue(value[k], options);
          }
        } else {
          ret[key] = parseValue(value, options);
        }
      }
      if (options.sort === false) {
        return ret;
      }
      return (options.sort === true ? Object.keys(ret).sort() : Object.keys(ret).sort(options.sort)).reduce((result, key) => {
        const value = ret[key];
        if (Boolean(value) && typeof value === "object" && !Array.isArray(value)) {
          result[key] = keysSorter(value);
        } else {
          result[key] = value;
        }
        return result;
      }, /* @__PURE__ */ Object.create(null));
    }
    exports.extract = extract;
    exports.parse = parse;
    exports.stringify = (object, options) => {
      if (!object) {
        return "";
      }
      options = Object.assign({
        encode: true,
        strict: true,
        arrayFormat: "none",
        arrayFormatSeparator: ","
      }, options);
      validateArrayFormatSeparator(options.arrayFormatSeparator);
      const shouldFilter = (key) => options.skipNull && isNullOrUndefined(object[key]) || options.skipEmptyString && object[key] === "";
      const formatter = encoderForArrayFormat(options);
      const objectCopy = {};
      for (const key of Object.keys(object)) {
        if (!shouldFilter(key)) {
          objectCopy[key] = object[key];
        }
      }
      const keys = Object.keys(objectCopy);
      if (options.sort !== false) {
        keys.sort(options.sort);
      }
      return keys.map((key) => {
        const value = object[key];
        if (value === void 0) {
          return "";
        }
        if (value === null) {
          return encode5(key, options);
        }
        if (Array.isArray(value)) {
          if (value.length === 0 && options.arrayFormat === "bracket-separator") {
            return encode5(key, options) + "[]";
          }
          return value.reduce(formatter(key), []).join("&");
        }
        return encode5(key, options) + "=" + encode5(value, options);
      }).filter((x) => x.length > 0).join("&");
    };
    exports.parseUrl = (url, options) => {
      options = Object.assign({
        decode: true
      }, options);
      const [url_, hash] = splitOnFirst(url, "#");
      return Object.assign(
        {
          url: url_.split("?")[0] || "",
          query: parse(extract(url), options)
        },
        options && options.parseFragmentIdentifier && hash ? { fragmentIdentifier: decode6(hash, options) } : {}
      );
    };
    exports.stringifyUrl = (object, options) => {
      options = Object.assign({
        encode: true,
        strict: true,
        [encodeFragmentIdentifier]: true
      }, options);
      const url = removeHash(object.url).split("?")[0] || "";
      const queryFromUrl = exports.extract(object.url);
      const parsedQueryFromUrl = exports.parse(queryFromUrl, { sort: false });
      const query = Object.assign(parsedQueryFromUrl, object.query);
      let queryString = exports.stringify(query, options);
      if (queryString) {
        queryString = `?${queryString}`;
      }
      let hash = getHash(object.url);
      if (object.fragmentIdentifier) {
        hash = `#${options[encodeFragmentIdentifier] ? encode5(object.fragmentIdentifier, options) : object.fragmentIdentifier}`;
      }
      return `${url}${queryString}${hash}`;
    };
    exports.pick = (input, filter, options) => {
      options = Object.assign({
        parseFragmentIdentifier: true,
        [encodeFragmentIdentifier]: false
      }, options);
      const { url, query, fragmentIdentifier } = exports.parseUrl(input, options);
      return exports.stringifyUrl({
        url,
        query: filterObject(query, filter),
        fragmentIdentifier
      }, options);
    };
    exports.exclude = (input, filter, options) => {
      const exclusionFilter = Array.isArray(filter) ? (key) => !filter.includes(key) : (key, value) => !filter(key, value);
      return exports.pick(input, exclusionFilter, options);
    };
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/types.js
var init_types = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/types.js"() {
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/misc.js
function assertType(obj, key, type = "string") {
  if (!obj[key] || typeof obj[key] !== type) {
    throw new Error(`Missing or invalid "${key}" param`);
  }
}
function hasRequiredParams(params, required) {
  let matches = true;
  required.forEach((key) => {
    const exists = key in params;
    if (!exists) {
      matches = false;
    }
  });
  return matches;
}
function hasExactParamsLength(params, length2) {
  return Array.isArray(params) ? params.length === length2 : Object.keys(params).length === length2;
}
function hasRequiredParamsLength(params, minLength) {
  return Array.isArray(params) ? params.length >= minLength : Object.keys(params).length >= minLength;
}
function checkParams(params, required, optional) {
  const exact = !optional.length;
  const matchesLength = exact ? hasExactParamsLength(params, required.length) : hasRequiredParamsLength(params, required.length);
  if (!matchesLength)
    return false;
  return hasRequiredParams(params, required);
}
function methodEndsWith(method, expected, separator = "_") {
  const split = method.split(separator);
  return split[split.length - 1].trim().toLowerCase() === expected.trim().toLowerCase();
}
var init_misc = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/misc.js"() {
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/validators.js
function isSubscribeRequest(request) {
  return isSubscribeMethod(request.method) && isSubscribeParams(request.params);
}
function isSubscribeMethod(method) {
  return methodEndsWith(method, "subscribe");
}
function isSubscribeParams(params) {
  const required = ["topic"];
  const optional = [];
  return checkParams(params, required, optional);
}
function isPublishRequest(request) {
  return isPublishMethod(request.method) && isPublishParams(request.params);
}
function isPublishMethod(method) {
  return methodEndsWith(method, "publish");
}
function isPublishParams(params) {
  const required = ["message", "topic", "ttl"];
  const optional = ["prompt", "tag"];
  return checkParams(params, required, optional);
}
function isUnsubscribeRequest(request) {
  return isUnsubscribeMethod(request.method) && isUnsubscribeParams(request.params);
}
function isUnsubscribeMethod(method) {
  return methodEndsWith(method, "unsubscribe");
}
function isUnsubscribeParams(params) {
  const required = ["id", "topic"];
  const optional = [];
  return checkParams(params, required, optional);
}
function isSubscriptionRequest(request) {
  return isSubscriptionMethod(request.method) && isSubscriptionParams(request.params);
}
function isSubscriptionMethod(method) {
  return methodEndsWith(method, "subscription");
}
function isSubscriptionParams(params) {
  const required = ["id", "data"];
  const optional = [];
  return checkParams(params, required, optional);
}
var init_validators = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/validators.js"() {
    init_misc();
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/parsers.js
function parseSubscribeRequest(request) {
  if (!isSubscribeMethod(request.method)) {
    throw new Error("JSON-RPC Request has invalid subscribe method");
  }
  if (!isSubscribeParams(request.params)) {
    throw new Error("JSON-RPC Request has invalid subscribe params");
  }
  const params = request.params;
  assertType(params, "topic");
  return params;
}
function parsePublishRequest(request) {
  if (!isPublishMethod(request.method)) {
    throw new Error("JSON-RPC Request has invalid publish method");
  }
  if (!isPublishParams(request.params)) {
    throw new Error("JSON-RPC Request has invalid publish params");
  }
  const params = request.params;
  assertType(params, "topic");
  assertType(params, "message");
  assertType(params, "ttl", "number");
  return params;
}
function parseUnsubscribeRequest(request) {
  if (!isUnsubscribeMethod(request.method)) {
    throw new Error("JSON-RPC Request has invalid unsubscribe method");
  }
  if (!isUnsubscribeParams(request.params)) {
    throw new Error("JSON-RPC Request has invalid unsubscribe params");
  }
  const params = request.params;
  assertType(params, "id");
  return params;
}
function parseSubscriptionRequest(request) {
  if (!isSubscriptionMethod(request.method)) {
    throw new Error("JSON-RPC Request has invalid subscription method");
  }
  if (!isSubscriptionParams(request.params)) {
    throw new Error("JSON-RPC Request has invalid subscription params");
  }
  const params = request.params;
  assertType(params, "id");
  assertType(params, "data");
  return params;
}
var init_parsers = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/parsers.js"() {
    init_misc();
    init_validators();
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/jsonrpc.js
var RELAY_JSONRPC;
var init_jsonrpc = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/jsonrpc.js"() {
    RELAY_JSONRPC = {
      waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe"
      },
      irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe"
      },
      iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe"
      }
    };
  }
});

// node_modules/@walletconnect/relay-api/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  RELAY_JSONRPC: () => RELAY_JSONRPC,
  isPublishMethod: () => isPublishMethod,
  isPublishParams: () => isPublishParams,
  isPublishRequest: () => isPublishRequest,
  isSubscribeMethod: () => isSubscribeMethod,
  isSubscribeParams: () => isSubscribeParams,
  isSubscribeRequest: () => isSubscribeRequest,
  isSubscriptionMethod: () => isSubscriptionMethod,
  isSubscriptionParams: () => isSubscriptionParams,
  isSubscriptionRequest: () => isSubscriptionRequest,
  isUnsubscribeMethod: () => isUnsubscribeMethod,
  isUnsubscribeParams: () => isUnsubscribeParams,
  isUnsubscribeRequest: () => isUnsubscribeRequest,
  parsePublishRequest: () => parsePublishRequest,
  parseSubscribeRequest: () => parseSubscribeRequest,
  parseSubscriptionRequest: () => parseSubscriptionRequest,
  parseUnsubscribeRequest: () => parseUnsubscribeRequest
});
var init_esm = __esm({
  "node_modules/@walletconnect/relay-api/dist/esm/index.js"() {
    init_types();
    init_parsers();
    init_jsonrpc();
    init_validators();
  }
});

// node_modules/@walletconnect/utils/dist/index.cjs.js
var require_index_cjs = __commonJS({
  "node_modules/@walletconnect/utils/dist/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var de = require_chacha20poly1305();
    var yn = require_hkdf();
    var le = require_random();
    var W = require_sha256();
    var hn = require_x25519();
    var d = (init_src2(), __toCommonJS(src_exports));
    var vn = require_detect_browser();
    var C = require_cjs3();
    var j = require_cjs();
    var En = require_cjs2();
    var Nn = require_query_string();
    var bn = (init_esm(), __toCommonJS(esm_exports));
    function pe(e) {
      if (e && e.__esModule)
        return e;
      var n = /* @__PURE__ */ Object.create(null);
      return e && Object.keys(e).forEach(function(t) {
        if (t !== "default") {
          var r = Object.getOwnPropertyDescriptor(e, t);
          Object.defineProperty(n, t, r.get ? r : { enumerable: true, get: function() {
            return e[t];
          } });
        }
      }), n.default = e, Object.freeze(n);
    }
    var fe = pe(hn);
    var M = pe(Nn);
    var k = ":";
    function me(e) {
      const [n, t] = e.split(k);
      return { namespace: n, reference: t };
    }
    function ge(e) {
      const { namespace: n, reference: t } = e;
      return [n, t].join(k);
    }
    function G(e) {
      const [n, t, r] = e.split(k);
      return { namespace: n, reference: t, address: r };
    }
    function ye(e) {
      const { namespace: n, reference: t, address: r } = e;
      return [n, t, r].join(k);
    }
    function J(e, n) {
      const t = [];
      return e.forEach((r) => {
        const s = n(r);
        t.includes(s) || t.push(s);
      }), t;
    }
    function he(e) {
      const { address: n } = G(e);
      return n;
    }
    function ve(e) {
      const { namespace: n, reference: t } = G(e);
      return ge({ namespace: n, reference: t });
    }
    function On(e, n) {
      const { namespace: t, reference: r } = me(n);
      return ye({ namespace: t, reference: r, address: e });
    }
    function Sn(e) {
      return J(e, he);
    }
    function Ee(e) {
      return J(e, ve);
    }
    function Tn(e, n = []) {
      const t = [];
      return Object.keys(e).forEach((r) => {
        if (n.length && !n.includes(r))
          return;
        const s = e[r];
        t.push(...s.accounts);
      }), t;
    }
    function An(e, n = []) {
      const t = [];
      return Object.keys(e).forEach((r) => {
        if (n.length && !n.includes(r))
          return;
        const s = e[r];
        t.push(...Ee(s.accounts));
      }), t;
    }
    function In(e, n = []) {
      const t = [];
      return Object.keys(e).forEach((r) => {
        if (n.length && !n.includes(r))
          return;
        const s = e[r];
        t.push(...K(r, s));
      }), t;
    }
    function K(e, n) {
      return e.includes(":") ? [e] : n.chains || [];
    }
    var L = (e) => e?.split(":");
    var Ne = (e) => {
      const n = e && L(e);
      if (n)
        return n[3];
    };
    var Pn = (e) => {
      const n = e && L(e);
      if (n)
        return n[2] + ":" + n[3];
    };
    var be = (e) => {
      const n = e && L(e);
      if (n)
        return n.pop();
    };
    var Rn = (e, n) => {
      const t = `${e.domain} wants you to sign in with your Ethereum account:`, r = be(n), s = e.statement, o = `URI: ${e.aud}`, i = `Version: ${e.version}`, l = `Chain ID: ${Ne(n)}`, p = `Nonce: ${e.nonce}`, a = `Issued At: ${e.iat}`, u = e.resources && e.resources.length > 0 ? `Resources:
${e.resources.map((c) => `- ${c}`).join(`
`)}` : void 0;
      return [t, r, "", s, "", o, i, l, p, a, u].filter((c) => c != null).join(`
`);
    };
    var Q = "base10";
    var m = "base16";
    var q = "base64pad";
    var F = "utf8";
    var Z = 0;
    var _ = 1;
    var wn = 0;
    var Oe = 1;
    var X = 12;
    var ee = 32;
    function Cn() {
      const e = fe.generateKeyPair();
      return { privateKey: d.toString(e.secretKey, m), publicKey: d.toString(e.publicKey, m) };
    }
    function _n() {
      const e = le.randomBytes(ee);
      return d.toString(e, m);
    }
    function Un(e, n) {
      const t = fe.sharedKey(d.fromString(e, m), d.fromString(n, m)), r = new yn.HKDF(W.SHA256, t).expand(ee);
      return d.toString(r, m);
    }
    function jn(e) {
      const n = W.hash(d.fromString(e, m));
      return d.toString(n, m);
    }
    function Vn(e) {
      const n = W.hash(d.fromString(e, F));
      return d.toString(n, m);
    }
    function Se(e) {
      return d.fromString(`${e}`, Q);
    }
    function V(e) {
      return Number(d.toString(e, Q));
    }
    function Dn(e) {
      const n = Se(typeof e.type < "u" ? e.type : Z);
      if (V(n) === _ && typeof e.senderPublicKey > "u")
        throw new Error("Missing sender public key for type 1 envelope");
      const t = typeof e.senderPublicKey < "u" ? d.fromString(e.senderPublicKey, m) : void 0, r = typeof e.iv < "u" ? d.fromString(e.iv, m) : le.randomBytes(X), s = new de.ChaCha20Poly1305(d.fromString(e.symKey, m)).seal(r, d.fromString(e.message, F));
      return Te({ type: n, sealed: s, iv: r, senderPublicKey: t });
    }
    function $n(e) {
      const n = new de.ChaCha20Poly1305(d.fromString(e.symKey, m)), { sealed: t, iv: r } = ne(e.encoded), s = n.open(r, t);
      if (s === null)
        throw new Error("Failed to decrypt");
      return d.toString(s, F);
    }
    function Te(e) {
      if (V(e.type) === _) {
        if (typeof e.senderPublicKey > "u")
          throw new Error("Missing sender public key for type 1 envelope");
        return d.toString(d.concat([e.type, e.senderPublicKey, e.iv, e.sealed]), q);
      }
      return d.toString(d.concat([e.type, e.iv, e.sealed]), q);
    }
    function ne(e) {
      const n = d.fromString(e, q), t = n.slice(wn, Oe), r = Oe;
      if (V(t) === _) {
        const l = r + ee, p = l + X, a = n.slice(r, l), u = n.slice(l, p), c = n.slice(p);
        return { type: t, sealed: c, iv: u, senderPublicKey: a };
      }
      const s = r + X, o = n.slice(r, s), i = n.slice(s);
      return { type: t, sealed: i, iv: o };
    }
    function Mn(e, n) {
      const t = ne(e);
      return Ae({ type: V(t.type), senderPublicKey: typeof t.senderPublicKey < "u" ? d.toString(t.senderPublicKey, m) : void 0, receiverPublicKey: n?.receiverPublicKey });
    }
    function Ae(e) {
      const n = e?.type || Z;
      if (n === _) {
        if (typeof e?.senderPublicKey > "u")
          throw new Error("missing sender public key");
        if (typeof e?.receiverPublicKey > "u")
          throw new Error("missing receiver public key");
      }
      return { type: n, senderPublicKey: e?.senderPublicKey, receiverPublicKey: e?.receiverPublicKey };
    }
    function kn(e) {
      return e.type === _ && typeof e.senderPublicKey == "string" && typeof e.receiverPublicKey == "string";
    }
    var Kn = Object.defineProperty;
    var Ie = Object.getOwnPropertySymbols;
    var Ln = Object.prototype.hasOwnProperty;
    var qn = Object.prototype.propertyIsEnumerable;
    var Pe = (e, n, t) => n in e ? Kn(e, n, { enumerable: true, configurable: true, writable: true, value: t }) : e[n] = t;
    var Re = (e, n) => {
      for (var t in n || (n = {}))
        Ln.call(n, t) && Pe(e, t, n[t]);
      if (Ie)
        for (var t of Ie(n))
          qn.call(n, t) && Pe(e, t, n[t]);
      return e;
    };
    var we = "ReactNative";
    var g = { reactNative: "react-native", node: "node", browser: "browser", unknown: "unknown" };
    var x = " ";
    var Fn = ":";
    var Ce = "/";
    var te = 2;
    var xn = 1e3;
    var _e = "js";
    function re() {
      return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u";
    }
    function H() {
      return !j.getDocument() && !!j.getNavigator() && navigator.product === we;
    }
    function B() {
      return !re() && !!j.getNavigator();
    }
    function P() {
      return H() ? g.reactNative : re() ? g.node : B() ? g.browser : g.unknown;
    }
    function Ue(e, n) {
      let t = M.parse(e);
      return t = Re(Re({}, t), n), e = M.stringify(t), e;
    }
    function Hn() {
      return En.getWindowMetadata() || { name: "", description: "", url: "", icons: [""] };
    }
    function Bn(e, n) {
      var t;
      const r = P(), s = { protocol: e, version: n, env: r };
      return r === "browser" && (s.host = ((t = j.getLocation()) == null ? void 0 : t.host) || "unknown"), s;
    }
    function je() {
      if (P() === g.reactNative && typeof global < "u" && typeof (global == null ? void 0 : global.Platform) < "u") {
        const { OS: t, Version: r } = global.Platform;
        return [t, r].join("-");
      }
      const e = vn.detect();
      if (e === null)
        return "unknown";
      const n = e.os ? e.os.replace(" ", "").toLowerCase() : "unknown";
      return e.type === "browser" ? [n, e.name, e.version].join("-") : [n, e.version].join("-");
    }
    function Ve() {
      var e;
      const n = P();
      return n === g.browser ? [n, ((e = j.getLocation()) == null ? void 0 : e.host) || "unknown"].join(":") : n;
    }
    function De(e, n, t) {
      const r = je(), s = Ve();
      return [[e, n].join("-"), [_e, t].join("-"), r, s].join("/");
    }
    function zn({ protocol: e, version: n, relayUrl: t, sdkVersion: r, auth: s, projectId: o, useOnCloseEvent: i }) {
      const l = t.split("?"), p = De(e, n, r), a = { auth: s, ua: p, projectId: o, useOnCloseEvent: i || void 0 }, u = Ue(l[1] || "", a);
      return l[0] + "?" + u;
    }
    function Yn(e) {
      let n = (e.match(/^[^:]+(?=:\/\/)/gi) || [])[0];
      const t = typeof n < "u" ? e.split("://")[1] : e;
      return n = n === "wss" ? "https" : "http", [n, t].join("://");
    }
    function Wn(e, n, t) {
      if (!e[n] || typeof e[n] !== t)
        throw new Error(`Missing or invalid "${n}" param`);
    }
    function $e(e, n = te) {
      return Me(e.split(Ce), n);
    }
    function Gn(e) {
      return $e(e).join(x);
    }
    function b(e, n) {
      return e.filter((t) => n.includes(t)).length === e.length;
    }
    function Me(e, n = te) {
      return e.slice(Math.max(e.length - n, 0));
    }
    function Jn(e) {
      return Object.fromEntries(e.entries());
    }
    function Qn(e) {
      return new Map(Object.entries(e));
    }
    function Zn(e, n) {
      const t = {};
      return Object.keys(e).forEach((r) => {
        t[r] = n(e[r]);
      }), t;
    }
    var Xn = (e) => e;
    function ke(e) {
      return e.trim().replace(/^\w/, (n) => n.toUpperCase());
    }
    function et(e) {
      return e.split(x).map((n) => ke(n)).join(x);
    }
    function nt(e = C.FIVE_MINUTES, n) {
      const t = C.toMiliseconds(e || C.FIVE_MINUTES);
      let r, s, o;
      return { resolve: (i) => {
        o && r && (clearTimeout(o), r(i));
      }, reject: (i) => {
        o && s && (clearTimeout(o), s(i));
      }, done: () => new Promise((i, l) => {
        o = setTimeout(() => {
          l(new Error(n));
        }, t), r = i, s = l;
      }) };
    }
    function tt(e, n, t) {
      return new Promise(async (r, s) => {
        const o = setTimeout(() => s(new Error(t)), n);
        try {
          const i = await e;
          r(i);
        } catch (i) {
          s(i);
        }
        clearTimeout(o);
      });
    }
    function se(e, n) {
      if (typeof n == "string" && n.startsWith(`${e}:`))
        return n;
      if (e.toLowerCase() === "topic") {
        if (typeof n != "string")
          throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${n}`;
      } else if (e.toLowerCase() === "id") {
        if (typeof n != "number")
          throw new Error('Value must be "number" for expirer target type: id');
        return `id:${n}`;
      }
      throw new Error(`Unknown expirer target type: ${e}`);
    }
    function rt(e) {
      return se("topic", e);
    }
    function st(e) {
      return se("id", e);
    }
    function ot(e) {
      const [n, t] = e.split(":"), r = { id: void 0, topic: void 0 };
      if (n === "topic" && typeof t == "string")
        r.topic = t;
      else if (n === "id" && Number.isInteger(Number(t)))
        r.id = Number(t);
      else
        throw new Error(`Invalid target, expected id:number or topic:string, got ${n}:${t}`);
      return r;
    }
    function it(e, n) {
      return C.fromMiliseconds((n || Date.now()) + C.toMiliseconds(e));
    }
    function at(e) {
      return Date.now() >= C.toMiliseconds(e);
    }
    function ct(e, n) {
      return `${e}${n ? `:${n}` : ""}`;
    }
    function O(e = [], n = []) {
      return [.../* @__PURE__ */ new Set([...e, ...n])];
    }
    async function ut({ id: e, topic: n, wcDeepLink: t }) {
      try {
        if (!t)
          return;
        const r = typeof t == "string" ? JSON.parse(t) : t;
        let s = r?.href;
        if (typeof s != "string")
          return;
        s.endsWith("/") && (s = s.slice(0, -1));
        const o = `${s}/wc?requestId=${e}&sessionTopic=${n}`, i = P();
        i === g.browser ? o.startsWith("https://") ? window.open(o, "_blank", "noreferrer noopener") : window.open(o, "_self", "noreferrer noopener") : i === g.reactNative && typeof (global == null ? void 0 : global.Linking) < "u" && await global.Linking.openURL(o);
      } catch (r) {
        console.error(r);
      }
    }
    var Ke = "irn";
    function dt(e) {
      return e?.relay || { protocol: Ke };
    }
    function lt(e) {
      const n = bn.RELAY_JSONRPC[e];
      if (typeof n > "u")
        throw new Error(`Relay Protocol not supported: ${e}`);
      return n;
    }
    var pt = Object.defineProperty;
    var Le = Object.getOwnPropertySymbols;
    var ft = Object.prototype.hasOwnProperty;
    var mt = Object.prototype.propertyIsEnumerable;
    var qe = (e, n, t) => n in e ? pt(e, n, { enumerable: true, configurable: true, writable: true, value: t }) : e[n] = t;
    var gt = (e, n) => {
      for (var t in n || (n = {}))
        ft.call(n, t) && qe(e, t, n[t]);
      if (Le)
        for (var t of Le(n))
          mt.call(n, t) && qe(e, t, n[t]);
      return e;
    };
    function Fe(e, n = "-") {
      const t = {}, r = "relay" + n;
      return Object.keys(e).forEach((s) => {
        if (s.startsWith(r)) {
          const o = s.replace(r, ""), i = e[s];
          t[o] = i;
        }
      }), t;
    }
    function yt(e) {
      const n = e.indexOf(":"), t = e.indexOf("?") !== -1 ? e.indexOf("?") : void 0, r = e.substring(0, n), s = e.substring(n + 1, t).split("@"), o = typeof t < "u" ? e.substring(t) : "", i = M.parse(o);
      return { protocol: r, topic: xe(s[0]), version: parseInt(s[1], 10), symKey: i.symKey, relay: Fe(i) };
    }
    function xe(e) {
      return e.startsWith("//") ? e.substring(2) : e;
    }
    function He(e, n = "-") {
      const t = "relay", r = {};
      return Object.keys(e).forEach((s) => {
        const o = t + n + s;
        e[s] && (r[o] = e[s]);
      }), r;
    }
    function ht(e) {
      return `${e.protocol}:${e.topic}@${e.version}?` + M.stringify(gt({ symKey: e.symKey }, He(e.relay)));
    }
    var vt = Object.defineProperty;
    var Et = Object.defineProperties;
    var Nt = Object.getOwnPropertyDescriptors;
    var Be = Object.getOwnPropertySymbols;
    var bt = Object.prototype.hasOwnProperty;
    var Ot = Object.prototype.propertyIsEnumerable;
    var ze = (e, n, t) => n in e ? vt(e, n, { enumerable: true, configurable: true, writable: true, value: t }) : e[n] = t;
    var St = (e, n) => {
      for (var t in n || (n = {}))
        bt.call(n, t) && ze(e, t, n[t]);
      if (Be)
        for (var t of Be(n))
          Ot.call(n, t) && ze(e, t, n[t]);
      return e;
    };
    var Tt = (e, n) => Et(e, Nt(n));
    function R(e) {
      const n = [];
      return e.forEach((t) => {
        const [r, s] = t.split(":");
        n.push(`${r}:${s}`);
      }), n;
    }
    function Ye(e) {
      const n = [];
      return Object.values(e).forEach((t) => {
        n.push(...R(t.accounts));
      }), n;
    }
    function We(e, n) {
      const t = [];
      return Object.values(e).forEach((r) => {
        R(r.accounts).includes(n) && t.push(...r.methods);
      }), t;
    }
    function Ge(e, n) {
      const t = [];
      return Object.values(e).forEach((r) => {
        R(r.accounts).includes(n) && t.push(...r.events);
      }), t;
    }
    function At(e, n) {
      const t = rn(e, n);
      if (t)
        throw new Error(t.message);
      const r = {};
      for (const [s, o] of Object.entries(e))
        r[s] = { methods: o.methods, events: o.events, chains: o.accounts.map((i) => `${i.split(":")[0]}:${i.split(":")[1]}`) };
      return r;
    }
    function It(e) {
      const { proposal: { requiredNamespaces: n, optionalNamespaces: t = {} }, supportedNamespaces: r } = e, s = ie(n), o = ie(t), i = {};
      Object.keys(r).forEach((a) => {
        const u = r[a].chains, c = r[a].methods, E = r[a].events, T = r[a].accounts;
        u.forEach((y) => {
          if (!T.some((f) => f.includes(y)))
            throw new Error(`No accounts provided for chain ${y} in namespace ${a}`);
        }), i[a] = { chains: u, methods: c, events: E, accounts: T };
      });
      const l = on(n, i, "approve()");
      if (l)
        throw new Error(l.message);
      const p = {};
      return !Object.keys(n).length && !Object.keys(t).length ? i : (Object.keys(s).forEach((a) => {
        const u = r[a].chains.filter((y) => {
          var f, v;
          return (v = (f = s[a]) == null ? void 0 : f.chains) == null ? void 0 : v.includes(y);
        }), c = r[a].methods.filter((y) => {
          var f, v;
          return (v = (f = s[a]) == null ? void 0 : f.methods) == null ? void 0 : v.includes(y);
        }), E = r[a].events.filter((y) => {
          var f, v;
          return (v = (f = s[a]) == null ? void 0 : f.events) == null ? void 0 : v.includes(y);
        }), T = u.map((y) => r[a].accounts.filter((f) => f.includes(`${y}:`))).flat();
        p[a] = { chains: u, methods: c, events: E, accounts: T };
      }), Object.keys(o).forEach((a) => {
        var u, c, E, T, y, f;
        if (!r[a])
          return;
        const v = (c = (u = o[a]) == null ? void 0 : u.chains) == null ? void 0 : c.filter((A) => r[a].chains.includes(A)), fn = r[a].methods.filter((A) => {
          var I, U;
          return (U = (I = o[a]) == null ? void 0 : I.methods) == null ? void 0 : U.includes(A);
        }), mn = r[a].events.filter((A) => {
          var I, U;
          return (U = (I = o[a]) == null ? void 0 : I.events) == null ? void 0 : U.includes(A);
        }), gn = v?.map((A) => r[a].accounts.filter((I) => I.includes(`${A}:`))).flat();
        p[a] = { chains: O((E = p[a]) == null ? void 0 : E.chains, v), methods: O((T = p[a]) == null ? void 0 : T.methods, fn), events: O((y = p[a]) == null ? void 0 : y.events, mn), accounts: O((f = p[a]) == null ? void 0 : f.accounts, gn) };
      }), p);
    }
    function oe(e) {
      return e.includes(":");
    }
    function Je(e) {
      return oe(e) ? e.split(":")[0] : e;
    }
    function ie(e) {
      var n, t, r;
      const s = {};
      if (!z(e))
        return s;
      for (const [o, i] of Object.entries(e)) {
        const l = oe(o) ? [o] : i.chains, p = i.methods || [], a = i.events || [], u = Je(o);
        s[u] = Tt(St({}, s[u]), { chains: O(l, (n = s[u]) == null ? void 0 : n.chains), methods: O(p, (t = s[u]) == null ? void 0 : t.methods), events: O(a, (r = s[u]) == null ? void 0 : r.events) });
      }
      return s;
    }
    var Pt = { INVALID_METHOD: { message: "Invalid method.", code: 1001 }, INVALID_EVENT: { message: "Invalid event.", code: 1002 }, INVALID_UPDATE_REQUEST: { message: "Invalid update request.", code: 1003 }, INVALID_EXTEND_REQUEST: { message: "Invalid extend request.", code: 1004 }, INVALID_SESSION_SETTLE_REQUEST: { message: "Invalid session settle request.", code: 1005 }, UNAUTHORIZED_METHOD: { message: "Unauthorized method.", code: 3001 }, UNAUTHORIZED_EVENT: { message: "Unauthorized event.", code: 3002 }, UNAUTHORIZED_UPDATE_REQUEST: { message: "Unauthorized update request.", code: 3003 }, UNAUTHORIZED_EXTEND_REQUEST: { message: "Unauthorized extend request.", code: 3004 }, USER_REJECTED: { message: "User rejected.", code: 5e3 }, USER_REJECTED_CHAINS: { message: "User rejected chains.", code: 5001 }, USER_REJECTED_METHODS: { message: "User rejected methods.", code: 5002 }, USER_REJECTED_EVENTS: { message: "User rejected events.", code: 5003 }, UNSUPPORTED_CHAINS: { message: "Unsupported chains.", code: 5100 }, UNSUPPORTED_METHODS: { message: "Unsupported methods.", code: 5101 }, UNSUPPORTED_EVENTS: { message: "Unsupported events.", code: 5102 }, UNSUPPORTED_ACCOUNTS: { message: "Unsupported accounts.", code: 5103 }, UNSUPPORTED_NAMESPACE_KEY: { message: "Unsupported namespace key.", code: 5104 }, USER_DISCONNECTED: { message: "User disconnected.", code: 6e3 }, SESSION_SETTLEMENT_FAILED: { message: "Session settlement failed.", code: 7e3 }, WC_METHOD_UNSUPPORTED: { message: "Unsupported wc_ method.", code: 10001 } };
    var Rt = { NOT_INITIALIZED: { message: "Not initialized.", code: 1 }, NO_MATCHING_KEY: { message: "No matching key.", code: 2 }, RESTORE_WILL_OVERRIDE: { message: "Restore will override.", code: 3 }, RESUBSCRIBED: { message: "Resubscribed.", code: 4 }, MISSING_OR_INVALID: { message: "Missing or invalid.", code: 5 }, EXPIRED: { message: "Expired.", code: 6 }, UNKNOWN_TYPE: { message: "Unknown type.", code: 7 }, MISMATCHED_TOPIC: { message: "Mismatched topic.", code: 8 }, NON_CONFORMING_NAMESPACES: { message: "Non conforming namespaces.", code: 9 } };
    function N(e, n) {
      const { message: t, code: r } = Rt[e];
      return { message: n ? `${t} ${n}` : t, code: r };
    }
    function w(e, n) {
      const { message: t, code: r } = Pt[e];
      return { message: n ? `${t} ${n}` : t, code: r };
    }
    function D(e, n) {
      return Array.isArray(e) ? typeof n < "u" && e.length ? e.every(n) : true : false;
    }
    function z(e) {
      return Object.getPrototypeOf(e) === Object.prototype && Object.keys(e).length;
    }
    function S(e) {
      return typeof e > "u";
    }
    function h(e, n) {
      return n && S(e) ? true : typeof e == "string" && !!e.trim().length;
    }
    function Y(e, n) {
      return n && S(e) ? true : typeof e == "number" && !isNaN(e);
    }
    function wt(e, n) {
      const { requiredNamespaces: t } = n, r = Object.keys(e.namespaces), s = Object.keys(t);
      let o = true;
      return b(s, r) ? (r.forEach((i) => {
        const { accounts: l, methods: p, events: a } = e.namespaces[i], u = R(l), c = t[i];
        (!b(K(i, c), u) || !b(c.methods, p) || !b(c.events, a)) && (o = false);
      }), o) : false;
    }
    function $(e) {
      return h(e, false) && e.includes(":") ? e.split(":").length === 2 : false;
    }
    function Qe(e) {
      if (h(e, false) && e.includes(":")) {
        const n = e.split(":");
        if (n.length === 3) {
          const t = n[0] + ":" + n[1];
          return !!n[2] && $(t);
        }
      }
      return false;
    }
    function Ct(e) {
      if (h(e, false))
        try {
          return typeof new URL(e) < "u";
        } catch {
          return false;
        }
      return false;
    }
    function _t(e) {
      var n;
      return (n = e?.proposer) == null ? void 0 : n.publicKey;
    }
    function Ut(e) {
      return e?.topic;
    }
    function jt(e, n) {
      let t = null;
      return h(e?.publicKey, false) || (t = N("MISSING_OR_INVALID", `${n} controller public key should be a string`)), t;
    }
    function ae(e) {
      let n = true;
      return D(e) ? e.length && (n = e.every((t) => h(t, false))) : n = false, n;
    }
    function Ze(e, n, t) {
      let r = null;
      return D(n) && n.length ? n.forEach((s) => {
        r || $(s) || (r = w("UNSUPPORTED_CHAINS", `${t}, chain ${s} should be a string and conform to "namespace:chainId" format`));
      }) : $(e) || (r = w("UNSUPPORTED_CHAINS", `${t}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)), r;
    }
    function Xe(e, n, t) {
      let r = null;
      return Object.entries(e).forEach(([s, o]) => {
        if (r)
          return;
        const i = Ze(s, K(s, o), `${n} ${t}`);
        i && (r = i);
      }), r;
    }
    function en(e, n) {
      let t = null;
      return D(e) ? e.forEach((r) => {
        t || Qe(r) || (t = w("UNSUPPORTED_ACCOUNTS", `${n}, account ${r} should be a string and conform to "namespace:chainId:address" format`));
      }) : t = w("UNSUPPORTED_ACCOUNTS", `${n}, accounts should be an array of strings conforming to "namespace:chainId:address" format`), t;
    }
    function nn(e, n) {
      let t = null;
      return Object.values(e).forEach((r) => {
        if (t)
          return;
        const s = en(r?.accounts, `${n} namespace`);
        s && (t = s);
      }), t;
    }
    function tn(e, n) {
      let t = null;
      return ae(e?.methods) ? ae(e?.events) || (t = w("UNSUPPORTED_EVENTS", `${n}, events should be an array of strings or empty array for no events`)) : t = w("UNSUPPORTED_METHODS", `${n}, methods should be an array of strings or empty array for no methods`), t;
    }
    function ce(e, n) {
      let t = null;
      return Object.values(e).forEach((r) => {
        if (t)
          return;
        const s = tn(r, `${n}, namespace`);
        s && (t = s);
      }), t;
    }
    function Vt(e, n, t) {
      let r = null;
      if (e && z(e)) {
        const s = ce(e, n);
        s && (r = s);
        const o = Xe(e, n, t);
        o && (r = o);
      } else
        r = N("MISSING_OR_INVALID", `${n}, ${t} should be an object with data`);
      return r;
    }
    function rn(e, n) {
      let t = null;
      if (e && z(e)) {
        const r = ce(e, n);
        r && (t = r);
        const s = nn(e, n);
        s && (t = s);
      } else
        t = N("MISSING_OR_INVALID", `${n}, namespaces should be an object with data`);
      return t;
    }
    function sn(e) {
      return h(e.protocol, true);
    }
    function Dt(e, n) {
      let t = false;
      return n && !e ? t = true : e && D(e) && e.length && e.forEach((r) => {
        t = sn(r);
      }), t;
    }
    function $t(e) {
      return typeof e == "number";
    }
    function Mt(e) {
      return typeof e < "u" && typeof e !== null;
    }
    function kt(e) {
      return !(!e || typeof e != "object" || !e.code || !Y(e.code, false) || !e.message || !h(e.message, false));
    }
    function Kt(e) {
      return !(S(e) || !h(e.method, false));
    }
    function Lt(e) {
      return !(S(e) || S(e.result) && S(e.error) || !Y(e.id, false) || !h(e.jsonrpc, false));
    }
    function qt(e) {
      return !(S(e) || !h(e.name, false));
    }
    function Ft(e, n) {
      return !(!$(n) || !Ye(e).includes(n));
    }
    function xt(e, n, t) {
      return h(t, false) ? We(e, n).includes(t) : false;
    }
    function Ht(e, n, t) {
      return h(t, false) ? Ge(e, n).includes(t) : false;
    }
    function on(e, n, t) {
      let r = null;
      const s = Bt(e), o = zt(n), i = Object.keys(s), l = Object.keys(o), p = an(Object.keys(e)), a = an(Object.keys(n)), u = p.filter((c) => !a.includes(c));
      return u.length && (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(n).toString()}`)), b(i, l) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces chains don't satisfy required namespaces.
      Required: ${i.toString()}
      Approved: ${l.toString()}`)), Object.keys(n).forEach((c) => {
        if (!c.includes(":") || r)
          return;
        const E = R(n[c].accounts);
        E.includes(c) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces accounts don't satisfy namespace accounts for ${c}
        Required: ${c}
        Approved: ${E.toString()}`));
      }), i.forEach((c) => {
        r || (b(s[c].methods, o[c].methods) ? b(s[c].events, o[c].events) || (r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces events don't satisfy namespace events for ${c}`)) : r = N("NON_CONFORMING_NAMESPACES", `${t} namespaces methods don't satisfy namespace methods for ${c}`));
      }), r;
    }
    function Bt(e) {
      const n = {};
      return Object.keys(e).forEach((t) => {
        var r;
        t.includes(":") ? n[t] = e[t] : (r = e[t].chains) == null || r.forEach((s) => {
          n[s] = { methods: e[t].methods, events: e[t].events };
        });
      }), n;
    }
    function an(e) {
      return [...new Set(e.map((n) => n.includes(":") ? n.split(":")[0] : n))];
    }
    function zt(e) {
      const n = {};
      return Object.keys(e).forEach((t) => {
        if (t.includes(":"))
          n[t] = e[t];
        else {
          const r = R(e[t].accounts);
          r?.forEach((s) => {
            n[s] = { accounts: e[t].accounts.filter((o) => o.includes(`${s}:`)), methods: e[t].methods, events: e[t].events };
          });
        }
      }), n;
    }
    function Yt(e, n) {
      return Y(e, false) && e <= n.max && e >= n.min;
    }
    function Wt() {
      const e = P();
      return new Promise((n) => {
        switch (e) {
          case g.browser:
            n(cn());
            break;
          case g.reactNative:
            n(un());
            break;
          case g.node:
            n(dn());
            break;
          default:
            n(true);
        }
      });
    }
    function cn() {
      return B() && navigator?.onLine;
    }
    async function un() {
      if (H() && typeof global < "u" && global != null && global.NetInfo) {
        const e = await (global == null ? void 0 : global.NetInfo.fetch());
        return e?.isConnected;
      }
      return true;
    }
    function dn() {
      return true;
    }
    function Gt(e) {
      switch (P()) {
        case g.browser:
          ln(e);
          break;
        case g.reactNative:
          pn(e);
          break;
        case g.node:
          break;
      }
    }
    function ln(e) {
      B() && (window.addEventListener("online", () => e(true)), window.addEventListener("offline", () => e(false)));
    }
    function pn(e) {
      H() && typeof global < "u" && global != null && global.NetInfo && global?.NetInfo.addEventListener((n) => e(n?.isConnected));
    }
    var ue = {};
    var Jt = class {
      static get(n) {
        return ue[n];
      }
      static set(n, t) {
        ue[n] = t;
      }
      static delete(n) {
        delete ue[n];
      }
    };
    exports.BASE10 = Q, exports.BASE16 = m, exports.BASE64 = q, exports.COLON = Fn, exports.DEFAULT_DEPTH = te, exports.EMPTY_SPACE = x, exports.ENV_MAP = g, exports.MemoryStore = Jt, exports.ONE_THOUSAND = xn, exports.REACT_NATIVE_PRODUCT = we, exports.RELAYER_DEFAULT_PROTOCOL = Ke, exports.SDK_TYPE = _e, exports.SLASH = Ce, exports.TYPE_0 = Z, exports.TYPE_1 = _, exports.UTF8 = F, exports.appendToQueryString = Ue, exports.assertType = Wn, exports.buildApprovedNamespaces = It, exports.calcExpiry = it, exports.capitalize = et, exports.capitalizeWord = ke, exports.createDelayedPromise = nt, exports.createExpiringPromise = tt, exports.decodeTypeByte = V, exports.decrypt = $n, exports.deriveSymKey = Un, exports.deserialize = ne, exports.encodeTypeByte = Se, exports.encrypt = Dn, exports.engineEvent = ct, exports.enumify = Xn, exports.formatAccountId = ye, exports.formatAccountWithChain = On, exports.formatChainId = ge, exports.formatExpirerTarget = se, exports.formatIdTarget = st, exports.formatMessage = Rn, exports.formatMessageContext = Gn, exports.formatRelayParams = He, exports.formatRelayRpcUrl = zn, exports.formatTopicTarget = rt, exports.formatUA = De, exports.formatUri = ht, exports.generateKeyPair = Cn, exports.generateRandomBytes32 = _n, exports.getAccountsChains = R, exports.getAccountsFromNamespaces = Tn, exports.getAddressFromAccount = he, exports.getAddressesFromAccounts = Sn, exports.getAppMetadata = Hn, exports.getBrowserOnlineStatus = cn, exports.getChainFromAccount = ve, exports.getChainsFromAccounts = Ee, exports.getChainsFromNamespace = K, exports.getChainsFromNamespaces = An, exports.getChainsFromRequiredNamespaces = In, exports.getDidAddress = be, exports.getDidAddressSegments = L, exports.getDidChainId = Ne, exports.getEnvironment = P, exports.getHttpUrl = Yn, exports.getInternalError = N, exports.getJavascriptID = Ve, exports.getJavascriptOS = je, exports.getLastItems = Me, exports.getNamespacedDidChainId = Pn, exports.getNamespacesChains = Ye, exports.getNamespacesEventsForChainId = Ge, exports.getNamespacesMethodsForChainId = We, exports.getNodeOnlineStatus = dn, exports.getReactNativeOnlineStatus = un, exports.getRelayClientMetadata = Bn, exports.getRelayProtocolApi = lt, exports.getRelayProtocolName = dt, exports.getRequiredNamespacesFromNamespaces = At, exports.getSdkError = w, exports.getUniqueValues = J, exports.handleDeeplinkRedirect = ut, exports.hasOverlap = b, exports.hashKey = jn, exports.hashMessage = Vn, exports.isBrowser = B, exports.isCaipNamespace = oe, exports.isConformingNamespaces = on, exports.isExpired = at, exports.isNode = re, exports.isOnline = Wt, exports.isProposalStruct = _t, exports.isReactNative = H, exports.isSessionCompatible = wt, exports.isSessionStruct = Ut, exports.isTypeOneEnvelope = kn, exports.isUndefined = S, exports.isValidAccountId = Qe, exports.isValidAccounts = en, exports.isValidActions = tn, exports.isValidArray = D, exports.isValidChainId = $, exports.isValidChains = Ze, exports.isValidController = jt, exports.isValidErrorReason = kt, exports.isValidEvent = qt, exports.isValidId = $t, exports.isValidNamespaceAccounts = nn, exports.isValidNamespaceActions = ce, exports.isValidNamespaceChains = Xe, exports.isValidNamespaceMethodsOrEvents = ae, exports.isValidNamespaces = rn, exports.isValidNamespacesChainId = Ft, exports.isValidNamespacesEvent = Ht, exports.isValidNamespacesRequest = xt, exports.isValidNumber = Y, exports.isValidObject = z, exports.isValidParams = Mt, exports.isValidRelay = sn, exports.isValidRelays = Dt, exports.isValidRequest = Kt, exports.isValidRequestExpiry = Yt, exports.isValidRequiredNamespaces = Vt, exports.isValidResponse = Lt, exports.isValidString = h, exports.isValidUrl = Ct, exports.mapEntries = Zn, exports.mapToObj = Jn, exports.mergeArrays = O, exports.normalizeNamespaces = ie, exports.objToMap = Qn, exports.parseAccountId = G, exports.parseChainId = me, exports.parseContextNames = $e, exports.parseExpirerTarget = ot, exports.parseNamespaceKey = Je, exports.parseRelayParams = Fe, exports.parseTopic = xe, exports.parseUri = yt, exports.serialize = Te, exports.subscribeToBrowserNetworkChange = ln, exports.subscribeToNetworkChange = Gt, exports.subscribeToReactNativeNetworkChange = pn, exports.validateDecoding = Mn, exports.validateEncoding = Ae;
  }
});

export {
  require_binary,
  require_wipe,
  require_random,
  concat,
  init_concat,
  fromString2 as fromString,
  init_from_string,
  toString2 as toString,
  init_to_string,
  src_exports,
  init_src2 as init_src,
  require_cjs3 as require_cjs,
  require_index_cjs
};
