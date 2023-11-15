"use client";
import {
  require_events
} from "./chunk-2PXF543L.js";
import {
  require_tslib
} from "./chunk-RAEXENFV.js";
import {
  __commonJS,
  __esm,
  __export,
  __reExport,
  __toESM
} from "./chunk-O3ZY5NC2.js";

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js
var PARSE_ERROR, INVALID_REQUEST, METHOD_NOT_FOUND, INVALID_PARAMS, INTERNAL_ERROR, SERVER_ERROR, RESERVED_ERROR_CODES, SERVER_ERROR_CODE_RANGE, STANDARD_ERROR_MAP, DEFAULT_ERROR;
var init_constants = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/constants.js"() {
    PARSE_ERROR = "PARSE_ERROR";
    INVALID_REQUEST = "INVALID_REQUEST";
    METHOD_NOT_FOUND = "METHOD_NOT_FOUND";
    INVALID_PARAMS = "INVALID_PARAMS";
    INTERNAL_ERROR = "INTERNAL_ERROR";
    SERVER_ERROR = "SERVER_ERROR";
    RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603];
    SERVER_ERROR_CODE_RANGE = [-32e3, -32099];
    STANDARD_ERROR_MAP = {
      [PARSE_ERROR]: { code: -32700, message: "Parse error" },
      [INVALID_REQUEST]: { code: -32600, message: "Invalid Request" },
      [METHOD_NOT_FOUND]: { code: -32601, message: "Method not found" },
      [INVALID_PARAMS]: { code: -32602, message: "Invalid params" },
      [INTERNAL_ERROR]: { code: -32603, message: "Internal error" },
      [SERVER_ERROR]: { code: -32e3, message: "Server error" }
    };
    DEFAULT_ERROR = SERVER_ERROR;
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js
function isServerErrorCode(code) {
  return code <= SERVER_ERROR_CODE_RANGE[0] && code >= SERVER_ERROR_CODE_RANGE[1];
}
function isReservedErrorCode(code) {
  return RESERVED_ERROR_CODES.includes(code);
}
function isValidErrorCode(code) {
  return typeof code === "number";
}
function getError(type) {
  if (!Object.keys(STANDARD_ERROR_MAP).includes(type)) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return STANDARD_ERROR_MAP[type];
}
function getErrorByCode(code) {
  const match = Object.values(STANDARD_ERROR_MAP).find((e) => e.code === code);
  if (!match) {
    return STANDARD_ERROR_MAP[DEFAULT_ERROR];
  }
  return match;
}
function validateJsonRpcError(response) {
  if (typeof response.error.code === "undefined") {
    return { valid: false, error: "Missing code for JSON-RPC error" };
  }
  if (typeof response.error.message === "undefined") {
    return { valid: false, error: "Missing message for JSON-RPC error" };
  }
  if (!isValidErrorCode(response.error.code)) {
    return {
      valid: false,
      error: `Invalid error code type for JSON-RPC: ${response.error.code}`
    };
  }
  if (isReservedErrorCode(response.error.code)) {
    const error = getErrorByCode(response.error.code);
    if (error.message !== STANDARD_ERROR_MAP[DEFAULT_ERROR].message && response.error.message === error.message) {
      return {
        valid: false,
        error: `Invalid error code message for JSON-RPC: ${response.error.code}`
      };
    }
  }
  return { valid: true };
}
function parseConnectionError(e, url, type) {
  return e.message.includes("getaddrinfo ENOTFOUND") || e.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${type} RPC url at ${url}`) : e;
}
var init_error = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/error.js"() {
    init_constants();
  }
});

// node_modules/@walletconnect/environment/dist/cjs/crypto.js
var require_crypto = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/crypto.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowserCryptoAvailable = exports.getSubtleCrypto = exports.getBrowerCrypto = void 0;
    function getBrowerCrypto() {
      return (global === null || global === void 0 ? void 0 : global.crypto) || (global === null || global === void 0 ? void 0 : global.msCrypto) || {};
    }
    exports.getBrowerCrypto = getBrowerCrypto;
    function getSubtleCrypto() {
      const browserCrypto = getBrowerCrypto();
      return browserCrypto.subtle || browserCrypto.webkitSubtle;
    }
    exports.getSubtleCrypto = getSubtleCrypto;
    function isBrowserCryptoAvailable() {
      return !!getBrowerCrypto() && !!getSubtleCrypto();
    }
    exports.isBrowserCryptoAvailable = isBrowserCryptoAvailable;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/env.js
var require_env = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/env.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.isBrowser = exports.isNode = exports.isReactNative = void 0;
    function isReactNative() {
      return typeof document === "undefined" && typeof navigator !== "undefined" && navigator.product === "ReactNative";
    }
    exports.isReactNative = isReactNative;
    function isNode2() {
      return typeof process !== "undefined" && typeof process.versions !== "undefined" && typeof process.versions.node !== "undefined";
    }
    exports.isNode = isNode2;
    function isBrowser() {
      return !isReactNative() && !isNode2();
    }
    exports.isBrowser = isBrowser;
  }
});

// node_modules/@walletconnect/environment/dist/cjs/index.js
var require_cjs = __commonJS({
  "node_modules/@walletconnect/environment/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_crypto(), exports);
    tslib_1.__exportStar(require_env(), exports);
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js
var env_exports = {};
__export(env_exports, {
  isNodeJs: () => isNodeJs
});
var import_environment, isNodeJs;
var init_env = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/env.js"() {
    import_environment = __toESM(require_cjs());
    __reExport(env_exports, __toESM(require_cjs()));
    isNodeJs = import_environment.isNode;
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js
function payloadId(entropy = 3) {
  const date = Date.now() * Math.pow(10, entropy);
  const extra = Math.floor(Math.random() * Math.pow(10, entropy));
  return date + extra;
}
function getBigIntRpcId(entropy = 6) {
  return BigInt(payloadId(entropy));
}
function formatJsonRpcRequest(method, params, id) {
  return {
    id: id || payloadId(),
    jsonrpc: "2.0",
    method,
    params
  };
}
function formatJsonRpcResult(id, result) {
  return {
    id,
    jsonrpc: "2.0",
    result
  };
}
function formatJsonRpcError(id, error, data) {
  return {
    id,
    jsonrpc: "2.0",
    error: formatErrorMessage(error, data)
  };
}
function formatErrorMessage(error, data) {
  if (typeof error === "undefined") {
    return getError(INTERNAL_ERROR);
  }
  if (typeof error === "string") {
    error = Object.assign(Object.assign({}, getError(SERVER_ERROR)), { message: error });
  }
  if (typeof data !== "undefined") {
    error.data = data;
  }
  if (isReservedErrorCode(error.code)) {
    error = getErrorByCode(error.code);
  }
  return error;
}
var init_format = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/format.js"() {
    init_error();
    init_constants();
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js
function isValidRoute(route) {
  if (route.includes("*")) {
    return isValidWildcardRoute(route);
  }
  if (/\W/g.test(route)) {
    return false;
  }
  return true;
}
function isValidDefaultRoute(route) {
  return route === "*";
}
function isValidWildcardRoute(route) {
  if (isValidDefaultRoute(route)) {
    return true;
  }
  if (!route.includes("*")) {
    return false;
  }
  if (route.split("*").length !== 2) {
    return false;
  }
  if (route.split("*").filter((x) => x.trim() === "").length !== 1) {
    return false;
  }
  return true;
}
function isValidLeadingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[0].trim();
}
function isValidTrailingWildcardRoute(route) {
  return !isValidDefaultRoute(route) && isValidWildcardRoute(route) && !route.split("*")[1].trim();
}
var init_routing = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/routing.js"() {
  }
});

// node_modules/@walletconnect/jsonrpc-types/dist/esm/jsonrpc.js
var init_jsonrpc = __esm({
  "node_modules/@walletconnect/jsonrpc-types/dist/esm/jsonrpc.js"() {
  }
});

// node_modules/@walletconnect/jsonrpc-types/dist/esm/misc.js
var IEvents;
var init_misc = __esm({
  "node_modules/@walletconnect/jsonrpc-types/dist/esm/misc.js"() {
    IEvents = class {
    };
  }
});

// node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js
var IJsonRpcConnection, IBaseJsonRpcProvider, IJsonRpcProvider;
var init_provider = __esm({
  "node_modules/@walletconnect/jsonrpc-types/dist/esm/provider.js"() {
    init_misc();
    IJsonRpcConnection = class extends IEvents {
      constructor(opts) {
        super();
      }
    };
    IBaseJsonRpcProvider = class extends IEvents {
      constructor() {
        super();
      }
    };
    IJsonRpcProvider = class extends IBaseJsonRpcProvider {
      constructor(connection) {
        super();
      }
    };
  }
});

// node_modules/@walletconnect/jsonrpc-types/dist/esm/validator.js
var init_validator = __esm({
  "node_modules/@walletconnect/jsonrpc-types/dist/esm/validator.js"() {
  }
});

// node_modules/@walletconnect/jsonrpc-types/dist/esm/index.js
var init_esm = __esm({
  "node_modules/@walletconnect/jsonrpc-types/dist/esm/index.js"() {
    init_jsonrpc();
    init_misc();
    init_provider();
    init_validator();
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js
var init_types = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/types.js"() {
    init_esm();
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js
function getUrlProtocol(url) {
  const matches = url.match(new RegExp(/^\w+:/, "gi"));
  if (!matches || !matches.length)
    return;
  return matches[0];
}
function matchRegexProtocol(url, regex) {
  const protocol = getUrlProtocol(url);
  if (typeof protocol === "undefined")
    return false;
  return new RegExp(regex).test(protocol);
}
function isHttpUrl(url) {
  return matchRegexProtocol(url, HTTP_REGEX);
}
function isWsUrl(url) {
  return matchRegexProtocol(url, WS_REGEX);
}
function isLocalhostUrl(url) {
  return new RegExp("wss?://localhost(:d{2,5})?").test(url);
}
var HTTP_REGEX, WS_REGEX;
var init_url = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/url.js"() {
    HTTP_REGEX = "^https?:";
    WS_REGEX = "^wss?:";
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js
function isJsonRpcPayload(payload) {
  return typeof payload === "object" && "id" in payload && "jsonrpc" in payload && payload.jsonrpc === "2.0";
}
function isJsonRpcRequest(payload) {
  return isJsonRpcPayload(payload) && "method" in payload;
}
function isJsonRpcResponse(payload) {
  return isJsonRpcPayload(payload) && (isJsonRpcResult(payload) || isJsonRpcError(payload));
}
function isJsonRpcResult(payload) {
  return "result" in payload;
}
function isJsonRpcError(payload) {
  return "error" in payload;
}
function isJsonRpcValidationInvalid(validation) {
  return "error" in validation && validation.valid === false;
}
var init_validators = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/validators.js"() {
  }
});

// node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js
var esm_exports = {};
__export(esm_exports, {
  DEFAULT_ERROR: () => DEFAULT_ERROR,
  IBaseJsonRpcProvider: () => IBaseJsonRpcProvider,
  IEvents: () => IEvents,
  IJsonRpcConnection: () => IJsonRpcConnection,
  IJsonRpcProvider: () => IJsonRpcProvider,
  INTERNAL_ERROR: () => INTERNAL_ERROR,
  INVALID_PARAMS: () => INVALID_PARAMS,
  INVALID_REQUEST: () => INVALID_REQUEST,
  METHOD_NOT_FOUND: () => METHOD_NOT_FOUND,
  PARSE_ERROR: () => PARSE_ERROR,
  RESERVED_ERROR_CODES: () => RESERVED_ERROR_CODES,
  SERVER_ERROR: () => SERVER_ERROR,
  SERVER_ERROR_CODE_RANGE: () => SERVER_ERROR_CODE_RANGE,
  STANDARD_ERROR_MAP: () => STANDARD_ERROR_MAP,
  formatErrorMessage: () => formatErrorMessage,
  formatJsonRpcError: () => formatJsonRpcError,
  formatJsonRpcRequest: () => formatJsonRpcRequest,
  formatJsonRpcResult: () => formatJsonRpcResult,
  getBigIntRpcId: () => getBigIntRpcId,
  getError: () => getError,
  getErrorByCode: () => getErrorByCode,
  isHttpUrl: () => isHttpUrl,
  isJsonRpcError: () => isJsonRpcError,
  isJsonRpcPayload: () => isJsonRpcPayload,
  isJsonRpcRequest: () => isJsonRpcRequest,
  isJsonRpcResponse: () => isJsonRpcResponse,
  isJsonRpcResult: () => isJsonRpcResult,
  isJsonRpcValidationInvalid: () => isJsonRpcValidationInvalid,
  isLocalhostUrl: () => isLocalhostUrl,
  isNodeJs: () => isNodeJs,
  isReservedErrorCode: () => isReservedErrorCode,
  isServerErrorCode: () => isServerErrorCode,
  isValidDefaultRoute: () => isValidDefaultRoute,
  isValidErrorCode: () => isValidErrorCode,
  isValidLeadingWildcardRoute: () => isValidLeadingWildcardRoute,
  isValidRoute: () => isValidRoute,
  isValidTrailingWildcardRoute: () => isValidTrailingWildcardRoute,
  isValidWildcardRoute: () => isValidWildcardRoute,
  isWsUrl: () => isWsUrl,
  parseConnectionError: () => parseConnectionError,
  payloadId: () => payloadId,
  validateJsonRpcError: () => validateJsonRpcError
});
var init_esm2 = __esm({
  "node_modules/@walletconnect/jsonrpc-utils/dist/esm/index.js"() {
    init_constants();
    init_error();
    init_env();
    __reExport(esm_exports, env_exports);
    init_format();
    init_routing();
    init_types();
    init_url();
    init_validators();
  }
});

// node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js
var import_events, JsonRpcProvider, provider_default;
var init_provider2 = __esm({
  "node_modules/@walletconnect/jsonrpc-provider/dist/esm/provider.js"() {
    import_events = __toESM(require_events());
    init_esm2();
    JsonRpcProvider = class extends IJsonRpcProvider {
      constructor(connection) {
        super(connection);
        this.events = new import_events.EventEmitter();
        this.hasRegisteredEventListeners = false;
        this.connection = this.setConnection(connection);
        if (this.connection.connected) {
          this.registerEventListeners();
        }
      }
      async connect(connection = this.connection) {
        await this.open(connection);
      }
      async disconnect() {
        await this.close();
      }
      on(event, listener) {
        this.events.on(event, listener);
      }
      once(event, listener) {
        this.events.once(event, listener);
      }
      off(event, listener) {
        this.events.off(event, listener);
      }
      removeListener(event, listener) {
        this.events.removeListener(event, listener);
      }
      async request(request, context) {
        return this.requestStrict(formatJsonRpcRequest(request.method, request.params || [], request.id || getBigIntRpcId().toString()), context);
      }
      async requestStrict(request, context) {
        return new Promise(async (resolve, reject) => {
          if (!this.connection.connected) {
            try {
              await this.open();
            } catch (e) {
              reject(e);
            }
          }
          this.events.on(`${request.id}`, (response) => {
            if (isJsonRpcError(response)) {
              reject(response.error);
            } else {
              resolve(response.result);
            }
          });
          try {
            await this.connection.send(request, context);
          } catch (e) {
            reject(e);
          }
        });
      }
      setConnection(connection = this.connection) {
        return connection;
      }
      onPayload(payload) {
        this.events.emit("payload", payload);
        if (isJsonRpcResponse(payload)) {
          this.events.emit(`${payload.id}`, payload);
        } else {
          this.events.emit("message", {
            type: payload.method,
            data: payload.params
          });
        }
      }
      onClose(event) {
        if (event && event.code === 3e3) {
          this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${event.code} ${event.reason ? `(${event.reason})` : ""}`));
        }
        this.events.emit("disconnect");
      }
      async open(connection = this.connection) {
        if (this.connection === connection && this.connection.connected)
          return;
        if (this.connection.connected)
          this.close();
        if (typeof connection === "string") {
          await this.connection.open(connection);
          connection = this.connection;
        }
        this.connection = this.setConnection(connection);
        await this.connection.open();
        this.registerEventListeners();
        this.events.emit("connect");
      }
      async close() {
        await this.connection.close();
      }
      registerEventListeners() {
        if (this.hasRegisteredEventListeners)
          return;
        this.connection.on("payload", (payload) => this.onPayload(payload));
        this.connection.on("close", (event) => this.onClose(event));
        this.connection.on("error", (error) => this.events.emit("error", error));
        this.connection.on("register_error", (error) => this.onClose());
        this.hasRegisteredEventListeners = true;
      }
    };
    provider_default = JsonRpcProvider;
  }
});

// node_modules/@walletconnect/jsonrpc-provider/dist/esm/index.js
var esm_exports2 = {};
__export(esm_exports2, {
  JsonRpcProvider: () => JsonRpcProvider,
  default: () => esm_default
});
var esm_default;
var init_esm3 = __esm({
  "node_modules/@walletconnect/jsonrpc-provider/dist/esm/index.js"() {
    init_provider2();
    init_provider2();
    esm_default = provider_default;
  }
});

// node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js
var require_browser_ponyfill = __commonJS({
  "node_modules/@walletconnect/jsonrpc-http-connection/node_modules/cross-fetch/dist/browser-ponyfill.js"(exports, module) {
    var global2 = typeof self !== "undefined" ? self : exports;
    var __self__ = function() {
      function F() {
        this.fetch = false;
        this.DOMException = global2.DOMException;
      }
      F.prototype = global2;
      return new F();
    }();
    (function(self2) {
      var irrelevant = function(exports2) {
        var support = {
          searchParams: "URLSearchParams" in self2,
          iterable: "Symbol" in self2 && "iterator" in Symbol,
          blob: "FileReader" in self2 && "Blob" in self2 && function() {
            try {
              new Blob();
              return true;
            } catch (e) {
              return false;
            }
          }(),
          formData: "FormData" in self2,
          arrayBuffer: "ArrayBuffer" in self2
        };
        function isDataView(obj) {
          return obj && DataView.prototype.isPrototypeOf(obj);
        }
        if (support.arrayBuffer) {
          var viewClasses = [
            "[object Int8Array]",
            "[object Uint8Array]",
            "[object Uint8ClampedArray]",
            "[object Int16Array]",
            "[object Uint16Array]",
            "[object Int32Array]",
            "[object Uint32Array]",
            "[object Float32Array]",
            "[object Float64Array]"
          ];
          var isArrayBufferView = ArrayBuffer.isView || function(obj) {
            return obj && viewClasses.indexOf(Object.prototype.toString.call(obj)) > -1;
          };
        }
        function normalizeName(name) {
          if (typeof name !== "string") {
            name = String(name);
          }
          if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
            throw new TypeError("Invalid character in header field name");
          }
          return name.toLowerCase();
        }
        function normalizeValue(value) {
          if (typeof value !== "string") {
            value = String(value);
          }
          return value;
        }
        function iteratorFor(items) {
          var iterator = {
            next: function() {
              var value = items.shift();
              return { done: value === void 0, value };
            }
          };
          if (support.iterable) {
            iterator[Symbol.iterator] = function() {
              return iterator;
            };
          }
          return iterator;
        }
        function Headers(headers) {
          this.map = {};
          if (headers instanceof Headers) {
            headers.forEach(function(value, name) {
              this.append(name, value);
            }, this);
          } else if (Array.isArray(headers)) {
            headers.forEach(function(header) {
              this.append(header[0], header[1]);
            }, this);
          } else if (headers) {
            Object.getOwnPropertyNames(headers).forEach(function(name) {
              this.append(name, headers[name]);
            }, this);
          }
        }
        Headers.prototype.append = function(name, value) {
          name = normalizeName(name);
          value = normalizeValue(value);
          var oldValue = this.map[name];
          this.map[name] = oldValue ? oldValue + ", " + value : value;
        };
        Headers.prototype["delete"] = function(name) {
          delete this.map[normalizeName(name)];
        };
        Headers.prototype.get = function(name) {
          name = normalizeName(name);
          return this.has(name) ? this.map[name] : null;
        };
        Headers.prototype.has = function(name) {
          return this.map.hasOwnProperty(normalizeName(name));
        };
        Headers.prototype.set = function(name, value) {
          this.map[normalizeName(name)] = normalizeValue(value);
        };
        Headers.prototype.forEach = function(callback, thisArg) {
          for (var name in this.map) {
            if (this.map.hasOwnProperty(name)) {
              callback.call(thisArg, this.map[name], name, this);
            }
          }
        };
        Headers.prototype.keys = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push(name);
          });
          return iteratorFor(items);
        };
        Headers.prototype.values = function() {
          var items = [];
          this.forEach(function(value) {
            items.push(value);
          });
          return iteratorFor(items);
        };
        Headers.prototype.entries = function() {
          var items = [];
          this.forEach(function(value, name) {
            items.push([name, value]);
          });
          return iteratorFor(items);
        };
        if (support.iterable) {
          Headers.prototype[Symbol.iterator] = Headers.prototype.entries;
        }
        function consumed(body) {
          if (body.bodyUsed) {
            return Promise.reject(new TypeError("Already read"));
          }
          body.bodyUsed = true;
        }
        function fileReaderReady(reader) {
          return new Promise(function(resolve, reject) {
            reader.onload = function() {
              resolve(reader.result);
            };
            reader.onerror = function() {
              reject(reader.error);
            };
          });
        }
        function readBlobAsArrayBuffer(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsArrayBuffer(blob);
          return promise;
        }
        function readBlobAsText(blob) {
          var reader = new FileReader();
          var promise = fileReaderReady(reader);
          reader.readAsText(blob);
          return promise;
        }
        function readArrayBufferAsText(buf) {
          var view = new Uint8Array(buf);
          var chars = new Array(view.length);
          for (var i = 0; i < view.length; i++) {
            chars[i] = String.fromCharCode(view[i]);
          }
          return chars.join("");
        }
        function bufferClone(buf) {
          if (buf.slice) {
            return buf.slice(0);
          } else {
            var view = new Uint8Array(buf.byteLength);
            view.set(new Uint8Array(buf));
            return view.buffer;
          }
        }
        function Body() {
          this.bodyUsed = false;
          this._initBody = function(body) {
            this._bodyInit = body;
            if (!body) {
              this._bodyText = "";
            } else if (typeof body === "string") {
              this._bodyText = body;
            } else if (support.blob && Blob.prototype.isPrototypeOf(body)) {
              this._bodyBlob = body;
            } else if (support.formData && FormData.prototype.isPrototypeOf(body)) {
              this._bodyFormData = body;
            } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
              this._bodyText = body.toString();
            } else if (support.arrayBuffer && support.blob && isDataView(body)) {
              this._bodyArrayBuffer = bufferClone(body.buffer);
              this._bodyInit = new Blob([this._bodyArrayBuffer]);
            } else if (support.arrayBuffer && (ArrayBuffer.prototype.isPrototypeOf(body) || isArrayBufferView(body))) {
              this._bodyArrayBuffer = bufferClone(body);
            } else {
              this._bodyText = body = Object.prototype.toString.call(body);
            }
            if (!this.headers.get("content-type")) {
              if (typeof body === "string") {
                this.headers.set("content-type", "text/plain;charset=UTF-8");
              } else if (this._bodyBlob && this._bodyBlob.type) {
                this.headers.set("content-type", this._bodyBlob.type);
              } else if (support.searchParams && URLSearchParams.prototype.isPrototypeOf(body)) {
                this.headers.set("content-type", "application/x-www-form-urlencoded;charset=UTF-8");
              }
            }
          };
          if (support.blob) {
            this.blob = function() {
              var rejected = consumed(this);
              if (rejected) {
                return rejected;
              }
              if (this._bodyBlob) {
                return Promise.resolve(this._bodyBlob);
              } else if (this._bodyArrayBuffer) {
                return Promise.resolve(new Blob([this._bodyArrayBuffer]));
              } else if (this._bodyFormData) {
                throw new Error("could not read FormData body as blob");
              } else {
                return Promise.resolve(new Blob([this._bodyText]));
              }
            };
            this.arrayBuffer = function() {
              if (this._bodyArrayBuffer) {
                return consumed(this) || Promise.resolve(this._bodyArrayBuffer);
              } else {
                return this.blob().then(readBlobAsArrayBuffer);
              }
            };
          }
          this.text = function() {
            var rejected = consumed(this);
            if (rejected) {
              return rejected;
            }
            if (this._bodyBlob) {
              return readBlobAsText(this._bodyBlob);
            } else if (this._bodyArrayBuffer) {
              return Promise.resolve(readArrayBufferAsText(this._bodyArrayBuffer));
            } else if (this._bodyFormData) {
              throw new Error("could not read FormData body as text");
            } else {
              return Promise.resolve(this._bodyText);
            }
          };
          if (support.formData) {
            this.formData = function() {
              return this.text().then(decode);
            };
          }
          this.json = function() {
            return this.text().then(JSON.parse);
          };
          return this;
        }
        var methods = ["DELETE", "GET", "HEAD", "OPTIONS", "POST", "PUT"];
        function normalizeMethod(method) {
          var upcased = method.toUpperCase();
          return methods.indexOf(upcased) > -1 ? upcased : method;
        }
        function Request(input, options) {
          options = options || {};
          var body = options.body;
          if (input instanceof Request) {
            if (input.bodyUsed) {
              throw new TypeError("Already read");
            }
            this.url = input.url;
            this.credentials = input.credentials;
            if (!options.headers) {
              this.headers = new Headers(input.headers);
            }
            this.method = input.method;
            this.mode = input.mode;
            this.signal = input.signal;
            if (!body && input._bodyInit != null) {
              body = input._bodyInit;
              input.bodyUsed = true;
            }
          } else {
            this.url = String(input);
          }
          this.credentials = options.credentials || this.credentials || "same-origin";
          if (options.headers || !this.headers) {
            this.headers = new Headers(options.headers);
          }
          this.method = normalizeMethod(options.method || this.method || "GET");
          this.mode = options.mode || this.mode || null;
          this.signal = options.signal || this.signal;
          this.referrer = null;
          if ((this.method === "GET" || this.method === "HEAD") && body) {
            throw new TypeError("Body not allowed for GET or HEAD requests");
          }
          this._initBody(body);
        }
        Request.prototype.clone = function() {
          return new Request(this, { body: this._bodyInit });
        };
        function decode(body) {
          var form = new FormData();
          body.trim().split("&").forEach(function(bytes) {
            if (bytes) {
              var split = bytes.split("=");
              var name = split.shift().replace(/\+/g, " ");
              var value = split.join("=").replace(/\+/g, " ");
              form.append(decodeURIComponent(name), decodeURIComponent(value));
            }
          });
          return form;
        }
        function parseHeaders(rawHeaders) {
          var headers = new Headers();
          var preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
          preProcessedHeaders.split(/\r?\n/).forEach(function(line) {
            var parts = line.split(":");
            var key = parts.shift().trim();
            if (key) {
              var value = parts.join(":").trim();
              headers.append(key, value);
            }
          });
          return headers;
        }
        Body.call(Request.prototype);
        function Response(bodyInit, options) {
          if (!options) {
            options = {};
          }
          this.type = "default";
          this.status = options.status === void 0 ? 200 : options.status;
          this.ok = this.status >= 200 && this.status < 300;
          this.statusText = "statusText" in options ? options.statusText : "OK";
          this.headers = new Headers(options.headers);
          this.url = options.url || "";
          this._initBody(bodyInit);
        }
        Body.call(Response.prototype);
        Response.prototype.clone = function() {
          return new Response(this._bodyInit, {
            status: this.status,
            statusText: this.statusText,
            headers: new Headers(this.headers),
            url: this.url
          });
        };
        Response.error = function() {
          var response = new Response(null, { status: 0, statusText: "" });
          response.type = "error";
          return response;
        };
        var redirectStatuses = [301, 302, 303, 307, 308];
        Response.redirect = function(url, status) {
          if (redirectStatuses.indexOf(status) === -1) {
            throw new RangeError("Invalid status code");
          }
          return new Response(null, { status, headers: { location: url } });
        };
        exports2.DOMException = self2.DOMException;
        try {
          new exports2.DOMException();
        } catch (err) {
          exports2.DOMException = function(message, name) {
            this.message = message;
            this.name = name;
            var error = Error(message);
            this.stack = error.stack;
          };
          exports2.DOMException.prototype = Object.create(Error.prototype);
          exports2.DOMException.prototype.constructor = exports2.DOMException;
        }
        function fetch2(input, init) {
          return new Promise(function(resolve, reject) {
            var request = new Request(input, init);
            if (request.signal && request.signal.aborted) {
              return reject(new exports2.DOMException("Aborted", "AbortError"));
            }
            var xhr = new XMLHttpRequest();
            function abortXhr() {
              xhr.abort();
            }
            xhr.onload = function() {
              var options = {
                status: xhr.status,
                statusText: xhr.statusText,
                headers: parseHeaders(xhr.getAllResponseHeaders() || "")
              };
              options.url = "responseURL" in xhr ? xhr.responseURL : options.headers.get("X-Request-URL");
              var body = "response" in xhr ? xhr.response : xhr.responseText;
              resolve(new Response(body, options));
            };
            xhr.onerror = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.ontimeout = function() {
              reject(new TypeError("Network request failed"));
            };
            xhr.onabort = function() {
              reject(new exports2.DOMException("Aborted", "AbortError"));
            };
            xhr.open(request.method, request.url, true);
            if (request.credentials === "include") {
              xhr.withCredentials = true;
            } else if (request.credentials === "omit") {
              xhr.withCredentials = false;
            }
            if ("responseType" in xhr && support.blob) {
              xhr.responseType = "blob";
            }
            request.headers.forEach(function(value, name) {
              xhr.setRequestHeader(name, value);
            });
            if (request.signal) {
              request.signal.addEventListener("abort", abortXhr);
              xhr.onreadystatechange = function() {
                if (xhr.readyState === 4) {
                  request.signal.removeEventListener("abort", abortXhr);
                }
              };
            }
            xhr.send(typeof request._bodyInit === "undefined" ? null : request._bodyInit);
          });
        }
        fetch2.polyfill = true;
        if (!self2.fetch) {
          self2.fetch = fetch2;
          self2.Headers = Headers;
          self2.Request = Request;
          self2.Response = Response;
        }
        exports2.Headers = Headers;
        exports2.Request = Request;
        exports2.Response = Response;
        exports2.fetch = fetch2;
        Object.defineProperty(exports2, "__esModule", { value: true });
        return exports2;
      }({});
    })(__self__);
    __self__.fetch.ponyfill = true;
    delete __self__.fetch.polyfill;
    var ctx = __self__;
    exports = ctx.fetch;
    exports.default = ctx.fetch;
    exports.fetch = ctx.fetch;
    exports.Headers = ctx.Headers;
    exports.Request = ctx.Request;
    exports.Response = ctx.Response;
    module.exports = exports;
  }
});

// node_modules/@walletconnect/safe-json/dist/esm/index.js
var esm_exports3 = {};
__export(esm_exports3, {
  safeJsonParse: () => safeJsonParse,
  safeJsonStringify: () => safeJsonStringify
});
function safeJsonParse(value) {
  if (typeof value !== "string") {
    throw new Error(`Cannot safe json parse value of type ${typeof value}`);
  }
  try {
    return JSONParse(value);
  } catch (_a) {
    return value;
  }
}
function safeJsonStringify(value) {
  return typeof value === "string" ? value : JSONStringify(value) || "";
}
var JSONStringify, JSONParse;
var init_esm4 = __esm({
  "node_modules/@walletconnect/safe-json/dist/esm/index.js"() {
    JSONStringify = (data) => JSON.stringify(data, (_, value) => typeof value === "bigint" ? value.toString() + "n" : value);
    JSONParse = (json) => {
      const numbersBiggerThanMaxInt = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g;
      const serializedData = json.replace(numbersBiggerThanMaxInt, '$1"$2n"$3');
      return JSON.parse(serializedData, (_, value) => {
        const isCustomFormatBigInt = typeof value === "string" && value.match(/^\d+n$/);
        if (isCustomFormatBigInt)
          return BigInt(value.substring(0, value.length - 1));
        return value;
      });
    };
  }
});

// node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/http.js
var import_events2, import_cross_fetch, DEFAULT_HTTP_HEADERS, DEFAULT_HTTP_METHOD, DEFAULT_FETCH_OPTS, EVENT_EMITTER_MAX_LISTENERS_DEFAULT, HttpConnection, http_default;
var init_http = __esm({
  "node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/http.js"() {
    import_events2 = __toESM(require_events());
    import_cross_fetch = __toESM(require_browser_ponyfill());
    init_esm4();
    init_esm2();
    DEFAULT_HTTP_HEADERS = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    DEFAULT_HTTP_METHOD = "POST";
    DEFAULT_FETCH_OPTS = {
      headers: DEFAULT_HTTP_HEADERS,
      method: DEFAULT_HTTP_METHOD
    };
    EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
    HttpConnection = class {
      constructor(url, disableProviderPing = false) {
        this.url = url;
        this.disableProviderPing = disableProviderPing;
        this.events = new import_events2.EventEmitter();
        this.isAvailable = false;
        this.registering = false;
        if (!isHttpUrl(url)) {
          throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
        }
        this.url = url;
        this.disableProviderPing = disableProviderPing;
      }
      get connected() {
        return this.isAvailable;
      }
      get connecting() {
        return this.registering;
      }
      on(event, listener) {
        this.events.on(event, listener);
      }
      once(event, listener) {
        this.events.once(event, listener);
      }
      off(event, listener) {
        this.events.off(event, listener);
      }
      removeListener(event, listener) {
        this.events.removeListener(event, listener);
      }
      async open(url = this.url) {
        await this.register(url);
      }
      async close() {
        if (!this.isAvailable) {
          throw new Error("Connection already closed");
        }
        this.onClose();
      }
      async send(payload, context) {
        if (!this.isAvailable) {
          await this.register();
        }
        try {
          const body = safeJsonStringify(payload);
          const res = await (0, import_cross_fetch.default)(this.url, Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), { body }));
          const data = await res.json();
          this.onPayload({ data });
        } catch (e) {
          this.onError(payload.id, e);
        }
      }
      async register(url = this.url) {
        if (!isHttpUrl(url)) {
          throw new Error(`Provided URL is not compatible with HTTP connection: ${url}`);
        }
        if (this.registering) {
          const currentMaxListeners = this.events.getMaxListeners();
          if (this.events.listenerCount("register_error") >= currentMaxListeners || this.events.listenerCount("open") >= currentMaxListeners) {
            this.events.setMaxListeners(currentMaxListeners + 1);
          }
          return new Promise((resolve, reject) => {
            this.events.once("register_error", (error) => {
              this.resetMaxListeners();
              reject(error);
            });
            this.events.once("open", () => {
              this.resetMaxListeners();
              if (typeof this.isAvailable === "undefined") {
                return reject(new Error("HTTP connection is missing or invalid"));
              }
              resolve();
            });
          });
        }
        this.url = url;
        this.registering = true;
        try {
          if (!this.disableProviderPing) {
            const body = safeJsonStringify({ id: 1, jsonrpc: "2.0", method: "test", params: [] });
            await (0, import_cross_fetch.default)(url, Object.assign(Object.assign({}, DEFAULT_FETCH_OPTS), { body }));
          }
          this.onOpen();
        } catch (e) {
          const error = this.parseError(e);
          this.events.emit("register_error", error);
          this.onClose();
          throw error;
        }
      }
      onOpen() {
        this.isAvailable = true;
        this.registering = false;
        this.events.emit("open");
      }
      onClose() {
        this.isAvailable = false;
        this.registering = false;
        this.events.emit("close");
      }
      onPayload(e) {
        if (typeof e.data === "undefined")
          return;
        const payload = typeof e.data === "string" ? safeJsonParse(e.data) : e.data;
        this.events.emit("payload", payload);
      }
      onError(id, e) {
        const error = this.parseError(e);
        const message = error.message || error.toString();
        const payload = formatJsonRpcError(id, message);
        this.events.emit("payload", payload);
      }
      parseError(e, url = this.url) {
        return parseConnectionError(e, url, "HTTP");
      }
      resetMaxListeners() {
        if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) {
          this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
        }
      }
    };
    http_default = HttpConnection;
  }
});

// node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/index.js
var esm_exports4 = {};
__export(esm_exports4, {
  HttpConnection: () => HttpConnection,
  default: () => esm_default2
});
var esm_default2;
var init_esm5 = __esm({
  "node_modules/@walletconnect/jsonrpc-http-connection/dist/esm/index.js"() {
    init_http();
    init_http();
    esm_default2 = http_default;
  }
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

export {
  safeJsonParse,
  safeJsonStringify,
  esm_exports3 as esm_exports,
  init_esm4 as init_esm,
  parseConnectionError,
  require_cjs,
  payloadId,
  formatJsonRpcError,
  IJsonRpcConnection,
  init_esm as init_esm2,
  isWsUrl,
  isLocalhostUrl,
  esm_exports as esm_exports2,
  init_esm2 as init_esm3,
  JsonRpcProvider,
  esm_exports2 as esm_exports3,
  init_esm3 as init_esm4,
  require_browser,
  HttpConnection,
  esm_exports4,
  init_esm5
};
