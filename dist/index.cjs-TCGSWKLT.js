"use client";
import {
  init_dist,
  ne,
  p,
  se,
  y
} from "./chunk-DXYZCUDT.js";
import {
  esm_exports,
  esm_exports2,
  esm_exports3,
  esm_exports4,
  formatJsonRpcError,
  init_esm,
  init_esm3 as init_esm2,
  init_esm4 as init_esm3,
  init_esm5 as init_esm4,
  isLocalhostUrl,
  isWsUrl,
  parseConnectionError,
  require_browser,
  safeJsonParse,
  safeJsonStringify
} from "./chunk-EYV3ABJE.js";
import {
  require_events
} from "./chunk-2PXF543L.js";
import {
  concat,
  fromString,
  init_concat,
  init_from_string,
  init_src,
  init_to_string,
  require_binary,
  require_cjs,
  require_index_cjs,
  require_random,
  require_wipe,
  src_exports,
  toString
} from "./chunk-VQPS7KI7.js";
import {
  require_tslib
} from "./chunk-ZUDNTSOL.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS,
  __toESM
} from "./chunk-O3ZY5NC2.js";

// node_modules/safe-json-utils/dist/cjs/index.js
var require_cjs2 = __commonJS({
  "node_modules/safe-json-utils/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function safeJsonParse2(value) {
      if (typeof value !== "string") {
        throw new Error(`Cannot safe json parse value of type ${typeof value}`);
      }
      try {
        return JSON.parse(value);
      } catch (_a) {
        return value;
      }
    }
    exports.safeJsonParse = safeJsonParse2;
    function safeJsonStringify2(value) {
      return typeof value === "string" ? value : JSON.stringify(value, (key, value2) => typeof value2 === "undefined" ? null : value2);
    }
    exports.safeJsonStringify = safeJsonStringify2;
  }
});

// node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js
var require_localStorage = __commonJS({
  "node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/lib/localStorage.js"(exports, module) {
    "use strict";
    (function() {
      "use strict";
      let db;
      function LocalStorage() {
      }
      db = LocalStorage;
      db.prototype.getItem = function(key) {
        if (this.hasOwnProperty(key)) {
          return String(this[key]);
        }
        return null;
      };
      db.prototype.setItem = function(key, val) {
        this[key] = String(val);
      };
      db.prototype.removeItem = function(key) {
        delete this[key];
      };
      db.prototype.clear = function() {
        const self2 = this;
        Object.keys(self2).forEach(function(key) {
          self2[key] = void 0;
          delete self2[key];
        });
      };
      db.prototype.key = function(i) {
        i = i || 0;
        return Object.keys(this)[i];
      };
      db.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length;
      });
      if (typeof global !== "undefined" && global.localStorage) {
        module.exports = global.localStorage;
      } else if (typeof window !== "undefined" && window.localStorage) {
        module.exports = window.localStorage;
      } else {
        module.exports = new LocalStorage();
      }
    })();
  }
});

// node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js
var require_types = __commonJS({
  "node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IKeyValueStorage = void 0;
    var IKeyValueStorage = class {
    };
    exports.IKeyValueStorage = IKeyValueStorage;
  }
});

// node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js
var require_utils = __commonJS({
  "node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.parseEntry = void 0;
    var safe_json_utils_1 = require_cjs2();
    function parseEntry(entry) {
      var _a;
      return [entry[0], safe_json_utils_1.safeJsonParse((_a = entry[1]) !== null && _a !== void 0 ? _a : "")];
    }
    exports.parseEntry = parseEntry;
  }
});

// node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js
var require_shared = __commonJS({
  "node_modules/@walletconnect/keyvaluestorage/dist/cjs/shared/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_types(), exports);
    tslib_1.__exportStar(require_utils(), exports);
  }
});

// node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js
var require_browser2 = __commonJS({
  "node_modules/@walletconnect/keyvaluestorage/dist/cjs/browser/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.KeyValueStorage = void 0;
    var tslib_1 = require_tslib();
    var safe_json_utils_1 = require_cjs2();
    var localStorage_1 = tslib_1.__importDefault(require_localStorage());
    var shared_1 = require_shared();
    var KeyValueStorage = class {
      constructor() {
        this.localStorage = localStorage_1.default;
      }
      getKeys() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          return Object.keys(this.localStorage);
        });
      }
      getEntries() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          return Object.entries(this.localStorage).map(shared_1.parseEntry);
        });
      }
      getItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const item = this.localStorage.getItem(key);
          if (item === null) {
            return void 0;
          }
          return safe_json_utils_1.safeJsonParse(item);
        });
      }
      setItem(key, value) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.localStorage.setItem(key, safe_json_utils_1.safeJsonStringify(value));
        });
      }
      removeItem(key) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.localStorage.removeItem(key);
        });
      }
    };
    exports.KeyValueStorage = KeyValueStorage;
    exports.default = KeyValueStorage;
  }
});

// node_modules/@walletconnect/events/dist/esm/events.js
var IEvents;
var init_events = __esm({
  "node_modules/@walletconnect/events/dist/esm/events.js"() {
    IEvents = class {
    };
  }
});

// node_modules/@walletconnect/events/dist/esm/index.js
var esm_exports5 = {};
__export(esm_exports5, {
  IEvents: () => IEvents
});
var init_esm5 = __esm({
  "node_modules/@walletconnect/events/dist/esm/index.js"() {
    init_events();
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js
var require_heartbeat = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/types/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.IHeartBeat = void 0;
    var events_1 = (init_esm5(), __toCommonJS(esm_exports5));
    var IHeartBeat = class extends events_1.IEvents {
      constructor(opts) {
        super();
      }
    };
    exports.IHeartBeat = IHeartBeat;
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js
var require_types2 = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/types/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat(), exports);
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js
var require_heartbeat2 = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/constants/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HEARTBEAT_EVENTS = exports.HEARTBEAT_INTERVAL = void 0;
    var time_1 = require_cjs();
    exports.HEARTBEAT_INTERVAL = time_1.FIVE_SECONDS;
    exports.HEARTBEAT_EVENTS = {
      pulse: "heartbeat_pulse"
    };
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js
var require_constants = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/constants/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat2(), exports);
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js
var require_heartbeat3 = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/heartbeat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.HeartBeat = void 0;
    var tslib_1 = require_tslib();
    var events_1 = require_events();
    var time_1 = require_cjs();
    var types_1 = require_types2();
    var constants_1 = require_constants();
    var HeartBeat = class extends types_1.IHeartBeat {
      constructor(opts) {
        super(opts);
        this.events = new events_1.EventEmitter();
        this.interval = constants_1.HEARTBEAT_INTERVAL;
        this.interval = (opts === null || opts === void 0 ? void 0 : opts.interval) || constants_1.HEARTBEAT_INTERVAL;
      }
      static init(opts) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          const heartbeat = new HeartBeat(opts);
          yield heartbeat.init();
          return heartbeat;
        });
      }
      init() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          yield this.initialize();
        });
      }
      stop() {
        clearInterval(this.intervalRef);
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
      initialize() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
          this.intervalRef = setInterval(() => this.pulse(), time_1.toMiliseconds(this.interval));
        });
      }
      pulse() {
        this.events.emit(constants_1.HEARTBEAT_EVENTS.pulse);
      }
    };
    exports.HeartBeat = HeartBeat;
  }
});

// node_modules/@walletconnect/heartbeat/dist/cjs/index.js
var require_cjs3 = __commonJS({
  "node_modules/@walletconnect/heartbeat/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require_tslib();
    tslib_1.__exportStar(require_heartbeat3(), exports);
    tslib_1.__exportStar(require_types2(), exports);
    tslib_1.__exportStar(require_constants(), exports);
  }
});

// node_modules/quick-format-unescaped/index.js
var require_quick_format_unescaped = __commonJS({
  "node_modules/quick-format-unescaped/index.js"(exports, module) {
    "use strict";
    function tryStringify(o) {
      try {
        return JSON.stringify(o);
      } catch (e) {
        return '"[Circular]"';
      }
    }
    module.exports = format;
    function format(f, args, opts) {
      var ss = opts && opts.stringify || tryStringify;
      var offset = 1;
      if (typeof f === "object" && f !== null) {
        var len = args.length + offset;
        if (len === 1)
          return f;
        var objects = new Array(len);
        objects[0] = ss(f);
        for (var index = 1; index < len; index++) {
          objects[index] = ss(args[index]);
        }
        return objects.join(" ");
      }
      if (typeof f !== "string") {
        return f;
      }
      var argLen = args.length;
      if (argLen === 0)
        return f;
      var str = "";
      var a = 1 - offset;
      var lastPos = -1;
      var flen = f && f.length || 0;
      for (var i = 0; i < flen; ) {
        if (f.charCodeAt(i) === 37 && i + 1 < flen) {
          lastPos = lastPos > -1 ? lastPos : 0;
          switch (f.charCodeAt(i + 1)) {
            case 100:
            case 102:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Number(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 105:
              if (a >= argLen)
                break;
              if (args[a] == null)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += Math.floor(Number(args[a]));
              lastPos = i + 2;
              i++;
              break;
            case 79:
            case 111:
            case 106:
              if (a >= argLen)
                break;
              if (args[a] === void 0)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              var type = typeof args[a];
              if (type === "string") {
                str += "'" + args[a] + "'";
                lastPos = i + 2;
                i++;
                break;
              }
              if (type === "function") {
                str += args[a].name || "<anonymous>";
                lastPos = i + 2;
                i++;
                break;
              }
              str += ss(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 115:
              if (a >= argLen)
                break;
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += String(args[a]);
              lastPos = i + 2;
              i++;
              break;
            case 37:
              if (lastPos < i)
                str += f.slice(lastPos, i);
              str += "%";
              lastPos = i + 2;
              i++;
              a--;
              break;
          }
          ++a;
        }
        ++i;
      }
      if (lastPos === -1)
        return f;
      else if (lastPos < flen) {
        str += f.slice(lastPos);
      }
      return str;
    }
  }
});

// node_modules/pino/browser.js
var require_browser3 = __commonJS({
  "node_modules/pino/browser.js"(exports, module) {
    "use strict";
    var format = require_quick_format_unescaped();
    module.exports = pino;
    var _console = pfGlobalThisOrFallback().console || {};
    var stdSerializers = {
      mapHttpRequest: mock,
      mapHttpResponse: mock,
      wrapRequestSerializer: passthrough,
      wrapResponseSerializer: passthrough,
      wrapErrorSerializer: passthrough,
      req: mock,
      res: mock,
      err: asErrValue
    };
    function shouldSerialize(serialize, serializers) {
      if (Array.isArray(serialize)) {
        const hasToFilter = serialize.filter(function(k) {
          return k !== "!stdSerializers.err";
        });
        return hasToFilter;
      } else if (serialize === true) {
        return Object.keys(serializers);
      }
      return false;
    }
    function pino(opts) {
      opts = opts || {};
      opts.browser = opts.browser || {};
      const transmit2 = opts.browser.transmit;
      if (transmit2 && typeof transmit2.send !== "function") {
        throw Error("pino: transmit option must have a send function");
      }
      const proto = opts.browser.write || _console;
      if (opts.browser.write)
        opts.browser.asObject = true;
      const serializers = opts.serializers || {};
      const serialize = shouldSerialize(opts.browser.serialize, serializers);
      let stdErrSerialize = opts.browser.serialize;
      if (Array.isArray(opts.browser.serialize) && opts.browser.serialize.indexOf("!stdSerializers.err") > -1)
        stdErrSerialize = false;
      const levels = ["error", "fatal", "warn", "info", "debug", "trace"];
      if (typeof proto === "function") {
        proto.error = proto.fatal = proto.warn = proto.info = proto.debug = proto.trace = proto;
      }
      if (opts.enabled === false)
        opts.level = "silent";
      const level = opts.level || "info";
      const logger = Object.create(proto);
      if (!logger.log)
        logger.log = noop;
      Object.defineProperty(logger, "levelVal", {
        get: getLevelVal
      });
      Object.defineProperty(logger, "level", {
        get: getLevel,
        set: setLevel
      });
      const setOpts = {
        transmit: transmit2,
        serialize,
        asObject: opts.browser.asObject,
        levels,
        timestamp: getTimeFunction(opts)
      };
      logger.levels = pino.levels;
      logger.level = level;
      logger.setMaxListeners = logger.getMaxListeners = logger.emit = logger.addListener = logger.on = logger.prependListener = logger.once = logger.prependOnceListener = logger.removeListener = logger.removeAllListeners = logger.listeners = logger.listenerCount = logger.eventNames = logger.write = logger.flush = noop;
      logger.serializers = serializers;
      logger._serialize = serialize;
      logger._stdErrSerialize = stdErrSerialize;
      logger.child = child;
      if (transmit2)
        logger._logEvent = createLogEventShape();
      function getLevelVal() {
        return this.level === "silent" ? Infinity : this.levels.values[this.level];
      }
      function getLevel() {
        return this._level;
      }
      function setLevel(level2) {
        if (level2 !== "silent" && !this.levels.values[level2]) {
          throw Error("unknown level " + level2);
        }
        this._level = level2;
        set(setOpts, logger, "error", "log");
        set(setOpts, logger, "fatal", "error");
        set(setOpts, logger, "warn", "error");
        set(setOpts, logger, "info", "log");
        set(setOpts, logger, "debug", "log");
        set(setOpts, logger, "trace", "log");
      }
      function child(bindings, childOptions) {
        if (!bindings) {
          throw new Error("missing bindings for child Pino");
        }
        childOptions = childOptions || {};
        if (serialize && bindings.serializers) {
          childOptions.serializers = bindings.serializers;
        }
        const childOptionsSerializers = childOptions.serializers;
        if (serialize && childOptionsSerializers) {
          var childSerializers = Object.assign({}, serializers, childOptionsSerializers);
          var childSerialize = opts.browser.serialize === true ? Object.keys(childSerializers) : serialize;
          delete bindings.serializers;
          applySerializers([bindings], childSerialize, childSerializers, this._stdErrSerialize);
        }
        function Child(parent) {
          this._childLevel = (parent._childLevel | 0) + 1;
          this.error = bind(parent, bindings, "error");
          this.fatal = bind(parent, bindings, "fatal");
          this.warn = bind(parent, bindings, "warn");
          this.info = bind(parent, bindings, "info");
          this.debug = bind(parent, bindings, "debug");
          this.trace = bind(parent, bindings, "trace");
          if (childSerializers) {
            this.serializers = childSerializers;
            this._serialize = childSerialize;
          }
          if (transmit2) {
            this._logEvent = createLogEventShape(
              [].concat(parent._logEvent.bindings, bindings)
            );
          }
        }
        Child.prototype = this;
        return new Child(this);
      }
      return logger;
    }
    pino.levels = {
      values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
      },
      labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
      }
    };
    pino.stdSerializers = stdSerializers;
    pino.stdTimeFunctions = Object.assign({}, { nullTime, epochTime, unixTime, isoTime });
    function set(opts, logger, level, fallback) {
      const proto = Object.getPrototypeOf(logger);
      logger[level] = logger.levelVal > logger.levels.values[level] ? noop : proto[level] ? proto[level] : _console[level] || _console[fallback] || noop;
      wrap(opts, logger, level);
    }
    function wrap(opts, logger, level) {
      if (!opts.transmit && logger[level] === noop)
        return;
      logger[level] = function(write) {
        return function LOG() {
          const ts = opts.timestamp();
          const args = new Array(arguments.length);
          const proto = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
          for (var i = 0; i < args.length; i++)
            args[i] = arguments[i];
          if (opts.serialize && !opts.asObject) {
            applySerializers(args, this._serialize, this.serializers, this._stdErrSerialize);
          }
          if (opts.asObject)
            write.call(proto, asObject(this, level, args, ts));
          else
            write.apply(proto, args);
          if (opts.transmit) {
            const transmitLevel = opts.transmit.level || logger.level;
            const transmitValue = pino.levels.values[transmitLevel];
            const methodValue = pino.levels.values[level];
            if (methodValue < transmitValue)
              return;
            transmit(this, {
              ts,
              methodLevel: level,
              methodValue,
              transmitLevel,
              transmitValue: pino.levels.values[opts.transmit.level || logger.level],
              send: opts.transmit.send,
              val: logger.levelVal
            }, args);
          }
        };
      }(logger[level]);
    }
    function asObject(logger, level, args, ts) {
      if (logger._serialize)
        applySerializers(args, logger._serialize, logger.serializers, logger._stdErrSerialize);
      const argsCloned = args.slice();
      let msg = argsCloned[0];
      const o = {};
      if (ts) {
        o.time = ts;
      }
      o.level = pino.levels.values[level];
      let lvl = (logger._childLevel | 0) + 1;
      if (lvl < 1)
        lvl = 1;
      if (msg !== null && typeof msg === "object") {
        while (lvl-- && typeof argsCloned[0] === "object") {
          Object.assign(o, argsCloned.shift());
        }
        msg = argsCloned.length ? format(argsCloned.shift(), argsCloned) : void 0;
      } else if (typeof msg === "string")
        msg = format(argsCloned.shift(), argsCloned);
      if (msg !== void 0)
        o.msg = msg;
      return o;
    }
    function applySerializers(args, serialize, serializers, stdErrSerialize) {
      for (const i in args) {
        if (stdErrSerialize && args[i] instanceof Error) {
          args[i] = pino.stdSerializers.err(args[i]);
        } else if (typeof args[i] === "object" && !Array.isArray(args[i])) {
          for (const k in args[i]) {
            if (serialize && serialize.indexOf(k) > -1 && k in serializers) {
              args[i][k] = serializers[k](args[i][k]);
            }
          }
        }
      }
    }
    function bind(parent, bindings, level) {
      return function() {
        const args = new Array(1 + arguments.length);
        args[0] = bindings;
        for (var i = 1; i < args.length; i++) {
          args[i] = arguments[i - 1];
        }
        return parent[level].apply(this, args);
      };
    }
    function transmit(logger, opts, args) {
      const send = opts.send;
      const ts = opts.ts;
      const methodLevel = opts.methodLevel;
      const methodValue = opts.methodValue;
      const val = opts.val;
      const bindings = logger._logEvent.bindings;
      applySerializers(
        args,
        logger._serialize || Object.keys(logger.serializers),
        logger.serializers,
        logger._stdErrSerialize === void 0 ? true : logger._stdErrSerialize
      );
      logger._logEvent.ts = ts;
      logger._logEvent.messages = args.filter(function(arg) {
        return bindings.indexOf(arg) === -1;
      });
      logger._logEvent.level.label = methodLevel;
      logger._logEvent.level.value = methodValue;
      send(methodLevel, logger._logEvent, val);
      logger._logEvent = createLogEventShape(bindings);
    }
    function createLogEventShape(bindings) {
      return {
        ts: 0,
        messages: [],
        bindings: bindings || [],
        level: { label: "", value: 0 }
      };
    }
    function asErrValue(err) {
      const obj = {
        type: err.constructor.name,
        msg: err.message,
        stack: err.stack
      };
      for (const key in err) {
        if (obj[key] === void 0) {
          obj[key] = err[key];
        }
      }
      return obj;
    }
    function getTimeFunction(opts) {
      if (typeof opts.timestamp === "function") {
        return opts.timestamp;
      }
      if (opts.timestamp === false) {
        return nullTime;
      }
      return epochTime;
    }
    function mock() {
      return {};
    }
    function passthrough(a) {
      return a;
    }
    function noop() {
    }
    function nullTime() {
      return false;
    }
    function epochTime() {
      return Date.now();
    }
    function unixTime() {
      return Math.round(Date.now() / 1e3);
    }
    function isoTime() {
      return new Date(Date.now()).toISOString();
    }
    function pfGlobalThisOrFallback() {
      function defd(o) {
        return typeof o !== "undefined" && o;
      }
      try {
        if (typeof globalThis !== "undefined")
          return globalThis;
        Object.defineProperty(Object.prototype, "globalThis", {
          get: function() {
            delete Object.prototype.globalThis;
            return this.globalThis = this;
          },
          configurable: true
        });
        return globalThis;
      } catch (e) {
        return defd(self) || defd(window) || defd(this) || {};
      }
    }
  }
});

// node_modules/@walletconnect/logger/dist/cjs/constants.js
var require_constants2 = __commonJS({
  "node_modules/@walletconnect/logger/dist/cjs/constants.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PINO_CUSTOM_CONTEXT_KEY = exports.PINO_LOGGER_DEFAULTS = void 0;
    exports.PINO_LOGGER_DEFAULTS = {
      level: "info"
    };
    exports.PINO_CUSTOM_CONTEXT_KEY = "custom_context";
  }
});

// node_modules/@walletconnect/logger/dist/cjs/utils.js
var require_utils2 = __commonJS({
  "node_modules/@walletconnect/logger/dist/cjs/utils.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.generateChildLogger = exports.formatChildLoggerContext = exports.getLoggerContext = exports.setBrowserLoggerContext = exports.getBrowserLoggerContext = exports.getDefaultLoggerOptions = void 0;
    var constants_1 = require_constants2();
    function getDefaultLoggerOptions(opts) {
      return Object.assign(Object.assign({}, opts), { level: (opts === null || opts === void 0 ? void 0 : opts.level) || constants_1.PINO_LOGGER_DEFAULTS.level });
    }
    exports.getDefaultLoggerOptions = getDefaultLoggerOptions;
    function getBrowserLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      return logger[customContextKey] || "";
    }
    exports.getBrowserLoggerContext = getBrowserLoggerContext;
    function setBrowserLoggerContext(logger, context, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      logger[customContextKey] = context;
      return logger;
    }
    exports.setBrowserLoggerContext = setBrowserLoggerContext;
    function getLoggerContext(logger, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      let context = "";
      if (typeof logger.bindings === "undefined") {
        context = getBrowserLoggerContext(logger, customContextKey);
      } else {
        context = logger.bindings().context || "";
      }
      return context;
    }
    exports.getLoggerContext = getLoggerContext;
    function formatChildLoggerContext(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      const parentContext = getLoggerContext(logger, customContextKey);
      const context = parentContext.trim() ? `${parentContext}/${childContext}` : childContext;
      return context;
    }
    exports.formatChildLoggerContext = formatChildLoggerContext;
    function generateChildLogger(logger, childContext, customContextKey = constants_1.PINO_CUSTOM_CONTEXT_KEY) {
      const context = formatChildLoggerContext(logger, childContext, customContextKey);
      const child = logger.child({ context });
      return setBrowserLoggerContext(child, context, customContextKey);
    }
    exports.generateChildLogger = generateChildLogger;
  }
});

// node_modules/@walletconnect/logger/dist/cjs/index.js
var require_cjs4 = __commonJS({
  "node_modules/@walletconnect/logger/dist/cjs/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.pino = void 0;
    var tslib_1 = require_tslib();
    var pino_1 = tslib_1.__importDefault(require_browser3());
    Object.defineProperty(exports, "pino", { enumerable: true, get: function() {
      return pino_1.default;
    } });
    tslib_1.__exportStar(require_constants2(), exports);
    tslib_1.__exportStar(require_utils2(), exports);
  }
});

// node_modules/@walletconnect/types/dist/index.cjs.js
var require_index_cjs2 = __commonJS({
  "node_modules/@walletconnect/types/dist/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var r = (init_esm5(), __toCommonJS(esm_exports5));
    var c = require_events();
    function i(e) {
      return e && typeof e == "object" && "default" in e ? e : { default: e };
    }
    var n = i(c);
    var l = class extends r.IEvents {
      constructor(s) {
        super(), this.opts = s, this.protocol = "wc", this.version = 2;
      }
    };
    var a = class {
      constructor(s, t, o) {
        this.core = s, this.logger = t;
      }
    };
    var u = class extends r.IEvents {
      constructor(s, t) {
        super(), this.core = s, this.logger = t, this.records = /* @__PURE__ */ new Map();
      }
    };
    var I = class {
      constructor(s, t) {
        this.logger = s, this.core = t;
      }
    };
    var h = class extends r.IEvents {
      constructor(s, t) {
        super(), this.relayer = s, this.logger = t;
      }
    };
    var g = class extends r.IEvents {
      constructor(s) {
        super();
      }
    };
    var p2 = class {
      constructor(s, t, o, P) {
        this.core = s, this.logger = t, this.name = o;
      }
    };
    var v = class {
      constructor() {
        this.map = /* @__PURE__ */ new Map();
      }
    };
    var E = class extends r.IEvents {
      constructor(s, t) {
        super(), this.relayer = s, this.logger = t;
      }
    };
    var d2 = class {
      constructor(s, t) {
        this.core = s, this.logger = t;
      }
    };
    var y2 = class extends r.IEvents {
      constructor(s, t) {
        super(), this.core = s, this.logger = t;
      }
    };
    var b = class {
      constructor(s, t) {
        this.logger = s, this.core = t;
      }
    };
    var f = class {
      constructor(s, t) {
        this.projectId = s, this.logger = t;
      }
    };
    var x = class extends n.default {
      constructor() {
        super();
      }
    };
    var C = class {
      constructor(s) {
        this.opts = s, this.protocol = "wc", this.version = 2;
      }
    };
    var S = class extends c.EventEmitter {
      constructor() {
        super();
      }
    };
    var M = class {
      constructor(s) {
        this.client = s;
      }
    };
    exports.ICore = l, exports.ICrypto = a, exports.IEngine = M, exports.IEngineEvents = S, exports.IExpirer = y2, exports.IJsonRpcHistory = u, exports.IKeyChain = d2, exports.IMessageTracker = I, exports.IPairing = b, exports.IPublisher = h, exports.IRelayer = g, exports.ISignClient = C, exports.ISignClientEvents = x, exports.IStore = p2, exports.ISubscriber = E, exports.ISubscriberTopicMap = v, exports.IVerify = f;
  }
});

// node_modules/@stablelib/sha512/lib/sha512.js
var require_sha512 = __commonJS({
  "node_modules/@stablelib/sha512/lib/sha512.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var binary_1 = require_binary();
    var wipe_1 = require_wipe();
    exports.DIGEST_LENGTH = 64;
    exports.BLOCK_SIZE = 128;
    var SHA512 = function() {
      function SHA5122() {
        this.digestLength = exports.DIGEST_LENGTH;
        this.blockSize = exports.BLOCK_SIZE;
        this._stateHi = new Int32Array(8);
        this._stateLo = new Int32Array(8);
        this._tempHi = new Int32Array(16);
        this._tempLo = new Int32Array(16);
        this._buffer = new Uint8Array(256);
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        this.reset();
      }
      SHA5122.prototype._initState = function() {
        this._stateHi[0] = 1779033703;
        this._stateHi[1] = 3144134277;
        this._stateHi[2] = 1013904242;
        this._stateHi[3] = 2773480762;
        this._stateHi[4] = 1359893119;
        this._stateHi[5] = 2600822924;
        this._stateHi[6] = 528734635;
        this._stateHi[7] = 1541459225;
        this._stateLo[0] = 4089235720;
        this._stateLo[1] = 2227873595;
        this._stateLo[2] = 4271175723;
        this._stateLo[3] = 1595750129;
        this._stateLo[4] = 2917565137;
        this._stateLo[5] = 725511199;
        this._stateLo[6] = 4215389547;
        this._stateLo[7] = 327033209;
      };
      SHA5122.prototype.reset = function() {
        this._initState();
        this._bufferLength = 0;
        this._bytesHashed = 0;
        this._finished = false;
        return this;
      };
      SHA5122.prototype.clean = function() {
        wipe_1.wipe(this._buffer);
        wipe_1.wipe(this._tempHi);
        wipe_1.wipe(this._tempLo);
        this.reset();
      };
      SHA5122.prototype.update = function(data, dataLength) {
        if (dataLength === void 0) {
          dataLength = data.length;
        }
        if (this._finished) {
          throw new Error("SHA512: can't update because hash was finished.");
        }
        var dataPos = 0;
        this._bytesHashed += dataLength;
        if (this._bufferLength > 0) {
          while (this._bufferLength < exports.BLOCK_SIZE && dataLength > 0) {
            this._buffer[this._bufferLength++] = data[dataPos++];
            dataLength--;
          }
          if (this._bufferLength === this.blockSize) {
            hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, this.blockSize);
            this._bufferLength = 0;
          }
        }
        if (dataLength >= this.blockSize) {
          dataPos = hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, data, dataPos, dataLength);
          dataLength %= this.blockSize;
        }
        while (dataLength > 0) {
          this._buffer[this._bufferLength++] = data[dataPos++];
          dataLength--;
        }
        return this;
      };
      SHA5122.prototype.finish = function(out) {
        if (!this._finished) {
          var bytesHashed = this._bytesHashed;
          var left = this._bufferLength;
          var bitLenHi = bytesHashed / 536870912 | 0;
          var bitLenLo = bytesHashed << 3;
          var padLength = bytesHashed % 128 < 112 ? 128 : 256;
          this._buffer[left] = 128;
          for (var i = left + 1; i < padLength - 8; i++) {
            this._buffer[i] = 0;
          }
          binary_1.writeUint32BE(bitLenHi, this._buffer, padLength - 8);
          binary_1.writeUint32BE(bitLenLo, this._buffer, padLength - 4);
          hashBlocks(this._tempHi, this._tempLo, this._stateHi, this._stateLo, this._buffer, 0, padLength);
          this._finished = true;
        }
        for (var i = 0; i < this.digestLength / 8; i++) {
          binary_1.writeUint32BE(this._stateHi[i], out, i * 8);
          binary_1.writeUint32BE(this._stateLo[i], out, i * 8 + 4);
        }
        return this;
      };
      SHA5122.prototype.digest = function() {
        var out = new Uint8Array(this.digestLength);
        this.finish(out);
        return out;
      };
      SHA5122.prototype.saveState = function() {
        if (this._finished) {
          throw new Error("SHA256: cannot save finished state");
        }
        return {
          stateHi: new Int32Array(this._stateHi),
          stateLo: new Int32Array(this._stateLo),
          buffer: this._bufferLength > 0 ? new Uint8Array(this._buffer) : void 0,
          bufferLength: this._bufferLength,
          bytesHashed: this._bytesHashed
        };
      };
      SHA5122.prototype.restoreState = function(savedState) {
        this._stateHi.set(savedState.stateHi);
        this._stateLo.set(savedState.stateLo);
        this._bufferLength = savedState.bufferLength;
        if (savedState.buffer) {
          this._buffer.set(savedState.buffer);
        }
        this._bytesHashed = savedState.bytesHashed;
        this._finished = false;
        return this;
      };
      SHA5122.prototype.cleanSavedState = function(savedState) {
        wipe_1.wipe(savedState.stateHi);
        wipe_1.wipe(savedState.stateLo);
        if (savedState.buffer) {
          wipe_1.wipe(savedState.buffer);
        }
        savedState.bufferLength = 0;
        savedState.bytesHashed = 0;
      };
      return SHA5122;
    }();
    exports.SHA512 = SHA512;
    var K = new Int32Array([
      1116352408,
      3609767458,
      1899447441,
      602891725,
      3049323471,
      3964484399,
      3921009573,
      2173295548,
      961987163,
      4081628472,
      1508970993,
      3053834265,
      2453635748,
      2937671579,
      2870763221,
      3664609560,
      3624381080,
      2734883394,
      310598401,
      1164996542,
      607225278,
      1323610764,
      1426881987,
      3590304994,
      1925078388,
      4068182383,
      2162078206,
      991336113,
      2614888103,
      633803317,
      3248222580,
      3479774868,
      3835390401,
      2666613458,
      4022224774,
      944711139,
      264347078,
      2341262773,
      604807628,
      2007800933,
      770255983,
      1495990901,
      1249150122,
      1856431235,
      1555081692,
      3175218132,
      1996064986,
      2198950837,
      2554220882,
      3999719339,
      2821834349,
      766784016,
      2952996808,
      2566594879,
      3210313671,
      3203337956,
      3336571891,
      1034457026,
      3584528711,
      2466948901,
      113926993,
      3758326383,
      338241895,
      168717936,
      666307205,
      1188179964,
      773529912,
      1546045734,
      1294757372,
      1522805485,
      1396182291,
      2643833823,
      1695183700,
      2343527390,
      1986661051,
      1014477480,
      2177026350,
      1206759142,
      2456956037,
      344077627,
      2730485921,
      1290863460,
      2820302411,
      3158454273,
      3259730800,
      3505952657,
      3345764771,
      106217008,
      3516065817,
      3606008344,
      3600352804,
      1432725776,
      4094571909,
      1467031594,
      275423344,
      851169720,
      430227734,
      3100823752,
      506948616,
      1363258195,
      659060556,
      3750685593,
      883997877,
      3785050280,
      958139571,
      3318307427,
      1322822218,
      3812723403,
      1537002063,
      2003034995,
      1747873779,
      3602036899,
      1955562222,
      1575990012,
      2024104815,
      1125592928,
      2227730452,
      2716904306,
      2361852424,
      442776044,
      2428436474,
      593698344,
      2756734187,
      3733110249,
      3204031479,
      2999351573,
      3329325298,
      3815920427,
      3391569614,
      3928383900,
      3515267271,
      566280711,
      3940187606,
      3454069534,
      4118630271,
      4000239992,
      116418474,
      1914138554,
      174292421,
      2731055270,
      289380356,
      3203993006,
      460393269,
      320620315,
      685471733,
      587496836,
      852142971,
      1086792851,
      1017036298,
      365543100,
      1126000580,
      2618297676,
      1288033470,
      3409855158,
      1501505948,
      4234509866,
      1607167915,
      987167468,
      1816402316,
      1246189591
    ]);
    function hashBlocks(wh, wl, hh, hl, m, pos, len) {
      var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
      var h, l;
      var th, tl;
      var a, b, c, d2;
      while (len >= 128) {
        for (var i = 0; i < 16; i++) {
          var j = 8 * i + pos;
          wh[i] = binary_1.readUint32BE(m, j);
          wl[i] = binary_1.readUint32BE(m, j + 4);
        }
        for (var i = 0; i < 80; i++) {
          var bh0 = ah0;
          var bh1 = ah1;
          var bh2 = ah2;
          var bh3 = ah3;
          var bh4 = ah4;
          var bh5 = ah5;
          var bh6 = ah6;
          var bh7 = ah7;
          var bl0 = al0;
          var bl1 = al1;
          var bl2 = al2;
          var bl3 = al3;
          var bl4 = al4;
          var bl5 = al5;
          var bl6 = al6;
          var bl7 = al7;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
          l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          h = ah4 & ah5 ^ ~ah4 & ah6;
          l = al4 & al5 ^ ~al4 & al6;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          h = K[i * 2];
          l = K[i * 2 + 1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          h = wh[i % 16];
          l = wl[i % 16];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          th = c & 65535 | d2 << 16;
          tl = a & 65535 | b << 16;
          h = th;
          l = tl;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
          l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
          l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          bh7 = c & 65535 | d2 << 16;
          bl7 = a & 65535 | b << 16;
          h = bh3;
          l = bl3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d2 = h >>> 16;
          h = th;
          l = tl;
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d2 += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d2 += c >>> 16;
          bh3 = c & 65535 | d2 << 16;
          bl3 = a & 65535 | b << 16;
          ah1 = bh0;
          ah2 = bh1;
          ah3 = bh2;
          ah4 = bh3;
          ah5 = bh4;
          ah6 = bh5;
          ah7 = bh6;
          ah0 = bh7;
          al1 = bl0;
          al2 = bl1;
          al3 = bl2;
          al4 = bl3;
          al5 = bl4;
          al6 = bl5;
          al7 = bl6;
          al0 = bl7;
          if (i % 16 === 15) {
            for (var j = 0; j < 16; j++) {
              h = wh[j];
              l = wl[j];
              a = l & 65535;
              b = l >>> 16;
              c = h & 65535;
              d2 = h >>> 16;
              h = wh[(j + 9) % 16];
              l = wl[(j + 9) % 16];
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d2 += h >>> 16;
              th = wh[(j + 1) % 16];
              tl = wl[(j + 1) % 16];
              h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
              l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d2 += h >>> 16;
              th = wh[(j + 14) % 16];
              tl = wl[(j + 14) % 16];
              h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
              l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
              a += l & 65535;
              b += l >>> 16;
              c += h & 65535;
              d2 += h >>> 16;
              b += a >>> 16;
              c += b >>> 16;
              d2 += c >>> 16;
              wh[j] = c & 65535 | d2 << 16;
              wl[j] = a & 65535 | b << 16;
            }
          }
        }
        h = ah0;
        l = al0;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[0];
        l = hl[0];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[0] = ah0 = c & 65535 | d2 << 16;
        hl[0] = al0 = a & 65535 | b << 16;
        h = ah1;
        l = al1;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[1];
        l = hl[1];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[1] = ah1 = c & 65535 | d2 << 16;
        hl[1] = al1 = a & 65535 | b << 16;
        h = ah2;
        l = al2;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[2];
        l = hl[2];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[2] = ah2 = c & 65535 | d2 << 16;
        hl[2] = al2 = a & 65535 | b << 16;
        h = ah3;
        l = al3;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[3];
        l = hl[3];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[3] = ah3 = c & 65535 | d2 << 16;
        hl[3] = al3 = a & 65535 | b << 16;
        h = ah4;
        l = al4;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[4];
        l = hl[4];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[4] = ah4 = c & 65535 | d2 << 16;
        hl[4] = al4 = a & 65535 | b << 16;
        h = ah5;
        l = al5;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[5];
        l = hl[5];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[5] = ah5 = c & 65535 | d2 << 16;
        hl[5] = al5 = a & 65535 | b << 16;
        h = ah6;
        l = al6;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[6];
        l = hl[6];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[6] = ah6 = c & 65535 | d2 << 16;
        hl[6] = al6 = a & 65535 | b << 16;
        h = ah7;
        l = al7;
        a = l & 65535;
        b = l >>> 16;
        c = h & 65535;
        d2 = h >>> 16;
        h = hh[7];
        l = hl[7];
        a += l & 65535;
        b += l >>> 16;
        c += h & 65535;
        d2 += h >>> 16;
        b += a >>> 16;
        c += b >>> 16;
        d2 += c >>> 16;
        hh[7] = ah7 = c & 65535 | d2 << 16;
        hl[7] = al7 = a & 65535 | b << 16;
        pos += 128;
        len -= 128;
      }
      return pos;
    }
    function hash(data) {
      var h = new SHA512();
      h.update(data);
      var digest = h.digest();
      h.clean();
      return digest;
    }
    exports.hash = hash;
  }
});

// node_modules/@stablelib/ed25519/lib/ed25519.js
var require_ed25519 = __commonJS({
  "node_modules/@stablelib/ed25519/lib/ed25519.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convertSecretKeyToX25519 = exports.convertPublicKeyToX25519 = exports.verify = exports.sign = exports.extractPublicKeyFromSecretKey = exports.generateKeyPair = exports.generateKeyPairFromSeed = exports.SEED_LENGTH = exports.SECRET_KEY_LENGTH = exports.PUBLIC_KEY_LENGTH = exports.SIGNATURE_LENGTH = void 0;
    var random_1 = require_random();
    var sha512_1 = require_sha512();
    var wipe_1 = require_wipe();
    exports.SIGNATURE_LENGTH = 64;
    exports.PUBLIC_KEY_LENGTH = 32;
    exports.SECRET_KEY_LENGTH = 64;
    exports.SEED_LENGTH = 32;
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
    var gf0 = gf();
    var gf1 = gf([1]);
    var D = gf([
      30883,
      4953,
      19914,
      30187,
      55467,
      16705,
      2637,
      112,
      59544,
      30585,
      16505,
      36039,
      65139,
      11119,
      27886,
      20995
    ]);
    var D2 = gf([
      61785,
      9906,
      39828,
      60374,
      45398,
      33411,
      5274,
      224,
      53552,
      61171,
      33010,
      6542,
      64743,
      22239,
      55772,
      9222
    ]);
    var X = gf([
      54554,
      36645,
      11616,
      51542,
      42930,
      38181,
      51040,
      26924,
      56412,
      64982,
      57905,
      49316,
      21502,
      52590,
      14035,
      8553
    ]);
    var Y = gf([
      26200,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214,
      26214
    ]);
    var I = gf([
      41136,
      18958,
      6951,
      50414,
      58488,
      44335,
      6150,
      12099,
      55207,
      15867,
      153,
      11085,
      57099,
      20417,
      9344,
      11139
    ]);
    function set25519(r, a) {
      for (let i = 0; i < 16; i++) {
        r[i] = a[i] | 0;
      }
    }
    function car25519(o) {
      let c = 1;
      for (let i = 0; i < 16; i++) {
        let v = o[i] + c + 65535;
        c = Math.floor(v / 65536);
        o[i] = v - c * 65536;
      }
      o[0] += c - 1 + 37 * (c - 1);
    }
    function sel25519(p2, q, b) {
      const c = ~(b - 1);
      for (let i = 0; i < 16; i++) {
        const t = c & (p2[i] ^ q[i]);
        p2[i] ^= t;
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
    function verify32(x, y2) {
      let d2 = 0;
      for (let i = 0; i < 32; i++) {
        d2 |= x[i] ^ y2[i];
      }
      return (1 & d2 - 1 >>> 8) - 1;
    }
    function neq25519(a, b) {
      const c = new Uint8Array(32);
      const d2 = new Uint8Array(32);
      pack25519(c, a);
      pack25519(d2, b);
      return verify32(c, d2);
    }
    function par25519(a) {
      const d2 = new Uint8Array(32);
      pack25519(d2, a);
      return d2[0] & 1;
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
    function inv25519(o, i) {
      const c = gf();
      let a;
      for (a = 0; a < 16; a++) {
        c[a] = i[a];
      }
      for (a = 253; a >= 0; a--) {
        square(c, c);
        if (a !== 2 && a !== 4) {
          mul(c, c, i);
        }
      }
      for (a = 0; a < 16; a++) {
        o[a] = c[a];
      }
    }
    function pow2523(o, i) {
      const c = gf();
      let a;
      for (a = 0; a < 16; a++) {
        c[a] = i[a];
      }
      for (a = 250; a >= 0; a--) {
        square(c, c);
        if (a !== 1) {
          mul(c, c, i);
        }
      }
      for (a = 0; a < 16; a++) {
        o[a] = c[a];
      }
    }
    function edadd(p2, q) {
      const a = gf(), b = gf(), c = gf(), d2 = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
      sub(a, p2[1], p2[0]);
      sub(t, q[1], q[0]);
      mul(a, a, t);
      add(b, p2[0], p2[1]);
      add(t, q[0], q[1]);
      mul(b, b, t);
      mul(c, p2[3], q[3]);
      mul(c, c, D2);
      mul(d2, p2[2], q[2]);
      add(d2, d2, d2);
      sub(e, b, a);
      sub(f, d2, c);
      add(g, d2, c);
      add(h, b, a);
      mul(p2[0], e, f);
      mul(p2[1], h, g);
      mul(p2[2], g, f);
      mul(p2[3], e, h);
    }
    function cswap(p2, q, b) {
      for (let i = 0; i < 4; i++) {
        sel25519(p2[i], q[i], b);
      }
    }
    function pack(r, p2) {
      const tx = gf(), ty = gf(), zi = gf();
      inv25519(zi, p2[2]);
      mul(tx, p2[0], zi);
      mul(ty, p2[1], zi);
      pack25519(r, ty);
      r[31] ^= par25519(tx) << 7;
    }
    function scalarmult(p2, q, s) {
      set25519(p2[0], gf0);
      set25519(p2[1], gf1);
      set25519(p2[2], gf1);
      set25519(p2[3], gf0);
      for (let i = 255; i >= 0; --i) {
        const b = s[i / 8 | 0] >> (i & 7) & 1;
        cswap(p2, q, b);
        edadd(q, p2);
        edadd(p2, p2);
        cswap(p2, q, b);
      }
    }
    function scalarbase(p2, s) {
      const q = [gf(), gf(), gf(), gf()];
      set25519(q[0], X);
      set25519(q[1], Y);
      set25519(q[2], gf1);
      mul(q[3], X, Y);
      scalarmult(p2, q, s);
    }
    function generateKeyPairFromSeed2(seed) {
      if (seed.length !== exports.SEED_LENGTH) {
        throw new Error(`ed25519: seed must be ${exports.SEED_LENGTH} bytes`);
      }
      const d2 = (0, sha512_1.hash)(seed);
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const publicKey = new Uint8Array(32);
      const p2 = [gf(), gf(), gf(), gf()];
      scalarbase(p2, d2);
      pack(publicKey, p2);
      const secretKey = new Uint8Array(64);
      secretKey.set(seed);
      secretKey.set(publicKey, 32);
      return {
        publicKey,
        secretKey
      };
    }
    exports.generateKeyPairFromSeed = generateKeyPairFromSeed2;
    function generateKeyPair2(prng) {
      const seed = (0, random_1.randomBytes)(32, prng);
      const result = generateKeyPairFromSeed2(seed);
      (0, wipe_1.wipe)(seed);
      return result;
    }
    exports.generateKeyPair = generateKeyPair2;
    function extractPublicKeyFromSecretKey(secretKey) {
      if (secretKey.length !== exports.SECRET_KEY_LENGTH) {
        throw new Error(`ed25519: secret key must be ${exports.SECRET_KEY_LENGTH} bytes`);
      }
      return new Uint8Array(secretKey.subarray(32));
    }
    exports.extractPublicKeyFromSecretKey = extractPublicKeyFromSecretKey;
    var L = new Float64Array([
      237,
      211,
      245,
      92,
      26,
      99,
      18,
      88,
      214,
      156,
      247,
      162,
      222,
      249,
      222,
      20,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      16
    ]);
    function modL(r, x) {
      let carry;
      let i;
      let j;
      let k;
      for (i = 63; i >= 32; --i) {
        carry = 0;
        for (j = i - 32, k = i - 12; j < k; ++j) {
          x[j] += carry - 16 * x[i] * L[j - (i - 32)];
          carry = Math.floor((x[j] + 128) / 256);
          x[j] -= carry * 256;
        }
        x[j] += carry;
        x[i] = 0;
      }
      carry = 0;
      for (j = 0; j < 32; j++) {
        x[j] += carry - (x[31] >> 4) * L[j];
        carry = x[j] >> 8;
        x[j] &= 255;
      }
      for (j = 0; j < 32; j++) {
        x[j] -= carry * L[j];
      }
      for (i = 0; i < 32; i++) {
        x[i + 1] += x[i] >> 8;
        r[i] = x[i] & 255;
      }
    }
    function reduce(r) {
      const x = new Float64Array(64);
      for (let i = 0; i < 64; i++) {
        x[i] = r[i];
      }
      for (let i = 0; i < 64; i++) {
        r[i] = 0;
      }
      modL(r, x);
    }
    function sign2(secretKey, message) {
      const x = new Float64Array(64);
      const p2 = [gf(), gf(), gf(), gf()];
      const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const signature = new Uint8Array(64);
      signature.set(d2.subarray(32), 32);
      const hs = new sha512_1.SHA512();
      hs.update(signature.subarray(32));
      hs.update(message);
      const r = hs.digest();
      hs.clean();
      reduce(r);
      scalarbase(p2, r);
      pack(signature, p2);
      hs.reset();
      hs.update(signature.subarray(0, 32));
      hs.update(secretKey.subarray(32));
      hs.update(message);
      const h = hs.digest();
      reduce(h);
      for (let i = 0; i < 32; i++) {
        x[i] = r[i];
      }
      for (let i = 0; i < 32; i++) {
        for (let j = 0; j < 32; j++) {
          x[i + j] += h[i] * d2[j];
        }
      }
      modL(signature.subarray(32), x);
      return signature;
    }
    exports.sign = sign2;
    function unpackneg(r, p2) {
      const t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
      set25519(r[2], gf1);
      unpack25519(r[1], p2);
      square(num, r[1]);
      mul(den, num, D);
      sub(num, num, r[2]);
      add(den, r[2], den);
      square(den2, den);
      square(den4, den2);
      mul(den6, den4, den2);
      mul(t, den6, num);
      mul(t, t, den);
      pow2523(t, t);
      mul(t, t, num);
      mul(t, t, den);
      mul(t, t, den);
      mul(r[0], t, den);
      square(chk, r[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        mul(r[0], r[0], I);
      }
      square(chk, r[0]);
      mul(chk, chk, den);
      if (neq25519(chk, num)) {
        return -1;
      }
      if (par25519(r[0]) === p2[31] >> 7) {
        sub(r[0], gf0, r[0]);
      }
      mul(r[3], r[0], r[1]);
      return 0;
    }
    function verify2(publicKey, message, signature) {
      const t = new Uint8Array(32);
      const p2 = [gf(), gf(), gf(), gf()];
      const q = [gf(), gf(), gf(), gf()];
      if (signature.length !== exports.SIGNATURE_LENGTH) {
        throw new Error(`ed25519: signature must be ${exports.SIGNATURE_LENGTH} bytes`);
      }
      if (unpackneg(q, publicKey)) {
        return false;
      }
      const hs = new sha512_1.SHA512();
      hs.update(signature.subarray(0, 32));
      hs.update(publicKey);
      hs.update(message);
      const h = hs.digest();
      reduce(h);
      scalarmult(p2, q, h);
      scalarbase(q, signature.subarray(32));
      edadd(p2, q);
      pack(t, p2);
      if (verify32(signature, t)) {
        return false;
      }
      return true;
    }
    exports.verify = verify2;
    function convertPublicKeyToX25519(publicKey) {
      let q = [gf(), gf(), gf(), gf()];
      if (unpackneg(q, publicKey)) {
        throw new Error("Ed25519: invalid public key");
      }
      let a = gf();
      let b = gf();
      let y2 = q[1];
      add(a, gf1, y2);
      sub(b, gf1, y2);
      inv25519(b, b);
      mul(a, a, b);
      let z = new Uint8Array(32);
      pack25519(z, a);
      return z;
    }
    exports.convertPublicKeyToX25519 = convertPublicKeyToX25519;
    function convertSecretKeyToX25519(secretKey) {
      const d2 = (0, sha512_1.hash)(secretKey.subarray(0, 32));
      d2[0] &= 248;
      d2[31] &= 127;
      d2[31] |= 64;
      const o = new Uint8Array(d2.subarray(0, 32));
      (0, wipe_1.wipe)(d2);
      return o;
    }
    exports.convertSecretKeyToX25519 = convertSecretKeyToX25519;
  }
});

// node_modules/@walletconnect/relay-auth/dist/esm/constants.js
var JWT_IRIDIUM_ALG, JWT_IRIDIUM_TYP, JWT_DELIMITER, JWT_ENCODING, JSON_ENCODING, DATA_ENCODING, DID_DELIMITER, DID_PREFIX, DID_METHOD, MULTICODEC_ED25519_ENCODING, MULTICODEC_ED25519_BASE, MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_LENGTH, KEY_PAIR_SEED_LENGTH;
var init_constants = __esm({
  "node_modules/@walletconnect/relay-auth/dist/esm/constants.js"() {
    JWT_IRIDIUM_ALG = "EdDSA";
    JWT_IRIDIUM_TYP = "JWT";
    JWT_DELIMITER = ".";
    JWT_ENCODING = "base64url";
    JSON_ENCODING = "utf8";
    DATA_ENCODING = "utf8";
    DID_DELIMITER = ":";
    DID_PREFIX = "did";
    DID_METHOD = "key";
    MULTICODEC_ED25519_ENCODING = "base58btc";
    MULTICODEC_ED25519_BASE = "z";
    MULTICODEC_ED25519_HEADER = "K36";
    MULTICODEC_ED25519_LENGTH = 32;
    KEY_PAIR_SEED_LENGTH = 32;
  }
});

// node_modules/@walletconnect/relay-auth/dist/esm/utils.js
function decodeJSON(str) {
  return safeJsonParse(toString(fromString(str, JWT_ENCODING), JSON_ENCODING));
}
function encodeJSON(val) {
  return toString(fromString(safeJsonStringify(val), JSON_ENCODING), JWT_ENCODING);
}
function encodeIss(publicKey) {
  const header = fromString(MULTICODEC_ED25519_HEADER, MULTICODEC_ED25519_ENCODING);
  const multicodec = MULTICODEC_ED25519_BASE + toString(concat([header, publicKey]), MULTICODEC_ED25519_ENCODING);
  return [DID_PREFIX, DID_METHOD, multicodec].join(DID_DELIMITER);
}
function decodeIss(issuer) {
  const [prefix, method, multicodec] = issuer.split(DID_DELIMITER);
  if (prefix !== DID_PREFIX || method !== DID_METHOD) {
    throw new Error(`Issuer must be a DID with method "key"`);
  }
  const base = multicodec.slice(0, 1);
  if (base !== MULTICODEC_ED25519_BASE) {
    throw new Error(`Issuer must be a key in mulicodec format`);
  }
  const bytes = fromString(multicodec.slice(1), MULTICODEC_ED25519_ENCODING);
  const type = toString(bytes.slice(0, 2), MULTICODEC_ED25519_ENCODING);
  if (type !== MULTICODEC_ED25519_HEADER) {
    throw new Error(`Issuer must be a public key with type "Ed25519"`);
  }
  const publicKey = bytes.slice(2);
  if (publicKey.length !== MULTICODEC_ED25519_LENGTH) {
    throw new Error(`Issuer must be a public key with length 32 bytes`);
  }
  return publicKey;
}
function encodeSig(bytes) {
  return toString(bytes, JWT_ENCODING);
}
function decodeSig(encoded) {
  return fromString(encoded, JWT_ENCODING);
}
function encodeData(params) {
  return fromString([encodeJSON(params.header), encodeJSON(params.payload)].join(JWT_DELIMITER), DATA_ENCODING);
}
function decodeData(data) {
  const params = toString(data, DATA_ENCODING).split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  return { header, payload };
}
function encodeJWT(params) {
  return [
    encodeJSON(params.header),
    encodeJSON(params.payload),
    encodeSig(params.signature)
  ].join(JWT_DELIMITER);
}
function decodeJWT(jwt) {
  const params = jwt.split(JWT_DELIMITER);
  const header = decodeJSON(params[0]);
  const payload = decodeJSON(params[1]);
  const signature = decodeSig(params[2]);
  const data = fromString(params.slice(0, 2).join(JWT_DELIMITER), DATA_ENCODING);
  return { header, payload, signature, data };
}
var init_utils = __esm({
  "node_modules/@walletconnect/relay-auth/dist/esm/utils.js"() {
    init_concat();
    init_to_string();
    init_from_string();
    init_esm();
    init_constants();
  }
});

// node_modules/@walletconnect/relay-auth/dist/esm/api.js
function generateKeyPair(seed = (0, import_random.randomBytes)(KEY_PAIR_SEED_LENGTH)) {
  return ed25519.generateKeyPairFromSeed(seed);
}
async function signJWT(sub, aud, ttl, keyPair, iat = (0, import_time.fromMiliseconds)(Date.now())) {
  const header = { alg: JWT_IRIDIUM_ALG, typ: JWT_IRIDIUM_TYP };
  const iss = encodeIss(keyPair.publicKey);
  const exp = iat + ttl;
  const payload = { iss, sub, aud, iat, exp };
  const data = encodeData({ header, payload });
  const signature = ed25519.sign(keyPair.secretKey, data);
  return encodeJWT({ header, payload, signature });
}
async function verifyJWT(jwt) {
  const { header, payload, data, signature } = decodeJWT(jwt);
  if (header.alg !== JWT_IRIDIUM_ALG || header.typ !== JWT_IRIDIUM_TYP) {
    throw new Error("JWT must use EdDSA algorithm");
  }
  const publicKey = decodeIss(payload.iss);
  return ed25519.verify(publicKey, data, signature);
}
var ed25519, import_random, import_time;
var init_api = __esm({
  "node_modules/@walletconnect/relay-auth/dist/esm/api.js"() {
    ed25519 = __toESM(require_ed25519());
    import_random = __toESM(require_random());
    import_time = __toESM(require_cjs());
    init_constants();
    init_utils();
  }
});

// node_modules/@walletconnect/relay-auth/dist/esm/types.js
var init_types = __esm({
  "node_modules/@walletconnect/relay-auth/dist/esm/types.js"() {
  }
});

// node_modules/@walletconnect/relay-auth/dist/esm/index.js
var esm_exports6 = {};
__export(esm_exports6, {
  DATA_ENCODING: () => DATA_ENCODING,
  DID_DELIMITER: () => DID_DELIMITER,
  DID_METHOD: () => DID_METHOD,
  DID_PREFIX: () => DID_PREFIX,
  JSON_ENCODING: () => JSON_ENCODING,
  JWT_DELIMITER: () => JWT_DELIMITER,
  JWT_ENCODING: () => JWT_ENCODING,
  JWT_IRIDIUM_ALG: () => JWT_IRIDIUM_ALG,
  JWT_IRIDIUM_TYP: () => JWT_IRIDIUM_TYP,
  KEY_PAIR_SEED_LENGTH: () => KEY_PAIR_SEED_LENGTH,
  MULTICODEC_ED25519_BASE: () => MULTICODEC_ED25519_BASE,
  MULTICODEC_ED25519_ENCODING: () => MULTICODEC_ED25519_ENCODING,
  MULTICODEC_ED25519_HEADER: () => MULTICODEC_ED25519_HEADER,
  MULTICODEC_ED25519_LENGTH: () => MULTICODEC_ED25519_LENGTH,
  decodeData: () => decodeData,
  decodeIss: () => decodeIss,
  decodeJSON: () => decodeJSON,
  decodeJWT: () => decodeJWT,
  decodeSig: () => decodeSig,
  encodeData: () => encodeData,
  encodeIss: () => encodeIss,
  encodeJSON: () => encodeJSON,
  encodeJWT: () => encodeJWT,
  encodeSig: () => encodeSig,
  generateKeyPair: () => generateKeyPair,
  signJWT: () => signJWT,
  verifyJWT: () => verifyJWT
});
var init_esm6 = __esm({
  "node_modules/@walletconnect/relay-auth/dist/esm/index.js"() {
    init_api();
    init_constants();
    init_types();
    init_utils();
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/utils.js
var resolveWebSocketImplementation, hasBuiltInWebSocket, truncateQuery;
var init_utils2 = __esm({
  "node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/utils.js"() {
    resolveWebSocketImplementation = () => {
      if (typeof WebSocket !== "undefined") {
        return WebSocket;
      } else if (typeof global !== "undefined" && typeof global.WebSocket !== "undefined") {
        return global.WebSocket;
      } else if (typeof window !== "undefined" && typeof window.WebSocket !== "undefined") {
        return window.WebSocket;
      } else if (typeof self !== "undefined" && typeof self.WebSocket !== "undefined") {
        return self.WebSocket;
      }
      return require_browser();
    };
    hasBuiltInWebSocket = () => typeof WebSocket !== "undefined" || typeof global !== "undefined" && typeof global.WebSocket !== "undefined" || typeof window !== "undefined" && typeof window.WebSocket !== "undefined" || typeof self !== "undefined" && typeof self.WebSocket !== "undefined";
    truncateQuery = (wssUrl) => wssUrl.split("?")[0];
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/ws.js
var import_events, EVENT_EMITTER_MAX_LISTENERS_DEFAULT, WS, WsConnection, ws_default;
var init_ws = __esm({
  "node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/ws.js"() {
    import_events = __toESM(require_events());
    init_esm();
    init_esm2();
    init_utils2();
    EVENT_EMITTER_MAX_LISTENERS_DEFAULT = 10;
    WS = resolveWebSocketImplementation();
    WsConnection = class {
      constructor(url) {
        this.url = url;
        this.events = new import_events.EventEmitter();
        this.registering = false;
        if (!isWsUrl(url)) {
          throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
        }
        this.url = url;
      }
      get connected() {
        return typeof this.socket !== "undefined";
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
        return new Promise((resolve, reject) => {
          if (typeof this.socket === "undefined") {
            reject(new Error("Connection already closed"));
            return;
          }
          this.socket.onclose = (event) => {
            this.onClose(event);
            resolve();
          };
          this.socket.close();
        });
      }
      async send(payload, context) {
        if (typeof this.socket === "undefined") {
          this.socket = await this.register();
        }
        try {
          this.socket.send(safeJsonStringify(payload));
        } catch (e) {
          this.onError(payload.id, e);
        }
      }
      register(url = this.url) {
        if (!isWsUrl(url)) {
          throw new Error(`Provided URL is not compatible with WebSocket connection: ${url}`);
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
              if (typeof this.socket === "undefined") {
                return reject(new Error("WebSocket connection is missing or invalid"));
              }
              resolve(this.socket);
            });
          });
        }
        this.url = url;
        this.registering = true;
        return new Promise((resolve, reject) => {
          const opts = !(0, esm_exports2.isReactNative)() ? { rejectUnauthorized: !isLocalhostUrl(url) } : void 0;
          const socket = new WS(url, [], opts);
          if (hasBuiltInWebSocket()) {
            socket.onerror = (event) => {
              const errorEvent = event;
              reject(this.emitError(errorEvent.error));
            };
          } else {
            socket.on("error", (errorEvent) => {
              reject(this.emitError(errorEvent));
            });
          }
          socket.onopen = () => {
            this.onOpen(socket);
            resolve(socket);
          };
        });
      }
      onOpen(socket) {
        socket.onmessage = (event) => this.onPayload(event);
        socket.onclose = (event) => this.onClose(event);
        this.socket = socket;
        this.registering = false;
        this.events.emit("open");
      }
      onClose(event) {
        this.socket = void 0;
        this.registering = false;
        this.events.emit("close", event);
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
        return parseConnectionError(e, truncateQuery(url), "WS");
      }
      resetMaxListeners() {
        if (this.events.getMaxListeners() > EVENT_EMITTER_MAX_LISTENERS_DEFAULT) {
          this.events.setMaxListeners(EVENT_EMITTER_MAX_LISTENERS_DEFAULT);
        }
      }
      emitError(errorEvent) {
        const error = this.parseError(new Error((errorEvent === null || errorEvent === void 0 ? void 0 : errorEvent.message) || `WebSocket connection failed for host: ${truncateQuery(this.url)}`));
        this.events.emit("register_error", error);
        return error;
      }
    };
    ws_default = WsConnection;
  }
});

// node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/index.js
var esm_exports7 = {};
__export(esm_exports7, {
  WsConnection: () => WsConnection,
  default: () => esm_default
});
var esm_default;
var init_esm7 = __esm({
  "node_modules/@walletconnect/jsonrpc-ws-connection/dist/esm/index.js"() {
    init_ws();
    init_ws();
    esm_default = ws_default;
  }
});

// node_modules/lodash.isequal/index.js
var require_lodash = __commonJS({
  "node_modules/lodash.isequal/index.js"(exports, module) {
    var LARGE_ARRAY_SIZE = 200;
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var asyncTag = "[object AsyncFunction]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var nullTag = "[object Null]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var proxyTag = "[object Proxy]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var undefinedTag = "[object Undefined]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    var arrayProto = Array.prototype;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var coreJsData = root["__core-js_shared__"];
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    var nativeObjectToString = objectProto.toString;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    var Buffer = moduleExports ? root.Buffer : void 0;
    var Symbol = root.Symbol;
    var Uint8Array2 = root.Uint8Array;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var splice = arrayProto.splice;
    var symToStringTag = Symbol ? Symbol.toStringTag : void 0;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
    var nativeKeys = overArg(Object.keys, Object);
    var DataView = getNative(root, "DataView");
    var Map2 = getNative(root, "Map");
    var Promise2 = getNative(root, "Promise");
    var Set2 = getNative(root, "Set");
    var WeakMap = getNative(root, "WeakMap");
    var nativeCreate = getNative(Object, "create");
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set2);
    var weakMapCtorString = toSource(WeakMap);
    var symbolProto = Symbol ? Symbol.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    function stackGet(key) {
      return this.__data__.get(key);
    }
    function stackHas(key) {
      return this.__data__.has(key);
    }
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isBuff && (key == "offset" || key == "parent") || isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var stacked = stack.get(array);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var stacked = stack.get(object);
      if (stacked && stack.get(other)) {
        return stacked == other;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag || WeakMap && getTag(new WeakMap()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    function isIndex(value, length) {
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (typeof value == "number" || reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    var isBuffer = nativeIsBuffer || stubFalse;
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    function stubArray() {
      return [];
    }
    function stubFalse() {
      return false;
    }
    module.exports = isEqual;
  }
});

// node_modules/@walletconnect/core/dist/index.cjs.js
var require_index_cjs3 = __commonJS({
  "node_modules/@walletconnect/core/dist/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var U = require_events();
    var bt = require_browser2();
    var $ = require_cjs3();
    var u = require_cjs4();
    var x = require_index_cjs2();
    var ne2 = (init_esm(), __toCommonJS(esm_exports));
    var mt = (init_esm6(), __toCommonJS(esm_exports6));
    var o = require_index_cjs();
    var ft = (init_src(), __toCommonJS(src_exports));
    var g = require_cjs();
    var vt = (init_esm3(), __toCommonJS(esm_exports3));
    var f = (init_esm2(), __toCommonJS(esm_exports2));
    var wt = (init_esm7(), __toCommonJS(esm_exports7));
    var It = require_lodash();
    function k(r) {
      return r && typeof r == "object" && "default" in r ? r : { default: r };
    }
    function Rt(r) {
      if (r && r.__esModule)
        return r;
      var e = /* @__PURE__ */ Object.create(null);
      return r && Object.keys(r).forEach(function(t) {
        if (t !== "default") {
          var i = Object.getOwnPropertyDescriptor(r, t);
          Object.defineProperty(e, t, i.get ? i : { enumerable: true, get: function() {
            return r[t];
          } });
        }
      }), e.default = r, Object.freeze(e);
    }
    var _t = k(U);
    var Ct = k(bt);
    var Y = Rt(mt);
    var Tt = k(wt);
    var St = k(It);
    function Ot(r, e) {
      if (r.length >= 255)
        throw new TypeError("Alphabet too long");
      for (var t = new Uint8Array(256), i = 0; i < t.length; i++)
        t[i] = 255;
      for (var s = 0; s < r.length; s++) {
        var n = r.charAt(s), a = n.charCodeAt(0);
        if (t[a] !== 255)
          throw new TypeError(n + " is ambiguous");
        t[a] = s;
      }
      var h = r.length, c = r.charAt(0), d2 = Math.log(h) / Math.log(256), p2 = Math.log(256) / Math.log(h);
      function y2(l) {
        if (l instanceof Uint8Array || (ArrayBuffer.isView(l) ? l = new Uint8Array(l.buffer, l.byteOffset, l.byteLength) : Array.isArray(l) && (l = Uint8Array.from(l))), !(l instanceof Uint8Array))
          throw new TypeError("Expected Uint8Array");
        if (l.length === 0)
          return "";
        for (var m = 0, z = 0, I = 0, T = l.length; I !== T && l[I] === 0; )
          I++, m++;
        for (var S = (T - I) * p2 + 1 >>> 0, v = new Uint8Array(S); I !== T; ) {
          for (var O = l[I], L = 0, R = S - 1; (O !== 0 || L < z) && R !== -1; R--, L++)
            O += 256 * v[R] >>> 0, v[R] = O % h >>> 0, O = O / h >>> 0;
          if (O !== 0)
            throw new Error("Non-zero carry");
          z = L, I++;
        }
        for (var A = S - z; A !== S && v[A] === 0; )
          A++;
        for (var K = c.repeat(m); A < S; ++A)
          K += r.charAt(v[A]);
        return K;
      }
      function b(l) {
        if (typeof l != "string")
          throw new TypeError("Expected String");
        if (l.length === 0)
          return new Uint8Array();
        var m = 0;
        if (l[m] !== " ") {
          for (var z = 0, I = 0; l[m] === c; )
            z++, m++;
          for (var T = (l.length - m) * d2 + 1 >>> 0, S = new Uint8Array(T); l[m]; ) {
            var v = t[l.charCodeAt(m)];
            if (v === 255)
              return;
            for (var O = 0, L = T - 1; (v !== 0 || O < I) && L !== -1; L--, O++)
              v += h * S[L] >>> 0, S[L] = v % 256 >>> 0, v = v / 256 >>> 0;
            if (v !== 0)
              throw new Error("Non-zero carry");
            I = O, m++;
          }
          if (l[m] !== " ") {
            for (var R = T - I; R !== T && S[R] === 0; )
              R++;
            for (var A = new Uint8Array(z + (T - R)), K = z; R !== T; )
              A[K++] = S[R++];
            return A;
          }
        }
      }
      function M(l) {
        var m = b(l);
        if (m)
          return m;
        throw new Error(`Non-${e} character`);
      }
      return { encode: y2, decodeUnsafe: b, decode: M };
    }
    var Pt = Ot;
    var At = Pt;
    var ae = (r) => {
      if (r instanceof Uint8Array && r.constructor.name === "Uint8Array")
        return r;
      if (r instanceof ArrayBuffer)
        return new Uint8Array(r);
      if (ArrayBuffer.isView(r))
        return new Uint8Array(r.buffer, r.byteOffset, r.byteLength);
      throw new Error("Unknown type, must be binary type");
    };
    var xt = (r) => new TextEncoder().encode(r);
    var Nt = (r) => new TextDecoder().decode(r);
    var Lt = class {
      constructor(e, t, i) {
        this.name = e, this.prefix = t, this.baseEncode = i;
      }
      encode(e) {
        if (e instanceof Uint8Array)
          return `${this.prefix}${this.baseEncode(e)}`;
        throw Error("Unknown type, must be binary type");
      }
    };
    var zt = class {
      constructor(e, t, i) {
        if (this.name = e, this.prefix = t, t.codePointAt(0) === void 0)
          throw new Error("Invalid prefix character");
        this.prefixCodePoint = t.codePointAt(0), this.baseDecode = i;
      }
      decode(e) {
        if (typeof e == "string") {
          if (e.codePointAt(0) !== this.prefixCodePoint)
            throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
          return this.baseDecode(e.slice(this.prefix.length));
        } else
          throw Error("Can only multibase decode strings");
      }
      or(e) {
        return oe(this, e);
      }
    };
    var Ut = class {
      constructor(e) {
        this.decoders = e;
      }
      or(e) {
        return oe(this, e);
      }
      decode(e) {
        const t = e[0], i = this.decoders[t];
        if (i)
          return i.decode(e);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
      }
    };
    var oe = (r, e) => new Ut({ ...r.decoders || { [r.prefix]: r }, ...e.decoders || { [e.prefix]: e } });
    var Ft = class {
      constructor(e, t, i, s) {
        this.name = e, this.prefix = t, this.baseEncode = i, this.baseDecode = s, this.encoder = new Lt(e, t, i), this.decoder = new zt(e, t, s);
      }
      encode(e) {
        return this.encoder.encode(e);
      }
      decode(e) {
        return this.decoder.decode(e);
      }
    };
    var q = ({ name: r, prefix: e, encode: t, decode: i }) => new Ft(r, e, t, i);
    var B = ({ prefix: r, name: e, alphabet: t }) => {
      const { encode: i, decode: s } = At(t, e);
      return q({ prefix: r, name: e, encode: i, decode: (n) => ae(s(n)) });
    };
    var Mt = (r, e, t, i) => {
      const s = {};
      for (let p2 = 0; p2 < e.length; ++p2)
        s[e[p2]] = p2;
      let n = r.length;
      for (; r[n - 1] === "="; )
        --n;
      const a = new Uint8Array(n * t / 8 | 0);
      let h = 0, c = 0, d2 = 0;
      for (let p2 = 0; p2 < n; ++p2) {
        const y2 = s[r[p2]];
        if (y2 === void 0)
          throw new SyntaxError(`Non-${i} character`);
        c = c << t | y2, h += t, h >= 8 && (h -= 8, a[d2++] = 255 & c >> h);
      }
      if (h >= t || 255 & c << 8 - h)
        throw new SyntaxError("Unexpected end of data");
      return a;
    };
    var $t = (r, e, t) => {
      const i = e[e.length - 1] === "=", s = (1 << t) - 1;
      let n = "", a = 0, h = 0;
      for (let c = 0; c < r.length; ++c)
        for (h = h << 8 | r[c], a += 8; a > t; )
          a -= t, n += e[s & h >> a];
      if (a && (n += e[s & h << t - a]), i)
        for (; n.length * t & 7; )
          n += "=";
      return n;
    };
    var D = ({ name: r, prefix: e, bitsPerChar: t, alphabet: i }) => q({ prefix: e, name: r, encode(s) {
      return $t(s, i, t);
    }, decode(s) {
      return Mt(s, i, t, r);
    } });
    var Bt = q({ prefix: "\0", name: "identity", encode: (r) => Nt(r), decode: (r) => xt(r) });
    var Vt = Object.freeze({ __proto__: null, identity: Bt });
    var Kt = D({ prefix: "0", name: "base2", alphabet: "01", bitsPerChar: 1 });
    var kt = Object.freeze({ __proto__: null, base2: Kt });
    var Yt = D({ prefix: "7", name: "base8", alphabet: "01234567", bitsPerChar: 3 });
    var qt = Object.freeze({ __proto__: null, base8: Yt });
    var jt = B({ prefix: "9", name: "base10", alphabet: "0123456789" });
    var Gt = Object.freeze({ __proto__: null, base10: jt });
    var Ht = D({ prefix: "f", name: "base16", alphabet: "0123456789abcdef", bitsPerChar: 4 });
    var Xt = D({ prefix: "F", name: "base16upper", alphabet: "0123456789ABCDEF", bitsPerChar: 4 });
    var Jt = Object.freeze({ __proto__: null, base16: Ht, base16upper: Xt });
    var Wt = D({ prefix: "b", name: "base32", alphabet: "abcdefghijklmnopqrstuvwxyz234567", bitsPerChar: 5 });
    var Qt = D({ prefix: "B", name: "base32upper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567", bitsPerChar: 5 });
    var Zt = D({ prefix: "c", name: "base32pad", alphabet: "abcdefghijklmnopqrstuvwxyz234567=", bitsPerChar: 5 });
    var ei = D({ prefix: "C", name: "base32padupper", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=", bitsPerChar: 5 });
    var ti = D({ prefix: "v", name: "base32hex", alphabet: "0123456789abcdefghijklmnopqrstuv", bitsPerChar: 5 });
    var ii = D({ prefix: "V", name: "base32hexupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV", bitsPerChar: 5 });
    var si = D({ prefix: "t", name: "base32hexpad", alphabet: "0123456789abcdefghijklmnopqrstuv=", bitsPerChar: 5 });
    var ri = D({ prefix: "T", name: "base32hexpadupper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=", bitsPerChar: 5 });
    var ni = D({ prefix: "h", name: "base32z", alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769", bitsPerChar: 5 });
    var ai = Object.freeze({ __proto__: null, base32: Wt, base32upper: Qt, base32pad: Zt, base32padupper: ei, base32hex: ti, base32hexupper: ii, base32hexpad: si, base32hexpadupper: ri, base32z: ni });
    var oi = B({ prefix: "k", name: "base36", alphabet: "0123456789abcdefghijklmnopqrstuvwxyz" });
    var hi = B({ prefix: "K", name: "base36upper", alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" });
    var ci = Object.freeze({ __proto__: null, base36: oi, base36upper: hi });
    var ui = B({ name: "base58btc", prefix: "z", alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz" });
    var li = B({ name: "base58flickr", prefix: "Z", alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ" });
    var gi = Object.freeze({ __proto__: null, base58btc: ui, base58flickr: li });
    var di = D({ prefix: "m", name: "base64", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", bitsPerChar: 6 });
    var pi = D({ prefix: "M", name: "base64pad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", bitsPerChar: 6 });
    var Di = D({ prefix: "u", name: "base64url", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", bitsPerChar: 6 });
    var yi = D({ prefix: "U", name: "base64urlpad", alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=", bitsPerChar: 6 });
    var Ei = Object.freeze({ __proto__: null, base64: di, base64pad: pi, base64url: Di, base64urlpad: yi });
    var he = Array.from("\u{1F680}\u{1FA90}\u2604\u{1F6F0}\u{1F30C}\u{1F311}\u{1F312}\u{1F313}\u{1F314}\u{1F315}\u{1F316}\u{1F317}\u{1F318}\u{1F30D}\u{1F30F}\u{1F30E}\u{1F409}\u2600\u{1F4BB}\u{1F5A5}\u{1F4BE}\u{1F4BF}\u{1F602}\u2764\u{1F60D}\u{1F923}\u{1F60A}\u{1F64F}\u{1F495}\u{1F62D}\u{1F618}\u{1F44D}\u{1F605}\u{1F44F}\u{1F601}\u{1F525}\u{1F970}\u{1F494}\u{1F496}\u{1F499}\u{1F622}\u{1F914}\u{1F606}\u{1F644}\u{1F4AA}\u{1F609}\u263A\u{1F44C}\u{1F917}\u{1F49C}\u{1F614}\u{1F60E}\u{1F607}\u{1F339}\u{1F926}\u{1F389}\u{1F49E}\u270C\u2728\u{1F937}\u{1F631}\u{1F60C}\u{1F338}\u{1F64C}\u{1F60B}\u{1F497}\u{1F49A}\u{1F60F}\u{1F49B}\u{1F642}\u{1F493}\u{1F929}\u{1F604}\u{1F600}\u{1F5A4}\u{1F603}\u{1F4AF}\u{1F648}\u{1F447}\u{1F3B6}\u{1F612}\u{1F92D}\u2763\u{1F61C}\u{1F48B}\u{1F440}\u{1F62A}\u{1F611}\u{1F4A5}\u{1F64B}\u{1F61E}\u{1F629}\u{1F621}\u{1F92A}\u{1F44A}\u{1F973}\u{1F625}\u{1F924}\u{1F449}\u{1F483}\u{1F633}\u270B\u{1F61A}\u{1F61D}\u{1F634}\u{1F31F}\u{1F62C}\u{1F643}\u{1F340}\u{1F337}\u{1F63B}\u{1F613}\u2B50\u2705\u{1F97A}\u{1F308}\u{1F608}\u{1F918}\u{1F4A6}\u2714\u{1F623}\u{1F3C3}\u{1F490}\u2639\u{1F38A}\u{1F498}\u{1F620}\u261D\u{1F615}\u{1F33A}\u{1F382}\u{1F33B}\u{1F610}\u{1F595}\u{1F49D}\u{1F64A}\u{1F639}\u{1F5E3}\u{1F4AB}\u{1F480}\u{1F451}\u{1F3B5}\u{1F91E}\u{1F61B}\u{1F534}\u{1F624}\u{1F33C}\u{1F62B}\u26BD\u{1F919}\u2615\u{1F3C6}\u{1F92B}\u{1F448}\u{1F62E}\u{1F646}\u{1F37B}\u{1F343}\u{1F436}\u{1F481}\u{1F632}\u{1F33F}\u{1F9E1}\u{1F381}\u26A1\u{1F31E}\u{1F388}\u274C\u270A\u{1F44B}\u{1F630}\u{1F928}\u{1F636}\u{1F91D}\u{1F6B6}\u{1F4B0}\u{1F353}\u{1F4A2}\u{1F91F}\u{1F641}\u{1F6A8}\u{1F4A8}\u{1F92C}\u2708\u{1F380}\u{1F37A}\u{1F913}\u{1F619}\u{1F49F}\u{1F331}\u{1F616}\u{1F476}\u{1F974}\u25B6\u27A1\u2753\u{1F48E}\u{1F4B8}\u2B07\u{1F628}\u{1F31A}\u{1F98B}\u{1F637}\u{1F57A}\u26A0\u{1F645}\u{1F61F}\u{1F635}\u{1F44E}\u{1F932}\u{1F920}\u{1F927}\u{1F4CC}\u{1F535}\u{1F485}\u{1F9D0}\u{1F43E}\u{1F352}\u{1F617}\u{1F911}\u{1F30A}\u{1F92F}\u{1F437}\u260E\u{1F4A7}\u{1F62F}\u{1F486}\u{1F446}\u{1F3A4}\u{1F647}\u{1F351}\u2744\u{1F334}\u{1F4A3}\u{1F438}\u{1F48C}\u{1F4CD}\u{1F940}\u{1F922}\u{1F445}\u{1F4A1}\u{1F4A9}\u{1F450}\u{1F4F8}\u{1F47B}\u{1F910}\u{1F92E}\u{1F3BC}\u{1F975}\u{1F6A9}\u{1F34E}\u{1F34A}\u{1F47C}\u{1F48D}\u{1F4E3}\u{1F942}");
    var bi = he.reduce((r, e, t) => (r[t] = e, r), []);
    var mi = he.reduce((r, e, t) => (r[e.codePointAt(0)] = t, r), []);
    function fi(r) {
      return r.reduce((e, t) => (e += bi[t], e), "");
    }
    function vi(r) {
      const e = [];
      for (const t of r) {
        const i = mi[t.codePointAt(0)];
        if (i === void 0)
          throw new Error(`Non-base256emoji character: ${t}`);
        e.push(i);
      }
      return new Uint8Array(e);
    }
    var wi = q({ prefix: "\u{1F680}", name: "base256emoji", encode: fi, decode: vi });
    var Ii = Object.freeze({ __proto__: null, base256emoji: wi });
    var Ri = ue;
    var ce = 128;
    var _i = 127;
    var Ci = ~_i;
    var Ti = Math.pow(2, 31);
    function ue(r, e, t) {
      e = e || [], t = t || 0;
      for (var i = t; r >= Ti; )
        e[t++] = r & 255 | ce, r /= 128;
      for (; r & Ci; )
        e[t++] = r & 255 | ce, r >>>= 7;
      return e[t] = r | 0, ue.bytes = t - i + 1, e;
    }
    var Si = J;
    var Oi = 128;
    var le = 127;
    function J(r, i) {
      var t = 0, i = i || 0, s = 0, n = i, a, h = r.length;
      do {
        if (n >= h)
          throw J.bytes = 0, new RangeError("Could not decode varint");
        a = r[n++], t += s < 28 ? (a & le) << s : (a & le) * Math.pow(2, s), s += 7;
      } while (a >= Oi);
      return J.bytes = n - i, t;
    }
    var Pi = Math.pow(2, 7);
    var Ai = Math.pow(2, 14);
    var xi = Math.pow(2, 21);
    var Ni = Math.pow(2, 28);
    var Li = Math.pow(2, 35);
    var zi = Math.pow(2, 42);
    var Ui = Math.pow(2, 49);
    var Fi = Math.pow(2, 56);
    var Mi = Math.pow(2, 63);
    var $i = function(r) {
      return r < Pi ? 1 : r < Ai ? 2 : r < xi ? 3 : r < Ni ? 4 : r < Li ? 5 : r < zi ? 6 : r < Ui ? 7 : r < Fi ? 8 : r < Mi ? 9 : 10;
    };
    var Bi = { encode: Ri, decode: Si, encodingLength: $i };
    var ge = Bi;
    var de = (r, e, t = 0) => (ge.encode(r, e, t), e);
    var pe = (r) => ge.encodingLength(r);
    var W = (r, e) => {
      const t = e.byteLength, i = pe(r), s = i + pe(t), n = new Uint8Array(s + t);
      return de(r, n, 0), de(t, n, i), n.set(e, s), new Vi(r, t, e, n);
    };
    var Vi = class {
      constructor(e, t, i, s) {
        this.code = e, this.size = t, this.digest = i, this.bytes = s;
      }
    };
    var De = ({ name: r, code: e, encode: t }) => new Ki(r, e, t);
    var Ki = class {
      constructor(e, t, i) {
        this.name = e, this.code = t, this.encode = i;
      }
      digest(e) {
        if (e instanceof Uint8Array) {
          const t = this.encode(e);
          return t instanceof Uint8Array ? W(this.code, t) : t.then((i) => W(this.code, i));
        } else
          throw Error("Unknown type, must be binary type");
      }
    };
    var ye = (r) => async (e) => new Uint8Array(await crypto.subtle.digest(r, e));
    var ki = De({ name: "sha2-256", code: 18, encode: ye("SHA-256") });
    var Yi = De({ name: "sha2-512", code: 19, encode: ye("SHA-512") });
    var qi = Object.freeze({ __proto__: null, sha256: ki, sha512: Yi });
    var Ee = 0;
    var ji = "identity";
    var be = ae;
    var Gi = (r) => W(Ee, be(r));
    var Hi = { code: Ee, name: ji, encode: be, digest: Gi };
    var Xi = Object.freeze({ __proto__: null, identity: Hi });
    new TextEncoder(), new TextDecoder();
    var me = { ...Vt, ...kt, ...qt, ...Gt, ...Jt, ...ai, ...ci, ...gi, ...Ei, ...Ii };
    ({ ...qi, ...Xi });
    function fe(r) {
      return globalThis.Buffer != null ? new Uint8Array(r.buffer, r.byteOffset, r.byteLength) : r;
    }
    function Ji(r = 0) {
      return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? fe(globalThis.Buffer.allocUnsafe(r)) : new Uint8Array(r);
    }
    function ve(r, e, t, i) {
      return { name: r, prefix: e, encoder: { name: r, prefix: e, encode: t }, decoder: { decode: i } };
    }
    var we = ve("utf8", "u", (r) => "u" + new TextDecoder("utf8").decode(r), (r) => new TextEncoder().encode(r.substring(1)));
    var Q = ve("ascii", "a", (r) => {
      let e = "a";
      for (let t = 0; t < r.length; t++)
        e += String.fromCharCode(r[t]);
      return e;
    }, (r) => {
      r = r.substring(1);
      const e = Ji(r.length);
      for (let t = 0; t < r.length; t++)
        e[t] = r.charCodeAt(t);
      return e;
    });
    var Wi = { utf8: we, "utf-8": we, hex: me.base16, latin1: Q, ascii: Q, binary: Q, ...me };
    function Qi(r, e = "utf8") {
      const t = Wi[e];
      if (!t)
        throw new Error(`Unsupported encoding "${e}"`);
      return (e === "utf8" || e === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? fe(globalThis.Buffer.from(r, "utf-8")) : t.decoder.decode(`${t.prefix}${r}`);
    }
    var Z = "wc";
    var Ie = 2;
    var j = "core";
    var N = `${Z}@2:${j}:`;
    var Re = { name: j, logger: "error" };
    var _e = { database: ":memory:" };
    var Ce = "crypto";
    var ee = "client_ed25519_seed";
    var Te = g.ONE_DAY;
    var Se = "keychain";
    var Oe = "0.3";
    var Pe = "messages";
    var Ae = "0.3";
    var xe = g.SIX_HOURS;
    var Ne = "publisher";
    var Le = "irn";
    var ze = "error";
    var te = "wss://relay.walletconnect.com";
    var ie = "wss://relay.walletconnect.org";
    var Ue = "relayer";
    var E = { message: "relayer_message", message_ack: "relayer_message_ack", connect: "relayer_connect", disconnect: "relayer_disconnect", error: "relayer_error", connection_stalled: "relayer_connection_stalled", transport_closed: "relayer_transport_closed", publish: "relayer_publish" };
    var Fe = "_subscription";
    var P = { payload: "payload", connect: "connect", disconnect: "disconnect", error: "error" };
    var Me = g.ONE_SECOND;
    var Zi = { database: ":memory:" };
    var $e = "2.10.0";
    var Be = 1e4;
    var Ve = "0.3";
    var Ke = "WALLETCONNECT_CLIENT_ID";
    var _ = { created: "subscription_created", deleted: "subscription_deleted", expired: "subscription_expired", disabled: "subscription_disabled", sync: "subscription_sync", resubscribed: "subscription_resubscribed" };
    var es = g.THIRTY_DAYS;
    var ke = "subscription";
    var Ye = "0.3";
    var qe = g.FIVE_SECONDS * 1e3;
    var je = "pairing";
    var Ge = "0.3";
    var ts = g.THIRTY_DAYS;
    var F = { wc_pairingDelete: { req: { ttl: g.ONE_DAY, prompt: false, tag: 1e3 }, res: { ttl: g.ONE_DAY, prompt: false, tag: 1001 } }, wc_pairingPing: { req: { ttl: g.THIRTY_SECONDS, prompt: false, tag: 1002 }, res: { ttl: g.THIRTY_SECONDS, prompt: false, tag: 1003 } }, unregistered_method: { req: { ttl: g.ONE_DAY, prompt: false, tag: 0 }, res: { ttl: g.ONE_DAY, prompt: false, tag: 0 } } };
    var C = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
    var He = "history";
    var Xe = "0.3";
    var Je = "expirer";
    var w = { created: "expirer_created", deleted: "expirer_deleted", expired: "expirer_expired", sync: "expirer_sync" };
    var We = "0.3";
    var is = g.ONE_DAY;
    var G = "verify-api";
    var H = "https://verify.walletconnect.com";
    var se2 = "https://verify.walletconnect.org";
    var Qe = class {
      constructor(e, t) {
        this.core = e, this.logger = t, this.keychain = /* @__PURE__ */ new Map(), this.name = Se, this.version = Oe, this.initialized = false, this.storagePrefix = N, this.init = async () => {
          if (!this.initialized) {
            const i = await this.getKeyChain();
            typeof i < "u" && (this.keychain = i), this.initialized = true;
          }
        }, this.has = (i) => (this.isInitialized(), this.keychain.has(i)), this.set = async (i, s) => {
          this.isInitialized(), this.keychain.set(i, s), await this.persist();
        }, this.get = (i) => {
          this.isInitialized();
          const s = this.keychain.get(i);
          if (typeof s > "u") {
            const { message: n } = o.getInternalError("NO_MATCHING_KEY", `${this.name}: ${i}`);
            throw new Error(n);
          }
          return s;
        }, this.del = async (i) => {
          this.isInitialized(), this.keychain.delete(i), await this.persist();
        }, this.core = e, this.logger = u.generateChildLogger(t, this.name);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      async setKeyChain(e) {
        await this.core.storage.setItem(this.storageKey, o.mapToObj(e));
      }
      async getKeyChain() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? o.objToMap(e) : void 0;
      }
      async persist() {
        await this.setKeyChain(this.keychain);
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var Ze = class {
      constructor(e, t, i) {
        this.core = e, this.logger = t, this.name = Ce, this.initialized = false, this.init = async () => {
          this.initialized || (await this.keychain.init(), this.initialized = true);
        }, this.hasKeys = (s) => (this.isInitialized(), this.keychain.has(s)), this.getClientId = async () => {
          this.isInitialized();
          const s = await this.getClientSeed(), n = Y.generateKeyPair(s);
          return Y.encodeIss(n.publicKey);
        }, this.generateKeyPair = () => {
          this.isInitialized();
          const s = o.generateKeyPair();
          return this.setPrivateKey(s.publicKey, s.privateKey);
        }, this.signJWT = async (s) => {
          this.isInitialized();
          const n = await this.getClientSeed(), a = Y.generateKeyPair(n), h = o.generateRandomBytes32(), c = Te;
          return await Y.signJWT(h, s, c, a);
        }, this.generateSharedKey = (s, n, a) => {
          this.isInitialized();
          const h = this.getPrivateKey(s), c = o.deriveSymKey(h, n);
          return this.setSymKey(c, a);
        }, this.setSymKey = async (s, n) => {
          this.isInitialized();
          const a = n || o.hashKey(s);
          return await this.keychain.set(a, s), a;
        }, this.deleteKeyPair = async (s) => {
          this.isInitialized(), await this.keychain.del(s);
        }, this.deleteSymKey = async (s) => {
          this.isInitialized(), await this.keychain.del(s);
        }, this.encode = async (s, n, a) => {
          this.isInitialized();
          const h = o.validateEncoding(a), c = ne2.safeJsonStringify(n);
          if (o.isTypeOneEnvelope(h)) {
            const b = h.senderPublicKey, M = h.receiverPublicKey;
            s = await this.generateSharedKey(b, M);
          }
          const d2 = this.getSymKey(s), { type: p2, senderPublicKey: y2 } = h;
          return o.encrypt({ type: p2, symKey: d2, message: c, senderPublicKey: y2 });
        }, this.decode = async (s, n, a) => {
          this.isInitialized();
          const h = o.validateDecoding(n, a);
          if (o.isTypeOneEnvelope(h)) {
            const c = h.receiverPublicKey, d2 = h.senderPublicKey;
            s = await this.generateSharedKey(c, d2);
          }
          try {
            const c = this.getSymKey(s), d2 = o.decrypt({ symKey: c, encoded: n });
            return ne2.safeJsonParse(d2);
          } catch (c) {
            this.logger.error(`Failed to decode message from topic: '${s}', clientId: '${await this.getClientId()}'`), this.logger.error(c);
          }
        }, this.getPayloadType = (s) => {
          const n = o.deserialize(s);
          return o.decodeTypeByte(n.type);
        }, this.getPayloadSenderPublicKey = (s) => {
          const n = o.deserialize(s);
          return n.senderPublicKey ? ft.toString(n.senderPublicKey, o.BASE16) : void 0;
        }, this.core = e, this.logger = u.generateChildLogger(t, this.name), this.keychain = i || new Qe(this.core, this.logger);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      async setPrivateKey(e, t) {
        return await this.keychain.set(e, t), e;
      }
      getPrivateKey(e) {
        return this.keychain.get(e);
      }
      async getClientSeed() {
        let e = "";
        try {
          e = this.keychain.get(ee);
        } catch {
          e = o.generateRandomBytes32(), await this.keychain.set(ee, e);
        }
        return Qi(e, "base16");
      }
      getSymKey(e) {
        return this.keychain.get(e);
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var et = class extends x.IMessageTracker {
      constructor(e, t) {
        super(e, t), this.logger = e, this.core = t, this.messages = /* @__PURE__ */ new Map(), this.name = Pe, this.version = Ae, this.initialized = false, this.storagePrefix = N, this.init = async () => {
          if (!this.initialized) {
            this.logger.trace("Initialized");
            try {
              const i = await this.getRelayerMessages();
              typeof i < "u" && (this.messages = i), this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", size: this.messages.size });
            } catch (i) {
              this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(i);
            } finally {
              this.initialized = true;
            }
          }
        }, this.set = async (i, s) => {
          this.isInitialized();
          const n = o.hashMessage(s);
          let a = this.messages.get(i);
          return typeof a > "u" && (a = {}), typeof a[n] < "u" || (a[n] = s, this.messages.set(i, a), await this.persist()), n;
        }, this.get = (i) => {
          this.isInitialized();
          let s = this.messages.get(i);
          return typeof s > "u" && (s = {}), s;
        }, this.has = (i, s) => {
          this.isInitialized();
          const n = this.get(i), a = o.hashMessage(s);
          return typeof n[a] < "u";
        }, this.del = async (i) => {
          this.isInitialized(), this.messages.delete(i), await this.persist();
        }, this.logger = u.generateChildLogger(e, this.name), this.core = t;
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      async setRelayerMessages(e) {
        await this.core.storage.setItem(this.storageKey, o.mapToObj(e));
      }
      async getRelayerMessages() {
        const e = await this.core.storage.getItem(this.storageKey);
        return typeof e < "u" ? o.objToMap(e) : void 0;
      }
      async persist() {
        await this.setRelayerMessages(this.messages);
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var ss = class extends x.IPublisher {
      constructor(e, t) {
        super(e, t), this.relayer = e, this.logger = t, this.events = new U.EventEmitter(), this.name = Ne, this.queue = /* @__PURE__ */ new Map(), this.publishTimeout = g.toMiliseconds(g.TEN_SECONDS), this.needsTransportRestart = false, this.publish = async (i, s, n) => {
          var a;
          this.logger.debug("Publishing Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: s, opts: n } });
          try {
            const h = n?.ttl || xe, c = o.getRelayProtocolName(n), d2 = n?.prompt || false, p2 = n?.tag || 0, y2 = n?.id || f.getBigIntRpcId().toString(), b = { topic: i, message: s, opts: { ttl: h, relay: c, prompt: d2, tag: p2, id: y2 } }, M = setTimeout(() => this.queue.set(y2, b), this.publishTimeout);
            try {
              await await o.createExpiringPromise(this.rpcPublish(i, s, h, c, d2, p2, y2), this.publishTimeout, "Failed to publish payload, please try again."), this.removeRequestFromQueue(y2), this.relayer.events.emit(E.publish, b);
            } catch (l) {
              if (this.logger.debug("Publishing Payload stalled"), this.needsTransportRestart = true, (a = n?.internal) != null && a.throwOnFailedPublish)
                throw this.removeRequestFromQueue(y2), l;
              return;
            } finally {
              clearTimeout(M);
            }
            this.logger.debug("Successfully Published Payload"), this.logger.trace({ type: "method", method: "publish", params: { topic: i, message: s, opts: n } });
          } catch (h) {
            throw this.logger.debug("Failed to Publish Payload"), this.logger.error(h), h;
          }
        }, this.on = (i, s) => {
          this.events.on(i, s);
        }, this.once = (i, s) => {
          this.events.once(i, s);
        }, this.off = (i, s) => {
          this.events.off(i, s);
        }, this.removeListener = (i, s) => {
          this.events.removeListener(i, s);
        }, this.relayer = e, this.logger = u.generateChildLogger(t, this.name), this.registerEventListeners();
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      rpcPublish(e, t, i, s, n, a, h) {
        var c, d2, p2, y2;
        const b = { method: o.getRelayProtocolApi(s.protocol).publish, params: { topic: e, message: t, ttl: i, prompt: n, tag: a }, id: h };
        return o.isUndefined((c = b.params) == null ? void 0 : c.prompt) && ((d2 = b.params) == null || delete d2.prompt), o.isUndefined((p2 = b.params) == null ? void 0 : p2.tag) && ((y2 = b.params) == null || delete y2.tag), this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "message", direction: "outgoing", request: b }), this.relayer.request(b);
      }
      removeRequestFromQueue(e) {
        this.queue.delete(e);
      }
      checkQueue() {
        this.queue.forEach(async (e) => {
          const { topic: t, message: i, opts: s } = e;
          await this.publish(t, i, s);
        });
      }
      registerEventListeners() {
        this.relayer.core.heartbeat.on($.HEARTBEAT_EVENTS.pulse, () => {
          if (this.needsTransportRestart) {
            this.needsTransportRestart = false, this.relayer.events.emit(E.connection_stalled);
            return;
          }
          this.checkQueue();
        }), this.relayer.on(E.message_ack, (e) => {
          this.removeRequestFromQueue(e.id.toString());
        });
      }
    };
    var rs = class {
      constructor() {
        this.map = /* @__PURE__ */ new Map(), this.set = (e, t) => {
          const i = this.get(e);
          this.exists(e, t) || this.map.set(e, [...i, t]);
        }, this.get = (e) => this.map.get(e) || [], this.exists = (e, t) => this.get(e).includes(t), this.delete = (e, t) => {
          if (typeof t > "u") {
            this.map.delete(e);
            return;
          }
          if (!this.map.has(e))
            return;
          const i = this.get(e);
          if (!this.exists(e, t))
            return;
          const s = i.filter((n) => n !== t);
          if (!s.length) {
            this.map.delete(e);
            return;
          }
          this.map.set(e, s);
        }, this.clear = () => {
          this.map.clear();
        };
      }
      get topics() {
        return Array.from(this.map.keys());
      }
    };
    var ns = Object.defineProperty;
    var as = Object.defineProperties;
    var os = Object.getOwnPropertyDescriptors;
    var tt = Object.getOwnPropertySymbols;
    var hs = Object.prototype.hasOwnProperty;
    var cs = Object.prototype.propertyIsEnumerable;
    var it = (r, e, t) => e in r ? ns(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var V = (r, e) => {
      for (var t in e || (e = {}))
        hs.call(e, t) && it(r, t, e[t]);
      if (tt)
        for (var t of tt(e))
          cs.call(e, t) && it(r, t, e[t]);
      return r;
    };
    var re = (r, e) => as(r, os(e));
    var st = class extends x.ISubscriber {
      constructor(e, t) {
        super(e, t), this.relayer = e, this.logger = t, this.subscriptions = /* @__PURE__ */ new Map(), this.topicMap = new rs(), this.events = new U.EventEmitter(), this.name = ke, this.version = Ye, this.pending = /* @__PURE__ */ new Map(), this.cached = [], this.initialized = false, this.pendingSubscriptionWatchLabel = "pending_sub_watch_label", this.pollingInterval = 20, this.storagePrefix = N, this.subscribeTimeout = 1e4, this.restartInProgress = false, this.batchSubscribeTopicsLimit = 500, this.init = async () => {
          this.initialized || (this.logger.trace("Initialized"), this.registerEventListeners(), this.clientId = await this.relayer.core.crypto.getClientId());
        }, this.subscribe = async (i, s) => {
          await this.restartToComplete(), this.isInitialized(), this.logger.debug("Subscribing Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: s } });
          try {
            const n = o.getRelayProtocolName(s), a = { topic: i, relay: n };
            this.pending.set(i, a);
            const h = await this.rpcSubscribe(i, n);
            return this.onSubscribe(h, a), this.logger.debug("Successfully Subscribed Topic"), this.logger.trace({ type: "method", method: "subscribe", params: { topic: i, opts: s } }), h;
          } catch (n) {
            throw this.logger.debug("Failed to Subscribe Topic"), this.logger.error(n), n;
          }
        }, this.unsubscribe = async (i, s) => {
          await this.restartToComplete(), this.isInitialized(), typeof s?.id < "u" ? await this.unsubscribeById(i, s.id, s) : await this.unsubscribeByTopic(i, s);
        }, this.isSubscribed = async (i) => this.topics.includes(i) ? true : await new Promise((s, n) => {
          const a = new g.Watch();
          a.start(this.pendingSubscriptionWatchLabel);
          const h = setInterval(() => {
            !this.pending.has(i) && this.topics.includes(i) && (clearInterval(h), a.stop(this.pendingSubscriptionWatchLabel), s(true)), a.elapsed(this.pendingSubscriptionWatchLabel) >= qe && (clearInterval(h), a.stop(this.pendingSubscriptionWatchLabel), n(new Error("Subscription resolution timeout")));
          }, this.pollingInterval);
        }).catch(() => false), this.on = (i, s) => {
          this.events.on(i, s);
        }, this.once = (i, s) => {
          this.events.once(i, s);
        }, this.off = (i, s) => {
          this.events.off(i, s);
        }, this.removeListener = (i, s) => {
          this.events.removeListener(i, s);
        }, this.restart = async () => {
          this.restartInProgress = true, await this.restore(), await this.reset(), this.restartInProgress = false;
        }, this.relayer = e, this.logger = u.generateChildLogger(t, this.name), this.clientId = "";
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      get length() {
        return this.subscriptions.size;
      }
      get ids() {
        return Array.from(this.subscriptions.keys());
      }
      get values() {
        return Array.from(this.subscriptions.values());
      }
      get topics() {
        return this.topicMap.topics;
      }
      hasSubscription(e, t) {
        let i = false;
        try {
          i = this.getSubscription(e).topic === t;
        } catch {
        }
        return i;
      }
      onEnable() {
        this.cached = [], this.initialized = true;
      }
      onDisable() {
        this.cached = this.values, this.subscriptions.clear(), this.topicMap.clear();
      }
      async unsubscribeByTopic(e, t) {
        const i = this.topicMap.get(e);
        await Promise.all(i.map(async (s) => await this.unsubscribeById(e, s, t)));
      }
      async unsubscribeById(e, t, i) {
        this.logger.debug("Unsubscribing Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
        try {
          const s = o.getRelayProtocolName(i);
          await this.rpcUnsubscribe(e, t, s);
          const n = o.getSdkError("USER_DISCONNECTED", `${this.name}, ${e}`);
          await this.onUnsubscribe(e, t, n), this.logger.debug("Successfully Unsubscribed Topic"), this.logger.trace({ type: "method", method: "unsubscribe", params: { topic: e, id: t, opts: i } });
        } catch (s) {
          throw this.logger.debug("Failed to Unsubscribe Topic"), this.logger.error(s), s;
        }
      }
      async rpcSubscribe(e, t) {
        const i = { method: o.getRelayProtocolApi(t.protocol).subscribe, params: { topic: e } };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
        try {
          await await o.createExpiringPromise(this.relayer.request(i), this.subscribeTimeout);
        } catch {
          this.logger.debug("Outgoing Relay Subscribe Payload stalled"), this.relayer.events.emit(E.connection_stalled);
        }
        return o.hashMessage(e + this.clientId);
      }
      async rpcBatchSubscribe(e) {
        if (!e.length)
          return;
        const t = e[0].relay, i = { method: o.getRelayProtocolApi(t.protocol).batchSubscribe, params: { topics: e.map((s) => s.topic) } };
        this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: i });
        try {
          return await await o.createExpiringPromise(this.relayer.request(i), this.subscribeTimeout);
        } catch {
          this.logger.debug("Outgoing Relay Payload stalled"), this.relayer.events.emit(E.connection_stalled);
        }
      }
      rpcUnsubscribe(e, t, i) {
        const s = { method: o.getRelayProtocolApi(i.protocol).unsubscribe, params: { topic: e, id: t } };
        return this.logger.debug("Outgoing Relay Payload"), this.logger.trace({ type: "payload", direction: "outgoing", request: s }), this.relayer.request(s);
      }
      onSubscribe(e, t) {
        this.setSubscription(e, re(V({}, t), { id: e })), this.pending.delete(t.topic);
      }
      onBatchSubscribe(e) {
        e.length && e.forEach((t) => {
          this.setSubscription(t.id, V({}, t)), this.pending.delete(t.topic);
        });
      }
      async onUnsubscribe(e, t, i) {
        this.events.removeAllListeners(t), this.hasSubscription(t, e) && this.deleteSubscription(t, i), await this.relayer.messages.del(e);
      }
      async setRelayerSubscriptions(e) {
        await this.relayer.core.storage.setItem(this.storageKey, e);
      }
      async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey);
      }
      setSubscription(e, t) {
        this.subscriptions.has(e) || (this.logger.debug("Setting subscription"), this.logger.trace({ type: "method", method: "setSubscription", id: e, subscription: t }), this.addSubscription(e, t));
      }
      addSubscription(e, t) {
        this.subscriptions.set(e, V({}, t)), this.topicMap.set(t.topic, e), this.events.emit(_.created, t);
      }
      getSubscription(e) {
        this.logger.debug("Getting subscription"), this.logger.trace({ type: "method", method: "getSubscription", id: e });
        const t = this.subscriptions.get(e);
        if (!t) {
          const { message: i } = o.getInternalError("NO_MATCHING_KEY", `${this.name}: ${e}`);
          throw new Error(i);
        }
        return t;
      }
      deleteSubscription(e, t) {
        this.logger.debug("Deleting subscription"), this.logger.trace({ type: "method", method: "deleteSubscription", id: e, reason: t });
        const i = this.getSubscription(e);
        this.subscriptions.delete(e), this.topicMap.delete(i.topic, e), this.events.emit(_.deleted, re(V({}, i), { reason: t }));
      }
      async persist() {
        await this.setRelayerSubscriptions(this.values), this.events.emit(_.sync);
      }
      async reset() {
        if (this.cached.length) {
          const e = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
          for (let t = 0; t < e; t++) {
            const i = this.cached.splice(0, this.batchSubscribeTopicsLimit);
            await this.batchSubscribe(i);
          }
        }
        this.events.emit(_.resubscribed);
      }
      async restore() {
        try {
          const e = await this.getRelayerSubscriptions();
          if (typeof e > "u" || !e.length)
            return;
          if (this.subscriptions.size) {
            const { message: t } = o.getInternalError("RESTORE_WILL_OVERRIDE", this.name);
            throw this.logger.error(t), this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`), new Error(t);
          }
          this.cached = e, this.logger.debug(`Successfully Restored subscriptions for ${this.name}`), this.logger.trace({ type: "method", method: "restore", subscriptions: this.values });
        } catch (e) {
          this.logger.debug(`Failed to Restore subscriptions for ${this.name}`), this.logger.error(e);
        }
      }
      async batchSubscribe(e) {
        if (!e.length)
          return;
        const t = await this.rpcBatchSubscribe(e);
        o.isValidArray(t) && this.onBatchSubscribe(t.map((i, s) => re(V({}, e[s]), { id: i })));
      }
      async onConnect() {
        this.restartInProgress || (await this.restart(), this.onEnable());
      }
      onDisconnect() {
        this.onDisable();
      }
      async checkPending() {
        if (!this.initialized || this.relayer.transportExplicitlyClosed)
          return;
        const e = [];
        this.pending.forEach((t) => {
          e.push(t);
        }), await this.batchSubscribe(e);
      }
      registerEventListeners() {
        this.relayer.core.heartbeat.on($.HEARTBEAT_EVENTS.pulse, async () => {
          await this.checkPending();
        }), this.relayer.on(E.connect, async () => {
          await this.onConnect();
        }), this.relayer.on(E.disconnect, () => {
          this.onDisconnect();
        }), this.events.on(_.created, async (e) => {
          const t = _.created;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
        }), this.events.on(_.deleted, async (e) => {
          const t = _.deleted;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), await this.persist();
        });
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
      async restartToComplete() {
        this.restartInProgress && await new Promise((e) => {
          const t = setInterval(() => {
            this.restartInProgress || (clearInterval(t), e());
          }, this.pollingInterval);
        });
      }
    };
    var us = Object.defineProperty;
    var rt = Object.getOwnPropertySymbols;
    var ls = Object.prototype.hasOwnProperty;
    var gs = Object.prototype.propertyIsEnumerable;
    var nt = (r, e, t) => e in r ? us(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var ds = (r, e) => {
      for (var t in e || (e = {}))
        ls.call(e, t) && nt(r, t, e[t]);
      if (rt)
        for (var t of rt(e))
          gs.call(e, t) && nt(r, t, e[t]);
      return r;
    };
    var at = class extends x.IRelayer {
      constructor(e) {
        super(e), this.protocol = "wc", this.version = 2, this.events = new U.EventEmitter(), this.name = Ue, this.transportExplicitlyClosed = false, this.initialized = false, this.connectionAttemptInProgress = false, this.connectionStatusPollingInterval = 20, this.staleConnectionErrors = ["socket hang up", "socket stalled"], this.hasExperiencedNetworkDisruption = false, this.request = async (t) => {
          this.logger.debug("Publishing Request Payload");
          try {
            return await this.toEstablishConnection(), await this.provider.request(t);
          } catch (i) {
            throw this.logger.debug("Failed to Publish Request"), this.logger.error(i), i;
          }
        }, this.onPayloadHandler = (t) => {
          this.onProviderPayload(t);
        }, this.onConnectHandler = () => {
          this.events.emit(E.connect);
        }, this.onDisconnectHandler = () => {
          this.onProviderDisconnect();
        }, this.onProviderErrorHandler = (t) => {
          this.logger.error(t), this.events.emit(E.error, t);
        }, this.registerProviderListeners = () => {
          this.provider.on(P.payload, this.onPayloadHandler), this.provider.on(P.connect, this.onConnectHandler), this.provider.on(P.disconnect, this.onDisconnectHandler), this.provider.on(P.error, this.onProviderErrorHandler);
        }, this.core = e.core, this.logger = typeof e.logger < "u" && typeof e.logger != "string" ? u.generateChildLogger(e.logger, this.name) : u.pino(u.getDefaultLoggerOptions({ level: e.logger || ze })), this.messages = new et(this.logger, e.core), this.subscriber = new st(this, this.logger), this.publisher = new ss(this, this.logger), this.relayUrl = e?.relayUrl || te, this.projectId = e.projectId, this.provider = {};
      }
      async init() {
        this.logger.trace("Initialized"), this.registerEventListeners(), await this.createProvider(), await Promise.all([this.messages.init(), this.subscriber.init()]);
        try {
          await this.transportOpen();
        } catch {
          this.logger.warn(`Connection via ${this.relayUrl} failed, attempting to connect via failover domain ${ie}...`), await this.restartTransport(ie);
        }
        this.initialized = true, setTimeout(async () => {
          this.subscriber.topics.length === 0 && (this.logger.info("No topics subscribed to after init, closing transport"), await this.transportClose(), this.transportExplicitlyClosed = false);
        }, Be);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get connected() {
        return this.provider.connection.connected;
      }
      get connecting() {
        return this.provider.connection.connecting;
      }
      async publish(e, t, i) {
        this.isInitialized(), await this.publisher.publish(e, t, i), await this.recordMessageEvent({ topic: e, message: t, publishedAt: Date.now() });
      }
      async subscribe(e, t) {
        var i;
        this.isInitialized();
        let s = ((i = this.subscriber.topicMap.get(e)) == null ? void 0 : i[0]) || "";
        return s || (await Promise.all([new Promise((n) => {
          this.subscriber.once(_.created, (a) => {
            a.topic === e && n();
          });
        }), new Promise(async (n) => {
          s = await this.subscriber.subscribe(e, t), n();
        })]), s);
      }
      async unsubscribe(e, t) {
        this.isInitialized(), await this.subscriber.unsubscribe(e, t);
      }
      on(e, t) {
        this.events.on(e, t);
      }
      once(e, t) {
        this.events.once(e, t);
      }
      off(e, t) {
        this.events.off(e, t);
      }
      removeListener(e, t) {
        this.events.removeListener(e, t);
      }
      async transportClose() {
        this.transportExplicitlyClosed = true, this.hasExperiencedNetworkDisruption && this.connected ? await o.createExpiringPromise(this.provider.disconnect(), 1e3, "provider.disconnect()").catch(() => this.onProviderDisconnect()) : this.connected && await this.provider.disconnect();
      }
      async transportOpen(e) {
        if (this.transportExplicitlyClosed = false, await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress) {
          e && e !== this.relayUrl && (this.relayUrl = e, await this.transportClose(), await this.createProvider()), this.connectionAttemptInProgress = true;
          try {
            await Promise.all([new Promise((t) => {
              if (!this.initialized)
                return t();
              this.subscriber.once(_.resubscribed, () => {
                t();
              });
            }), new Promise(async (t, i) => {
              try {
                await o.createExpiringPromise(this.provider.connect(), 1e4, `Socket stalled when trying to connect to ${this.relayUrl}`);
              } catch (s) {
                i(s);
                return;
              }
              t();
            })]);
          } catch (t) {
            this.logger.error(t);
            const i = t;
            if (!this.isConnectionStalled(i.message))
              throw t;
            this.provider.events.emit(P.disconnect);
          } finally {
            this.connectionAttemptInProgress = false, this.hasExperiencedNetworkDisruption = false;
          }
        }
      }
      async restartTransport(e) {
        await this.confirmOnlineStateOrThrow(), !this.connectionAttemptInProgress && (this.relayUrl = e || this.relayUrl, await this.transportClose(), await this.createProvider(), await this.transportOpen());
      }
      async confirmOnlineStateOrThrow() {
        if (!await o.isOnline())
          throw new Error("No internet connection detected. Please restart your network and try again.");
      }
      isConnectionStalled(e) {
        return this.staleConnectionErrors.some((t) => e.includes(t));
      }
      async createProvider() {
        this.provider.connection && this.unregisterProviderListeners();
        const e = await this.core.crypto.signJWT(this.relayUrl);
        this.provider = new vt.JsonRpcProvider(new Tt.default(o.formatRelayRpcUrl({ sdkVersion: $e, protocol: this.protocol, version: this.version, relayUrl: this.relayUrl, projectId: this.projectId, auth: e, useOnCloseEvent: true }))), this.registerProviderListeners();
      }
      async recordMessageEvent(e) {
        const { topic: t, message: i } = e;
        await this.messages.set(t, i);
      }
      async shouldIgnoreMessageEvent(e) {
        const { topic: t, message: i } = e;
        if (!i || i.length === 0)
          return this.logger.debug(`Ignoring invalid/empty message: ${i}`), true;
        if (!await this.subscriber.isSubscribed(t))
          return this.logger.debug(`Ignoring message for non-subscribed topic ${t}`), true;
        const s = this.messages.has(t, i);
        return s && this.logger.debug(`Ignoring duplicate message: ${i}`), s;
      }
      async onProviderPayload(e) {
        if (this.logger.debug("Incoming Relay Payload"), this.logger.trace({ type: "payload", direction: "incoming", payload: e }), f.isJsonRpcRequest(e)) {
          if (!e.method.endsWith(Fe))
            return;
          const t = e.params, { topic: i, message: s, publishedAt: n } = t.data, a = { topic: i, message: s, publishedAt: n };
          this.logger.debug("Emitting Relayer Payload"), this.logger.trace(ds({ type: "event", event: t.id }, a)), this.events.emit(t.id, a), await this.acknowledgePayload(e), await this.onMessageEvent(a);
        } else
          f.isJsonRpcResponse(e) && this.events.emit(E.message_ack, e);
      }
      async onMessageEvent(e) {
        await this.shouldIgnoreMessageEvent(e) || (this.events.emit(E.message, e), await this.recordMessageEvent(e));
      }
      async acknowledgePayload(e) {
        const t = f.formatJsonRpcResult(e.id, true);
        await this.provider.connection.send(t);
      }
      unregisterProviderListeners() {
        this.provider.off(P.payload, this.onPayloadHandler), this.provider.off(P.connect, this.onConnectHandler), this.provider.off(P.disconnect, this.onDisconnectHandler), this.provider.off(P.error, this.onProviderErrorHandler);
      }
      async registerEventListeners() {
        this.events.on(E.connection_stalled, () => {
          this.restartTransport().catch((t) => this.logger.error(t));
        });
        let e = await o.isOnline();
        o.subscribeToNetworkChange(async (t) => {
          this.initialized && e !== t && (e = t, t ? await this.restartTransport().catch((i) => this.logger.error(i)) : (this.hasExperiencedNetworkDisruption = true, await this.transportClose().catch((i) => this.logger.error(i))));
        });
      }
      onProviderDisconnect() {
        this.events.emit(E.disconnect), this.attemptToReconnect();
      }
      attemptToReconnect() {
        this.transportExplicitlyClosed || (this.logger.info("attemptToReconnect called. Connecting..."), setTimeout(async () => {
          await this.restartTransport().catch((e) => this.logger.error(e));
        }, g.toMiliseconds(Me)));
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
      async toEstablishConnection() {
        if (await this.confirmOnlineStateOrThrow(), !this.connected) {
          if (this.connectionAttemptInProgress)
            return await new Promise((e) => {
              const t = setInterval(() => {
                this.connected && (clearInterval(t), e());
              }, this.connectionStatusPollingInterval);
            });
          await this.restartTransport();
        }
      }
    };
    var ps = Object.defineProperty;
    var ot = Object.getOwnPropertySymbols;
    var Ds = Object.prototype.hasOwnProperty;
    var ys = Object.prototype.propertyIsEnumerable;
    var ht = (r, e, t) => e in r ? ps(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var ct = (r, e) => {
      for (var t in e || (e = {}))
        Ds.call(e, t) && ht(r, t, e[t]);
      if (ot)
        for (var t of ot(e))
          ys.call(e, t) && ht(r, t, e[t]);
      return r;
    };
    var ut = class extends x.IStore {
      constructor(e, t, i, s = N, n = void 0) {
        super(e, t, i, s), this.core = e, this.logger = t, this.name = i, this.map = /* @__PURE__ */ new Map(), this.version = Ve, this.cached = [], this.initialized = false, this.storagePrefix = N, this.init = async () => {
          this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((a) => {
            this.getKey && a !== null && !o.isUndefined(a) ? this.map.set(this.getKey(a), a) : o.isProposalStruct(a) ? this.map.set(a.id, a) : o.isSessionStruct(a) && this.map.set(a.topic, a);
          }), this.cached = [], this.initialized = true);
        }, this.set = async (a, h) => {
          this.isInitialized(), this.map.has(a) ? await this.update(a, h) : (this.logger.debug("Setting value"), this.logger.trace({ type: "method", method: "set", key: a, value: h }), this.map.set(a, h), await this.persist());
        }, this.get = (a) => (this.isInitialized(), this.logger.debug("Getting value"), this.logger.trace({ type: "method", method: "get", key: a }), this.getData(a)), this.getAll = (a) => (this.isInitialized(), a ? this.values.filter((h) => Object.keys(a).every((c) => St.default(h[c], a[c]))) : this.values), this.update = async (a, h) => {
          this.isInitialized(), this.logger.debug("Updating value"), this.logger.trace({ type: "method", method: "update", key: a, update: h });
          const c = ct(ct({}, this.getData(a)), h);
          this.map.set(a, c), await this.persist();
        }, this.delete = async (a, h) => {
          this.isInitialized(), this.map.has(a) && (this.logger.debug("Deleting value"), this.logger.trace({ type: "method", method: "delete", key: a, reason: h }), this.map.delete(a), await this.persist());
        }, this.logger = u.generateChildLogger(t, this.name), this.storagePrefix = s, this.getKey = n;
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      get length() {
        return this.map.size;
      }
      get keys() {
        return Array.from(this.map.keys());
      }
      get values() {
        return Array.from(this.map.values());
      }
      async setDataStore(e) {
        await this.core.storage.setItem(this.storageKey, e);
      }
      async getDataStore() {
        return await this.core.storage.getItem(this.storageKey);
      }
      getData(e) {
        const t = this.map.get(e);
        if (!t) {
          const { message: i } = o.getInternalError("NO_MATCHING_KEY", `${this.name}: ${e}`);
          throw this.logger.error(i), new Error(i);
        }
        return t;
      }
      async persist() {
        await this.setDataStore(this.values);
      }
      async restore() {
        try {
          const e = await this.getDataStore();
          if (typeof e > "u" || !e.length)
            return;
          if (this.map.size) {
            const { message: t } = o.getInternalError("RESTORE_WILL_OVERRIDE", this.name);
            throw this.logger.error(t), new Error(t);
          }
          this.cached = e, this.logger.debug(`Successfully Restored value for ${this.name}`), this.logger.trace({ type: "method", method: "restore", value: this.values });
        } catch (e) {
          this.logger.debug(`Failed to Restore value for ${this.name}`), this.logger.error(e);
        }
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var lt = class {
      constructor(e, t) {
        this.core = e, this.logger = t, this.name = je, this.version = Ge, this.events = new _t.default(), this.initialized = false, this.storagePrefix = N, this.ignoredPayloadTypes = [o.TYPE_1], this.registeredMethods = [], this.init = async () => {
          this.initialized || (await this.pairings.init(), await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.initialized = true, this.logger.trace("Initialized"));
        }, this.register = ({ methods: i }) => {
          this.isInitialized(), this.registeredMethods = [.../* @__PURE__ */ new Set([...this.registeredMethods, ...i])];
        }, this.create = async () => {
          this.isInitialized();
          const i = o.generateRandomBytes32(), s = await this.core.crypto.setSymKey(i), n = o.calcExpiry(g.FIVE_MINUTES), a = { protocol: Le }, h = { topic: s, expiry: n, relay: a, active: false }, c = o.formatUri({ protocol: this.core.protocol, version: this.core.version, topic: s, symKey: i, relay: a });
          return await this.pairings.set(s, h), await this.core.relayer.subscribe(s), this.core.expirer.set(s, n), { topic: s, uri: c };
        }, this.pair = async (i) => {
          this.isInitialized(), this.isValidPair(i);
          const { topic: s, symKey: n, relay: a } = o.parseUri(i.uri);
          if (this.pairings.keys.includes(s))
            throw new Error(`Pairing already exists: ${s}`);
          if (this.core.crypto.hasKeys(s))
            throw new Error(`Keychain already exists: ${s}`);
          const h = o.calcExpiry(g.FIVE_MINUTES), c = { topic: s, relay: a, expiry: h, active: false };
          return await this.pairings.set(s, c), await this.core.crypto.setSymKey(n, s), await this.core.relayer.subscribe(s, { relay: a }), this.core.expirer.set(s, h), i.activatePairing && await this.activate({ topic: s }), c;
        }, this.activate = async ({ topic: i }) => {
          this.isInitialized();
          const s = o.calcExpiry(g.THIRTY_DAYS);
          await this.pairings.update(i, { active: true, expiry: s }), this.core.expirer.set(i, s);
        }, this.ping = async (i) => {
          this.isInitialized(), await this.isValidPing(i);
          const { topic: s } = i;
          if (this.pairings.keys.includes(s)) {
            const n = await this.sendRequest(s, "wc_pairingPing", {}), { done: a, resolve: h, reject: c } = o.createDelayedPromise();
            this.events.once(o.engineEvent("pairing_ping", n), ({ error: d2 }) => {
              d2 ? c(d2) : h();
            }), await a();
          }
        }, this.updateExpiry = async ({ topic: i, expiry: s }) => {
          this.isInitialized(), await this.pairings.update(i, { expiry: s });
        }, this.updateMetadata = async ({ topic: i, metadata: s }) => {
          this.isInitialized(), await this.pairings.update(i, { peerMetadata: s });
        }, this.getPairings = () => (this.isInitialized(), this.pairings.values), this.disconnect = async (i) => {
          this.isInitialized(), await this.isValidDisconnect(i);
          const { topic: s } = i;
          this.pairings.keys.includes(s) && (await this.sendRequest(s, "wc_pairingDelete", o.getSdkError("USER_DISCONNECTED")), await this.deletePairing(s));
        }, this.sendRequest = async (i, s, n) => {
          const a = f.formatJsonRpcRequest(s, n), h = await this.core.crypto.encode(i, a), c = F[s].req;
          return this.core.history.set(i, a), this.core.relayer.publish(i, h, c), a.id;
        }, this.sendResult = async (i, s, n) => {
          const a = f.formatJsonRpcResult(i, n), h = await this.core.crypto.encode(s, a), c = await this.core.history.get(s, i), d2 = F[c.request.method].res;
          await this.core.relayer.publish(s, h, d2), await this.core.history.resolve(a);
        }, this.sendError = async (i, s, n) => {
          const a = f.formatJsonRpcError(i, n), h = await this.core.crypto.encode(s, a), c = await this.core.history.get(s, i), d2 = F[c.request.method] ? F[c.request.method].res : F.unregistered_method.res;
          await this.core.relayer.publish(s, h, d2), await this.core.history.resolve(a);
        }, this.deletePairing = async (i, s) => {
          await this.core.relayer.unsubscribe(i), await Promise.all([this.pairings.delete(i, o.getSdkError("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(i), s ? Promise.resolve() : this.core.expirer.del(i)]);
        }, this.cleanup = async () => {
          const i = this.pairings.getAll().filter((s) => o.isExpired(s.expiry));
          await Promise.all(i.map((s) => this.deletePairing(s.topic)));
        }, this.onRelayEventRequest = (i) => {
          const { topic: s, payload: n } = i;
          switch (n.method) {
            case "wc_pairingPing":
              return this.onPairingPingRequest(s, n);
            case "wc_pairingDelete":
              return this.onPairingDeleteRequest(s, n);
            default:
              return this.onUnknownRpcMethodRequest(s, n);
          }
        }, this.onRelayEventResponse = async (i) => {
          const { topic: s, payload: n } = i, a = (await this.core.history.get(s, n.id)).request.method;
          switch (a) {
            case "wc_pairingPing":
              return this.onPairingPingResponse(s, n);
            default:
              return this.onUnknownRpcMethodResponse(a);
          }
        }, this.onPairingPingRequest = async (i, s) => {
          const { id: n } = s;
          try {
            this.isValidPing({ topic: i }), await this.sendResult(n, i, true), this.events.emit("pairing_ping", { id: n, topic: i });
          } catch (a) {
            await this.sendError(n, i, a), this.logger.error(a);
          }
        }, this.onPairingPingResponse = (i, s) => {
          const { id: n } = s;
          setTimeout(() => {
            f.isJsonRpcResult(s) ? this.events.emit(o.engineEvent("pairing_ping", n), {}) : f.isJsonRpcError(s) && this.events.emit(o.engineEvent("pairing_ping", n), { error: s.error });
          }, 500);
        }, this.onPairingDeleteRequest = async (i, s) => {
          const { id: n } = s;
          try {
            this.isValidDisconnect({ topic: i }), await this.deletePairing(i), this.events.emit("pairing_delete", { id: n, topic: i });
          } catch (a) {
            await this.sendError(n, i, a), this.logger.error(a);
          }
        }, this.onUnknownRpcMethodRequest = async (i, s) => {
          const { id: n, method: a } = s;
          try {
            if (this.registeredMethods.includes(a))
              return;
            const h = o.getSdkError("WC_METHOD_UNSUPPORTED", a);
            await this.sendError(n, i, h), this.logger.error(h);
          } catch (h) {
            await this.sendError(n, i, h), this.logger.error(h);
          }
        }, this.onUnknownRpcMethodResponse = (i) => {
          this.registeredMethods.includes(i) || this.logger.error(o.getSdkError("WC_METHOD_UNSUPPORTED", i));
        }, this.isValidPair = (i) => {
          if (!o.isValidParams(i)) {
            const { message: s } = o.getInternalError("MISSING_OR_INVALID", `pair() params: ${i}`);
            throw new Error(s);
          }
          if (!o.isValidUrl(i.uri)) {
            const { message: s } = o.getInternalError("MISSING_OR_INVALID", `pair() uri: ${i.uri}`);
            throw new Error(s);
          }
        }, this.isValidPing = async (i) => {
          if (!o.isValidParams(i)) {
            const { message: n } = o.getInternalError("MISSING_OR_INVALID", `ping() params: ${i}`);
            throw new Error(n);
          }
          const { topic: s } = i;
          await this.isValidPairingTopic(s);
        }, this.isValidDisconnect = async (i) => {
          if (!o.isValidParams(i)) {
            const { message: n } = o.getInternalError("MISSING_OR_INVALID", `disconnect() params: ${i}`);
            throw new Error(n);
          }
          const { topic: s } = i;
          await this.isValidPairingTopic(s);
        }, this.isValidPairingTopic = async (i) => {
          if (!o.isValidString(i, false)) {
            const { message: s } = o.getInternalError("MISSING_OR_INVALID", `pairing topic should be a string: ${i}`);
            throw new Error(s);
          }
          if (!this.pairings.keys.includes(i)) {
            const { message: s } = o.getInternalError("NO_MATCHING_KEY", `pairing topic doesn't exist: ${i}`);
            throw new Error(s);
          }
          if (o.isExpired(this.pairings.get(i).expiry)) {
            await this.deletePairing(i);
            const { message: s } = o.getInternalError("EXPIRED", `pairing topic: ${i}`);
            throw new Error(s);
          }
        }, this.core = e, this.logger = u.generateChildLogger(t, this.name), this.pairings = new ut(this.core, this.logger, this.name, this.storagePrefix);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
      registerRelayerEvents() {
        this.core.relayer.on(E.message, async (e) => {
          const { topic: t, message: i } = e;
          if (!this.pairings.keys.includes(t) || this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(i)))
            return;
          const s = await this.core.crypto.decode(t, i);
          try {
            f.isJsonRpcRequest(s) ? (this.core.history.set(t, s), this.onRelayEventRequest({ topic: t, payload: s })) : f.isJsonRpcResponse(s) && (await this.core.history.resolve(s), await this.onRelayEventResponse({ topic: t, payload: s }), this.core.history.delete(t, s.id));
          } catch (n) {
            this.logger.error(n);
          }
        });
      }
      registerExpirerEvents() {
        this.core.expirer.on(w.expired, async (e) => {
          const { topic: t } = o.parseExpirerTarget(e.target);
          t && this.pairings.keys.includes(t) && (await this.deletePairing(t, true), this.events.emit("pairing_expire", { topic: t }));
        });
      }
    };
    var gt = class extends x.IJsonRpcHistory {
      constructor(e, t) {
        super(e, t), this.core = e, this.logger = t, this.records = /* @__PURE__ */ new Map(), this.events = new U.EventEmitter(), this.name = He, this.version = Xe, this.cached = [], this.initialized = false, this.storagePrefix = N, this.init = async () => {
          this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.records.set(i.id, i)), this.cached = [], this.registerEventListeners(), this.initialized = true);
        }, this.set = (i, s, n) => {
          if (this.isInitialized(), this.logger.debug("Setting JSON-RPC request history record"), this.logger.trace({ type: "method", method: "set", topic: i, request: s, chainId: n }), this.records.has(s.id))
            return;
          const a = { id: s.id, topic: i, request: { method: s.method, params: s.params || null }, chainId: n, expiry: o.calcExpiry(g.THIRTY_DAYS) };
          this.records.set(a.id, a), this.events.emit(C.created, a);
        }, this.resolve = async (i) => {
          if (this.isInitialized(), this.logger.debug("Updating JSON-RPC response history record"), this.logger.trace({ type: "method", method: "update", response: i }), !this.records.has(i.id))
            return;
          const s = await this.getRecord(i.id);
          typeof s.response > "u" && (s.response = f.isJsonRpcError(i) ? { error: i.error } : { result: i.result }, this.records.set(s.id, s), this.events.emit(C.updated, s));
        }, this.get = async (i, s) => (this.isInitialized(), this.logger.debug("Getting record"), this.logger.trace({ type: "method", method: "get", topic: i, id: s }), await this.getRecord(s)), this.delete = (i, s) => {
          this.isInitialized(), this.logger.debug("Deleting record"), this.logger.trace({ type: "method", method: "delete", id: s }), this.values.forEach((n) => {
            if (n.topic === i) {
              if (typeof s < "u" && n.id !== s)
                return;
              this.records.delete(n.id), this.events.emit(C.deleted, n);
            }
          });
        }, this.exists = async (i, s) => (this.isInitialized(), this.records.has(s) ? (await this.getRecord(s)).topic === i : false), this.on = (i, s) => {
          this.events.on(i, s);
        }, this.once = (i, s) => {
          this.events.once(i, s);
        }, this.off = (i, s) => {
          this.events.off(i, s);
        }, this.removeListener = (i, s) => {
          this.events.removeListener(i, s);
        }, this.logger = u.generateChildLogger(t, this.name);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      get size() {
        return this.records.size;
      }
      get keys() {
        return Array.from(this.records.keys());
      }
      get values() {
        return Array.from(this.records.values());
      }
      get pending() {
        const e = [];
        return this.values.forEach((t) => {
          if (typeof t.response < "u")
            return;
          const i = { topic: t.topic, request: f.formatJsonRpcRequest(t.request.method, t.request.params, t.id), chainId: t.chainId };
          return e.push(i);
        }), e;
      }
      async setJsonRpcRecords(e) {
        await this.core.storage.setItem(this.storageKey, e);
      }
      async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey);
      }
      getRecord(e) {
        this.isInitialized();
        const t = this.records.get(e);
        if (!t) {
          const { message: i } = o.getInternalError("NO_MATCHING_KEY", `${this.name}: ${e}`);
          throw new Error(i);
        }
        return t;
      }
      async persist() {
        await this.setJsonRpcRecords(this.values), this.events.emit(C.sync);
      }
      async restore() {
        try {
          const e = await this.getJsonRpcRecords();
          if (typeof e > "u" || !e.length)
            return;
          if (this.records.size) {
            const { message: t } = o.getInternalError("RESTORE_WILL_OVERRIDE", this.name);
            throw this.logger.error(t), new Error(t);
          }
          this.cached = e, this.logger.debug(`Successfully Restored records for ${this.name}`), this.logger.trace({ type: "method", method: "restore", records: this.values });
        } catch (e) {
          this.logger.debug(`Failed to Restore records for ${this.name}`), this.logger.error(e);
        }
      }
      registerEventListeners() {
        this.events.on(C.created, (e) => {
          const t = C.created;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
        }), this.events.on(C.updated, (e) => {
          const t = C.updated;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
        }), this.events.on(C.deleted, (e) => {
          const t = C.deleted;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, record: e }), this.persist();
        }), this.core.heartbeat.on($.HEARTBEAT_EVENTS.pulse, () => {
          this.cleanup();
        });
      }
      cleanup() {
        try {
          this.records.forEach((e) => {
            g.toMiliseconds(e.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${e.id}`), this.delete(e.topic, e.id));
          });
        } catch (e) {
          this.logger.warn(e);
        }
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var dt = class extends x.IExpirer {
      constructor(e, t) {
        super(e, t), this.core = e, this.logger = t, this.expirations = /* @__PURE__ */ new Map(), this.events = new U.EventEmitter(), this.name = Je, this.version = We, this.cached = [], this.initialized = false, this.storagePrefix = N, this.init = async () => {
          this.initialized || (this.logger.trace("Initialized"), await this.restore(), this.cached.forEach((i) => this.expirations.set(i.target, i)), this.cached = [], this.registerEventListeners(), this.initialized = true);
        }, this.has = (i) => {
          try {
            const s = this.formatTarget(i);
            return typeof this.getExpiration(s) < "u";
          } catch {
            return false;
          }
        }, this.set = (i, s) => {
          this.isInitialized();
          const n = this.formatTarget(i), a = { target: n, expiry: s };
          this.expirations.set(n, a), this.checkExpiry(n, a), this.events.emit(w.created, { target: n, expiration: a });
        }, this.get = (i) => {
          this.isInitialized();
          const s = this.formatTarget(i);
          return this.getExpiration(s);
        }, this.del = (i) => {
          if (this.isInitialized(), this.has(i)) {
            const s = this.formatTarget(i), n = this.getExpiration(s);
            this.expirations.delete(s), this.events.emit(w.deleted, { target: s, expiration: n });
          }
        }, this.on = (i, s) => {
          this.events.on(i, s);
        }, this.once = (i, s) => {
          this.events.once(i, s);
        }, this.off = (i, s) => {
          this.events.off(i, s);
        }, this.removeListener = (i, s) => {
          this.events.removeListener(i, s);
        }, this.logger = u.generateChildLogger(t, this.name);
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      get storageKey() {
        return this.storagePrefix + this.version + "//" + this.name;
      }
      get length() {
        return this.expirations.size;
      }
      get keys() {
        return Array.from(this.expirations.keys());
      }
      get values() {
        return Array.from(this.expirations.values());
      }
      formatTarget(e) {
        if (typeof e == "string")
          return o.formatTopicTarget(e);
        if (typeof e == "number")
          return o.formatIdTarget(e);
        const { message: t } = o.getInternalError("UNKNOWN_TYPE", `Target type: ${typeof e}`);
        throw new Error(t);
      }
      async setExpirations(e) {
        await this.core.storage.setItem(this.storageKey, e);
      }
      async getExpirations() {
        return await this.core.storage.getItem(this.storageKey);
      }
      async persist() {
        await this.setExpirations(this.values), this.events.emit(w.sync);
      }
      async restore() {
        try {
          const e = await this.getExpirations();
          if (typeof e > "u" || !e.length)
            return;
          if (this.expirations.size) {
            const { message: t } = o.getInternalError("RESTORE_WILL_OVERRIDE", this.name);
            throw this.logger.error(t), new Error(t);
          }
          this.cached = e, this.logger.debug(`Successfully Restored expirations for ${this.name}`), this.logger.trace({ type: "method", method: "restore", expirations: this.values });
        } catch (e) {
          this.logger.debug(`Failed to Restore expirations for ${this.name}`), this.logger.error(e);
        }
      }
      getExpiration(e) {
        const t = this.expirations.get(e);
        if (!t) {
          const { message: i } = o.getInternalError("NO_MATCHING_KEY", `${this.name}: ${e}`);
          throw this.logger.error(i), new Error(i);
        }
        return t;
      }
      checkExpiry(e, t) {
        const { expiry: i } = t;
        g.toMiliseconds(i) - Date.now() <= 0 && this.expire(e, t);
      }
      expire(e, t) {
        this.expirations.delete(e), this.events.emit(w.expired, { target: e, expiration: t });
      }
      checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach((e, t) => this.checkExpiry(t, e));
      }
      registerEventListeners() {
        this.core.heartbeat.on($.HEARTBEAT_EVENTS.pulse, () => this.checkExpirations()), this.events.on(w.created, (e) => {
          const t = w.created;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
        }), this.events.on(w.expired, (e) => {
          const t = w.expired;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
        }), this.events.on(w.deleted, (e) => {
          const t = w.deleted;
          this.logger.info(`Emitting ${t}`), this.logger.debug({ type: "event", event: t, data: e }), this.persist();
        });
      }
      isInitialized() {
        if (!this.initialized) {
          const { message: e } = o.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(e);
        }
      }
    };
    var pt = class extends x.IVerify {
      constructor(e, t) {
        super(e, t), this.projectId = e, this.logger = t, this.name = G, this.initialized = false, this.queue = [], this.verifyDisabled = false, this.init = async (i) => {
          if (this.verifyDisabled || o.isReactNative() || !o.isBrowser())
            return;
          const s = i?.verifyUrl || H;
          this.verifyUrl !== s && this.removeIframe(), this.verifyUrl = s;
          try {
            await this.createIframe();
          } catch (n) {
            this.logger.warn(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.warn(n);
          }
          if (!this.initialized) {
            this.removeIframe(), this.verifyUrl = se2;
            try {
              await this.createIframe();
            } catch (n) {
              this.logger.error(`Verify iframe failed to load: ${this.verifyUrl}`), this.logger.error(n), this.verifyDisabled = true;
            }
          }
        }, this.register = async (i) => {
          this.initialized ? this.sendPost(i.attestationId) : (this.addToQueue(i.attestationId), await this.init());
        }, this.resolve = async (i) => {
          if (this.isDevEnv)
            return "";
          const s = i?.verifyUrl || H;
          let n = "";
          try {
            n = await this.fetchAttestation(i.attestationId, s);
          } catch (a) {
            this.logger.warn(`failed to resolve attestation: ${i.attestationId} from url: ${s}`), this.logger.warn(a), n = await this.fetchAttestation(i.attestationId, se2);
          }
          return n;
        }, this.fetchAttestation = async (i, s) => {
          var n;
          this.logger.info(`resolving attestation: ${i} from url: ${s}`);
          const a = this.startAbortTimer(g.ONE_SECOND * 2), h = await fetch(`${s}/attestation/${i}`, { signal: this.abortController.signal });
          return clearTimeout(a), h.status === 200 ? (n = await h.json()) == null ? void 0 : n.origin : "";
        }, this.addToQueue = (i) => {
          this.queue.push(i);
        }, this.processQueue = () => {
          this.queue.length !== 0 && (this.queue.forEach((i) => this.sendPost(i)), this.queue = []);
        }, this.sendPost = (i) => {
          var s;
          try {
            if (!this.iframe)
              return;
            (s = this.iframe.contentWindow) == null || s.postMessage(i, "*"), this.logger.info(`postMessage sent: ${i} ${this.verifyUrl}`);
          } catch {
          }
        }, this.createIframe = async () => {
          let i;
          const s = (n) => {
            n.data === "verify_ready" && (this.initialized = true, this.processQueue(), window.removeEventListener("message", s), i());
          };
          await Promise.race([new Promise((n) => {
            if (document.getElementById(G))
              return n();
            window.addEventListener("message", s);
            const a = document.createElement("iframe");
            a.id = G, a.src = `${this.verifyUrl}/${this.projectId}`, a.style.display = "none", document.body.append(a), this.iframe = a, i = n;
          }), new Promise((n, a) => setTimeout(() => {
            window.removeEventListener("message", s), a("verify iframe load timeout");
          }, g.toMiliseconds(g.FIVE_SECONDS)))]);
        }, this.removeIframe = () => {
          this.iframe && (this.iframe.remove(), this.iframe = void 0, this.initialized = false);
        }, this.logger = u.generateChildLogger(t, this.name), this.verifyUrl = H, this.abortController = new AbortController(), this.isDevEnv = o.isNode() && process.env.IS_VITEST;
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      startAbortTimer(e) {
        return this.abortController = new AbortController(), setTimeout(() => this.abortController.abort(), g.toMiliseconds(e));
      }
    };
    var Es = Object.defineProperty;
    var Dt = Object.getOwnPropertySymbols;
    var bs = Object.prototype.hasOwnProperty;
    var ms = Object.prototype.propertyIsEnumerable;
    var yt = (r, e, t) => e in r ? Es(r, e, { enumerable: true, configurable: true, writable: true, value: t }) : r[e] = t;
    var Et = (r, e) => {
      for (var t in e || (e = {}))
        bs.call(e, t) && yt(r, t, e[t]);
      if (Dt)
        for (var t of Dt(e))
          ms.call(e, t) && yt(r, t, e[t]);
      return r;
    };
    var X = class extends x.ICore {
      constructor(e) {
        super(e), this.protocol = Z, this.version = Ie, this.name = j, this.events = new U.EventEmitter(), this.initialized = false, this.on = (i, s) => this.events.on(i, s), this.once = (i, s) => this.events.once(i, s), this.off = (i, s) => this.events.off(i, s), this.removeListener = (i, s) => this.events.removeListener(i, s), this.projectId = e?.projectId, this.relayUrl = e?.relayUrl || te;
        const t = typeof e?.logger < "u" && typeof e?.logger != "string" ? e.logger : u.pino(u.getDefaultLoggerOptions({ level: e?.logger || Re.logger }));
        this.logger = u.generateChildLogger(t, this.name), this.heartbeat = new $.HeartBeat(), this.crypto = new Ze(this, this.logger, e?.keychain), this.history = new gt(this, this.logger), this.expirer = new dt(this, this.logger), this.storage = e != null && e.storage ? e.storage : new Ct.default(Et(Et({}, _e), e?.storageOptions)), this.relayer = new at({ core: this, logger: this.logger, relayUrl: this.relayUrl, projectId: this.projectId }), this.pairing = new lt(this, this.logger), this.verify = new pt(this.projectId || "", this.logger);
      }
      static async init(e) {
        const t = new X(e);
        await t.initialize();
        const i = await t.crypto.getClientId();
        return await t.storage.setItem(Ke, i), t;
      }
      get context() {
        return u.getLoggerContext(this.logger);
      }
      async start() {
        this.initialized || await this.initialize();
      }
      async initialize() {
        this.logger.trace("Initialized");
        try {
          await this.crypto.init(), await this.history.init(), await this.expirer.init(), await this.relayer.init(), await this.heartbeat.init(), await this.pairing.init(), this.initialized = true, this.logger.info("Core Initialization Success");
        } catch (e) {
          throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, e), this.logger.error(e.message), e;
        }
      }
    };
    var fs = X;
    exports.CORE_CONTEXT = j, exports.CORE_DEFAULT = Re, exports.CORE_PROTOCOL = Z, exports.CORE_STORAGE_OPTIONS = _e, exports.CORE_STORAGE_PREFIX = N, exports.CORE_VERSION = Ie, exports.CRYPTO_CLIENT_SEED = ee, exports.CRYPTO_CONTEXT = Ce, exports.CRYPTO_JWT_TTL = Te, exports.Core = fs, exports.Crypto = Ze, exports.EXPIRER_CONTEXT = Je, exports.EXPIRER_DEFAULT_TTL = is, exports.EXPIRER_EVENTS = w, exports.EXPIRER_STORAGE_VERSION = We, exports.Expirer = dt, exports.HISTORY_CONTEXT = He, exports.HISTORY_EVENTS = C, exports.HISTORY_STORAGE_VERSION = Xe, exports.JsonRpcHistory = gt, exports.KEYCHAIN_CONTEXT = Se, exports.KEYCHAIN_STORAGE_VERSION = Oe, exports.KeyChain = Qe, exports.MESSAGES_CONTEXT = Pe, exports.MESSAGES_STORAGE_VERSION = Ae, exports.MessageTracker = et, exports.PAIRING_CONTEXT = je, exports.PAIRING_DEFAULT_TTL = ts, exports.PAIRING_RPC_OPTS = F, exports.PAIRING_STORAGE_VERSION = Ge, exports.PENDING_SUB_RESOLUTION_TIMEOUT = qe, exports.PUBLISHER_CONTEXT = Ne, exports.PUBLISHER_DEFAULT_TTL = xe, exports.Pairing = lt, exports.RELAYER_CONTEXT = Ue, exports.RELAYER_DEFAULT_LOGGER = ze, exports.RELAYER_DEFAULT_PROTOCOL = Le, exports.RELAYER_DEFAULT_RELAY_URL = te, exports.RELAYER_EVENTS = E, exports.RELAYER_FAILOVER_RELAY_URL = ie, exports.RELAYER_PROVIDER_EVENTS = P, exports.RELAYER_RECONNECT_TIMEOUT = Me, exports.RELAYER_SDK_VERSION = $e, exports.RELAYER_STORAGE_OPTIONS = Zi, exports.RELAYER_SUBSCRIBER_SUFFIX = Fe, exports.RELAYER_TRANSPORT_CUTOFF = Be, exports.Relayer = at, exports.STORE_STORAGE_VERSION = Ve, exports.SUBSCRIBER_CONTEXT = ke, exports.SUBSCRIBER_DEFAULT_TTL = es, exports.SUBSCRIBER_EVENTS = _, exports.SUBSCRIBER_STORAGE_VERSION = Ye, exports.Store = ut, exports.Subscriber = st, exports.VERIFY_CONTEXT = G, exports.VERIFY_FALLBACK_SERVER = se2, exports.VERIFY_SERVER = H, exports.Verify = pt, exports.WALLETCONNECT_CLIENT_ID = Ke, exports.default = X;
  }
});

// node_modules/@walletconnect/sign-client/dist/index.cjs.js
var require_index_cjs4 = __commonJS({
  "node_modules/@walletconnect/sign-client/dist/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var _ = require_index_cjs3();
    var P = require_cjs4();
    var U = require_index_cjs2();
    var i = require_index_cjs();
    var $ = require_events();
    var p2 = require_cjs();
    var g = (init_esm2(), __toCommonJS(esm_exports2));
    function H(E) {
      return E && typeof E == "object" && "default" in E ? E : { default: E };
    }
    var W = H($);
    var A = "wc";
    var L = 2;
    var b = "client";
    var T = `${A}@${L}:${b}:`;
    var V = { name: b, logger: "error", controller: false, relayUrl: "wss://relay.walletconnect.com" };
    var B = { session_proposal: "session_proposal", session_update: "session_update", session_extend: "session_extend", session_ping: "session_ping", session_delete: "session_delete", session_expire: "session_expire", session_request: "session_request", session_request_sent: "session_request_sent", session_event: "session_event", proposal_expire: "proposal_expire" };
    var Z = { database: ":memory:" };
    var M = "WALLETCONNECT_DEEPLINK_CHOICE";
    var ee = { created: "history_created", updated: "history_updated", deleted: "history_deleted", sync: "history_sync" };
    var se2 = "history";
    var te = "0.3";
    var Y = "proposal";
    var ie = p2.THIRTY_DAYS;
    var Q = "Proposal expired";
    var k = "session";
    var O = p2.SEVEN_DAYS;
    var J = "engine";
    var N = { wc_sessionPropose: { req: { ttl: p2.FIVE_MINUTES, prompt: true, tag: 1100 }, res: { ttl: p2.FIVE_MINUTES, prompt: false, tag: 1101 } }, wc_sessionSettle: { req: { ttl: p2.FIVE_MINUTES, prompt: false, tag: 1102 }, res: { ttl: p2.FIVE_MINUTES, prompt: false, tag: 1103 } }, wc_sessionUpdate: { req: { ttl: p2.ONE_DAY, prompt: false, tag: 1104 }, res: { ttl: p2.ONE_DAY, prompt: false, tag: 1105 } }, wc_sessionExtend: { req: { ttl: p2.ONE_DAY, prompt: false, tag: 1106 }, res: { ttl: p2.ONE_DAY, prompt: false, tag: 1107 } }, wc_sessionRequest: { req: { ttl: p2.FIVE_MINUTES, prompt: true, tag: 1108 }, res: { ttl: p2.FIVE_MINUTES, prompt: false, tag: 1109 } }, wc_sessionEvent: { req: { ttl: p2.FIVE_MINUTES, prompt: true, tag: 1110 }, res: { ttl: p2.FIVE_MINUTES, prompt: false, tag: 1111 } }, wc_sessionDelete: { req: { ttl: p2.ONE_DAY, prompt: false, tag: 1112 }, res: { ttl: p2.ONE_DAY, prompt: false, tag: 1113 } }, wc_sessionPing: { req: { ttl: p2.THIRTY_SECONDS, prompt: false, tag: 1114 }, res: { ttl: p2.THIRTY_SECONDS, prompt: false, tag: 1115 } } };
    var D = { min: p2.FIVE_MINUTES, max: p2.SEVEN_DAYS };
    var S = { idle: "IDLE", active: "ACTIVE" };
    var K = "request";
    var F = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest"];
    var re = Object.defineProperty;
    var ne2 = Object.defineProperties;
    var oe = Object.getOwnPropertyDescriptors;
    var X = Object.getOwnPropertySymbols;
    var ae = Object.prototype.hasOwnProperty;
    var ce = Object.prototype.propertyIsEnumerable;
    var j = (E, n, e) => n in E ? re(E, n, { enumerable: true, configurable: true, writable: true, value: e }) : E[n] = e;
    var m = (E, n) => {
      for (var e in n || (n = {}))
        ae.call(n, e) && j(E, e, n[e]);
      if (X)
        for (var e of X(n))
          ce.call(n, e) && j(E, e, n[e]);
      return E;
    };
    var v = (E, n) => ne2(E, oe(n));
    var le = class extends U.IEngine {
      constructor(n) {
        super(n), this.name = J, this.events = new W.default(), this.initialized = false, this.ignoredPayloadTypes = [i.TYPE_1], this.requestQueue = { state: S.idle, queue: [] }, this.sessionRequestQueue = { state: S.idle, queue: [] }, this.requestQueueDelay = p2.ONE_SECOND, this.init = async () => {
          this.initialized || (await this.cleanup(), this.registerRelayerEvents(), this.registerExpirerEvents(), this.client.core.pairing.register({ methods: Object.keys(N) }), this.initialized = true, setTimeout(() => {
            this.sessionRequestQueue.queue = this.getPendingSessionRequests(), this.processSessionRequestQueue();
          }, p2.toMiliseconds(this.requestQueueDelay)));
        }, this.connect = async (e) => {
          await this.isInitialized();
          const s = v(m({}, e), { requiredNamespaces: e.requiredNamespaces || {}, optionalNamespaces: e.optionalNamespaces || {} });
          await this.isValidConnect(s);
          const { pairingTopic: t, requiredNamespaces: r, optionalNamespaces: o, sessionProperties: a, relays: c } = s;
          let l = t, h, u = false;
          if (l && (u = this.client.core.pairing.pairings.get(l).active), !l || !u) {
            const { topic: R, uri: I } = await this.client.core.pairing.create();
            l = R, h = I;
          }
          const d2 = await this.client.core.crypto.generateKeyPair(), y2 = m({ requiredNamespaces: r, optionalNamespaces: o, relays: c ?? [{ protocol: _.RELAYER_DEFAULT_PROTOCOL }], proposer: { publicKey: d2, metadata: this.client.metadata } }, a && { sessionProperties: a }), { reject: w, resolve: q, done: C } = i.createDelayedPromise(p2.FIVE_MINUTES, Q);
          if (this.events.once(i.engineEvent("session_connect"), async ({ error: R, session: I }) => {
            if (R)
              w(R);
            else if (I) {
              I.self.publicKey = d2;
              const G = v(m({}, I), { requiredNamespaces: I.requiredNamespaces, optionalNamespaces: I.optionalNamespaces });
              await this.client.session.set(I.topic, G), await this.setExpiry(I.topic, I.expiry), l && await this.client.core.pairing.updateMetadata({ topic: l, metadata: I.peer.metadata }), q(G);
            }
          }), !l) {
            const { message: R } = i.getInternalError("NO_MATCHING_KEY", `connect() pairing topic: ${l}`);
            throw new Error(R);
          }
          const f = await this.sendRequest({ topic: l, method: "wc_sessionPropose", params: y2 }), z = i.calcExpiry(p2.FIVE_MINUTES);
          return await this.setProposal(f, m({ id: f, expiry: z }, y2)), { uri: h, approval: C };
        }, this.pair = async (e) => (await this.isInitialized(), await this.client.core.pairing.pair(e)), this.approve = async (e) => {
          await this.isInitialized(), await this.isValidApprove(e);
          const { id: s, relayProtocol: t, namespaces: r, sessionProperties: o } = e, a = this.client.proposal.get(s);
          let { pairingTopic: c, proposer: l, requiredNamespaces: h, optionalNamespaces: u } = a;
          c = c || "", i.isValidObject(h) || (h = i.getRequiredNamespacesFromNamespaces(r, "approve()"));
          const d2 = await this.client.core.crypto.generateKeyPair(), y2 = l.publicKey, w = await this.client.core.crypto.generateSharedKey(d2, y2);
          c && s && (await this.client.core.pairing.updateMetadata({ topic: c, metadata: l.metadata }), await this.sendResult({ id: s, topic: c, result: { relay: { protocol: t ?? "irn" }, responderPublicKey: d2 } }), await this.client.proposal.delete(s, i.getSdkError("USER_DISCONNECTED")), await this.client.core.pairing.activate({ topic: c }));
          const q = m({ relay: { protocol: t ?? "irn" }, namespaces: r, requiredNamespaces: h, optionalNamespaces: u, pairingTopic: c, controller: { publicKey: d2, metadata: this.client.metadata }, expiry: i.calcExpiry(O) }, o && { sessionProperties: o });
          await this.client.core.relayer.subscribe(w), await this.sendRequest({ topic: w, method: "wc_sessionSettle", params: q, throwOnFailedPublish: true });
          const C = v(m({}, q), { topic: w, pairingTopic: c, acknowledged: false, self: q.controller, peer: { publicKey: l.publicKey, metadata: l.metadata }, controller: d2 });
          return await this.client.session.set(w, C), await this.setExpiry(w, i.calcExpiry(O)), { topic: w, acknowledged: () => new Promise((f) => setTimeout(() => f(this.client.session.get(w)), 500)) };
        }, this.reject = async (e) => {
          await this.isInitialized(), await this.isValidReject(e);
          const { id: s, reason: t } = e, { pairingTopic: r } = this.client.proposal.get(s);
          r && (await this.sendError(s, r, t), await this.client.proposal.delete(s, i.getSdkError("USER_DISCONNECTED")));
        }, this.update = async (e) => {
          await this.isInitialized(), await this.isValidUpdate(e);
          const { topic: s, namespaces: t } = e, r = await this.sendRequest({ topic: s, method: "wc_sessionUpdate", params: { namespaces: t } }), { done: o, resolve: a, reject: c } = i.createDelayedPromise();
          return this.events.once(i.engineEvent("session_update", r), ({ error: l }) => {
            l ? c(l) : a();
          }), await this.client.session.update(s, { namespaces: t }), { acknowledged: o };
        }, this.extend = async (e) => {
          await this.isInitialized(), await this.isValidExtend(e);
          const { topic: s } = e, t = await this.sendRequest({ topic: s, method: "wc_sessionExtend", params: {} }), { done: r, resolve: o, reject: a } = i.createDelayedPromise();
          return this.events.once(i.engineEvent("session_extend", t), ({ error: c }) => {
            c ? a(c) : o();
          }), await this.setExpiry(s, i.calcExpiry(O)), { acknowledged: r };
        }, this.request = async (e) => {
          await this.isInitialized(), await this.isValidRequest(e);
          const { chainId: s, request: t, topic: r, expiry: o } = e, a = g.payloadId(), { done: c, resolve: l, reject: h } = i.createDelayedPromise(o);
          return this.events.once(i.engineEvent("session_request", a), ({ error: u, result: d2 }) => {
            u ? h(u) : l(d2);
          }), await Promise.all([new Promise(async (u) => {
            await this.sendRequest({ clientRpcId: a, topic: r, method: "wc_sessionRequest", params: { request: t, chainId: s }, expiry: o, throwOnFailedPublish: true }).catch((d2) => h(d2)), this.client.events.emit("session_request_sent", { topic: r, request: t, chainId: s, id: a }), u();
          }), new Promise(async (u) => {
            const d2 = await this.client.core.storage.getItem(M);
            i.handleDeeplinkRedirect({ id: a, topic: r, wcDeepLink: d2 }), u();
          }), c()]).then((u) => u[2]);
        }, this.respond = async (e) => {
          await this.isInitialized(), await this.isValidRespond(e);
          const { topic: s, response: t } = e, { id: r } = t;
          g.isJsonRpcResult(t) ? await this.sendResult({ id: r, topic: s, result: t.result, throwOnFailedPublish: true }) : g.isJsonRpcError(t) && await this.sendError(r, s, t.error), this.cleanupAfterResponse(e);
        }, this.ping = async (e) => {
          await this.isInitialized(), await this.isValidPing(e);
          const { topic: s } = e;
          if (this.client.session.keys.includes(s)) {
            const t = await this.sendRequest({ topic: s, method: "wc_sessionPing", params: {} }), { done: r, resolve: o, reject: a } = i.createDelayedPromise();
            this.events.once(i.engineEvent("session_ping", t), ({ error: c }) => {
              c ? a(c) : o();
            }), await r();
          } else
            this.client.core.pairing.pairings.keys.includes(s) && await this.client.core.pairing.ping({ topic: s });
        }, this.emit = async (e) => {
          await this.isInitialized(), await this.isValidEmit(e);
          const { topic: s, event: t, chainId: r } = e;
          await this.sendRequest({ topic: s, method: "wc_sessionEvent", params: { event: t, chainId: r } });
        }, this.disconnect = async (e) => {
          await this.isInitialized(), await this.isValidDisconnect(e);
          const { topic: s } = e;
          this.client.session.keys.includes(s) ? (await this.sendRequest({ topic: s, method: "wc_sessionDelete", params: i.getSdkError("USER_DISCONNECTED"), throwOnFailedPublish: true }), await this.deleteSession(s)) : await this.client.core.pairing.disconnect({ topic: s });
        }, this.find = (e) => (this.isInitialized(), this.client.session.getAll().filter((s) => i.isSessionCompatible(s, e))), this.getPendingSessionRequests = () => (this.isInitialized(), this.client.pendingRequest.getAll()), this.cleanupDuplicatePairings = async (e) => {
          if (e.pairingTopic)
            try {
              const s = this.client.core.pairing.pairings.get(e.pairingTopic), t = this.client.core.pairing.pairings.getAll().filter((r) => {
                var o, a;
                return ((o = r.peerMetadata) == null ? void 0 : o.url) && ((a = r.peerMetadata) == null ? void 0 : a.url) === e.peer.metadata.url && r.topic && r.topic !== s.topic;
              });
              if (t.length === 0)
                return;
              this.client.logger.info(`Cleaning up ${t.length} duplicate pairing(s)`), await Promise.all(t.map((r) => this.client.core.pairing.disconnect({ topic: r.topic }))), this.client.logger.info("Duplicate pairings clean up finished");
            } catch (s) {
              this.client.logger.error(s);
            }
        }, this.deleteSession = async (e, s) => {
          const { self: t } = this.client.session.get(e);
          await this.client.core.relayer.unsubscribe(e), this.client.session.delete(e, i.getSdkError("USER_DISCONNECTED")), this.client.core.crypto.keychain.has(t.publicKey) && await this.client.core.crypto.deleteKeyPair(t.publicKey), this.client.core.crypto.keychain.has(e) && await this.client.core.crypto.deleteSymKey(e), s || this.client.core.expirer.del(e), this.client.core.storage.removeItem(M).catch((r) => this.client.logger.warn(r));
        }, this.deleteProposal = async (e, s) => {
          await Promise.all([this.client.proposal.delete(e, i.getSdkError("USER_DISCONNECTED")), s ? Promise.resolve() : this.client.core.expirer.del(e)]);
        }, this.deletePendingSessionRequest = async (e, s, t = false) => {
          await Promise.all([this.client.pendingRequest.delete(e, s), t ? Promise.resolve() : this.client.core.expirer.del(e)]), this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter((r) => r.id !== e), t && (this.sessionRequestQueue.state = S.idle);
        }, this.setExpiry = async (e, s) => {
          this.client.session.keys.includes(e) && await this.client.session.update(e, { expiry: s }), this.client.core.expirer.set(e, s);
        }, this.setProposal = async (e, s) => {
          await this.client.proposal.set(e, s), this.client.core.expirer.set(e, s.expiry);
        }, this.setPendingSessionRequest = async (e) => {
          const s = N.wc_sessionRequest.req.ttl, { id: t, topic: r, params: o } = e;
          await this.client.pendingRequest.set(t, { id: t, topic: r, params: o }), s && this.client.core.expirer.set(t, i.calcExpiry(s));
        }, this.sendRequest = async (e) => {
          const { topic: s, method: t, params: r, expiry: o, relayRpcId: a, clientRpcId: c, throwOnFailedPublish: l } = e, h = g.formatJsonRpcRequest(t, r, c);
          if (i.isBrowser() && F.includes(t)) {
            const y2 = i.hashMessage(JSON.stringify(h));
            this.client.core.verify.register({ attestationId: y2 });
          }
          const u = await this.client.core.crypto.encode(s, h), d2 = N[t].req;
          return o && (d2.ttl = o), a && (d2.id = a), this.client.core.history.set(s, h), l ? (d2.internal = v(m({}, d2.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(s, u, d2)) : this.client.core.relayer.publish(s, u, d2).catch((y2) => this.client.logger.error(y2)), h.id;
        }, this.sendResult = async (e) => {
          const { id: s, topic: t, result: r, throwOnFailedPublish: o } = e, a = g.formatJsonRpcResult(s, r), c = await this.client.core.crypto.encode(t, a), l = await this.client.core.history.get(t, s), h = N[l.request.method].res;
          o ? (h.internal = v(m({}, h.internal), { throwOnFailedPublish: true }), await this.client.core.relayer.publish(t, c, h)) : this.client.core.relayer.publish(t, c, h).catch((u) => this.client.logger.error(u)), await this.client.core.history.resolve(a);
        }, this.sendError = async (e, s, t) => {
          const r = g.formatJsonRpcError(e, t), o = await this.client.core.crypto.encode(s, r), a = await this.client.core.history.get(s, e), c = N[a.request.method].res;
          this.client.core.relayer.publish(s, o, c), await this.client.core.history.resolve(r);
        }, this.cleanup = async () => {
          const e = [], s = [];
          this.client.session.getAll().forEach((t) => {
            i.isExpired(t.expiry) && e.push(t.topic);
          }), this.client.proposal.getAll().forEach((t) => {
            i.isExpired(t.expiry) && s.push(t.id);
          }), await Promise.all([...e.map((t) => this.deleteSession(t)), ...s.map((t) => this.deleteProposal(t))]);
        }, this.onRelayEventRequest = async (e) => {
          this.requestQueue.queue.push(e), await this.processRequestsQueue();
        }, this.processRequestsQueue = async () => {
          if (this.requestQueue.state === S.active) {
            this.client.logger.info("Request queue already active, skipping...");
            return;
          }
          for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
            this.requestQueue.state = S.active;
            const e = this.requestQueue.queue.shift();
            if (e)
              try {
                this.processRequest(e), await new Promise((s) => setTimeout(s, 300));
              } catch (s) {
                this.client.logger.warn(s);
              }
          }
          this.requestQueue.state = S.idle;
        }, this.processRequest = (e) => {
          const { topic: s, payload: t } = e, r = t.method;
          switch (r) {
            case "wc_sessionPropose":
              return this.onSessionProposeRequest(s, t);
            case "wc_sessionSettle":
              return this.onSessionSettleRequest(s, t);
            case "wc_sessionUpdate":
              return this.onSessionUpdateRequest(s, t);
            case "wc_sessionExtend":
              return this.onSessionExtendRequest(s, t);
            case "wc_sessionPing":
              return this.onSessionPingRequest(s, t);
            case "wc_sessionDelete":
              return this.onSessionDeleteRequest(s, t);
            case "wc_sessionRequest":
              return this.onSessionRequest(s, t);
            case "wc_sessionEvent":
              return this.onSessionEventRequest(s, t);
            default:
              return this.client.logger.info(`Unsupported request method ${r}`);
          }
        }, this.onRelayEventResponse = async (e) => {
          const { topic: s, payload: t } = e, r = (await this.client.core.history.get(s, t.id)).request.method;
          switch (r) {
            case "wc_sessionPropose":
              return this.onSessionProposeResponse(s, t);
            case "wc_sessionSettle":
              return this.onSessionSettleResponse(s, t);
            case "wc_sessionUpdate":
              return this.onSessionUpdateResponse(s, t);
            case "wc_sessionExtend":
              return this.onSessionExtendResponse(s, t);
            case "wc_sessionPing":
              return this.onSessionPingResponse(s, t);
            case "wc_sessionRequest":
              return this.onSessionRequestResponse(s, t);
            default:
              return this.client.logger.info(`Unsupported response method ${r}`);
          }
        }, this.onRelayEventUnknownPayload = (e) => {
          const { topic: s } = e, { message: t } = i.getInternalError("MISSING_OR_INVALID", `Decoded payload on topic ${s} is not identifiable as a JSON-RPC request or a response.`);
          throw new Error(t);
        }, this.onSessionProposeRequest = async (e, s) => {
          const { params: t, id: r } = s;
          try {
            this.isValidConnect(m({}, s.params));
            const o = i.calcExpiry(p2.FIVE_MINUTES), a = m({ id: r, pairingTopic: e, expiry: o }, t);
            await this.setProposal(r, a);
            const c = i.hashMessage(JSON.stringify(s)), l = await this.getVerifyContext(c, a.proposer.metadata);
            this.client.events.emit("session_proposal", { id: r, params: a, verifyContext: l });
          } catch (o) {
            await this.sendError(r, e, o), this.client.logger.error(o);
          }
        }, this.onSessionProposeResponse = async (e, s) => {
          const { id: t } = s;
          if (g.isJsonRpcResult(s)) {
            const { result: r } = s;
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", result: r });
            const o = this.client.proposal.get(t);
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", proposal: o });
            const a = o.proposer.publicKey;
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", selfPublicKey: a });
            const c = r.responderPublicKey;
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", peerPublicKey: c });
            const l = await this.client.core.crypto.generateSharedKey(a, c);
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", sessionTopic: l });
            const h = await this.client.core.relayer.subscribe(l);
            this.client.logger.trace({ type: "method", method: "onSessionProposeResponse", subscriptionId: h }), await this.client.core.pairing.activate({ topic: e });
          } else
            g.isJsonRpcError(s) && (await this.client.proposal.delete(t, i.getSdkError("USER_DISCONNECTED")), this.events.emit(i.engineEvent("session_connect"), { error: s.error }));
        }, this.onSessionSettleRequest = async (e, s) => {
          const { id: t, params: r } = s;
          try {
            this.isValidSessionSettleRequest(r);
            const { relay: o, controller: a, expiry: c, namespaces: l, requiredNamespaces: h, optionalNamespaces: u, sessionProperties: d2, pairingTopic: y2 } = s.params, w = m({ topic: e, relay: o, expiry: c, namespaces: l, acknowledged: true, pairingTopic: y2, requiredNamespaces: h, optionalNamespaces: u, controller: a.publicKey, self: { publicKey: "", metadata: this.client.metadata }, peer: { publicKey: a.publicKey, metadata: a.metadata } }, d2 && { sessionProperties: d2 });
            await this.sendResult({ id: s.id, topic: e, result: true }), this.events.emit(i.engineEvent("session_connect"), { session: w }), this.cleanupDuplicatePairings(w);
          } catch (o) {
            await this.sendError(t, e, o), this.client.logger.error(o);
          }
        }, this.onSessionSettleResponse = async (e, s) => {
          const { id: t } = s;
          g.isJsonRpcResult(s) ? (await this.client.session.update(e, { acknowledged: true }), this.events.emit(i.engineEvent("session_approve", t), {})) : g.isJsonRpcError(s) && (await this.client.session.delete(e, i.getSdkError("USER_DISCONNECTED")), this.events.emit(i.engineEvent("session_approve", t), { error: s.error }));
        }, this.onSessionUpdateRequest = async (e, s) => {
          const { params: t, id: r } = s;
          try {
            const o = `${e}_session_update`, a = i.MemoryStore.get(o);
            if (a && this.isRequestOutOfSync(a, r)) {
              this.client.logger.info(`Discarding out of sync request - ${r}`);
              return;
            }
            this.isValidUpdate(m({ topic: e }, t)), await this.client.session.update(e, { namespaces: t.namespaces }), await this.sendResult({ id: r, topic: e, result: true }), this.client.events.emit("session_update", { id: r, topic: e, params: t }), i.MemoryStore.set(o, r);
          } catch (o) {
            await this.sendError(r, e, o), this.client.logger.error(o);
          }
        }, this.isRequestOutOfSync = (e, s) => parseInt(s.toString().slice(0, -3)) <= parseInt(e.toString().slice(0, -3)), this.onSessionUpdateResponse = (e, s) => {
          const { id: t } = s;
          g.isJsonRpcResult(s) ? this.events.emit(i.engineEvent("session_update", t), {}) : g.isJsonRpcError(s) && this.events.emit(i.engineEvent("session_update", t), { error: s.error });
        }, this.onSessionExtendRequest = async (e, s) => {
          const { id: t } = s;
          try {
            this.isValidExtend({ topic: e }), await this.setExpiry(e, i.calcExpiry(O)), await this.sendResult({ id: t, topic: e, result: true }), this.client.events.emit("session_extend", { id: t, topic: e });
          } catch (r) {
            await this.sendError(t, e, r), this.client.logger.error(r);
          }
        }, this.onSessionExtendResponse = (e, s) => {
          const { id: t } = s;
          g.isJsonRpcResult(s) ? this.events.emit(i.engineEvent("session_extend", t), {}) : g.isJsonRpcError(s) && this.events.emit(i.engineEvent("session_extend", t), { error: s.error });
        }, this.onSessionPingRequest = async (e, s) => {
          const { id: t } = s;
          try {
            this.isValidPing({ topic: e }), await this.sendResult({ id: t, topic: e, result: true }), this.client.events.emit("session_ping", { id: t, topic: e });
          } catch (r) {
            await this.sendError(t, e, r), this.client.logger.error(r);
          }
        }, this.onSessionPingResponse = (e, s) => {
          const { id: t } = s;
          setTimeout(() => {
            g.isJsonRpcResult(s) ? this.events.emit(i.engineEvent("session_ping", t), {}) : g.isJsonRpcError(s) && this.events.emit(i.engineEvent("session_ping", t), { error: s.error });
          }, 500);
        }, this.onSessionDeleteRequest = async (e, s) => {
          const { id: t } = s;
          try {
            this.isValidDisconnect({ topic: e, reason: s.params }), await Promise.all([new Promise((r) => {
              this.client.core.relayer.once(_.RELAYER_EVENTS.publish, async () => {
                r(await this.deleteSession(e));
              });
            }), this.sendResult({ id: t, topic: e, result: true })]), this.client.events.emit("session_delete", { id: t, topic: e });
          } catch (r) {
            this.client.logger.error(r);
          }
        }, this.onSessionRequest = async (e, s) => {
          const { id: t, params: r } = s;
          try {
            this.isValidRequest(m({ topic: e }, r)), await this.setPendingSessionRequest({ id: t, topic: e, params: r }), this.addSessionRequestToSessionRequestQueue({ id: t, topic: e, params: r }), await this.processSessionRequestQueue();
          } catch (o) {
            await this.sendError(t, e, o), this.client.logger.error(o);
          }
        }, this.onSessionRequestResponse = (e, s) => {
          const { id: t } = s;
          g.isJsonRpcResult(s) ? this.events.emit(i.engineEvent("session_request", t), { result: s.result }) : g.isJsonRpcError(s) && this.events.emit(i.engineEvent("session_request", t), { error: s.error });
        }, this.onSessionEventRequest = async (e, s) => {
          const { id: t, params: r } = s;
          try {
            const o = `${e}_session_event_${r.event.name}`, a = i.MemoryStore.get(o);
            if (a && this.isRequestOutOfSync(a, t)) {
              this.client.logger.info(`Discarding out of sync request - ${t}`);
              return;
            }
            this.isValidEmit(m({ topic: e }, r)), this.client.events.emit("session_event", { id: t, topic: e, params: r }), i.MemoryStore.set(o, t);
          } catch (o) {
            await this.sendError(t, e, o), this.client.logger.error(o);
          }
        }, this.addSessionRequestToSessionRequestQueue = (e) => {
          this.sessionRequestQueue.queue.push(e);
        }, this.cleanupAfterResponse = (e) => {
          this.deletePendingSessionRequest(e.response.id, { message: "fulfilled", code: 0 }), setTimeout(() => {
            this.sessionRequestQueue.state = S.idle, this.processSessionRequestQueue();
          }, p2.toMiliseconds(this.requestQueueDelay));
        }, this.processSessionRequestQueue = async () => {
          if (this.sessionRequestQueue.state === S.active) {
            this.client.logger.info("session request queue is already active.");
            return;
          }
          const e = this.sessionRequestQueue.queue[0];
          if (!e) {
            this.client.logger.info("session request queue is empty.");
            return;
          }
          try {
            const { id: s, topic: t, params: r } = e, o = i.hashMessage(JSON.stringify(g.formatJsonRpcRequest("wc_sessionRequest", r, s))), a = this.client.session.get(t), c = await this.getVerifyContext(o, a.peer.metadata);
            this.sessionRequestQueue.state = S.active, this.client.events.emit("session_request", { id: s, topic: t, params: r, verifyContext: c });
          } catch (s) {
            this.client.logger.error(s);
          }
        }, this.isValidConnect = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(e)}`);
            throw new Error(c);
          }
          const { pairingTopic: s, requiredNamespaces: t, optionalNamespaces: r, sessionProperties: o, relays: a } = e;
          if (i.isUndefined(s) || await this.isValidPairingTopic(s), !i.isValidRelays(a, true)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `connect() relays: ${a}`);
            throw new Error(c);
          }
          !i.isUndefined(t) && i.isValidObject(t) !== 0 && this.validateNamespaces(t, "requiredNamespaces"), !i.isUndefined(r) && i.isValidObject(r) !== 0 && this.validateNamespaces(r, "optionalNamespaces"), i.isUndefined(o) || this.validateSessionProps(o, "sessionProperties");
        }, this.validateNamespaces = (e, s) => {
          const t = i.isValidRequiredNamespaces(e, "connect()", s);
          if (t)
            throw new Error(t.message);
        }, this.isValidApprove = async (e) => {
          if (!i.isValidParams(e))
            throw new Error(i.getInternalError("MISSING_OR_INVALID", `approve() params: ${e}`).message);
          const { id: s, namespaces: t, relayProtocol: r, sessionProperties: o } = e;
          await this.isValidProposalId(s);
          const a = this.client.proposal.get(s), c = i.isValidNamespaces(t, "approve()");
          if (c)
            throw new Error(c.message);
          const l = i.isConformingNamespaces(a.requiredNamespaces, t, "approve()");
          if (l)
            throw new Error(l.message);
          if (!i.isValidString(r, true)) {
            const { message: h } = i.getInternalError("MISSING_OR_INVALID", `approve() relayProtocol: ${r}`);
            throw new Error(h);
          }
          i.isUndefined(o) || this.validateSessionProps(o, "sessionProperties");
        }, this.isValidReject = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: r } = i.getInternalError("MISSING_OR_INVALID", `reject() params: ${e}`);
            throw new Error(r);
          }
          const { id: s, reason: t } = e;
          if (await this.isValidProposalId(s), !i.isValidErrorReason(t)) {
            const { message: r } = i.getInternalError("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(t)}`);
            throw new Error(r);
          }
        }, this.isValidSessionSettleRequest = (e) => {
          if (!i.isValidParams(e)) {
            const { message: l } = i.getInternalError("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${e}`);
            throw new Error(l);
          }
          const { relay: s, controller: t, namespaces: r, expiry: o } = e;
          if (!i.isValidRelay(s)) {
            const { message: l } = i.getInternalError("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
            throw new Error(l);
          }
          const a = i.isValidController(t, "onSessionSettleRequest()");
          if (a)
            throw new Error(a.message);
          const c = i.isValidNamespaces(r, "onSessionSettleRequest()");
          if (c)
            throw new Error(c.message);
          if (i.isExpired(o)) {
            const { message: l } = i.getInternalError("EXPIRED", "onSessionSettleRequest()");
            throw new Error(l);
          }
        }, this.isValidUpdate = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `update() params: ${e}`);
            throw new Error(c);
          }
          const { topic: s, namespaces: t } = e;
          await this.isValidSessionTopic(s);
          const r = this.client.session.get(s), o = i.isValidNamespaces(t, "update()");
          if (o)
            throw new Error(o.message);
          const a = i.isConformingNamespaces(r.requiredNamespaces, t, "update()");
          if (a)
            throw new Error(a.message);
        }, this.isValidExtend = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: t } = i.getInternalError("MISSING_OR_INVALID", `extend() params: ${e}`);
            throw new Error(t);
          }
          const { topic: s } = e;
          await this.isValidSessionTopic(s);
        }, this.isValidRequest = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `request() params: ${e}`);
            throw new Error(c);
          }
          const { topic: s, request: t, chainId: r, expiry: o } = e;
          await this.isValidSessionTopic(s);
          const { namespaces: a } = this.client.session.get(s);
          if (!i.isValidNamespacesChainId(a, r)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `request() chainId: ${r}`);
            throw new Error(c);
          }
          if (!i.isValidRequest(t)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `request() ${JSON.stringify(t)}`);
            throw new Error(c);
          }
          if (!i.isValidNamespacesRequest(a, r, t.method)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `request() method: ${t.method}`);
            throw new Error(c);
          }
          if (o && !i.isValidRequestExpiry(o, D)) {
            const { message: c } = i.getInternalError("MISSING_OR_INVALID", `request() expiry: ${o}. Expiry must be a number (in seconds) between ${D.min} and ${D.max}`);
            throw new Error(c);
          }
        }, this.isValidRespond = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: r } = i.getInternalError("MISSING_OR_INVALID", `respond() params: ${e}`);
            throw new Error(r);
          }
          const { topic: s, response: t } = e;
          if (await this.isValidSessionTopic(s), !i.isValidResponse(t)) {
            const { message: r } = i.getInternalError("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(t)}`);
            throw new Error(r);
          }
        }, this.isValidPing = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: t } = i.getInternalError("MISSING_OR_INVALID", `ping() params: ${e}`);
            throw new Error(t);
          }
          const { topic: s } = e;
          await this.isValidSessionOrPairingTopic(s);
        }, this.isValidEmit = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: a } = i.getInternalError("MISSING_OR_INVALID", `emit() params: ${e}`);
            throw new Error(a);
          }
          const { topic: s, event: t, chainId: r } = e;
          await this.isValidSessionTopic(s);
          const { namespaces: o } = this.client.session.get(s);
          if (!i.isValidNamespacesChainId(o, r)) {
            const { message: a } = i.getInternalError("MISSING_OR_INVALID", `emit() chainId: ${r}`);
            throw new Error(a);
          }
          if (!i.isValidEvent(t)) {
            const { message: a } = i.getInternalError("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
            throw new Error(a);
          }
          if (!i.isValidNamespacesEvent(o, r, t.name)) {
            const { message: a } = i.getInternalError("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(t)}`);
            throw new Error(a);
          }
        }, this.isValidDisconnect = async (e) => {
          if (!i.isValidParams(e)) {
            const { message: t } = i.getInternalError("MISSING_OR_INVALID", `disconnect() params: ${e}`);
            throw new Error(t);
          }
          const { topic: s } = e;
          await this.isValidSessionOrPairingTopic(s);
        }, this.getVerifyContext = async (e, s) => {
          const t = { verified: { verifyUrl: s.verifyUrl || _.VERIFY_SERVER, validation: "UNKNOWN", origin: s.url || "" } };
          try {
            const r = await this.client.core.verify.resolve({ attestationId: e, verifyUrl: s.verifyUrl });
            r && (t.verified.origin = r, t.verified.validation = r === new URL(s.url).origin ? "VALID" : "INVALID");
          } catch (r) {
            this.client.logger.error(r);
          }
          return this.client.logger.info(`Verify context: ${JSON.stringify(t)}`), t;
        }, this.validateSessionProps = (e, s) => {
          Object.values(e).forEach((t) => {
            if (!i.isValidString(t, false)) {
              const { message: r } = i.getInternalError("MISSING_OR_INVALID", `${s} must be in Record<string, string> format. Received: ${JSON.stringify(t)}`);
              throw new Error(r);
            }
          });
        };
      }
      async isInitialized() {
        if (!this.initialized) {
          const { message: n } = i.getInternalError("NOT_INITIALIZED", this.name);
          throw new Error(n);
        }
        await this.client.core.relayer.confirmOnlineStateOrThrow();
      }
      registerRelayerEvents() {
        this.client.core.relayer.on(_.RELAYER_EVENTS.message, async (n) => {
          const { topic: e, message: s } = n;
          if (this.ignoredPayloadTypes.includes(this.client.core.crypto.getPayloadType(s)))
            return;
          const t = await this.client.core.crypto.decode(e, s);
          try {
            g.isJsonRpcRequest(t) ? (this.client.core.history.set(e, t), this.onRelayEventRequest({ topic: e, payload: t })) : g.isJsonRpcResponse(t) ? (await this.client.core.history.resolve(t), await this.onRelayEventResponse({ topic: e, payload: t }), this.client.core.history.delete(e, t.id)) : this.onRelayEventUnknownPayload({ topic: e, payload: t });
          } catch (r) {
            this.client.logger.error(r);
          }
        });
      }
      registerExpirerEvents() {
        this.client.core.expirer.on(_.EXPIRER_EVENTS.expired, async (n) => {
          const { topic: e, id: s } = i.parseExpirerTarget(n.target);
          if (s && this.client.pendingRequest.keys.includes(s))
            return await this.deletePendingSessionRequest(s, i.getInternalError("EXPIRED"), true);
          e ? this.client.session.keys.includes(e) && (await this.deleteSession(e, true), this.client.events.emit("session_expire", { topic: e })) : s && (await this.deleteProposal(s, true), this.client.events.emit("proposal_expire", { id: s }));
        });
      }
      isValidPairingTopic(n) {
        if (!i.isValidString(n, false)) {
          const { message: e } = i.getInternalError("MISSING_OR_INVALID", `pairing topic should be a string: ${n}`);
          throw new Error(e);
        }
        if (!this.client.core.pairing.pairings.keys.includes(n)) {
          const { message: e } = i.getInternalError("NO_MATCHING_KEY", `pairing topic doesn't exist: ${n}`);
          throw new Error(e);
        }
        if (i.isExpired(this.client.core.pairing.pairings.get(n).expiry)) {
          const { message: e } = i.getInternalError("EXPIRED", `pairing topic: ${n}`);
          throw new Error(e);
        }
      }
      async isValidSessionTopic(n) {
        if (!i.isValidString(n, false)) {
          const { message: e } = i.getInternalError("MISSING_OR_INVALID", `session topic should be a string: ${n}`);
          throw new Error(e);
        }
        if (!this.client.session.keys.includes(n)) {
          const { message: e } = i.getInternalError("NO_MATCHING_KEY", `session topic doesn't exist: ${n}`);
          throw new Error(e);
        }
        if (i.isExpired(this.client.session.get(n).expiry)) {
          await this.deleteSession(n);
          const { message: e } = i.getInternalError("EXPIRED", `session topic: ${n}`);
          throw new Error(e);
        }
      }
      async isValidSessionOrPairingTopic(n) {
        if (this.client.session.keys.includes(n))
          await this.isValidSessionTopic(n);
        else if (this.client.core.pairing.pairings.keys.includes(n))
          this.isValidPairingTopic(n);
        else if (i.isValidString(n, false)) {
          const { message: e } = i.getInternalError("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${n}`);
          throw new Error(e);
        } else {
          const { message: e } = i.getInternalError("MISSING_OR_INVALID", `session or pairing topic should be a string: ${n}`);
          throw new Error(e);
        }
      }
      async isValidProposalId(n) {
        if (!i.isValidId(n)) {
          const { message: e } = i.getInternalError("MISSING_OR_INVALID", `proposal id should be a number: ${n}`);
          throw new Error(e);
        }
        if (!this.client.proposal.keys.includes(n)) {
          const { message: e } = i.getInternalError("NO_MATCHING_KEY", `proposal id doesn't exist: ${n}`);
          throw new Error(e);
        }
        if (i.isExpired(this.client.proposal.get(n).expiry)) {
          await this.deleteProposal(n);
          const { message: e } = i.getInternalError("EXPIRED", `proposal id: ${n}`);
          throw new Error(e);
        }
      }
    };
    var pe = class extends _.Store {
      constructor(n, e) {
        super(n, e, Y, T), this.core = n, this.logger = e;
      }
    };
    var he = class extends _.Store {
      constructor(n, e) {
        super(n, e, k, T), this.core = n, this.logger = e;
      }
    };
    var de = class extends _.Store {
      constructor(n, e) {
        super(n, e, K, T, (s) => s.id), this.core = n, this.logger = e;
      }
    };
    var x = class extends U.ISignClient {
      constructor(n) {
        super(n), this.protocol = A, this.version = L, this.name = V.name, this.events = new $.EventEmitter(), this.on = (s, t) => this.events.on(s, t), this.once = (s, t) => this.events.once(s, t), this.off = (s, t) => this.events.off(s, t), this.removeListener = (s, t) => this.events.removeListener(s, t), this.removeAllListeners = (s) => this.events.removeAllListeners(s), this.connect = async (s) => {
          try {
            return await this.engine.connect(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.pair = async (s) => {
          try {
            return await this.engine.pair(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.approve = async (s) => {
          try {
            return await this.engine.approve(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.reject = async (s) => {
          try {
            return await this.engine.reject(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.update = async (s) => {
          try {
            return await this.engine.update(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.extend = async (s) => {
          try {
            return await this.engine.extend(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.request = async (s) => {
          try {
            return await this.engine.request(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.respond = async (s) => {
          try {
            return await this.engine.respond(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.ping = async (s) => {
          try {
            return await this.engine.ping(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.emit = async (s) => {
          try {
            return await this.engine.emit(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.disconnect = async (s) => {
          try {
            return await this.engine.disconnect(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.find = (s) => {
          try {
            return this.engine.find(s);
          } catch (t) {
            throw this.logger.error(t.message), t;
          }
        }, this.getPendingSessionRequests = () => {
          try {
            return this.engine.getPendingSessionRequests();
          } catch (s) {
            throw this.logger.error(s.message), s;
          }
        }, this.name = n?.name || V.name, this.metadata = n?.metadata || i.getAppMetadata();
        const e = typeof n?.logger < "u" && typeof n?.logger != "string" ? n.logger : P.pino(P.getDefaultLoggerOptions({ level: n?.logger || V.logger }));
        this.core = n?.core || new _.Core(n), this.logger = P.generateChildLogger(e, this.name), this.session = new he(this.core, this.logger), this.proposal = new pe(this.core, this.logger), this.pendingRequest = new de(this.core, this.logger), this.engine = new le(this);
      }
      static async init(n) {
        const e = new x(n);
        return await e.initialize(), e;
      }
      get context() {
        return P.getLoggerContext(this.logger);
      }
      get pairing() {
        return this.core.pairing.pairings;
      }
      async initialize() {
        this.logger.trace("Initialized");
        try {
          await this.core.start(), await this.session.init(), await this.proposal.init(), await this.pendingRequest.init(), await this.engine.init(), this.core.verify.init({ verifyUrl: this.metadata.verifyUrl }), this.logger.info("SignClient Initialization Success");
        } catch (n) {
          throw this.logger.info("SignClient Initialization Failure"), this.logger.error(n.message), n;
        }
      }
    };
    var ge = x;
    exports.ENGINE_CONTEXT = J, exports.ENGINE_QUEUE_STATES = S, exports.ENGINE_RPC_OPTS = N, exports.HISTORY_CONTEXT = se2, exports.HISTORY_EVENTS = ee, exports.HISTORY_STORAGE_VERSION = te, exports.METHODS_TO_VERIFY = F, exports.PROPOSAL_CONTEXT = Y, exports.PROPOSAL_EXPIRY = ie, exports.PROPOSAL_EXPIRY_MESSAGE = Q, exports.REQUEST_CONTEXT = K, exports.SESSION_CONTEXT = k, exports.SESSION_EXPIRY = O, exports.SESSION_REQUEST_EXPIRY_BOUNDARIES = D, exports.SIGN_CLIENT_CONTEXT = b, exports.SIGN_CLIENT_DEFAULT = V, exports.SIGN_CLIENT_EVENTS = B, exports.SIGN_CLIENT_PROTOCOL = A, exports.SIGN_CLIENT_STORAGE_OPTIONS = Z, exports.SIGN_CLIENT_STORAGE_PREFIX = T, exports.SIGN_CLIENT_VERSION = L, exports.SignClient = ge, exports.WALLETCONNECT_DEEPLINK_CHOICE = M, exports.default = x;
  }
});

// node_modules/@walletconnect/universal-provider/dist/index.cjs.js
var require_index_cjs5 = __commonJS({
  "node_modules/@walletconnect/universal-provider/dist/index.cjs.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Pa = require_index_cjs4();
    var un = require_index_cjs();
    var Aa = require_cjs4();
    var Ca = (init_esm4(), __toCommonJS(esm_exports4));
    var At = (init_esm3(), __toCommonJS(esm_exports3));
    var Og = require_events();
    function Hi(P) {
      return P && typeof P == "object" && "default" in P ? P : { default: P };
    }
    var bg = Hi(Pa);
    var Gt = Hi(Ca);
    var Tg = Hi(Og);
    var Ia = "error";
    var Lg = "wss://relay.walletconnect.com";
    var Dg = "wc";
    var Ng = "universal_provider";
    var xa = `${Dg}@2:${Ng}:`;
    var Hg = "https://rpc.walletconnect.com/v1";
    var ft = { DEFAULT_CHAIN_CHANGED: "default_chain_changed" };
    var de = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
    var $i = { exports: {} };
    (function(P, u) {
      (function() {
        var i, p2 = "4.17.21", I = 200, T = "Unsupported core-js use. Try https://npms.io/search?q=ponyfill.", U = "Expected a function", Sn = "Invalid `variable` option passed into `_.template`", Kt = "__lodash_hash_undefined__", lr = 500, Ct = "__lodash_placeholder__", Nn = 1, qn = 2, It = 4, xt = 1, ge = 2, _n = 1, ct = 2, qi = 4, Hn = 8, Et = 16, $n = 32, yt = 64, Bn = 128, zt = 256, pr = 512, La = 30, Da = "...", Na = 800, Ha = 16, Bi = 1, $a = 2, Ua = 3, ht = 1 / 0, jn = 9007199254740991, Wa = 17976931348623157e292, ve = 0 / 0, Un = 4294967295, Fa = Un - 1, Ma = Un >>> 1, qa = [["ary", Bn], ["bind", _n], ["bindKey", ct], ["curry", Hn], ["curryRight", Et], ["flip", pr], ["partial", $n], ["partialRight", yt], ["rearg", zt]], St = "[object Arguments]", _e = "[object Array]", Ba = "[object AsyncFunction]", Jt = "[object Boolean]", Yt = "[object Date]", Ga = "[object DOMException]", me = "[object Error]", we = "[object Function]", Gi = "[object GeneratorFunction]", Rn = "[object Map]", Zt = "[object Number]", Ka = "[object Null]", Gn = "[object Object]", Ki = "[object Promise]", za = "[object Proxy]", Xt = "[object RegExp]", On = "[object Set]", Qt = "[object String]", Pe = "[object Symbol]", Ja = "[object Undefined]", Vt = "[object WeakMap]", Ya = "[object WeakSet]", kt = "[object ArrayBuffer]", Rt = "[object DataView]", dr = "[object Float32Array]", gr = "[object Float64Array]", vr = "[object Int8Array]", _r = "[object Int16Array]", mr = "[object Int32Array]", wr = "[object Uint8Array]", Pr = "[object Uint8ClampedArray]", Ar = "[object Uint16Array]", Cr = "[object Uint32Array]", Za = /\b__p \+= '';/g, Xa = /\b(__p \+=) '' \+/g, Qa = /(__e\(.*?\)|\b__t\)) \+\n'';/g, zi = /&(?:amp|lt|gt|quot|#39);/g, Ji = /[&<>"']/g, Va = RegExp(zi.source), ka = RegExp(Ji.source), ja = /<%-([\s\S]+?)%>/g, no = /<%([\s\S]+?)%>/g, Yi = /<%=([\s\S]+?)%>/g, to = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, eo = /^\w*$/, ro = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g, Ir = /[\\^$.*+?()[\]{}|]/g, io = RegExp(Ir.source), xr = /^\s+/, so = /\s/, uo = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/, ao = /\{\n\/\* \[wrapped with (.+)\] \*/, oo = /,? & /, fo = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g, co = /[()=,{}\[\]\/\s]/, ho = /\\(\\)?/g, lo = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g, Zi = /\w*$/, po = /^[-+]0x[0-9a-f]+$/i, go = /^0b[01]+$/i, vo = /^\[object .+?Constructor\]$/, _o = /^0o[0-7]+$/i, mo = /^(?:0|[1-9]\d*)$/, wo = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g, Ae = /($^)/, Po = /['\n\r\u2028\u2029\\]/g, Ce = "\\ud800-\\udfff", Ao = "\\u0300-\\u036f", Co = "\\ufe20-\\ufe2f", Io = "\\u20d0-\\u20ff", Xi = Ao + Co + Io, Qi = "\\u2700-\\u27bf", Vi = "a-z\\xdf-\\xf6\\xf8-\\xff", xo = "\\xac\\xb1\\xd7\\xf7", Eo = "\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf", yo = "\\u2000-\\u206f", So = " \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000", ki = "A-Z\\xc0-\\xd6\\xd8-\\xde", ji = "\\ufe0e\\ufe0f", ns = xo + Eo + yo + So, Er = "['\u2019]", Ro = "[" + Ce + "]", ts = "[" + ns + "]", Ie = "[" + Xi + "]", es = "\\d+", Oo = "[" + Qi + "]", rs = "[" + Vi + "]", is = "[^" + Ce + ns + es + Qi + Vi + ki + "]", yr = "\\ud83c[\\udffb-\\udfff]", bo = "(?:" + Ie + "|" + yr + ")", ss = "[^" + Ce + "]", Sr = "(?:\\ud83c[\\udde6-\\uddff]){2}", Rr = "[\\ud800-\\udbff][\\udc00-\\udfff]", Ot = "[" + ki + "]", us = "\\u200d", as = "(?:" + rs + "|" + is + ")", To = "(?:" + Ot + "|" + is + ")", os = "(?:" + Er + "(?:d|ll|m|re|s|t|ve))?", fs = "(?:" + Er + "(?:D|LL|M|RE|S|T|VE))?", cs = bo + "?", hs = "[" + ji + "]?", Lo = "(?:" + us + "(?:" + [ss, Sr, Rr].join("|") + ")" + hs + cs + ")*", Do = "\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])", No = "\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])", ls = hs + cs + Lo, Ho = "(?:" + [Oo, Sr, Rr].join("|") + ")" + ls, $o = "(?:" + [ss + Ie + "?", Ie, Sr, Rr, Ro].join("|") + ")", Uo = RegExp(Er, "g"), Wo = RegExp(Ie, "g"), Or = RegExp(yr + "(?=" + yr + ")|" + $o + ls, "g"), Fo = RegExp([Ot + "?" + rs + "+" + os + "(?=" + [ts, Ot, "$"].join("|") + ")", To + "+" + fs + "(?=" + [ts, Ot + as, "$"].join("|") + ")", Ot + "?" + as + "+" + os, Ot + "+" + fs, No, Do, es, Ho].join("|"), "g"), Mo = RegExp("[" + us + Ce + Xi + ji + "]"), qo = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/, Bo = ["Array", "Buffer", "DataView", "Date", "Error", "Float32Array", "Float64Array", "Function", "Int8Array", "Int16Array", "Int32Array", "Map", "Math", "Object", "Promise", "RegExp", "Set", "String", "Symbol", "TypeError", "Uint8Array", "Uint8ClampedArray", "Uint16Array", "Uint32Array", "WeakMap", "_", "clearTimeout", "isFinite", "parseInt", "setTimeout"], Go = -1, B = {};
        B[dr] = B[gr] = B[vr] = B[_r] = B[mr] = B[wr] = B[Pr] = B[Ar] = B[Cr] = true, B[St] = B[_e] = B[kt] = B[Jt] = B[Rt] = B[Yt] = B[me] = B[we] = B[Rn] = B[Zt] = B[Gn] = B[Xt] = B[On] = B[Qt] = B[Vt] = false;
        var q = {};
        q[St] = q[_e] = q[kt] = q[Rt] = q[Jt] = q[Yt] = q[dr] = q[gr] = q[vr] = q[_r] = q[mr] = q[Rn] = q[Zt] = q[Gn] = q[Xt] = q[On] = q[Qt] = q[Pe] = q[wr] = q[Pr] = q[Ar] = q[Cr] = true, q[me] = q[we] = q[Vt] = false;
        var Ko = { \u00C0: "A", \u00C1: "A", \u00C2: "A", \u00C3: "A", \u00C4: "A", \u00C5: "A", \u00E0: "a", \u00E1: "a", \u00E2: "a", \u00E3: "a", \u00E4: "a", \u00E5: "a", \u00C7: "C", \u00E7: "c", \u00D0: "D", \u00F0: "d", \u00C8: "E", \u00C9: "E", \u00CA: "E", \u00CB: "E", \u00E8: "e", \u00E9: "e", \u00EA: "e", \u00EB: "e", \u00CC: "I", \u00CD: "I", \u00CE: "I", \u00CF: "I", \u00EC: "i", \u00ED: "i", \u00EE: "i", \u00EF: "i", \u00D1: "N", \u00F1: "n", \u00D2: "O", \u00D3: "O", \u00D4: "O", \u00D5: "O", \u00D6: "O", \u00D8: "O", \u00F2: "o", \u00F3: "o", \u00F4: "o", \u00F5: "o", \u00F6: "o", \u00F8: "o", \u00D9: "U", \u00DA: "U", \u00DB: "U", \u00DC: "U", \u00F9: "u", \u00FA: "u", \u00FB: "u", \u00FC: "u", \u00DD: "Y", \u00FD: "y", \u00FF: "y", \u00C6: "Ae", \u00E6: "ae", \u00DE: "Th", \u00FE: "th", \u00DF: "ss", \u0100: "A", \u0102: "A", \u0104: "A", \u0101: "a", \u0103: "a", \u0105: "a", \u0106: "C", \u0108: "C", \u010A: "C", \u010C: "C", \u0107: "c", \u0109: "c", \u010B: "c", \u010D: "c", \u010E: "D", \u0110: "D", \u010F: "d", \u0111: "d", \u0112: "E", \u0114: "E", \u0116: "E", \u0118: "E", \u011A: "E", \u0113: "e", \u0115: "e", \u0117: "e", \u0119: "e", \u011B: "e", \u011C: "G", \u011E: "G", \u0120: "G", \u0122: "G", \u011D: "g", \u011F: "g", \u0121: "g", \u0123: "g", \u0124: "H", \u0126: "H", \u0125: "h", \u0127: "h", \u0128: "I", \u012A: "I", \u012C: "I", \u012E: "I", \u0130: "I", \u0129: "i", \u012B: "i", \u012D: "i", \u012F: "i", \u0131: "i", \u0134: "J", \u0135: "j", \u0136: "K", \u0137: "k", \u0138: "k", \u0139: "L", \u013B: "L", \u013D: "L", \u013F: "L", \u0141: "L", \u013A: "l", \u013C: "l", \u013E: "l", \u0140: "l", \u0142: "l", \u0143: "N", \u0145: "N", \u0147: "N", \u014A: "N", \u0144: "n", \u0146: "n", \u0148: "n", \u014B: "n", \u014C: "O", \u014E: "O", \u0150: "O", \u014D: "o", \u014F: "o", \u0151: "o", \u0154: "R", \u0156: "R", \u0158: "R", \u0155: "r", \u0157: "r", \u0159: "r", \u015A: "S", \u015C: "S", \u015E: "S", \u0160: "S", \u015B: "s", \u015D: "s", \u015F: "s", \u0161: "s", \u0162: "T", \u0164: "T", \u0166: "T", \u0163: "t", \u0165: "t", \u0167: "t", \u0168: "U", \u016A: "U", \u016C: "U", \u016E: "U", \u0170: "U", \u0172: "U", \u0169: "u", \u016B: "u", \u016D: "u", \u016F: "u", \u0171: "u", \u0173: "u", \u0174: "W", \u0175: "w", \u0176: "Y", \u0177: "y", \u0178: "Y", \u0179: "Z", \u017B: "Z", \u017D: "Z", \u017A: "z", \u017C: "z", \u017E: "z", \u0132: "IJ", \u0133: "ij", \u0152: "Oe", \u0153: "oe", \u0149: "'n", \u017F: "s" }, zo = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }, Jo = { "&amp;": "&", "&lt;": "<", "&gt;": ">", "&quot;": '"', "&#39;": "'" }, Yo = { "\\": "\\", "'": "'", "\n": "n", "\r": "r", "\u2028": "u2028", "\u2029": "u2029" }, Zo = parseFloat, Xo = parseInt, ps = typeof de == "object" && de && de.Object === Object && de, Qo = typeof self == "object" && self && self.Object === Object && self, k = ps || Qo || Function("return this")(), br = u && !u.nodeType && u, lt = br && true && P && !P.nodeType && P, ds = lt && lt.exports === br, Tr = ds && ps.process, mn = function() {
          try {
            var h = lt && lt.require && lt.require("util").types;
            return h || Tr && Tr.binding && Tr.binding("util");
          } catch {
          }
        }(), gs = mn && mn.isArrayBuffer, vs = mn && mn.isDate, _s = mn && mn.isMap, ms = mn && mn.isRegExp, ws = mn && mn.isSet, Ps = mn && mn.isTypedArray;
        function hn(h, g, d2) {
          switch (d2.length) {
            case 0:
              return h.call(g);
            case 1:
              return h.call(g, d2[0]);
            case 2:
              return h.call(g, d2[0], d2[1]);
            case 3:
              return h.call(g, d2[0], d2[1], d2[2]);
          }
          return h.apply(g, d2);
        }
        function Vo(h, g, d2, A) {
          for (var S = -1, $ = h == null ? 0 : h.length; ++S < $; ) {
            var X = h[S];
            g(A, X, d2(X), h);
          }
          return A;
        }
        function wn(h, g) {
          for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A && g(h[d2], d2, h) !== false; )
            ;
          return h;
        }
        function ko(h, g) {
          for (var d2 = h == null ? 0 : h.length; d2-- && g(h[d2], d2, h) !== false; )
            ;
          return h;
        }
        function As(h, g) {
          for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A; )
            if (!g(h[d2], d2, h))
              return false;
          return true;
        }
        function nt(h, g) {
          for (var d2 = -1, A = h == null ? 0 : h.length, S = 0, $ = []; ++d2 < A; ) {
            var X = h[d2];
            g(X, d2, h) && ($[S++] = X);
          }
          return $;
        }
        function xe(h, g) {
          var d2 = h == null ? 0 : h.length;
          return !!d2 && bt(h, g, 0) > -1;
        }
        function Lr(h, g, d2) {
          for (var A = -1, S = h == null ? 0 : h.length; ++A < S; )
            if (d2(g, h[A]))
              return true;
          return false;
        }
        function G(h, g) {
          for (var d2 = -1, A = h == null ? 0 : h.length, S = Array(A); ++d2 < A; )
            S[d2] = g(h[d2], d2, h);
          return S;
        }
        function tt(h, g) {
          for (var d2 = -1, A = g.length, S = h.length; ++d2 < A; )
            h[S + d2] = g[d2];
          return h;
        }
        function Dr(h, g, d2, A) {
          var S = -1, $ = h == null ? 0 : h.length;
          for (A && $ && (d2 = h[++S]); ++S < $; )
            d2 = g(d2, h[S], S, h);
          return d2;
        }
        function jo(h, g, d2, A) {
          var S = h == null ? 0 : h.length;
          for (A && S && (d2 = h[--S]); S--; )
            d2 = g(d2, h[S], S, h);
          return d2;
        }
        function Nr(h, g) {
          for (var d2 = -1, A = h == null ? 0 : h.length; ++d2 < A; )
            if (g(h[d2], d2, h))
              return true;
          return false;
        }
        var nf = Hr("length");
        function tf(h) {
          return h.split("");
        }
        function ef(h) {
          return h.match(fo) || [];
        }
        function Cs(h, g, d2) {
          var A;
          return d2(h, function(S, $, X) {
            if (g(S, $, X))
              return A = $, false;
          }), A;
        }
        function Ee(h, g, d2, A) {
          for (var S = h.length, $ = d2 + (A ? 1 : -1); A ? $-- : ++$ < S; )
            if (g(h[$], $, h))
              return $;
          return -1;
        }
        function bt(h, g, d2) {
          return g === g ? gf(h, g, d2) : Ee(h, Is, d2);
        }
        function rf(h, g, d2, A) {
          for (var S = d2 - 1, $ = h.length; ++S < $; )
            if (A(h[S], g))
              return S;
          return -1;
        }
        function Is(h) {
          return h !== h;
        }
        function xs(h, g) {
          var d2 = h == null ? 0 : h.length;
          return d2 ? Ur(h, g) / d2 : ve;
        }
        function Hr(h) {
          return function(g) {
            return g == null ? i : g[h];
          };
        }
        function $r(h) {
          return function(g) {
            return h == null ? i : h[g];
          };
        }
        function Es(h, g, d2, A, S) {
          return S(h, function($, X, M) {
            d2 = A ? (A = false, $) : g(d2, $, X, M);
          }), d2;
        }
        function sf(h, g) {
          var d2 = h.length;
          for (h.sort(g); d2--; )
            h[d2] = h[d2].value;
          return h;
        }
        function Ur(h, g) {
          for (var d2, A = -1, S = h.length; ++A < S; ) {
            var $ = g(h[A]);
            $ !== i && (d2 = d2 === i ? $ : d2 + $);
          }
          return d2;
        }
        function Wr(h, g) {
          for (var d2 = -1, A = Array(h); ++d2 < h; )
            A[d2] = g(d2);
          return A;
        }
        function uf(h, g) {
          return G(g, function(d2) {
            return [d2, h[d2]];
          });
        }
        function ys(h) {
          return h && h.slice(0, bs(h) + 1).replace(xr, "");
        }
        function ln(h) {
          return function(g) {
            return h(g);
          };
        }
        function Fr(h, g) {
          return G(g, function(d2) {
            return h[d2];
          });
        }
        function jt(h, g) {
          return h.has(g);
        }
        function Ss(h, g) {
          for (var d2 = -1, A = h.length; ++d2 < A && bt(g, h[d2], 0) > -1; )
            ;
          return d2;
        }
        function Rs(h, g) {
          for (var d2 = h.length; d2-- && bt(g, h[d2], 0) > -1; )
            ;
          return d2;
        }
        function af(h, g) {
          for (var d2 = h.length, A = 0; d2--; )
            h[d2] === g && ++A;
          return A;
        }
        var of = $r(Ko), ff = $r(zo);
        function cf(h) {
          return "\\" + Yo[h];
        }
        function hf(h, g) {
          return h == null ? i : h[g];
        }
        function Tt(h) {
          return Mo.test(h);
        }
        function lf(h) {
          return qo.test(h);
        }
        function pf(h) {
          for (var g, d2 = []; !(g = h.next()).done; )
            d2.push(g.value);
          return d2;
        }
        function Mr(h) {
          var g = -1, d2 = Array(h.size);
          return h.forEach(function(A, S) {
            d2[++g] = [S, A];
          }), d2;
        }
        function Os(h, g) {
          return function(d2) {
            return h(g(d2));
          };
        }
        function et(h, g) {
          for (var d2 = -1, A = h.length, S = 0, $ = []; ++d2 < A; ) {
            var X = h[d2];
            (X === g || X === Ct) && (h[d2] = Ct, $[S++] = d2);
          }
          return $;
        }
        function ye(h) {
          var g = -1, d2 = Array(h.size);
          return h.forEach(function(A) {
            d2[++g] = A;
          }), d2;
        }
        function df(h) {
          var g = -1, d2 = Array(h.size);
          return h.forEach(function(A) {
            d2[++g] = [A, A];
          }), d2;
        }
        function gf(h, g, d2) {
          for (var A = d2 - 1, S = h.length; ++A < S; )
            if (h[A] === g)
              return A;
          return -1;
        }
        function vf(h, g, d2) {
          for (var A = d2 + 1; A--; )
            if (h[A] === g)
              return A;
          return A;
        }
        function Lt(h) {
          return Tt(h) ? mf(h) : nf(h);
        }
        function bn(h) {
          return Tt(h) ? wf(h) : tf(h);
        }
        function bs(h) {
          for (var g = h.length; g-- && so.test(h.charAt(g)); )
            ;
          return g;
        }
        var _f = $r(Jo);
        function mf(h) {
          for (var g = Or.lastIndex = 0; Or.test(h); )
            ++g;
          return g;
        }
        function wf(h) {
          return h.match(Or) || [];
        }
        function Pf(h) {
          return h.match(Fo) || [];
        }
        var Af = function h(g) {
          g = g == null ? k : Dt.defaults(k.Object(), g, Dt.pick(k, Bo));
          var d2 = g.Array, A = g.Date, S = g.Error, $ = g.Function, X = g.Math, M = g.Object, qr = g.RegExp, Cf = g.String, Pn = g.TypeError, Se = d2.prototype, If = $.prototype, Nt = M.prototype, Re = g["__core-js_shared__"], Oe = If.toString, F = Nt.hasOwnProperty, xf = 0, Ts = function() {
            var n = /[^.]+$/.exec(Re && Re.keys && Re.keys.IE_PROTO || "");
            return n ? "Symbol(src)_1." + n : "";
          }(), be = Nt.toString, Ef = Oe.call(M), yf = k._, Sf = qr("^" + Oe.call(F).replace(Ir, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"), Te = ds ? g.Buffer : i, rt = g.Symbol, Le = g.Uint8Array, Ls = Te ? Te.allocUnsafe : i, De = Os(M.getPrototypeOf, M), Ds = M.create, Ns = Nt.propertyIsEnumerable, Ne = Se.splice, Hs = rt ? rt.isConcatSpreadable : i, ne2 = rt ? rt.iterator : i, pt = rt ? rt.toStringTag : i, He = function() {
            try {
              var n = mt(M, "defineProperty");
              return n({}, "", {}), n;
            } catch {
            }
          }(), Rf = g.clearTimeout !== k.clearTimeout && g.clearTimeout, Of = A && A.now !== k.Date.now && A.now, bf = g.setTimeout !== k.setTimeout && g.setTimeout, $e = X.ceil, Ue = X.floor, Br = M.getOwnPropertySymbols, Tf = Te ? Te.isBuffer : i, $s = g.isFinite, Lf = Se.join, Df = Os(M.keys, M), Q = X.max, nn = X.min, Nf = A.now, Hf = g.parseInt, Us = X.random, $f = Se.reverse, Gr = mt(g, "DataView"), te = mt(g, "Map"), Kr = mt(g, "Promise"), Ht = mt(g, "Set"), ee = mt(g, "WeakMap"), re = mt(M, "create"), We = ee && new ee(), $t = {}, Uf = wt(Gr), Wf = wt(te), Ff = wt(Kr), Mf = wt(Ht), qf = wt(ee), Fe = rt ? rt.prototype : i, ie = Fe ? Fe.valueOf : i, Ws = Fe ? Fe.toString : i;
          function a(n) {
            if (z(n) && !R(n) && !(n instanceof N)) {
              if (n instanceof An)
                return n;
              if (F.call(n, "__wrapped__"))
                return Fu(n);
            }
            return new An(n);
          }
          var Ut = function() {
            function n() {
            }
            return function(t) {
              if (!K(t))
                return {};
              if (Ds)
                return Ds(t);
              n.prototype = t;
              var e = new n();
              return n.prototype = i, e;
            };
          }();
          function Me() {
          }
          function An(n, t) {
            this.__wrapped__ = n, this.__actions__ = [], this.__chain__ = !!t, this.__index__ = 0, this.__values__ = i;
          }
          a.templateSettings = { escape: ja, evaluate: no, interpolate: Yi, variable: "", imports: { _: a } }, a.prototype = Me.prototype, a.prototype.constructor = a, An.prototype = Ut(Me.prototype), An.prototype.constructor = An;
          function N(n) {
            this.__wrapped__ = n, this.__actions__ = [], this.__dir__ = 1, this.__filtered__ = false, this.__iteratees__ = [], this.__takeCount__ = Un, this.__views__ = [];
          }
          function Bf() {
            var n = new N(this.__wrapped__);
            return n.__actions__ = an(this.__actions__), n.__dir__ = this.__dir__, n.__filtered__ = this.__filtered__, n.__iteratees__ = an(this.__iteratees__), n.__takeCount__ = this.__takeCount__, n.__views__ = an(this.__views__), n;
          }
          function Gf() {
            if (this.__filtered__) {
              var n = new N(this);
              n.__dir__ = -1, n.__filtered__ = true;
            } else
              n = this.clone(), n.__dir__ *= -1;
            return n;
          }
          function Kf() {
            var n = this.__wrapped__.value(), t = this.__dir__, e = R(n), r = t < 0, s = e ? n.length : 0, o = eh(0, s, this.__views__), f = o.start, c = o.end, l = c - f, v = r ? c : f - 1, _ = this.__iteratees__, m = _.length, w = 0, C = nn(l, this.__takeCount__);
            if (!e || !r && s == l && C == l)
              return ou(n, this.__actions__);
            var E = [];
            n:
              for (; l-- && w < C; ) {
                v += t;
                for (var b = -1, y2 = n[v]; ++b < m; ) {
                  var D = _[b], H = D.iteratee, gn = D.type, sn = H(y2);
                  if (gn == $a)
                    y2 = sn;
                  else if (!sn) {
                    if (gn == Bi)
                      continue n;
                    break n;
                  }
                }
                E[w++] = y2;
              }
            return E;
          }
          N.prototype = Ut(Me.prototype), N.prototype.constructor = N;
          function dt(n) {
            var t = -1, e = n == null ? 0 : n.length;
            for (this.clear(); ++t < e; ) {
              var r = n[t];
              this.set(r[0], r[1]);
            }
          }
          function zf() {
            this.__data__ = re ? re(null) : {}, this.size = 0;
          }
          function Jf(n) {
            var t = this.has(n) && delete this.__data__[n];
            return this.size -= t ? 1 : 0, t;
          }
          function Yf(n) {
            var t = this.__data__;
            if (re) {
              var e = t[n];
              return e === Kt ? i : e;
            }
            return F.call(t, n) ? t[n] : i;
          }
          function Zf(n) {
            var t = this.__data__;
            return re ? t[n] !== i : F.call(t, n);
          }
          function Xf(n, t) {
            var e = this.__data__;
            return this.size += this.has(n) ? 0 : 1, e[n] = re && t === i ? Kt : t, this;
          }
          dt.prototype.clear = zf, dt.prototype.delete = Jf, dt.prototype.get = Yf, dt.prototype.has = Zf, dt.prototype.set = Xf;
          function Kn(n) {
            var t = -1, e = n == null ? 0 : n.length;
            for (this.clear(); ++t < e; ) {
              var r = n[t];
              this.set(r[0], r[1]);
            }
          }
          function Qf() {
            this.__data__ = [], this.size = 0;
          }
          function Vf(n) {
            var t = this.__data__, e = qe(t, n);
            if (e < 0)
              return false;
            var r = t.length - 1;
            return e == r ? t.pop() : Ne.call(t, e, 1), --this.size, true;
          }
          function kf(n) {
            var t = this.__data__, e = qe(t, n);
            return e < 0 ? i : t[e][1];
          }
          function jf(n) {
            return qe(this.__data__, n) > -1;
          }
          function nc(n, t) {
            var e = this.__data__, r = qe(e, n);
            return r < 0 ? (++this.size, e.push([n, t])) : e[r][1] = t, this;
          }
          Kn.prototype.clear = Qf, Kn.prototype.delete = Vf, Kn.prototype.get = kf, Kn.prototype.has = jf, Kn.prototype.set = nc;
          function zn(n) {
            var t = -1, e = n == null ? 0 : n.length;
            for (this.clear(); ++t < e; ) {
              var r = n[t];
              this.set(r[0], r[1]);
            }
          }
          function tc() {
            this.size = 0, this.__data__ = { hash: new dt(), map: new (te || Kn)(), string: new dt() };
          }
          function ec(n) {
            var t = je(this, n).delete(n);
            return this.size -= t ? 1 : 0, t;
          }
          function rc(n) {
            return je(this, n).get(n);
          }
          function ic(n) {
            return je(this, n).has(n);
          }
          function sc(n, t) {
            var e = je(this, n), r = e.size;
            return e.set(n, t), this.size += e.size == r ? 0 : 1, this;
          }
          zn.prototype.clear = tc, zn.prototype.delete = ec, zn.prototype.get = rc, zn.prototype.has = ic, zn.prototype.set = sc;
          function gt(n) {
            var t = -1, e = n == null ? 0 : n.length;
            for (this.__data__ = new zn(); ++t < e; )
              this.add(n[t]);
          }
          function uc(n) {
            return this.__data__.set(n, Kt), this;
          }
          function ac(n) {
            return this.__data__.has(n);
          }
          gt.prototype.add = gt.prototype.push = uc, gt.prototype.has = ac;
          function Tn(n) {
            var t = this.__data__ = new Kn(n);
            this.size = t.size;
          }
          function oc() {
            this.__data__ = new Kn(), this.size = 0;
          }
          function fc(n) {
            var t = this.__data__, e = t.delete(n);
            return this.size = t.size, e;
          }
          function cc(n) {
            return this.__data__.get(n);
          }
          function hc(n) {
            return this.__data__.has(n);
          }
          function lc(n, t) {
            var e = this.__data__;
            if (e instanceof Kn) {
              var r = e.__data__;
              if (!te || r.length < I - 1)
                return r.push([n, t]), this.size = ++e.size, this;
              e = this.__data__ = new zn(r);
            }
            return e.set(n, t), this.size = e.size, this;
          }
          Tn.prototype.clear = oc, Tn.prototype.delete = fc, Tn.prototype.get = cc, Tn.prototype.has = hc, Tn.prototype.set = lc;
          function Fs(n, t) {
            var e = R(n), r = !e && Pt(n), s = !e && !r && ot(n), o = !e && !r && !s && qt(n), f = e || r || s || o, c = f ? Wr(n.length, Cf) : [], l = c.length;
            for (var v in n)
              (t || F.call(n, v)) && !(f && (v == "length" || s && (v == "offset" || v == "parent") || o && (v == "buffer" || v == "byteLength" || v == "byteOffset") || Xn(v, l))) && c.push(v);
            return c;
          }
          function Ms(n) {
            var t = n.length;
            return t ? n[ti(0, t - 1)] : i;
          }
          function pc(n, t) {
            return nr(an(n), vt(t, 0, n.length));
          }
          function dc(n) {
            return nr(an(n));
          }
          function zr(n, t, e) {
            (e !== i && !Ln(n[t], e) || e === i && !(t in n)) && Jn(n, t, e);
          }
          function se2(n, t, e) {
            var r = n[t];
            (!(F.call(n, t) && Ln(r, e)) || e === i && !(t in n)) && Jn(n, t, e);
          }
          function qe(n, t) {
            for (var e = n.length; e--; )
              if (Ln(n[e][0], t))
                return e;
            return -1;
          }
          function gc(n, t, e, r) {
            return it(n, function(s, o, f) {
              t(r, s, e(s), f);
            }), r;
          }
          function qs(n, t) {
            return n && Fn(t, V(t), n);
          }
          function vc(n, t) {
            return n && Fn(t, fn(t), n);
          }
          function Jn(n, t, e) {
            t == "__proto__" && He ? He(n, t, { configurable: true, enumerable: true, value: e, writable: true }) : n[t] = e;
          }
          function Jr(n, t) {
            for (var e = -1, r = t.length, s = d2(r), o = n == null; ++e < r; )
              s[e] = o ? i : yi(n, t[e]);
            return s;
          }
          function vt(n, t, e) {
            return n === n && (e !== i && (n = n <= e ? n : e), t !== i && (n = n >= t ? n : t)), n;
          }
          function Cn(n, t, e, r, s, o) {
            var f, c = t & Nn, l = t & qn, v = t & It;
            if (e && (f = s ? e(n, r, s, o) : e(n)), f !== i)
              return f;
            if (!K(n))
              return n;
            var _ = R(n);
            if (_) {
              if (f = ih(n), !c)
                return an(n, f);
            } else {
              var m = tn(n), w = m == we || m == Gi;
              if (ot(n))
                return hu(n, c);
              if (m == Gn || m == St || w && !s) {
                if (f = l || w ? {} : bu(n), !c)
                  return l ? Yc(n, vc(f, n)) : Jc(n, qs(f, n));
              } else {
                if (!q[m])
                  return s ? n : {};
                f = sh(n, m, c);
              }
            }
            o || (o = new Tn());
            var C = o.get(n);
            if (C)
              return C;
            o.set(n, f), sa(n) ? n.forEach(function(y2) {
              f.add(Cn(y2, t, e, y2, n, o));
            }) : ra(n) && n.forEach(function(y2, D) {
              f.set(D, Cn(y2, t, e, D, n, o));
            });
            var E = v ? l ? li : hi : l ? fn : V, b = _ ? i : E(n);
            return wn(b || n, function(y2, D) {
              b && (D = y2, y2 = n[D]), se2(f, D, Cn(y2, t, e, D, n, o));
            }), f;
          }
          function _c(n) {
            var t = V(n);
            return function(e) {
              return Bs(e, n, t);
            };
          }
          function Bs(n, t, e) {
            var r = e.length;
            if (n == null)
              return !r;
            for (n = M(n); r--; ) {
              var s = e[r], o = t[s], f = n[s];
              if (f === i && !(s in n) || !o(f))
                return false;
            }
            return true;
          }
          function Gs(n, t, e) {
            if (typeof n != "function")
              throw new Pn(U);
            return le(function() {
              n.apply(i, e);
            }, t);
          }
          function ue(n, t, e, r) {
            var s = -1, o = xe, f = true, c = n.length, l = [], v = t.length;
            if (!c)
              return l;
            e && (t = G(t, ln(e))), r ? (o = Lr, f = false) : t.length >= I && (o = jt, f = false, t = new gt(t));
            n:
              for (; ++s < c; ) {
                var _ = n[s], m = e == null ? _ : e(_);
                if (_ = r || _ !== 0 ? _ : 0, f && m === m) {
                  for (var w = v; w--; )
                    if (t[w] === m)
                      continue n;
                  l.push(_);
                } else
                  o(t, m, r) || l.push(_);
              }
            return l;
          }
          var it = vu(Wn), Ks = vu(Zr, true);
          function mc(n, t) {
            var e = true;
            return it(n, function(r, s, o) {
              return e = !!t(r, s, o), e;
            }), e;
          }
          function Be(n, t, e) {
            for (var r = -1, s = n.length; ++r < s; ) {
              var o = n[r], f = t(o);
              if (f != null && (c === i ? f === f && !dn(f) : e(f, c)))
                var c = f, l = o;
            }
            return l;
          }
          function wc(n, t, e, r) {
            var s = n.length;
            for (e = O(e), e < 0 && (e = -e > s ? 0 : s + e), r = r === i || r > s ? s : O(r), r < 0 && (r += s), r = e > r ? 0 : aa(r); e < r; )
              n[e++] = t;
            return n;
          }
          function zs(n, t) {
            var e = [];
            return it(n, function(r, s, o) {
              t(r, s, o) && e.push(r);
            }), e;
          }
          function j(n, t, e, r, s) {
            var o = -1, f = n.length;
            for (e || (e = ah), s || (s = []); ++o < f; ) {
              var c = n[o];
              t > 0 && e(c) ? t > 1 ? j(c, t - 1, e, r, s) : tt(s, c) : r || (s[s.length] = c);
            }
            return s;
          }
          var Yr = _u(), Js = _u(true);
          function Wn(n, t) {
            return n && Yr(n, t, V);
          }
          function Zr(n, t) {
            return n && Js(n, t, V);
          }
          function Ge(n, t) {
            return nt(t, function(e) {
              return Qn(n[e]);
            });
          }
          function _t(n, t) {
            t = ut(t, n);
            for (var e = 0, r = t.length; n != null && e < r; )
              n = n[Mn(t[e++])];
            return e && e == r ? n : i;
          }
          function Ys(n, t, e) {
            var r = t(n);
            return R(n) ? r : tt(r, e(n));
          }
          function en(n) {
            return n == null ? n === i ? Ja : Ka : pt && pt in M(n) ? th(n) : dh(n);
          }
          function Xr(n, t) {
            return n > t;
          }
          function Pc(n, t) {
            return n != null && F.call(n, t);
          }
          function Ac(n, t) {
            return n != null && t in M(n);
          }
          function Cc(n, t, e) {
            return n >= nn(t, e) && n < Q(t, e);
          }
          function Qr(n, t, e) {
            for (var r = e ? Lr : xe, s = n[0].length, o = n.length, f = o, c = d2(o), l = 1 / 0, v = []; f--; ) {
              var _ = n[f];
              f && t && (_ = G(_, ln(t))), l = nn(_.length, l), c[f] = !e && (t || s >= 120 && _.length >= 120) ? new gt(f && _) : i;
            }
            _ = n[0];
            var m = -1, w = c[0];
            n:
              for (; ++m < s && v.length < l; ) {
                var C = _[m], E = t ? t(C) : C;
                if (C = e || C !== 0 ? C : 0, !(w ? jt(w, E) : r(v, E, e))) {
                  for (f = o; --f; ) {
                    var b = c[f];
                    if (!(b ? jt(b, E) : r(n[f], E, e)))
                      continue n;
                  }
                  w && w.push(E), v.push(C);
                }
              }
            return v;
          }
          function Ic(n, t, e, r) {
            return Wn(n, function(s, o, f) {
              t(r, e(s), o, f);
            }), r;
          }
          function ae(n, t, e) {
            t = ut(t, n), n = Nu(n, t);
            var r = n == null ? n : n[Mn(xn(t))];
            return r == null ? i : hn(r, n, e);
          }
          function Zs(n) {
            return z(n) && en(n) == St;
          }
          function xc(n) {
            return z(n) && en(n) == kt;
          }
          function Ec(n) {
            return z(n) && en(n) == Yt;
          }
          function oe(n, t, e, r, s) {
            return n === t ? true : n == null || t == null || !z(n) && !z(t) ? n !== n && t !== t : yc(n, t, e, r, oe, s);
          }
          function yc(n, t, e, r, s, o) {
            var f = R(n), c = R(t), l = f ? _e : tn(n), v = c ? _e : tn(t);
            l = l == St ? Gn : l, v = v == St ? Gn : v;
            var _ = l == Gn, m = v == Gn, w = l == v;
            if (w && ot(n)) {
              if (!ot(t))
                return false;
              f = true, _ = false;
            }
            if (w && !_)
              return o || (o = new Tn()), f || qt(n) ? Su(n, t, e, r, s, o) : jc(n, t, l, e, r, s, o);
            if (!(e & xt)) {
              var C = _ && F.call(n, "__wrapped__"), E = m && F.call(t, "__wrapped__");
              if (C || E) {
                var b = C ? n.value() : n, y2 = E ? t.value() : t;
                return o || (o = new Tn()), s(b, y2, e, r, o);
              }
            }
            return w ? (o || (o = new Tn()), nh(n, t, e, r, s, o)) : false;
          }
          function Sc(n) {
            return z(n) && tn(n) == Rn;
          }
          function Vr(n, t, e, r) {
            var s = e.length, o = s, f = !r;
            if (n == null)
              return !o;
            for (n = M(n); s--; ) {
              var c = e[s];
              if (f && c[2] ? c[1] !== n[c[0]] : !(c[0] in n))
                return false;
            }
            for (; ++s < o; ) {
              c = e[s];
              var l = c[0], v = n[l], _ = c[1];
              if (f && c[2]) {
                if (v === i && !(l in n))
                  return false;
              } else {
                var m = new Tn();
                if (r)
                  var w = r(v, _, l, n, t, m);
                if (!(w === i ? oe(_, v, xt | ge, r, m) : w))
                  return false;
              }
            }
            return true;
          }
          function Xs(n) {
            if (!K(n) || fh(n))
              return false;
            var t = Qn(n) ? Sf : vo;
            return t.test(wt(n));
          }
          function Rc(n) {
            return z(n) && en(n) == Xt;
          }
          function Oc(n) {
            return z(n) && tn(n) == On;
          }
          function bc(n) {
            return z(n) && ur(n.length) && !!B[en(n)];
          }
          function Qs(n) {
            return typeof n == "function" ? n : n == null ? cn : typeof n == "object" ? R(n) ? js(n[0], n[1]) : ks(n) : ma(n);
          }
          function kr(n) {
            if (!he(n))
              return Df(n);
            var t = [];
            for (var e in M(n))
              F.call(n, e) && e != "constructor" && t.push(e);
            return t;
          }
          function Tc(n) {
            if (!K(n))
              return ph(n);
            var t = he(n), e = [];
            for (var r in n)
              r == "constructor" && (t || !F.call(n, r)) || e.push(r);
            return e;
          }
          function jr(n, t) {
            return n < t;
          }
          function Vs(n, t) {
            var e = -1, r = on(n) ? d2(n.length) : [];
            return it(n, function(s, o, f) {
              r[++e] = t(s, o, f);
            }), r;
          }
          function ks(n) {
            var t = di(n);
            return t.length == 1 && t[0][2] ? Lu(t[0][0], t[0][1]) : function(e) {
              return e === n || Vr(e, n, t);
            };
          }
          function js(n, t) {
            return vi(n) && Tu(t) ? Lu(Mn(n), t) : function(e) {
              var r = yi(e, n);
              return r === i && r === t ? Si(e, n) : oe(t, r, xt | ge);
            };
          }
          function Ke(n, t, e, r, s) {
            n !== t && Yr(t, function(o, f) {
              if (s || (s = new Tn()), K(o))
                Lc(n, t, f, e, Ke, r, s);
              else {
                var c = r ? r(mi(n, f), o, f + "", n, t, s) : i;
                c === i && (c = o), zr(n, f, c);
              }
            }, fn);
          }
          function Lc(n, t, e, r, s, o, f) {
            var c = mi(n, e), l = mi(t, e), v = f.get(l);
            if (v) {
              zr(n, e, v);
              return;
            }
            var _ = o ? o(c, l, e + "", n, t, f) : i, m = _ === i;
            if (m) {
              var w = R(l), C = !w && ot(l), E = !w && !C && qt(l);
              _ = l, w || C || E ? R(c) ? _ = c : J(c) ? _ = an(c) : C ? (m = false, _ = hu(l, true)) : E ? (m = false, _ = lu(l, true)) : _ = [] : pe(l) || Pt(l) ? (_ = c, Pt(c) ? _ = oa(c) : (!K(c) || Qn(c)) && (_ = bu(l))) : m = false;
            }
            m && (f.set(l, _), s(_, l, r, o, f), f.delete(l)), zr(n, e, _);
          }
          function nu(n, t) {
            var e = n.length;
            if (e)
              return t += t < 0 ? e : 0, Xn(t, e) ? n[t] : i;
          }
          function tu(n, t, e) {
            t.length ? t = G(t, function(o) {
              return R(o) ? function(f) {
                return _t(f, o.length === 1 ? o[0] : o);
              } : o;
            }) : t = [cn];
            var r = -1;
            t = G(t, ln(x()));
            var s = Vs(n, function(o, f, c) {
              var l = G(t, function(v) {
                return v(o);
              });
              return { criteria: l, index: ++r, value: o };
            });
            return sf(s, function(o, f) {
              return zc(o, f, e);
            });
          }
          function Dc(n, t) {
            return eu(n, t, function(e, r) {
              return Si(n, r);
            });
          }
          function eu(n, t, e) {
            for (var r = -1, s = t.length, o = {}; ++r < s; ) {
              var f = t[r], c = _t(n, f);
              e(c, f) && fe(o, ut(f, n), c);
            }
            return o;
          }
          function Nc(n) {
            return function(t) {
              return _t(t, n);
            };
          }
          function ni(n, t, e, r) {
            var s = r ? rf : bt, o = -1, f = t.length, c = n;
            for (n === t && (t = an(t)), e && (c = G(n, ln(e))); ++o < f; )
              for (var l = 0, v = t[o], _ = e ? e(v) : v; (l = s(c, _, l, r)) > -1; )
                c !== n && Ne.call(c, l, 1), Ne.call(n, l, 1);
            return n;
          }
          function ru(n, t) {
            for (var e = n ? t.length : 0, r = e - 1; e--; ) {
              var s = t[e];
              if (e == r || s !== o) {
                var o = s;
                Xn(s) ? Ne.call(n, s, 1) : ii(n, s);
              }
            }
            return n;
          }
          function ti(n, t) {
            return n + Ue(Us() * (t - n + 1));
          }
          function Hc(n, t, e, r) {
            for (var s = -1, o = Q($e((t - n) / (e || 1)), 0), f = d2(o); o--; )
              f[r ? o : ++s] = n, n += e;
            return f;
          }
          function ei(n, t) {
            var e = "";
            if (!n || t < 1 || t > jn)
              return e;
            do
              t % 2 && (e += n), t = Ue(t / 2), t && (n += n);
            while (t);
            return e;
          }
          function L(n, t) {
            return wi(Du(n, t, cn), n + "");
          }
          function $c(n) {
            return Ms(Bt(n));
          }
          function Uc(n, t) {
            var e = Bt(n);
            return nr(e, vt(t, 0, e.length));
          }
          function fe(n, t, e, r) {
            if (!K(n))
              return n;
            t = ut(t, n);
            for (var s = -1, o = t.length, f = o - 1, c = n; c != null && ++s < o; ) {
              var l = Mn(t[s]), v = e;
              if (l === "__proto__" || l === "constructor" || l === "prototype")
                return n;
              if (s != f) {
                var _ = c[l];
                v = r ? r(_, l, c) : i, v === i && (v = K(_) ? _ : Xn(t[s + 1]) ? [] : {});
              }
              se2(c, l, v), c = c[l];
            }
            return n;
          }
          var iu = We ? function(n, t) {
            return We.set(n, t), n;
          } : cn, Wc = He ? function(n, t) {
            return He(n, "toString", { configurable: true, enumerable: false, value: Oi(t), writable: true });
          } : cn;
          function Fc(n) {
            return nr(Bt(n));
          }
          function In(n, t, e) {
            var r = -1, s = n.length;
            t < 0 && (t = -t > s ? 0 : s + t), e = e > s ? s : e, e < 0 && (e += s), s = t > e ? 0 : e - t >>> 0, t >>>= 0;
            for (var o = d2(s); ++r < s; )
              o[r] = n[r + t];
            return o;
          }
          function Mc(n, t) {
            var e;
            return it(n, function(r, s, o) {
              return e = t(r, s, o), !e;
            }), !!e;
          }
          function ze(n, t, e) {
            var r = 0, s = n == null ? r : n.length;
            if (typeof t == "number" && t === t && s <= Ma) {
              for (; r < s; ) {
                var o = r + s >>> 1, f = n[o];
                f !== null && !dn(f) && (e ? f <= t : f < t) ? r = o + 1 : s = o;
              }
              return s;
            }
            return ri(n, t, cn, e);
          }
          function ri(n, t, e, r) {
            var s = 0, o = n == null ? 0 : n.length;
            if (o === 0)
              return 0;
            t = e(t);
            for (var f = t !== t, c = t === null, l = dn(t), v = t === i; s < o; ) {
              var _ = Ue((s + o) / 2), m = e(n[_]), w = m !== i, C = m === null, E = m === m, b = dn(m);
              if (f)
                var y2 = r || E;
              else
                v ? y2 = E && (r || w) : c ? y2 = E && w && (r || !C) : l ? y2 = E && w && !C && (r || !b) : C || b ? y2 = false : y2 = r ? m <= t : m < t;
              y2 ? s = _ + 1 : o = _;
            }
            return nn(o, Fa);
          }
          function su(n, t) {
            for (var e = -1, r = n.length, s = 0, o = []; ++e < r; ) {
              var f = n[e], c = t ? t(f) : f;
              if (!e || !Ln(c, l)) {
                var l = c;
                o[s++] = f === 0 ? 0 : f;
              }
            }
            return o;
          }
          function uu(n) {
            return typeof n == "number" ? n : dn(n) ? ve : +n;
          }
          function pn(n) {
            if (typeof n == "string")
              return n;
            if (R(n))
              return G(n, pn) + "";
            if (dn(n))
              return Ws ? Ws.call(n) : "";
            var t = n + "";
            return t == "0" && 1 / n == -ht ? "-0" : t;
          }
          function st(n, t, e) {
            var r = -1, s = xe, o = n.length, f = true, c = [], l = c;
            if (e)
              f = false, s = Lr;
            else if (o >= I) {
              var v = t ? null : Vc(n);
              if (v)
                return ye(v);
              f = false, s = jt, l = new gt();
            } else
              l = t ? [] : c;
            n:
              for (; ++r < o; ) {
                var _ = n[r], m = t ? t(_) : _;
                if (_ = e || _ !== 0 ? _ : 0, f && m === m) {
                  for (var w = l.length; w--; )
                    if (l[w] === m)
                      continue n;
                  t && l.push(m), c.push(_);
                } else
                  s(l, m, e) || (l !== c && l.push(m), c.push(_));
              }
            return c;
          }
          function ii(n, t) {
            return t = ut(t, n), n = Nu(n, t), n == null || delete n[Mn(xn(t))];
          }
          function au(n, t, e, r) {
            return fe(n, t, e(_t(n, t)), r);
          }
          function Je(n, t, e, r) {
            for (var s = n.length, o = r ? s : -1; (r ? o-- : ++o < s) && t(n[o], o, n); )
              ;
            return e ? In(n, r ? 0 : o, r ? o + 1 : s) : In(n, r ? o + 1 : 0, r ? s : o);
          }
          function ou(n, t) {
            var e = n;
            return e instanceof N && (e = e.value()), Dr(t, function(r, s) {
              return s.func.apply(s.thisArg, tt([r], s.args));
            }, e);
          }
          function si(n, t, e) {
            var r = n.length;
            if (r < 2)
              return r ? st(n[0]) : [];
            for (var s = -1, o = d2(r); ++s < r; )
              for (var f = n[s], c = -1; ++c < r; )
                c != s && (o[s] = ue(o[s] || f, n[c], t, e));
            return st(j(o, 1), t, e);
          }
          function fu(n, t, e) {
            for (var r = -1, s = n.length, o = t.length, f = {}; ++r < s; ) {
              var c = r < o ? t[r] : i;
              e(f, n[r], c);
            }
            return f;
          }
          function ui(n) {
            return J(n) ? n : [];
          }
          function ai(n) {
            return typeof n == "function" ? n : cn;
          }
          function ut(n, t) {
            return R(n) ? n : vi(n, t) ? [n] : Wu(W(n));
          }
          var qc = L;
          function at(n, t, e) {
            var r = n.length;
            return e = e === i ? r : e, !t && e >= r ? n : In(n, t, e);
          }
          var cu = Rf || function(n) {
            return k.clearTimeout(n);
          };
          function hu(n, t) {
            if (t)
              return n.slice();
            var e = n.length, r = Ls ? Ls(e) : new n.constructor(e);
            return n.copy(r), r;
          }
          function oi(n) {
            var t = new n.constructor(n.byteLength);
            return new Le(t).set(new Le(n)), t;
          }
          function Bc(n, t) {
            var e = t ? oi(n.buffer) : n.buffer;
            return new n.constructor(e, n.byteOffset, n.byteLength);
          }
          function Gc(n) {
            var t = new n.constructor(n.source, Zi.exec(n));
            return t.lastIndex = n.lastIndex, t;
          }
          function Kc(n) {
            return ie ? M(ie.call(n)) : {};
          }
          function lu(n, t) {
            var e = t ? oi(n.buffer) : n.buffer;
            return new n.constructor(e, n.byteOffset, n.length);
          }
          function pu(n, t) {
            if (n !== t) {
              var e = n !== i, r = n === null, s = n === n, o = dn(n), f = t !== i, c = t === null, l = t === t, v = dn(t);
              if (!c && !v && !o && n > t || o && f && l && !c && !v || r && f && l || !e && l || !s)
                return 1;
              if (!r && !o && !v && n < t || v && e && s && !r && !o || c && e && s || !f && s || !l)
                return -1;
            }
            return 0;
          }
          function zc(n, t, e) {
            for (var r = -1, s = n.criteria, o = t.criteria, f = s.length, c = e.length; ++r < f; ) {
              var l = pu(s[r], o[r]);
              if (l) {
                if (r >= c)
                  return l;
                var v = e[r];
                return l * (v == "desc" ? -1 : 1);
              }
            }
            return n.index - t.index;
          }
          function du(n, t, e, r) {
            for (var s = -1, o = n.length, f = e.length, c = -1, l = t.length, v = Q(o - f, 0), _ = d2(l + v), m = !r; ++c < l; )
              _[c] = t[c];
            for (; ++s < f; )
              (m || s < o) && (_[e[s]] = n[s]);
            for (; v--; )
              _[c++] = n[s++];
            return _;
          }
          function gu(n, t, e, r) {
            for (var s = -1, o = n.length, f = -1, c = e.length, l = -1, v = t.length, _ = Q(o - c, 0), m = d2(_ + v), w = !r; ++s < _; )
              m[s] = n[s];
            for (var C = s; ++l < v; )
              m[C + l] = t[l];
            for (; ++f < c; )
              (w || s < o) && (m[C + e[f]] = n[s++]);
            return m;
          }
          function an(n, t) {
            var e = -1, r = n.length;
            for (t || (t = d2(r)); ++e < r; )
              t[e] = n[e];
            return t;
          }
          function Fn(n, t, e, r) {
            var s = !e;
            e || (e = {});
            for (var o = -1, f = t.length; ++o < f; ) {
              var c = t[o], l = r ? r(e[c], n[c], c, e, n) : i;
              l === i && (l = n[c]), s ? Jn(e, c, l) : se2(e, c, l);
            }
            return e;
          }
          function Jc(n, t) {
            return Fn(n, gi(n), t);
          }
          function Yc(n, t) {
            return Fn(n, Ru(n), t);
          }
          function Ye(n, t) {
            return function(e, r) {
              var s = R(e) ? Vo : gc, o = t ? t() : {};
              return s(e, n, x(r, 2), o);
            };
          }
          function Wt(n) {
            return L(function(t, e) {
              var r = -1, s = e.length, o = s > 1 ? e[s - 1] : i, f = s > 2 ? e[2] : i;
              for (o = n.length > 3 && typeof o == "function" ? (s--, o) : i, f && rn(e[0], e[1], f) && (o = s < 3 ? i : o, s = 1), t = M(t); ++r < s; ) {
                var c = e[r];
                c && n(t, c, r, o);
              }
              return t;
            });
          }
          function vu(n, t) {
            return function(e, r) {
              if (e == null)
                return e;
              if (!on(e))
                return n(e, r);
              for (var s = e.length, o = t ? s : -1, f = M(e); (t ? o-- : ++o < s) && r(f[o], o, f) !== false; )
                ;
              return e;
            };
          }
          function _u(n) {
            return function(t, e, r) {
              for (var s = -1, o = M(t), f = r(t), c = f.length; c--; ) {
                var l = f[n ? c : ++s];
                if (e(o[l], l, o) === false)
                  break;
              }
              return t;
            };
          }
          function Zc(n, t, e) {
            var r = t & _n, s = ce(n);
            function o() {
              var f = this && this !== k && this instanceof o ? s : n;
              return f.apply(r ? e : this, arguments);
            }
            return o;
          }
          function mu(n) {
            return function(t) {
              t = W(t);
              var e = Tt(t) ? bn(t) : i, r = e ? e[0] : t.charAt(0), s = e ? at(e, 1).join("") : t.slice(1);
              return r[n]() + s;
            };
          }
          function Ft(n) {
            return function(t) {
              return Dr(va(ga(t).replace(Uo, "")), n, "");
            };
          }
          function ce(n) {
            return function() {
              var t = arguments;
              switch (t.length) {
                case 0:
                  return new n();
                case 1:
                  return new n(t[0]);
                case 2:
                  return new n(t[0], t[1]);
                case 3:
                  return new n(t[0], t[1], t[2]);
                case 4:
                  return new n(t[0], t[1], t[2], t[3]);
                case 5:
                  return new n(t[0], t[1], t[2], t[3], t[4]);
                case 6:
                  return new n(t[0], t[1], t[2], t[3], t[4], t[5]);
                case 7:
                  return new n(t[0], t[1], t[2], t[3], t[4], t[5], t[6]);
              }
              var e = Ut(n.prototype), r = n.apply(e, t);
              return K(r) ? r : e;
            };
          }
          function Xc(n, t, e) {
            var r = ce(n);
            function s() {
              for (var o = arguments.length, f = d2(o), c = o, l = Mt(s); c--; )
                f[c] = arguments[c];
              var v = o < 3 && f[0] !== l && f[o - 1] !== l ? [] : et(f, l);
              if (o -= v.length, o < e)
                return Iu(n, t, Ze, s.placeholder, i, f, v, i, i, e - o);
              var _ = this && this !== k && this instanceof s ? r : n;
              return hn(_, this, f);
            }
            return s;
          }
          function wu(n) {
            return function(t, e, r) {
              var s = M(t);
              if (!on(t)) {
                var o = x(e, 3);
                t = V(t), e = function(c) {
                  return o(s[c], c, s);
                };
              }
              var f = n(t, e, r);
              return f > -1 ? s[o ? t[f] : f] : i;
            };
          }
          function Pu(n) {
            return Zn(function(t) {
              var e = t.length, r = e, s = An.prototype.thru;
              for (n && t.reverse(); r--; ) {
                var o = t[r];
                if (typeof o != "function")
                  throw new Pn(U);
                if (s && !f && ke(o) == "wrapper")
                  var f = new An([], true);
              }
              for (r = f ? r : e; ++r < e; ) {
                o = t[r];
                var c = ke(o), l = c == "wrapper" ? pi(o) : i;
                l && _i(l[0]) && l[1] == (Bn | Hn | $n | zt) && !l[4].length && l[9] == 1 ? f = f[ke(l[0])].apply(f, l[3]) : f = o.length == 1 && _i(o) ? f[c]() : f.thru(o);
              }
              return function() {
                var v = arguments, _ = v[0];
                if (f && v.length == 1 && R(_))
                  return f.plant(_).value();
                for (var m = 0, w = e ? t[m].apply(this, v) : _; ++m < e; )
                  w = t[m].call(this, w);
                return w;
              };
            });
          }
          function Ze(n, t, e, r, s, o, f, c, l, v) {
            var _ = t & Bn, m = t & _n, w = t & ct, C = t & (Hn | Et), E = t & pr, b = w ? i : ce(n);
            function y2() {
              for (var D = arguments.length, H = d2(D), gn = D; gn--; )
                H[gn] = arguments[gn];
              if (C)
                var sn = Mt(y2), vn = af(H, sn);
              if (r && (H = du(H, r, s, C)), o && (H = gu(H, o, f, C)), D -= vn, C && D < v) {
                var Y = et(H, sn);
                return Iu(n, t, Ze, y2.placeholder, e, H, Y, c, l, v - D);
              }
              var Dn = m ? e : this, kn = w ? Dn[n] : n;
              return D = H.length, c ? H = gh(H, c) : E && D > 1 && H.reverse(), _ && l < D && (H.length = l), this && this !== k && this instanceof y2 && (kn = b || ce(kn)), kn.apply(Dn, H);
            }
            return y2;
          }
          function Au(n, t) {
            return function(e, r) {
              return Ic(e, n, t(r), {});
            };
          }
          function Xe(n, t) {
            return function(e, r) {
              var s;
              if (e === i && r === i)
                return t;
              if (e !== i && (s = e), r !== i) {
                if (s === i)
                  return r;
                typeof e == "string" || typeof r == "string" ? (e = pn(e), r = pn(r)) : (e = uu(e), r = uu(r)), s = n(e, r);
              }
              return s;
            };
          }
          function fi(n) {
            return Zn(function(t) {
              return t = G(t, ln(x())), L(function(e) {
                var r = this;
                return n(t, function(s) {
                  return hn(s, r, e);
                });
              });
            });
          }
          function Qe(n, t) {
            t = t === i ? " " : pn(t);
            var e = t.length;
            if (e < 2)
              return e ? ei(t, n) : t;
            var r = ei(t, $e(n / Lt(t)));
            return Tt(t) ? at(bn(r), 0, n).join("") : r.slice(0, n);
          }
          function Qc(n, t, e, r) {
            var s = t & _n, o = ce(n);
            function f() {
              for (var c = -1, l = arguments.length, v = -1, _ = r.length, m = d2(_ + l), w = this && this !== k && this instanceof f ? o : n; ++v < _; )
                m[v] = r[v];
              for (; l--; )
                m[v++] = arguments[++c];
              return hn(w, s ? e : this, m);
            }
            return f;
          }
          function Cu(n) {
            return function(t, e, r) {
              return r && typeof r != "number" && rn(t, e, r) && (e = r = i), t = Vn(t), e === i ? (e = t, t = 0) : e = Vn(e), r = r === i ? t < e ? 1 : -1 : Vn(r), Hc(t, e, r, n);
            };
          }
          function Ve(n) {
            return function(t, e) {
              return typeof t == "string" && typeof e == "string" || (t = En(t), e = En(e)), n(t, e);
            };
          }
          function Iu(n, t, e, r, s, o, f, c, l, v) {
            var _ = t & Hn, m = _ ? f : i, w = _ ? i : f, C = _ ? o : i, E = _ ? i : o;
            t |= _ ? $n : yt, t &= ~(_ ? yt : $n), t & qi || (t &= ~(_n | ct));
            var b = [n, t, s, C, m, E, w, c, l, v], y2 = e.apply(i, b);
            return _i(n) && Hu(y2, b), y2.placeholder = r, $u(y2, n, t);
          }
          function ci(n) {
            var t = X[n];
            return function(e, r) {
              if (e = En(e), r = r == null ? 0 : nn(O(r), 292), r && $s(e)) {
                var s = (W(e) + "e").split("e"), o = t(s[0] + "e" + (+s[1] + r));
                return s = (W(o) + "e").split("e"), +(s[0] + "e" + (+s[1] - r));
              }
              return t(e);
            };
          }
          var Vc = Ht && 1 / ye(new Ht([, -0]))[1] == ht ? function(n) {
            return new Ht(n);
          } : Li;
          function xu(n) {
            return function(t) {
              var e = tn(t);
              return e == Rn ? Mr(t) : e == On ? df(t) : uf(t, n(t));
            };
          }
          function Yn(n, t, e, r, s, o, f, c) {
            var l = t & ct;
            if (!l && typeof n != "function")
              throw new Pn(U);
            var v = r ? r.length : 0;
            if (v || (t &= ~($n | yt), r = s = i), f = f === i ? f : Q(O(f), 0), c = c === i ? c : O(c), v -= s ? s.length : 0, t & yt) {
              var _ = r, m = s;
              r = s = i;
            }
            var w = l ? i : pi(n), C = [n, t, e, r, s, _, m, o, f, c];
            if (w && lh(C, w), n = C[0], t = C[1], e = C[2], r = C[3], s = C[4], c = C[9] = C[9] === i ? l ? 0 : n.length : Q(C[9] - v, 0), !c && t & (Hn | Et) && (t &= ~(Hn | Et)), !t || t == _n)
              var E = Zc(n, t, e);
            else
              t == Hn || t == Et ? E = Xc(n, t, c) : (t == $n || t == (_n | $n)) && !s.length ? E = Qc(n, t, e, r) : E = Ze.apply(i, C);
            var b = w ? iu : Hu;
            return $u(b(E, C), n, t);
          }
          function Eu(n, t, e, r) {
            return n === i || Ln(n, Nt[e]) && !F.call(r, e) ? t : n;
          }
          function yu(n, t, e, r, s, o) {
            return K(n) && K(t) && (o.set(t, n), Ke(n, t, i, yu, o), o.delete(t)), n;
          }
          function kc(n) {
            return pe(n) ? i : n;
          }
          function Su(n, t, e, r, s, o) {
            var f = e & xt, c = n.length, l = t.length;
            if (c != l && !(f && l > c))
              return false;
            var v = o.get(n), _ = o.get(t);
            if (v && _)
              return v == t && _ == n;
            var m = -1, w = true, C = e & ge ? new gt() : i;
            for (o.set(n, t), o.set(t, n); ++m < c; ) {
              var E = n[m], b = t[m];
              if (r)
                var y2 = f ? r(b, E, m, t, n, o) : r(E, b, m, n, t, o);
              if (y2 !== i) {
                if (y2)
                  continue;
                w = false;
                break;
              }
              if (C) {
                if (!Nr(t, function(D, H) {
                  if (!jt(C, H) && (E === D || s(E, D, e, r, o)))
                    return C.push(H);
                })) {
                  w = false;
                  break;
                }
              } else if (!(E === b || s(E, b, e, r, o))) {
                w = false;
                break;
              }
            }
            return o.delete(n), o.delete(t), w;
          }
          function jc(n, t, e, r, s, o, f) {
            switch (e) {
              case Rt:
                if (n.byteLength != t.byteLength || n.byteOffset != t.byteOffset)
                  return false;
                n = n.buffer, t = t.buffer;
              case kt:
                return !(n.byteLength != t.byteLength || !o(new Le(n), new Le(t)));
              case Jt:
              case Yt:
              case Zt:
                return Ln(+n, +t);
              case me:
                return n.name == t.name && n.message == t.message;
              case Xt:
              case Qt:
                return n == t + "";
              case Rn:
                var c = Mr;
              case On:
                var l = r & xt;
                if (c || (c = ye), n.size != t.size && !l)
                  return false;
                var v = f.get(n);
                if (v)
                  return v == t;
                r |= ge, f.set(n, t);
                var _ = Su(c(n), c(t), r, s, o, f);
                return f.delete(n), _;
              case Pe:
                if (ie)
                  return ie.call(n) == ie.call(t);
            }
            return false;
          }
          function nh(n, t, e, r, s, o) {
            var f = e & xt, c = hi(n), l = c.length, v = hi(t), _ = v.length;
            if (l != _ && !f)
              return false;
            for (var m = l; m--; ) {
              var w = c[m];
              if (!(f ? w in t : F.call(t, w)))
                return false;
            }
            var C = o.get(n), E = o.get(t);
            if (C && E)
              return C == t && E == n;
            var b = true;
            o.set(n, t), o.set(t, n);
            for (var y2 = f; ++m < l; ) {
              w = c[m];
              var D = n[w], H = t[w];
              if (r)
                var gn = f ? r(H, D, w, t, n, o) : r(D, H, w, n, t, o);
              if (!(gn === i ? D === H || s(D, H, e, r, o) : gn)) {
                b = false;
                break;
              }
              y2 || (y2 = w == "constructor");
            }
            if (b && !y2) {
              var sn = n.constructor, vn = t.constructor;
              sn != vn && "constructor" in n && "constructor" in t && !(typeof sn == "function" && sn instanceof sn && typeof vn == "function" && vn instanceof vn) && (b = false);
            }
            return o.delete(n), o.delete(t), b;
          }
          function Zn(n) {
            return wi(Du(n, i, Bu), n + "");
          }
          function hi(n) {
            return Ys(n, V, gi);
          }
          function li(n) {
            return Ys(n, fn, Ru);
          }
          var pi = We ? function(n) {
            return We.get(n);
          } : Li;
          function ke(n) {
            for (var t = n.name + "", e = $t[t], r = F.call($t, t) ? e.length : 0; r--; ) {
              var s = e[r], o = s.func;
              if (o == null || o == n)
                return s.name;
            }
            return t;
          }
          function Mt(n) {
            var t = F.call(a, "placeholder") ? a : n;
            return t.placeholder;
          }
          function x() {
            var n = a.iteratee || bi;
            return n = n === bi ? Qs : n, arguments.length ? n(arguments[0], arguments[1]) : n;
          }
          function je(n, t) {
            var e = n.__data__;
            return oh(t) ? e[typeof t == "string" ? "string" : "hash"] : e.map;
          }
          function di(n) {
            for (var t = V(n), e = t.length; e--; ) {
              var r = t[e], s = n[r];
              t[e] = [r, s, Tu(s)];
            }
            return t;
          }
          function mt(n, t) {
            var e = hf(n, t);
            return Xs(e) ? e : i;
          }
          function th(n) {
            var t = F.call(n, pt), e = n[pt];
            try {
              n[pt] = i;
              var r = true;
            } catch {
            }
            var s = be.call(n);
            return r && (t ? n[pt] = e : delete n[pt]), s;
          }
          var gi = Br ? function(n) {
            return n == null ? [] : (n = M(n), nt(Br(n), function(t) {
              return Ns.call(n, t);
            }));
          } : Di, Ru = Br ? function(n) {
            for (var t = []; n; )
              tt(t, gi(n)), n = De(n);
            return t;
          } : Di, tn = en;
          (Gr && tn(new Gr(new ArrayBuffer(1))) != Rt || te && tn(new te()) != Rn || Kr && tn(Kr.resolve()) != Ki || Ht && tn(new Ht()) != On || ee && tn(new ee()) != Vt) && (tn = function(n) {
            var t = en(n), e = t == Gn ? n.constructor : i, r = e ? wt(e) : "";
            if (r)
              switch (r) {
                case Uf:
                  return Rt;
                case Wf:
                  return Rn;
                case Ff:
                  return Ki;
                case Mf:
                  return On;
                case qf:
                  return Vt;
              }
            return t;
          });
          function eh(n, t, e) {
            for (var r = -1, s = e.length; ++r < s; ) {
              var o = e[r], f = o.size;
              switch (o.type) {
                case "drop":
                  n += f;
                  break;
                case "dropRight":
                  t -= f;
                  break;
                case "take":
                  t = nn(t, n + f);
                  break;
                case "takeRight":
                  n = Q(n, t - f);
                  break;
              }
            }
            return { start: n, end: t };
          }
          function rh(n) {
            var t = n.match(ao);
            return t ? t[1].split(oo) : [];
          }
          function Ou(n, t, e) {
            t = ut(t, n);
            for (var r = -1, s = t.length, o = false; ++r < s; ) {
              var f = Mn(t[r]);
              if (!(o = n != null && e(n, f)))
                break;
              n = n[f];
            }
            return o || ++r != s ? o : (s = n == null ? 0 : n.length, !!s && ur(s) && Xn(f, s) && (R(n) || Pt(n)));
          }
          function ih(n) {
            var t = n.length, e = new n.constructor(t);
            return t && typeof n[0] == "string" && F.call(n, "index") && (e.index = n.index, e.input = n.input), e;
          }
          function bu(n) {
            return typeof n.constructor == "function" && !he(n) ? Ut(De(n)) : {};
          }
          function sh(n, t, e) {
            var r = n.constructor;
            switch (t) {
              case kt:
                return oi(n);
              case Jt:
              case Yt:
                return new r(+n);
              case Rt:
                return Bc(n, e);
              case dr:
              case gr:
              case vr:
              case _r:
              case mr:
              case wr:
              case Pr:
              case Ar:
              case Cr:
                return lu(n, e);
              case Rn:
                return new r();
              case Zt:
              case Qt:
                return new r(n);
              case Xt:
                return Gc(n);
              case On:
                return new r();
              case Pe:
                return Kc(n);
            }
          }
          function uh(n, t) {
            var e = t.length;
            if (!e)
              return n;
            var r = e - 1;
            return t[r] = (e > 1 ? "& " : "") + t[r], t = t.join(e > 2 ? ", " : " "), n.replace(uo, `{
/* [wrapped with ` + t + `] */
`);
          }
          function ah(n) {
            return R(n) || Pt(n) || !!(Hs && n && n[Hs]);
          }
          function Xn(n, t) {
            var e = typeof n;
            return t = t ?? jn, !!t && (e == "number" || e != "symbol" && mo.test(n)) && n > -1 && n % 1 == 0 && n < t;
          }
          function rn(n, t, e) {
            if (!K(e))
              return false;
            var r = typeof t;
            return (r == "number" ? on(e) && Xn(t, e.length) : r == "string" && t in e) ? Ln(e[t], n) : false;
          }
          function vi(n, t) {
            if (R(n))
              return false;
            var e = typeof n;
            return e == "number" || e == "symbol" || e == "boolean" || n == null || dn(n) ? true : eo.test(n) || !to.test(n) || t != null && n in M(t);
          }
          function oh(n) {
            var t = typeof n;
            return t == "string" || t == "number" || t == "symbol" || t == "boolean" ? n !== "__proto__" : n === null;
          }
          function _i(n) {
            var t = ke(n), e = a[t];
            if (typeof e != "function" || !(t in N.prototype))
              return false;
            if (n === e)
              return true;
            var r = pi(e);
            return !!r && n === r[0];
          }
          function fh(n) {
            return !!Ts && Ts in n;
          }
          var ch = Re ? Qn : Ni;
          function he(n) {
            var t = n && n.constructor, e = typeof t == "function" && t.prototype || Nt;
            return n === e;
          }
          function Tu(n) {
            return n === n && !K(n);
          }
          function Lu(n, t) {
            return function(e) {
              return e == null ? false : e[n] === t && (t !== i || n in M(e));
            };
          }
          function hh(n) {
            var t = ir(n, function(r) {
              return e.size === lr && e.clear(), r;
            }), e = t.cache;
            return t;
          }
          function lh(n, t) {
            var e = n[1], r = t[1], s = e | r, o = s < (_n | ct | Bn), f = r == Bn && e == Hn || r == Bn && e == zt && n[7].length <= t[8] || r == (Bn | zt) && t[7].length <= t[8] && e == Hn;
            if (!(o || f))
              return n;
            r & _n && (n[2] = t[2], s |= e & _n ? 0 : qi);
            var c = t[3];
            if (c) {
              var l = n[3];
              n[3] = l ? du(l, c, t[4]) : c, n[4] = l ? et(n[3], Ct) : t[4];
            }
            return c = t[5], c && (l = n[5], n[5] = l ? gu(l, c, t[6]) : c, n[6] = l ? et(n[5], Ct) : t[6]), c = t[7], c && (n[7] = c), r & Bn && (n[8] = n[8] == null ? t[8] : nn(n[8], t[8])), n[9] == null && (n[9] = t[9]), n[0] = t[0], n[1] = s, n;
          }
          function ph(n) {
            var t = [];
            if (n != null)
              for (var e in M(n))
                t.push(e);
            return t;
          }
          function dh(n) {
            return be.call(n);
          }
          function Du(n, t, e) {
            return t = Q(t === i ? n.length - 1 : t, 0), function() {
              for (var r = arguments, s = -1, o = Q(r.length - t, 0), f = d2(o); ++s < o; )
                f[s] = r[t + s];
              s = -1;
              for (var c = d2(t + 1); ++s < t; )
                c[s] = r[s];
              return c[t] = e(f), hn(n, this, c);
            };
          }
          function Nu(n, t) {
            return t.length < 2 ? n : _t(n, In(t, 0, -1));
          }
          function gh(n, t) {
            for (var e = n.length, r = nn(t.length, e), s = an(n); r--; ) {
              var o = t[r];
              n[r] = Xn(o, e) ? s[o] : i;
            }
            return n;
          }
          function mi(n, t) {
            if (!(t === "constructor" && typeof n[t] == "function") && t != "__proto__")
              return n[t];
          }
          var Hu = Uu(iu), le = bf || function(n, t) {
            return k.setTimeout(n, t);
          }, wi = Uu(Wc);
          function $u(n, t, e) {
            var r = t + "";
            return wi(n, uh(r, vh(rh(r), e)));
          }
          function Uu(n) {
            var t = 0, e = 0;
            return function() {
              var r = Nf(), s = Ha - (r - e);
              if (e = r, s > 0) {
                if (++t >= Na)
                  return arguments[0];
              } else
                t = 0;
              return n.apply(i, arguments);
            };
          }
          function nr(n, t) {
            var e = -1, r = n.length, s = r - 1;
            for (t = t === i ? r : t; ++e < t; ) {
              var o = ti(e, s), f = n[o];
              n[o] = n[e], n[e] = f;
            }
            return n.length = t, n;
          }
          var Wu = hh(function(n) {
            var t = [];
            return n.charCodeAt(0) === 46 && t.push(""), n.replace(ro, function(e, r, s, o) {
              t.push(s ? o.replace(ho, "$1") : r || e);
            }), t;
          });
          function Mn(n) {
            if (typeof n == "string" || dn(n))
              return n;
            var t = n + "";
            return t == "0" && 1 / n == -ht ? "-0" : t;
          }
          function wt(n) {
            if (n != null) {
              try {
                return Oe.call(n);
              } catch {
              }
              try {
                return n + "";
              } catch {
              }
            }
            return "";
          }
          function vh(n, t) {
            return wn(qa, function(e) {
              var r = "_." + e[0];
              t & e[1] && !xe(n, r) && n.push(r);
            }), n.sort();
          }
          function Fu(n) {
            if (n instanceof N)
              return n.clone();
            var t = new An(n.__wrapped__, n.__chain__);
            return t.__actions__ = an(n.__actions__), t.__index__ = n.__index__, t.__values__ = n.__values__, t;
          }
          function _h(n, t, e) {
            (e ? rn(n, t, e) : t === i) ? t = 1 : t = Q(O(t), 0);
            var r = n == null ? 0 : n.length;
            if (!r || t < 1)
              return [];
            for (var s = 0, o = 0, f = d2($e(r / t)); s < r; )
              f[o++] = In(n, s, s += t);
            return f;
          }
          function mh(n) {
            for (var t = -1, e = n == null ? 0 : n.length, r = 0, s = []; ++t < e; ) {
              var o = n[t];
              o && (s[r++] = o);
            }
            return s;
          }
          function wh() {
            var n = arguments.length;
            if (!n)
              return [];
            for (var t = d2(n - 1), e = arguments[0], r = n; r--; )
              t[r - 1] = arguments[r];
            return tt(R(e) ? an(e) : [e], j(t, 1));
          }
          var Ph = L(function(n, t) {
            return J(n) ? ue(n, j(t, 1, J, true)) : [];
          }), Ah = L(function(n, t) {
            var e = xn(t);
            return J(e) && (e = i), J(n) ? ue(n, j(t, 1, J, true), x(e, 2)) : [];
          }), Ch = L(function(n, t) {
            var e = xn(t);
            return J(e) && (e = i), J(n) ? ue(n, j(t, 1, J, true), i, e) : [];
          });
          function Ih(n, t, e) {
            var r = n == null ? 0 : n.length;
            return r ? (t = e || t === i ? 1 : O(t), In(n, t < 0 ? 0 : t, r)) : [];
          }
          function xh(n, t, e) {
            var r = n == null ? 0 : n.length;
            return r ? (t = e || t === i ? 1 : O(t), t = r - t, In(n, 0, t < 0 ? 0 : t)) : [];
          }
          function Eh(n, t) {
            return n && n.length ? Je(n, x(t, 3), true, true) : [];
          }
          function yh(n, t) {
            return n && n.length ? Je(n, x(t, 3), true) : [];
          }
          function Sh(n, t, e, r) {
            var s = n == null ? 0 : n.length;
            return s ? (e && typeof e != "number" && rn(n, t, e) && (e = 0, r = s), wc(n, t, e, r)) : [];
          }
          function Mu(n, t, e) {
            var r = n == null ? 0 : n.length;
            if (!r)
              return -1;
            var s = e == null ? 0 : O(e);
            return s < 0 && (s = Q(r + s, 0)), Ee(n, x(t, 3), s);
          }
          function qu(n, t, e) {
            var r = n == null ? 0 : n.length;
            if (!r)
              return -1;
            var s = r - 1;
            return e !== i && (s = O(e), s = e < 0 ? Q(r + s, 0) : nn(s, r - 1)), Ee(n, x(t, 3), s, true);
          }
          function Bu(n) {
            var t = n == null ? 0 : n.length;
            return t ? j(n, 1) : [];
          }
          function Rh(n) {
            var t = n == null ? 0 : n.length;
            return t ? j(n, ht) : [];
          }
          function Oh(n, t) {
            var e = n == null ? 0 : n.length;
            return e ? (t = t === i ? 1 : O(t), j(n, t)) : [];
          }
          function bh(n) {
            for (var t = -1, e = n == null ? 0 : n.length, r = {}; ++t < e; ) {
              var s = n[t];
              r[s[0]] = s[1];
            }
            return r;
          }
          function Gu(n) {
            return n && n.length ? n[0] : i;
          }
          function Th(n, t, e) {
            var r = n == null ? 0 : n.length;
            if (!r)
              return -1;
            var s = e == null ? 0 : O(e);
            return s < 0 && (s = Q(r + s, 0)), bt(n, t, s);
          }
          function Lh(n) {
            var t = n == null ? 0 : n.length;
            return t ? In(n, 0, -1) : [];
          }
          var Dh = L(function(n) {
            var t = G(n, ui);
            return t.length && t[0] === n[0] ? Qr(t) : [];
          }), Nh = L(function(n) {
            var t = xn(n), e = G(n, ui);
            return t === xn(e) ? t = i : e.pop(), e.length && e[0] === n[0] ? Qr(e, x(t, 2)) : [];
          }), Hh = L(function(n) {
            var t = xn(n), e = G(n, ui);
            return t = typeof t == "function" ? t : i, t && e.pop(), e.length && e[0] === n[0] ? Qr(e, i, t) : [];
          });
          function $h(n, t) {
            return n == null ? "" : Lf.call(n, t);
          }
          function xn(n) {
            var t = n == null ? 0 : n.length;
            return t ? n[t - 1] : i;
          }
          function Uh(n, t, e) {
            var r = n == null ? 0 : n.length;
            if (!r)
              return -1;
            var s = r;
            return e !== i && (s = O(e), s = s < 0 ? Q(r + s, 0) : nn(s, r - 1)), t === t ? vf(n, t, s) : Ee(n, Is, s, true);
          }
          function Wh(n, t) {
            return n && n.length ? nu(n, O(t)) : i;
          }
          var Fh = L(Ku);
          function Ku(n, t) {
            return n && n.length && t && t.length ? ni(n, t) : n;
          }
          function Mh(n, t, e) {
            return n && n.length && t && t.length ? ni(n, t, x(e, 2)) : n;
          }
          function qh(n, t, e) {
            return n && n.length && t && t.length ? ni(n, t, i, e) : n;
          }
          var Bh = Zn(function(n, t) {
            var e = n == null ? 0 : n.length, r = Jr(n, t);
            return ru(n, G(t, function(s) {
              return Xn(s, e) ? +s : s;
            }).sort(pu)), r;
          });
          function Gh(n, t) {
            var e = [];
            if (!(n && n.length))
              return e;
            var r = -1, s = [], o = n.length;
            for (t = x(t, 3); ++r < o; ) {
              var f = n[r];
              t(f, r, n) && (e.push(f), s.push(r));
            }
            return ru(n, s), e;
          }
          function Pi(n) {
            return n == null ? n : $f.call(n);
          }
          function Kh(n, t, e) {
            var r = n == null ? 0 : n.length;
            return r ? (e && typeof e != "number" && rn(n, t, e) ? (t = 0, e = r) : (t = t == null ? 0 : O(t), e = e === i ? r : O(e)), In(n, t, e)) : [];
          }
          function zh(n, t) {
            return ze(n, t);
          }
          function Jh(n, t, e) {
            return ri(n, t, x(e, 2));
          }
          function Yh(n, t) {
            var e = n == null ? 0 : n.length;
            if (e) {
              var r = ze(n, t);
              if (r < e && Ln(n[r], t))
                return r;
            }
            return -1;
          }
          function Zh(n, t) {
            return ze(n, t, true);
          }
          function Xh(n, t, e) {
            return ri(n, t, x(e, 2), true);
          }
          function Qh(n, t) {
            var e = n == null ? 0 : n.length;
            if (e) {
              var r = ze(n, t, true) - 1;
              if (Ln(n[r], t))
                return r;
            }
            return -1;
          }
          function Vh(n) {
            return n && n.length ? su(n) : [];
          }
          function kh(n, t) {
            return n && n.length ? su(n, x(t, 2)) : [];
          }
          function jh(n) {
            var t = n == null ? 0 : n.length;
            return t ? In(n, 1, t) : [];
          }
          function nl(n, t, e) {
            return n && n.length ? (t = e || t === i ? 1 : O(t), In(n, 0, t < 0 ? 0 : t)) : [];
          }
          function tl(n, t, e) {
            var r = n == null ? 0 : n.length;
            return r ? (t = e || t === i ? 1 : O(t), t = r - t, In(n, t < 0 ? 0 : t, r)) : [];
          }
          function el(n, t) {
            return n && n.length ? Je(n, x(t, 3), false, true) : [];
          }
          function rl(n, t) {
            return n && n.length ? Je(n, x(t, 3)) : [];
          }
          var il = L(function(n) {
            return st(j(n, 1, J, true));
          }), sl = L(function(n) {
            var t = xn(n);
            return J(t) && (t = i), st(j(n, 1, J, true), x(t, 2));
          }), ul = L(function(n) {
            var t = xn(n);
            return t = typeof t == "function" ? t : i, st(j(n, 1, J, true), i, t);
          });
          function al(n) {
            return n && n.length ? st(n) : [];
          }
          function ol(n, t) {
            return n && n.length ? st(n, x(t, 2)) : [];
          }
          function fl(n, t) {
            return t = typeof t == "function" ? t : i, n && n.length ? st(n, i, t) : [];
          }
          function Ai(n) {
            if (!(n && n.length))
              return [];
            var t = 0;
            return n = nt(n, function(e) {
              if (J(e))
                return t = Q(e.length, t), true;
            }), Wr(t, function(e) {
              return G(n, Hr(e));
            });
          }
          function zu(n, t) {
            if (!(n && n.length))
              return [];
            var e = Ai(n);
            return t == null ? e : G(e, function(r) {
              return hn(t, i, r);
            });
          }
          var cl = L(function(n, t) {
            return J(n) ? ue(n, t) : [];
          }), hl = L(function(n) {
            return si(nt(n, J));
          }), ll = L(function(n) {
            var t = xn(n);
            return J(t) && (t = i), si(nt(n, J), x(t, 2));
          }), pl = L(function(n) {
            var t = xn(n);
            return t = typeof t == "function" ? t : i, si(nt(n, J), i, t);
          }), dl = L(Ai);
          function gl(n, t) {
            return fu(n || [], t || [], se2);
          }
          function vl(n, t) {
            return fu(n || [], t || [], fe);
          }
          var _l = L(function(n) {
            var t = n.length, e = t > 1 ? n[t - 1] : i;
            return e = typeof e == "function" ? (n.pop(), e) : i, zu(n, e);
          });
          function Ju(n) {
            var t = a(n);
            return t.__chain__ = true, t;
          }
          function ml(n, t) {
            return t(n), n;
          }
          function tr(n, t) {
            return t(n);
          }
          var wl = Zn(function(n) {
            var t = n.length, e = t ? n[0] : 0, r = this.__wrapped__, s = function(o) {
              return Jr(o, n);
            };
            return t > 1 || this.__actions__.length || !(r instanceof N) || !Xn(e) ? this.thru(s) : (r = r.slice(e, +e + (t ? 1 : 0)), r.__actions__.push({ func: tr, args: [s], thisArg: i }), new An(r, this.__chain__).thru(function(o) {
              return t && !o.length && o.push(i), o;
            }));
          });
          function Pl() {
            return Ju(this);
          }
          function Al() {
            return new An(this.value(), this.__chain__);
          }
          function Cl() {
            this.__values__ === i && (this.__values__ = ua(this.value()));
            var n = this.__index__ >= this.__values__.length, t = n ? i : this.__values__[this.__index__++];
            return { done: n, value: t };
          }
          function Il() {
            return this;
          }
          function xl(n) {
            for (var t, e = this; e instanceof Me; ) {
              var r = Fu(e);
              r.__index__ = 0, r.__values__ = i, t ? s.__wrapped__ = r : t = r;
              var s = r;
              e = e.__wrapped__;
            }
            return s.__wrapped__ = n, t;
          }
          function El() {
            var n = this.__wrapped__;
            if (n instanceof N) {
              var t = n;
              return this.__actions__.length && (t = new N(this)), t = t.reverse(), t.__actions__.push({ func: tr, args: [Pi], thisArg: i }), new An(t, this.__chain__);
            }
            return this.thru(Pi);
          }
          function yl() {
            return ou(this.__wrapped__, this.__actions__);
          }
          var Sl = Ye(function(n, t, e) {
            F.call(n, e) ? ++n[e] : Jn(n, e, 1);
          });
          function Rl(n, t, e) {
            var r = R(n) ? As : mc;
            return e && rn(n, t, e) && (t = i), r(n, x(t, 3));
          }
          function Ol(n, t) {
            var e = R(n) ? nt : zs;
            return e(n, x(t, 3));
          }
          var bl = wu(Mu), Tl = wu(qu);
          function Ll(n, t) {
            return j(er(n, t), 1);
          }
          function Dl(n, t) {
            return j(er(n, t), ht);
          }
          function Nl(n, t, e) {
            return e = e === i ? 1 : O(e), j(er(n, t), e);
          }
          function Yu(n, t) {
            var e = R(n) ? wn : it;
            return e(n, x(t, 3));
          }
          function Zu(n, t) {
            var e = R(n) ? ko : Ks;
            return e(n, x(t, 3));
          }
          var Hl = Ye(function(n, t, e) {
            F.call(n, e) ? n[e].push(t) : Jn(n, e, [t]);
          });
          function $l(n, t, e, r) {
            n = on(n) ? n : Bt(n), e = e && !r ? O(e) : 0;
            var s = n.length;
            return e < 0 && (e = Q(s + e, 0)), ar(n) ? e <= s && n.indexOf(t, e) > -1 : !!s && bt(n, t, e) > -1;
          }
          var Ul = L(function(n, t, e) {
            var r = -1, s = typeof t == "function", o = on(n) ? d2(n.length) : [];
            return it(n, function(f) {
              o[++r] = s ? hn(t, f, e) : ae(f, t, e);
            }), o;
          }), Wl = Ye(function(n, t, e) {
            Jn(n, e, t);
          });
          function er(n, t) {
            var e = R(n) ? G : Vs;
            return e(n, x(t, 3));
          }
          function Fl(n, t, e, r) {
            return n == null ? [] : (R(t) || (t = t == null ? [] : [t]), e = r ? i : e, R(e) || (e = e == null ? [] : [e]), tu(n, t, e));
          }
          var Ml = Ye(function(n, t, e) {
            n[e ? 0 : 1].push(t);
          }, function() {
            return [[], []];
          });
          function ql(n, t, e) {
            var r = R(n) ? Dr : Es, s = arguments.length < 3;
            return r(n, x(t, 4), e, s, it);
          }
          function Bl(n, t, e) {
            var r = R(n) ? jo : Es, s = arguments.length < 3;
            return r(n, x(t, 4), e, s, Ks);
          }
          function Gl(n, t) {
            var e = R(n) ? nt : zs;
            return e(n, sr(x(t, 3)));
          }
          function Kl(n) {
            var t = R(n) ? Ms : $c;
            return t(n);
          }
          function zl(n, t, e) {
            (e ? rn(n, t, e) : t === i) ? t = 1 : t = O(t);
            var r = R(n) ? pc : Uc;
            return r(n, t);
          }
          function Jl(n) {
            var t = R(n) ? dc : Fc;
            return t(n);
          }
          function Yl(n) {
            if (n == null)
              return 0;
            if (on(n))
              return ar(n) ? Lt(n) : n.length;
            var t = tn(n);
            return t == Rn || t == On ? n.size : kr(n).length;
          }
          function Zl(n, t, e) {
            var r = R(n) ? Nr : Mc;
            return e && rn(n, t, e) && (t = i), r(n, x(t, 3));
          }
          var Xl = L(function(n, t) {
            if (n == null)
              return [];
            var e = t.length;
            return e > 1 && rn(n, t[0], t[1]) ? t = [] : e > 2 && rn(t[0], t[1], t[2]) && (t = [t[0]]), tu(n, j(t, 1), []);
          }), rr = Of || function() {
            return k.Date.now();
          };
          function Ql(n, t) {
            if (typeof t != "function")
              throw new Pn(U);
            return n = O(n), function() {
              if (--n < 1)
                return t.apply(this, arguments);
            };
          }
          function Xu(n, t, e) {
            return t = e ? i : t, t = n && t == null ? n.length : t, Yn(n, Bn, i, i, i, i, t);
          }
          function Qu(n, t) {
            var e;
            if (typeof t != "function")
              throw new Pn(U);
            return n = O(n), function() {
              return --n > 0 && (e = t.apply(this, arguments)), n <= 1 && (t = i), e;
            };
          }
          var Ci = L(function(n, t, e) {
            var r = _n;
            if (e.length) {
              var s = et(e, Mt(Ci));
              r |= $n;
            }
            return Yn(n, r, t, e, s);
          }), Vu = L(function(n, t, e) {
            var r = _n | ct;
            if (e.length) {
              var s = et(e, Mt(Vu));
              r |= $n;
            }
            return Yn(t, r, n, e, s);
          });
          function ku(n, t, e) {
            t = e ? i : t;
            var r = Yn(n, Hn, i, i, i, i, i, t);
            return r.placeholder = ku.placeholder, r;
          }
          function ju(n, t, e) {
            t = e ? i : t;
            var r = Yn(n, Et, i, i, i, i, i, t);
            return r.placeholder = ju.placeholder, r;
          }
          function na(n, t, e) {
            var r, s, o, f, c, l, v = 0, _ = false, m = false, w = true;
            if (typeof n != "function")
              throw new Pn(U);
            t = En(t) || 0, K(e) && (_ = !!e.leading, m = "maxWait" in e, o = m ? Q(En(e.maxWait) || 0, t) : o, w = "trailing" in e ? !!e.trailing : w);
            function C(Y) {
              var Dn = r, kn = s;
              return r = s = i, v = Y, f = n.apply(kn, Dn), f;
            }
            function E(Y) {
              return v = Y, c = le(D, t), _ ? C(Y) : f;
            }
            function b(Y) {
              var Dn = Y - l, kn = Y - v, wa = t - Dn;
              return m ? nn(wa, o - kn) : wa;
            }
            function y2(Y) {
              var Dn = Y - l, kn = Y - v;
              return l === i || Dn >= t || Dn < 0 || m && kn >= o;
            }
            function D() {
              var Y = rr();
              if (y2(Y))
                return H(Y);
              c = le(D, b(Y));
            }
            function H(Y) {
              return c = i, w && r ? C(Y) : (r = s = i, f);
            }
            function gn() {
              c !== i && cu(c), v = 0, r = l = s = c = i;
            }
            function sn() {
              return c === i ? f : H(rr());
            }
            function vn() {
              var Y = rr(), Dn = y2(Y);
              if (r = arguments, s = this, l = Y, Dn) {
                if (c === i)
                  return E(l);
                if (m)
                  return cu(c), c = le(D, t), C(l);
              }
              return c === i && (c = le(D, t)), f;
            }
            return vn.cancel = gn, vn.flush = sn, vn;
          }
          var Vl = L(function(n, t) {
            return Gs(n, 1, t);
          }), kl = L(function(n, t, e) {
            return Gs(n, En(t) || 0, e);
          });
          function jl(n) {
            return Yn(n, pr);
          }
          function ir(n, t) {
            if (typeof n != "function" || t != null && typeof t != "function")
              throw new Pn(U);
            var e = function() {
              var r = arguments, s = t ? t.apply(this, r) : r[0], o = e.cache;
              if (o.has(s))
                return o.get(s);
              var f = n.apply(this, r);
              return e.cache = o.set(s, f) || o, f;
            };
            return e.cache = new (ir.Cache || zn)(), e;
          }
          ir.Cache = zn;
          function sr(n) {
            if (typeof n != "function")
              throw new Pn(U);
            return function() {
              var t = arguments;
              switch (t.length) {
                case 0:
                  return !n.call(this);
                case 1:
                  return !n.call(this, t[0]);
                case 2:
                  return !n.call(this, t[0], t[1]);
                case 3:
                  return !n.call(this, t[0], t[1], t[2]);
              }
              return !n.apply(this, t);
            };
          }
          function np(n) {
            return Qu(2, n);
          }
          var tp = qc(function(n, t) {
            t = t.length == 1 && R(t[0]) ? G(t[0], ln(x())) : G(j(t, 1), ln(x()));
            var e = t.length;
            return L(function(r) {
              for (var s = -1, o = nn(r.length, e); ++s < o; )
                r[s] = t[s].call(this, r[s]);
              return hn(n, this, r);
            });
          }), Ii = L(function(n, t) {
            var e = et(t, Mt(Ii));
            return Yn(n, $n, i, t, e);
          }), ta = L(function(n, t) {
            var e = et(t, Mt(ta));
            return Yn(n, yt, i, t, e);
          }), ep = Zn(function(n, t) {
            return Yn(n, zt, i, i, i, t);
          });
          function rp(n, t) {
            if (typeof n != "function")
              throw new Pn(U);
            return t = t === i ? t : O(t), L(n, t);
          }
          function ip(n, t) {
            if (typeof n != "function")
              throw new Pn(U);
            return t = t == null ? 0 : Q(O(t), 0), L(function(e) {
              var r = e[t], s = at(e, 0, t);
              return r && tt(s, r), hn(n, this, s);
            });
          }
          function sp(n, t, e) {
            var r = true, s = true;
            if (typeof n != "function")
              throw new Pn(U);
            return K(e) && (r = "leading" in e ? !!e.leading : r, s = "trailing" in e ? !!e.trailing : s), na(n, t, { leading: r, maxWait: t, trailing: s });
          }
          function up(n) {
            return Xu(n, 1);
          }
          function ap(n, t) {
            return Ii(ai(t), n);
          }
          function op() {
            if (!arguments.length)
              return [];
            var n = arguments[0];
            return R(n) ? n : [n];
          }
          function fp(n) {
            return Cn(n, It);
          }
          function cp(n, t) {
            return t = typeof t == "function" ? t : i, Cn(n, It, t);
          }
          function hp(n) {
            return Cn(n, Nn | It);
          }
          function lp(n, t) {
            return t = typeof t == "function" ? t : i, Cn(n, Nn | It, t);
          }
          function pp(n, t) {
            return t == null || Bs(n, t, V(t));
          }
          function Ln(n, t) {
            return n === t || n !== n && t !== t;
          }
          var dp = Ve(Xr), gp = Ve(function(n, t) {
            return n >= t;
          }), Pt = Zs(function() {
            return arguments;
          }()) ? Zs : function(n) {
            return z(n) && F.call(n, "callee") && !Ns.call(n, "callee");
          }, R = d2.isArray, vp = gs ? ln(gs) : xc;
          function on(n) {
            return n != null && ur(n.length) && !Qn(n);
          }
          function J(n) {
            return z(n) && on(n);
          }
          function _p(n) {
            return n === true || n === false || z(n) && en(n) == Jt;
          }
          var ot = Tf || Ni, mp = vs ? ln(vs) : Ec;
          function wp(n) {
            return z(n) && n.nodeType === 1 && !pe(n);
          }
          function Pp(n) {
            if (n == null)
              return true;
            if (on(n) && (R(n) || typeof n == "string" || typeof n.splice == "function" || ot(n) || qt(n) || Pt(n)))
              return !n.length;
            var t = tn(n);
            if (t == Rn || t == On)
              return !n.size;
            if (he(n))
              return !kr(n).length;
            for (var e in n)
              if (F.call(n, e))
                return false;
            return true;
          }
          function Ap(n, t) {
            return oe(n, t);
          }
          function Cp(n, t, e) {
            e = typeof e == "function" ? e : i;
            var r = e ? e(n, t) : i;
            return r === i ? oe(n, t, i, e) : !!r;
          }
          function xi(n) {
            if (!z(n))
              return false;
            var t = en(n);
            return t == me || t == Ga || typeof n.message == "string" && typeof n.name == "string" && !pe(n);
          }
          function Ip(n) {
            return typeof n == "number" && $s(n);
          }
          function Qn(n) {
            if (!K(n))
              return false;
            var t = en(n);
            return t == we || t == Gi || t == Ba || t == za;
          }
          function ea(n) {
            return typeof n == "number" && n == O(n);
          }
          function ur(n) {
            return typeof n == "number" && n > -1 && n % 1 == 0 && n <= jn;
          }
          function K(n) {
            var t = typeof n;
            return n != null && (t == "object" || t == "function");
          }
          function z(n) {
            return n != null && typeof n == "object";
          }
          var ra = _s ? ln(_s) : Sc;
          function xp(n, t) {
            return n === t || Vr(n, t, di(t));
          }
          function Ep(n, t, e) {
            return e = typeof e == "function" ? e : i, Vr(n, t, di(t), e);
          }
          function yp(n) {
            return ia(n) && n != +n;
          }
          function Sp(n) {
            if (ch(n))
              throw new S(T);
            return Xs(n);
          }
          function Rp(n) {
            return n === null;
          }
          function Op(n) {
            return n == null;
          }
          function ia(n) {
            return typeof n == "number" || z(n) && en(n) == Zt;
          }
          function pe(n) {
            if (!z(n) || en(n) != Gn)
              return false;
            var t = De(n);
            if (t === null)
              return true;
            var e = F.call(t, "constructor") && t.constructor;
            return typeof e == "function" && e instanceof e && Oe.call(e) == Ef;
          }
          var Ei = ms ? ln(ms) : Rc;
          function bp(n) {
            return ea(n) && n >= -jn && n <= jn;
          }
          var sa = ws ? ln(ws) : Oc;
          function ar(n) {
            return typeof n == "string" || !R(n) && z(n) && en(n) == Qt;
          }
          function dn(n) {
            return typeof n == "symbol" || z(n) && en(n) == Pe;
          }
          var qt = Ps ? ln(Ps) : bc;
          function Tp(n) {
            return n === i;
          }
          function Lp(n) {
            return z(n) && tn(n) == Vt;
          }
          function Dp(n) {
            return z(n) && en(n) == Ya;
          }
          var Np = Ve(jr), Hp = Ve(function(n, t) {
            return n <= t;
          });
          function ua(n) {
            if (!n)
              return [];
            if (on(n))
              return ar(n) ? bn(n) : an(n);
            if (ne2 && n[ne2])
              return pf(n[ne2]());
            var t = tn(n), e = t == Rn ? Mr : t == On ? ye : Bt;
            return e(n);
          }
          function Vn(n) {
            if (!n)
              return n === 0 ? n : 0;
            if (n = En(n), n === ht || n === -ht) {
              var t = n < 0 ? -1 : 1;
              return t * Wa;
            }
            return n === n ? n : 0;
          }
          function O(n) {
            var t = Vn(n), e = t % 1;
            return t === t ? e ? t - e : t : 0;
          }
          function aa(n) {
            return n ? vt(O(n), 0, Un) : 0;
          }
          function En(n) {
            if (typeof n == "number")
              return n;
            if (dn(n))
              return ve;
            if (K(n)) {
              var t = typeof n.valueOf == "function" ? n.valueOf() : n;
              n = K(t) ? t + "" : t;
            }
            if (typeof n != "string")
              return n === 0 ? n : +n;
            n = ys(n);
            var e = go.test(n);
            return e || _o.test(n) ? Xo(n.slice(2), e ? 2 : 8) : po.test(n) ? ve : +n;
          }
          function oa(n) {
            return Fn(n, fn(n));
          }
          function $p(n) {
            return n ? vt(O(n), -jn, jn) : n === 0 ? n : 0;
          }
          function W(n) {
            return n == null ? "" : pn(n);
          }
          var Up = Wt(function(n, t) {
            if (he(t) || on(t)) {
              Fn(t, V(t), n);
              return;
            }
            for (var e in t)
              F.call(t, e) && se2(n, e, t[e]);
          }), fa = Wt(function(n, t) {
            Fn(t, fn(t), n);
          }), or = Wt(function(n, t, e, r) {
            Fn(t, fn(t), n, r);
          }), Wp = Wt(function(n, t, e, r) {
            Fn(t, V(t), n, r);
          }), Fp = Zn(Jr);
          function Mp(n, t) {
            var e = Ut(n);
            return t == null ? e : qs(e, t);
          }
          var qp = L(function(n, t) {
            n = M(n);
            var e = -1, r = t.length, s = r > 2 ? t[2] : i;
            for (s && rn(t[0], t[1], s) && (r = 1); ++e < r; )
              for (var o = t[e], f = fn(o), c = -1, l = f.length; ++c < l; ) {
                var v = f[c], _ = n[v];
                (_ === i || Ln(_, Nt[v]) && !F.call(n, v)) && (n[v] = o[v]);
              }
            return n;
          }), Bp = L(function(n) {
            return n.push(i, yu), hn(ca, i, n);
          });
          function Gp(n, t) {
            return Cs(n, x(t, 3), Wn);
          }
          function Kp(n, t) {
            return Cs(n, x(t, 3), Zr);
          }
          function zp(n, t) {
            return n == null ? n : Yr(n, x(t, 3), fn);
          }
          function Jp(n, t) {
            return n == null ? n : Js(n, x(t, 3), fn);
          }
          function Yp(n, t) {
            return n && Wn(n, x(t, 3));
          }
          function Zp(n, t) {
            return n && Zr(n, x(t, 3));
          }
          function Xp(n) {
            return n == null ? [] : Ge(n, V(n));
          }
          function Qp(n) {
            return n == null ? [] : Ge(n, fn(n));
          }
          function yi(n, t, e) {
            var r = n == null ? i : _t(n, t);
            return r === i ? e : r;
          }
          function Vp(n, t) {
            return n != null && Ou(n, t, Pc);
          }
          function Si(n, t) {
            return n != null && Ou(n, t, Ac);
          }
          var kp = Au(function(n, t, e) {
            t != null && typeof t.toString != "function" && (t = be.call(t)), n[t] = e;
          }, Oi(cn)), jp = Au(function(n, t, e) {
            t != null && typeof t.toString != "function" && (t = be.call(t)), F.call(n, t) ? n[t].push(e) : n[t] = [e];
          }, x), nd = L(ae);
          function V(n) {
            return on(n) ? Fs(n) : kr(n);
          }
          function fn(n) {
            return on(n) ? Fs(n, true) : Tc(n);
          }
          function td(n, t) {
            var e = {};
            return t = x(t, 3), Wn(n, function(r, s, o) {
              Jn(e, t(r, s, o), r);
            }), e;
          }
          function ed(n, t) {
            var e = {};
            return t = x(t, 3), Wn(n, function(r, s, o) {
              Jn(e, s, t(r, s, o));
            }), e;
          }
          var rd = Wt(function(n, t, e) {
            Ke(n, t, e);
          }), ca = Wt(function(n, t, e, r) {
            Ke(n, t, e, r);
          }), id = Zn(function(n, t) {
            var e = {};
            if (n == null)
              return e;
            var r = false;
            t = G(t, function(o) {
              return o = ut(o, n), r || (r = o.length > 1), o;
            }), Fn(n, li(n), e), r && (e = Cn(e, Nn | qn | It, kc));
            for (var s = t.length; s--; )
              ii(e, t[s]);
            return e;
          });
          function sd(n, t) {
            return ha(n, sr(x(t)));
          }
          var ud = Zn(function(n, t) {
            return n == null ? {} : Dc(n, t);
          });
          function ha(n, t) {
            if (n == null)
              return {};
            var e = G(li(n), function(r) {
              return [r];
            });
            return t = x(t), eu(n, e, function(r, s) {
              return t(r, s[0]);
            });
          }
          function ad(n, t, e) {
            t = ut(t, n);
            var r = -1, s = t.length;
            for (s || (s = 1, n = i); ++r < s; ) {
              var o = n == null ? i : n[Mn(t[r])];
              o === i && (r = s, o = e), n = Qn(o) ? o.call(n) : o;
            }
            return n;
          }
          function od(n, t, e) {
            return n == null ? n : fe(n, t, e);
          }
          function fd(n, t, e, r) {
            return r = typeof r == "function" ? r : i, n == null ? n : fe(n, t, e, r);
          }
          var la = xu(V), pa = xu(fn);
          function cd(n, t, e) {
            var r = R(n), s = r || ot(n) || qt(n);
            if (t = x(t, 4), e == null) {
              var o = n && n.constructor;
              s ? e = r ? new o() : [] : K(n) ? e = Qn(o) ? Ut(De(n)) : {} : e = {};
            }
            return (s ? wn : Wn)(n, function(f, c, l) {
              return t(e, f, c, l);
            }), e;
          }
          function hd(n, t) {
            return n == null ? true : ii(n, t);
          }
          function ld(n, t, e) {
            return n == null ? n : au(n, t, ai(e));
          }
          function pd(n, t, e, r) {
            return r = typeof r == "function" ? r : i, n == null ? n : au(n, t, ai(e), r);
          }
          function Bt(n) {
            return n == null ? [] : Fr(n, V(n));
          }
          function dd(n) {
            return n == null ? [] : Fr(n, fn(n));
          }
          function gd(n, t, e) {
            return e === i && (e = t, t = i), e !== i && (e = En(e), e = e === e ? e : 0), t !== i && (t = En(t), t = t === t ? t : 0), vt(En(n), t, e);
          }
          function vd(n, t, e) {
            return t = Vn(t), e === i ? (e = t, t = 0) : e = Vn(e), n = En(n), Cc(n, t, e);
          }
          function _d(n, t, e) {
            if (e && typeof e != "boolean" && rn(n, t, e) && (t = e = i), e === i && (typeof t == "boolean" ? (e = t, t = i) : typeof n == "boolean" && (e = n, n = i)), n === i && t === i ? (n = 0, t = 1) : (n = Vn(n), t === i ? (t = n, n = 0) : t = Vn(t)), n > t) {
              var r = n;
              n = t, t = r;
            }
            if (e || n % 1 || t % 1) {
              var s = Us();
              return nn(n + s * (t - n + Zo("1e-" + ((s + "").length - 1))), t);
            }
            return ti(n, t);
          }
          var md = Ft(function(n, t, e) {
            return t = t.toLowerCase(), n + (e ? da(t) : t);
          });
          function da(n) {
            return Ri(W(n).toLowerCase());
          }
          function ga(n) {
            return n = W(n), n && n.replace(wo, of).replace(Wo, "");
          }
          function wd(n, t, e) {
            n = W(n), t = pn(t);
            var r = n.length;
            e = e === i ? r : vt(O(e), 0, r);
            var s = e;
            return e -= t.length, e >= 0 && n.slice(e, s) == t;
          }
          function Pd(n) {
            return n = W(n), n && ka.test(n) ? n.replace(Ji, ff) : n;
          }
          function Ad(n) {
            return n = W(n), n && io.test(n) ? n.replace(Ir, "\\$&") : n;
          }
          var Cd = Ft(function(n, t, e) {
            return n + (e ? "-" : "") + t.toLowerCase();
          }), Id = Ft(function(n, t, e) {
            return n + (e ? " " : "") + t.toLowerCase();
          }), xd = mu("toLowerCase");
          function Ed(n, t, e) {
            n = W(n), t = O(t);
            var r = t ? Lt(n) : 0;
            if (!t || r >= t)
              return n;
            var s = (t - r) / 2;
            return Qe(Ue(s), e) + n + Qe($e(s), e);
          }
          function yd(n, t, e) {
            n = W(n), t = O(t);
            var r = t ? Lt(n) : 0;
            return t && r < t ? n + Qe(t - r, e) : n;
          }
          function Sd(n, t, e) {
            n = W(n), t = O(t);
            var r = t ? Lt(n) : 0;
            return t && r < t ? Qe(t - r, e) + n : n;
          }
          function Rd(n, t, e) {
            return e || t == null ? t = 0 : t && (t = +t), Hf(W(n).replace(xr, ""), t || 0);
          }
          function Od(n, t, e) {
            return (e ? rn(n, t, e) : t === i) ? t = 1 : t = O(t), ei(W(n), t);
          }
          function bd() {
            var n = arguments, t = W(n[0]);
            return n.length < 3 ? t : t.replace(n[1], n[2]);
          }
          var Td = Ft(function(n, t, e) {
            return n + (e ? "_" : "") + t.toLowerCase();
          });
          function Ld(n, t, e) {
            return e && typeof e != "number" && rn(n, t, e) && (t = e = i), e = e === i ? Un : e >>> 0, e ? (n = W(n), n && (typeof t == "string" || t != null && !Ei(t)) && (t = pn(t), !t && Tt(n)) ? at(bn(n), 0, e) : n.split(t, e)) : [];
          }
          var Dd = Ft(function(n, t, e) {
            return n + (e ? " " : "") + Ri(t);
          });
          function Nd(n, t, e) {
            return n = W(n), e = e == null ? 0 : vt(O(e), 0, n.length), t = pn(t), n.slice(e, e + t.length) == t;
          }
          function Hd(n, t, e) {
            var r = a.templateSettings;
            e && rn(n, t, e) && (t = i), n = W(n), t = or({}, t, r, Eu);
            var s = or({}, t.imports, r.imports, Eu), o = V(s), f = Fr(s, o), c, l, v = 0, _ = t.interpolate || Ae, m = "__p += '", w = qr((t.escape || Ae).source + "|" + _.source + "|" + (_ === Yi ? lo : Ae).source + "|" + (t.evaluate || Ae).source + "|$", "g"), C = "//# sourceURL=" + (F.call(t, "sourceURL") ? (t.sourceURL + "").replace(/\s/g, " ") : "lodash.templateSources[" + ++Go + "]") + `
`;
            n.replace(w, function(y2, D, H, gn, sn, vn) {
              return H || (H = gn), m += n.slice(v, vn).replace(Po, cf), D && (c = true, m += `' +
__e(` + D + `) +
'`), sn && (l = true, m += `';
` + sn + `;
__p += '`), H && (m += `' +
((__t = (` + H + `)) == null ? '' : __t) +
'`), v = vn + y2.length, y2;
            }), m += `';
`;
            var E = F.call(t, "variable") && t.variable;
            if (!E)
              m = `with (obj) {
` + m + `
}
`;
            else if (co.test(E))
              throw new S(Sn);
            m = (l ? m.replace(Za, "") : m).replace(Xa, "$1").replace(Qa, "$1;"), m = "function(" + (E || "obj") + `) {
` + (E ? "" : `obj || (obj = {});
`) + "var __t, __p = ''" + (c ? ", __e = _.escape" : "") + (l ? `, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
` : `;
`) + m + `return __p
}`;
            var b = _a(function() {
              return $(o, C + "return " + m).apply(i, f);
            });
            if (b.source = m, xi(b))
              throw b;
            return b;
          }
          function $d(n) {
            return W(n).toLowerCase();
          }
          function Ud(n) {
            return W(n).toUpperCase();
          }
          function Wd(n, t, e) {
            if (n = W(n), n && (e || t === i))
              return ys(n);
            if (!n || !(t = pn(t)))
              return n;
            var r = bn(n), s = bn(t), o = Ss(r, s), f = Rs(r, s) + 1;
            return at(r, o, f).join("");
          }
          function Fd(n, t, e) {
            if (n = W(n), n && (e || t === i))
              return n.slice(0, bs(n) + 1);
            if (!n || !(t = pn(t)))
              return n;
            var r = bn(n), s = Rs(r, bn(t)) + 1;
            return at(r, 0, s).join("");
          }
          function Md(n, t, e) {
            if (n = W(n), n && (e || t === i))
              return n.replace(xr, "");
            if (!n || !(t = pn(t)))
              return n;
            var r = bn(n), s = Ss(r, bn(t));
            return at(r, s).join("");
          }
          function qd(n, t) {
            var e = La, r = Da;
            if (K(t)) {
              var s = "separator" in t ? t.separator : s;
              e = "length" in t ? O(t.length) : e, r = "omission" in t ? pn(t.omission) : r;
            }
            n = W(n);
            var o = n.length;
            if (Tt(n)) {
              var f = bn(n);
              o = f.length;
            }
            if (e >= o)
              return n;
            var c = e - Lt(r);
            if (c < 1)
              return r;
            var l = f ? at(f, 0, c).join("") : n.slice(0, c);
            if (s === i)
              return l + r;
            if (f && (c += l.length - c), Ei(s)) {
              if (n.slice(c).search(s)) {
                var v, _ = l;
                for (s.global || (s = qr(s.source, W(Zi.exec(s)) + "g")), s.lastIndex = 0; v = s.exec(_); )
                  var m = v.index;
                l = l.slice(0, m === i ? c : m);
              }
            } else if (n.indexOf(pn(s), c) != c) {
              var w = l.lastIndexOf(s);
              w > -1 && (l = l.slice(0, w));
            }
            return l + r;
          }
          function Bd(n) {
            return n = W(n), n && Va.test(n) ? n.replace(zi, _f) : n;
          }
          var Gd = Ft(function(n, t, e) {
            return n + (e ? " " : "") + t.toUpperCase();
          }), Ri = mu("toUpperCase");
          function va(n, t, e) {
            return n = W(n), t = e ? i : t, t === i ? lf(n) ? Pf(n) : ef(n) : n.match(t) || [];
          }
          var _a = L(function(n, t) {
            try {
              return hn(n, i, t);
            } catch (e) {
              return xi(e) ? e : new S(e);
            }
          }), Kd = Zn(function(n, t) {
            return wn(t, function(e) {
              e = Mn(e), Jn(n, e, Ci(n[e], n));
            }), n;
          });
          function zd(n) {
            var t = n == null ? 0 : n.length, e = x();
            return n = t ? G(n, function(r) {
              if (typeof r[1] != "function")
                throw new Pn(U);
              return [e(r[0]), r[1]];
            }) : [], L(function(r) {
              for (var s = -1; ++s < t; ) {
                var o = n[s];
                if (hn(o[0], this, r))
                  return hn(o[1], this, r);
              }
            });
          }
          function Jd(n) {
            return _c(Cn(n, Nn));
          }
          function Oi(n) {
            return function() {
              return n;
            };
          }
          function Yd(n, t) {
            return n == null || n !== n ? t : n;
          }
          var Zd = Pu(), Xd = Pu(true);
          function cn(n) {
            return n;
          }
          function bi(n) {
            return Qs(typeof n == "function" ? n : Cn(n, Nn));
          }
          function Qd(n) {
            return ks(Cn(n, Nn));
          }
          function Vd(n, t) {
            return js(n, Cn(t, Nn));
          }
          var kd = L(function(n, t) {
            return function(e) {
              return ae(e, n, t);
            };
          }), jd = L(function(n, t) {
            return function(e) {
              return ae(n, e, t);
            };
          });
          function Ti(n, t, e) {
            var r = V(t), s = Ge(t, r);
            e == null && !(K(t) && (s.length || !r.length)) && (e = t, t = n, n = this, s = Ge(t, V(t)));
            var o = !(K(e) && "chain" in e) || !!e.chain, f = Qn(n);
            return wn(s, function(c) {
              var l = t[c];
              n[c] = l, f && (n.prototype[c] = function() {
                var v = this.__chain__;
                if (o || v) {
                  var _ = n(this.__wrapped__), m = _.__actions__ = an(this.__actions__);
                  return m.push({ func: l, args: arguments, thisArg: n }), _.__chain__ = v, _;
                }
                return l.apply(n, tt([this.value()], arguments));
              });
            }), n;
          }
          function ng() {
            return k._ === this && (k._ = yf), this;
          }
          function Li() {
          }
          function tg(n) {
            return n = O(n), L(function(t) {
              return nu(t, n);
            });
          }
          var eg = fi(G), rg = fi(As), ig = fi(Nr);
          function ma(n) {
            return vi(n) ? Hr(Mn(n)) : Nc(n);
          }
          function sg(n) {
            return function(t) {
              return n == null ? i : _t(n, t);
            };
          }
          var ug = Cu(), ag = Cu(true);
          function Di() {
            return [];
          }
          function Ni() {
            return false;
          }
          function og() {
            return {};
          }
          function fg() {
            return "";
          }
          function cg() {
            return true;
          }
          function hg(n, t) {
            if (n = O(n), n < 1 || n > jn)
              return [];
            var e = Un, r = nn(n, Un);
            t = x(t), n -= Un;
            for (var s = Wr(r, t); ++e < n; )
              t(e);
            return s;
          }
          function lg(n) {
            return R(n) ? G(n, Mn) : dn(n) ? [n] : an(Wu(W(n)));
          }
          function pg(n) {
            var t = ++xf;
            return W(n) + t;
          }
          var dg = Xe(function(n, t) {
            return n + t;
          }, 0), gg = ci("ceil"), vg = Xe(function(n, t) {
            return n / t;
          }, 1), _g = ci("floor");
          function mg(n) {
            return n && n.length ? Be(n, cn, Xr) : i;
          }
          function wg(n, t) {
            return n && n.length ? Be(n, x(t, 2), Xr) : i;
          }
          function Pg(n) {
            return xs(n, cn);
          }
          function Ag(n, t) {
            return xs(n, x(t, 2));
          }
          function Cg(n) {
            return n && n.length ? Be(n, cn, jr) : i;
          }
          function Ig(n, t) {
            return n && n.length ? Be(n, x(t, 2), jr) : i;
          }
          var xg = Xe(function(n, t) {
            return n * t;
          }, 1), Eg = ci("round"), yg = Xe(function(n, t) {
            return n - t;
          }, 0);
          function Sg(n) {
            return n && n.length ? Ur(n, cn) : 0;
          }
          function Rg(n, t) {
            return n && n.length ? Ur(n, x(t, 2)) : 0;
          }
          return a.after = Ql, a.ary = Xu, a.assign = Up, a.assignIn = fa, a.assignInWith = or, a.assignWith = Wp, a.at = Fp, a.before = Qu, a.bind = Ci, a.bindAll = Kd, a.bindKey = Vu, a.castArray = op, a.chain = Ju, a.chunk = _h, a.compact = mh, a.concat = wh, a.cond = zd, a.conforms = Jd, a.constant = Oi, a.countBy = Sl, a.create = Mp, a.curry = ku, a.curryRight = ju, a.debounce = na, a.defaults = qp, a.defaultsDeep = Bp, a.defer = Vl, a.delay = kl, a.difference = Ph, a.differenceBy = Ah, a.differenceWith = Ch, a.drop = Ih, a.dropRight = xh, a.dropRightWhile = Eh, a.dropWhile = yh, a.fill = Sh, a.filter = Ol, a.flatMap = Ll, a.flatMapDeep = Dl, a.flatMapDepth = Nl, a.flatten = Bu, a.flattenDeep = Rh, a.flattenDepth = Oh, a.flip = jl, a.flow = Zd, a.flowRight = Xd, a.fromPairs = bh, a.functions = Xp, a.functionsIn = Qp, a.groupBy = Hl, a.initial = Lh, a.intersection = Dh, a.intersectionBy = Nh, a.intersectionWith = Hh, a.invert = kp, a.invertBy = jp, a.invokeMap = Ul, a.iteratee = bi, a.keyBy = Wl, a.keys = V, a.keysIn = fn, a.map = er, a.mapKeys = td, a.mapValues = ed, a.matches = Qd, a.matchesProperty = Vd, a.memoize = ir, a.merge = rd, a.mergeWith = ca, a.method = kd, a.methodOf = jd, a.mixin = Ti, a.negate = sr, a.nthArg = tg, a.omit = id, a.omitBy = sd, a.once = np, a.orderBy = Fl, a.over = eg, a.overArgs = tp, a.overEvery = rg, a.overSome = ig, a.partial = Ii, a.partialRight = ta, a.partition = Ml, a.pick = ud, a.pickBy = ha, a.property = ma, a.propertyOf = sg, a.pull = Fh, a.pullAll = Ku, a.pullAllBy = Mh, a.pullAllWith = qh, a.pullAt = Bh, a.range = ug, a.rangeRight = ag, a.rearg = ep, a.reject = Gl, a.remove = Gh, a.rest = rp, a.reverse = Pi, a.sampleSize = zl, a.set = od, a.setWith = fd, a.shuffle = Jl, a.slice = Kh, a.sortBy = Xl, a.sortedUniq = Vh, a.sortedUniqBy = kh, a.split = Ld, a.spread = ip, a.tail = jh, a.take = nl, a.takeRight = tl, a.takeRightWhile = el, a.takeWhile = rl, a.tap = ml, a.throttle = sp, a.thru = tr, a.toArray = ua, a.toPairs = la, a.toPairsIn = pa, a.toPath = lg, a.toPlainObject = oa, a.transform = cd, a.unary = up, a.union = il, a.unionBy = sl, a.unionWith = ul, a.uniq = al, a.uniqBy = ol, a.uniqWith = fl, a.unset = hd, a.unzip = Ai, a.unzipWith = zu, a.update = ld, a.updateWith = pd, a.values = Bt, a.valuesIn = dd, a.without = cl, a.words = va, a.wrap = ap, a.xor = hl, a.xorBy = ll, a.xorWith = pl, a.zip = dl, a.zipObject = gl, a.zipObjectDeep = vl, a.zipWith = _l, a.entries = la, a.entriesIn = pa, a.extend = fa, a.extendWith = or, Ti(a, a), a.add = dg, a.attempt = _a, a.camelCase = md, a.capitalize = da, a.ceil = gg, a.clamp = gd, a.clone = fp, a.cloneDeep = hp, a.cloneDeepWith = lp, a.cloneWith = cp, a.conformsTo = pp, a.deburr = ga, a.defaultTo = Yd, a.divide = vg, a.endsWith = wd, a.eq = Ln, a.escape = Pd, a.escapeRegExp = Ad, a.every = Rl, a.find = bl, a.findIndex = Mu, a.findKey = Gp, a.findLast = Tl, a.findLastIndex = qu, a.findLastKey = Kp, a.floor = _g, a.forEach = Yu, a.forEachRight = Zu, a.forIn = zp, a.forInRight = Jp, a.forOwn = Yp, a.forOwnRight = Zp, a.get = yi, a.gt = dp, a.gte = gp, a.has = Vp, a.hasIn = Si, a.head = Gu, a.identity = cn, a.includes = $l, a.indexOf = Th, a.inRange = vd, a.invoke = nd, a.isArguments = Pt, a.isArray = R, a.isArrayBuffer = vp, a.isArrayLike = on, a.isArrayLikeObject = J, a.isBoolean = _p, a.isBuffer = ot, a.isDate = mp, a.isElement = wp, a.isEmpty = Pp, a.isEqual = Ap, a.isEqualWith = Cp, a.isError = xi, a.isFinite = Ip, a.isFunction = Qn, a.isInteger = ea, a.isLength = ur, a.isMap = ra, a.isMatch = xp, a.isMatchWith = Ep, a.isNaN = yp, a.isNative = Sp, a.isNil = Op, a.isNull = Rp, a.isNumber = ia, a.isObject = K, a.isObjectLike = z, a.isPlainObject = pe, a.isRegExp = Ei, a.isSafeInteger = bp, a.isSet = sa, a.isString = ar, a.isSymbol = dn, a.isTypedArray = qt, a.isUndefined = Tp, a.isWeakMap = Lp, a.isWeakSet = Dp, a.join = $h, a.kebabCase = Cd, a.last = xn, a.lastIndexOf = Uh, a.lowerCase = Id, a.lowerFirst = xd, a.lt = Np, a.lte = Hp, a.max = mg, a.maxBy = wg, a.mean = Pg, a.meanBy = Ag, a.min = Cg, a.minBy = Ig, a.stubArray = Di, a.stubFalse = Ni, a.stubObject = og, a.stubString = fg, a.stubTrue = cg, a.multiply = xg, a.nth = Wh, a.noConflict = ng, a.noop = Li, a.now = rr, a.pad = Ed, a.padEnd = yd, a.padStart = Sd, a.parseInt = Rd, a.random = _d, a.reduce = ql, a.reduceRight = Bl, a.repeat = Od, a.replace = bd, a.result = ad, a.round = Eg, a.runInContext = h, a.sample = Kl, a.size = Yl, a.snakeCase = Td, a.some = Zl, a.sortedIndex = zh, a.sortedIndexBy = Jh, a.sortedIndexOf = Yh, a.sortedLastIndex = Zh, a.sortedLastIndexBy = Xh, a.sortedLastIndexOf = Qh, a.startCase = Dd, a.startsWith = Nd, a.subtract = yg, a.sum = Sg, a.sumBy = Rg, a.template = Hd, a.times = hg, a.toFinite = Vn, a.toInteger = O, a.toLength = aa, a.toLower = $d, a.toNumber = En, a.toSafeInteger = $p, a.toString = W, a.toUpper = Ud, a.trim = Wd, a.trimEnd = Fd, a.trimStart = Md, a.truncate = qd, a.unescape = Bd, a.uniqueId = pg, a.upperCase = Gd, a.upperFirst = Ri, a.each = Yu, a.eachRight = Zu, a.first = Gu, Ti(a, function() {
            var n = {};
            return Wn(a, function(t, e) {
              F.call(a.prototype, e) || (n[e] = t);
            }), n;
          }(), { chain: false }), a.VERSION = p2, wn(["bind", "bindKey", "curry", "curryRight", "partial", "partialRight"], function(n) {
            a[n].placeholder = a;
          }), wn(["drop", "take"], function(n, t) {
            N.prototype[n] = function(e) {
              e = e === i ? 1 : Q(O(e), 0);
              var r = this.__filtered__ && !t ? new N(this) : this.clone();
              return r.__filtered__ ? r.__takeCount__ = nn(e, r.__takeCount__) : r.__views__.push({ size: nn(e, Un), type: n + (r.__dir__ < 0 ? "Right" : "") }), r;
            }, N.prototype[n + "Right"] = function(e) {
              return this.reverse()[n](e).reverse();
            };
          }), wn(["filter", "map", "takeWhile"], function(n, t) {
            var e = t + 1, r = e == Bi || e == Ua;
            N.prototype[n] = function(s) {
              var o = this.clone();
              return o.__iteratees__.push({ iteratee: x(s, 3), type: e }), o.__filtered__ = o.__filtered__ || r, o;
            };
          }), wn(["head", "last"], function(n, t) {
            var e = "take" + (t ? "Right" : "");
            N.prototype[n] = function() {
              return this[e](1).value()[0];
            };
          }), wn(["initial", "tail"], function(n, t) {
            var e = "drop" + (t ? "" : "Right");
            N.prototype[n] = function() {
              return this.__filtered__ ? new N(this) : this[e](1);
            };
          }), N.prototype.compact = function() {
            return this.filter(cn);
          }, N.prototype.find = function(n) {
            return this.filter(n).head();
          }, N.prototype.findLast = function(n) {
            return this.reverse().find(n);
          }, N.prototype.invokeMap = L(function(n, t) {
            return typeof n == "function" ? new N(this) : this.map(function(e) {
              return ae(e, n, t);
            });
          }), N.prototype.reject = function(n) {
            return this.filter(sr(x(n)));
          }, N.prototype.slice = function(n, t) {
            n = O(n);
            var e = this;
            return e.__filtered__ && (n > 0 || t < 0) ? new N(e) : (n < 0 ? e = e.takeRight(-n) : n && (e = e.drop(n)), t !== i && (t = O(t), e = t < 0 ? e.dropRight(-t) : e.take(t - n)), e);
          }, N.prototype.takeRightWhile = function(n) {
            return this.reverse().takeWhile(n).reverse();
          }, N.prototype.toArray = function() {
            return this.take(Un);
          }, Wn(N.prototype, function(n, t) {
            var e = /^(?:filter|find|map|reject)|While$/.test(t), r = /^(?:head|last)$/.test(t), s = a[r ? "take" + (t == "last" ? "Right" : "") : t], o = r || /^find/.test(t);
            s && (a.prototype[t] = function() {
              var f = this.__wrapped__, c = r ? [1] : arguments, l = f instanceof N, v = c[0], _ = l || R(f), m = function(D) {
                var H = s.apply(a, tt([D], c));
                return r && w ? H[0] : H;
              };
              _ && e && typeof v == "function" && v.length != 1 && (l = _ = false);
              var w = this.__chain__, C = !!this.__actions__.length, E = o && !w, b = l && !C;
              if (!o && _) {
                f = b ? f : new N(this);
                var y2 = n.apply(f, c);
                return y2.__actions__.push({ func: tr, args: [m], thisArg: i }), new An(y2, w);
              }
              return E && b ? n.apply(this, c) : (y2 = this.thru(m), E ? r ? y2.value()[0] : y2.value() : y2);
            });
          }), wn(["pop", "push", "shift", "sort", "splice", "unshift"], function(n) {
            var t = Se[n], e = /^(?:push|sort|unshift)$/.test(n) ? "tap" : "thru", r = /^(?:pop|shift)$/.test(n);
            a.prototype[n] = function() {
              var s = arguments;
              if (r && !this.__chain__) {
                var o = this.value();
                return t.apply(R(o) ? o : [], s);
              }
              return this[e](function(f) {
                return t.apply(R(f) ? f : [], s);
              });
            };
          }), Wn(N.prototype, function(n, t) {
            var e = a[t];
            if (e) {
              var r = e.name + "";
              F.call($t, r) || ($t[r] = []), $t[r].push({ name: t, func: e });
            }
          }), $t[Ze(i, ct).name] = [{ name: "wrapper", func: i }], N.prototype.clone = Bf, N.prototype.reverse = Gf, N.prototype.value = Kf, a.prototype.at = wl, a.prototype.chain = Pl, a.prototype.commit = Al, a.prototype.next = Cl, a.prototype.plant = xl, a.prototype.reverse = El, a.prototype.toJSON = a.prototype.valueOf = a.prototype.value = yl, a.prototype.first = a.prototype.head, ne2 && (a.prototype[ne2] = Il), a;
        }, Dt = Af();
        lt ? ((lt.exports = Dt)._ = Dt, br._ = Dt) : k._ = Dt;
      }).call(de);
    })($i, $i.exports);
    var $g = Object.defineProperty;
    var Ug = Object.defineProperties;
    var Wg = Object.getOwnPropertyDescriptors;
    var Ea = Object.getOwnPropertySymbols;
    var Fg = Object.prototype.hasOwnProperty;
    var Mg = Object.prototype.propertyIsEnumerable;
    var ya = (P, u, i) => u in P ? $g(P, u, { enumerable: true, configurable: true, writable: true, value: i }) : P[u] = i;
    var fr = (P, u) => {
      for (var i in u || (u = {}))
        Fg.call(u, i) && ya(P, i, u[i]);
      if (Ea)
        for (var i of Ea(u))
          Mg.call(u, i) && ya(P, i, u[i]);
      return P;
    };
    var qg = (P, u) => Ug(P, Wg(u));
    function yn(P, u, i) {
      let p2;
      const I = Ui(P);
      return u.rpcMap && (p2 = u.rpcMap[I]), p2 || (p2 = `${Hg}?chainId=eip155:${I}&projectId=${i}`), p2;
    }
    function Ui(P) {
      return P.includes("eip155") ? Number(P.split(":")[1]) : Number(P);
    }
    function Sa(P) {
      return P.map((u) => `${u.split(":")[0]}:${u.split(":")[1]}`);
    }
    function Bg(P, u) {
      const i = Object.keys(u.namespaces).filter((I) => I.includes(P));
      if (!i.length)
        return [];
      const p2 = [];
      return i.forEach((I) => {
        const T = u.namespaces[I].accounts;
        p2.push(...T);
      }), p2;
    }
    function Gg(P = {}, u = {}) {
      const i = Ra(P), p2 = Ra(u);
      return $i.exports.merge(i, p2);
    }
    function Ra(P) {
      var u, i, p2, I;
      const T = {};
      if (!un.isValidObject(P))
        return T;
      for (const [U, Sn] of Object.entries(P)) {
        const Kt = un.isCaipNamespace(U) ? [U] : Sn.chains, lr = Sn.methods || [], Ct = Sn.events || [], Nn = Sn.rpcMap || {}, qn = un.parseNamespaceKey(U);
        T[qn] = qg(fr(fr({}, T[qn]), Sn), { chains: un.mergeArrays(Kt, (u = T[qn]) == null ? void 0 : u.chains), methods: un.mergeArrays(lr, (i = T[qn]) == null ? void 0 : i.methods), events: un.mergeArrays(Ct, (p2 = T[qn]) == null ? void 0 : p2.events), rpcMap: fr(fr({}, Nn), (I = T[qn]) == null ? void 0 : I.rpcMap) });
      }
      return T;
    }
    function Kg(P) {
      return P.includes(":") ? P.split(":")[2] : P;
    }
    function zg(P) {
      const u = {};
      for (const [i, p2] of Object.entries(P)) {
        const I = p2.methods || [], T = p2.events || [], U = p2.accounts || [], Sn = un.isCaipNamespace(i) ? [i] : p2.chains ? p2.chains : Sa(p2.accounts);
        u[i] = { chains: Sn, methods: I, events: T, accounts: U };
      }
      return u;
    }
    function Wi(P) {
      return typeof P == "number" ? P : P.includes("0x") ? parseInt(P, 16) : P.includes(":") ? Number(P.split(":")[1]) : Number(P);
    }
    var Oa = {};
    var Z = (P) => Oa[P];
    var Fi = (P, u) => {
      Oa[P] = u;
    };
    var Jg = class {
      constructor(u) {
        this.name = "polkadot", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
          const p2 = i || yn(`${this.name}:${u}`, this.namespace);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]) || [] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          u[i] = this.createHttpProvider(i, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(u, this.namespace);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var Yg = class {
      constructor(u) {
        this.name = "eip155", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.httpProviders = this.createHttpProviders(), this.chainId = parseInt(this.getDefaultChain());
      }
      async request(u) {
        switch (u.request.method) {
          case "eth_requestAccounts":
            return this.getAccounts();
          case "eth_accounts":
            return this.getAccounts();
          case "wallet_switchEthereumChain":
            return await this.handleSwitchChain(u);
          case "eth_chainId":
            return parseInt(this.getDefaultChain());
        }
        return this.namespace.methods.includes(u.request.method) ? await this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      setDefaultChain(u, i) {
        const p2 = Ui(u);
        if (!this.httpProviders[p2]) {
          const I = i || yn(`${this.name}:${p2}`, this.namespace, this.client.core.projectId);
          if (!I)
            throw new Error(`No RPC url provided for chainId: ${p2}`);
          this.setHttpProvider(p2, I);
        }
        this.chainId = p2, this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${p2}`);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId.toString();
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Ca.HttpConnection(p2, Z("disableProviderPing")));
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          const I = Ui(i);
          u[I] = this.createHttpProvider(I, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      getHttpProvider() {
        const u = this.chainId, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      async handleSwitchChain(u) {
        var i, p2;
        let I = u.request.params ? (i = u.request.params[0]) == null ? void 0 : i.chainId : "0x0";
        I = I.startsWith("0x") ? I : `0x${I}`;
        const T = parseInt(I, 16);
        if (this.isChainApproved(T))
          this.setDefaultChain(`${T}`);
        else if (this.namespace.methods.includes("wallet_switchEthereumChain"))
          await this.client.request({ topic: u.topic, request: { method: u.request.method, params: [{ chainId: I }] }, chainId: (p2 = this.namespace.chains) == null ? void 0 : p2[0] }), this.setDefaultChain(`${T}`);
        else
          throw new Error(`Failed to switch to chain 'eip155:${T}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);
        return null;
      }
      isChainApproved(u) {
        return this.namespace.chains.includes(`${this.name}:${u}`);
      }
    };
    var Zg = class {
      constructor(u) {
        this.name = "solana", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
          const p2 = i || yn(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.chainId = u, this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          u[i] = this.createHttpProvider(i, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(u, this.namespace, this.client.core.projectId);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var Xg = class {
      constructor(u) {
        this.name = "cosmos", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
          const p2 = i || yn(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          u[i] = this.createHttpProvider(i, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(u, this.namespace, this.client.core.projectId);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var Qg = class {
      constructor(u) {
        this.name = "cip34", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (this.chainId = u, !this.httpProviders[u]) {
          const p2 = i || this.getCardanoRPCUrl(u);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          const p2 = this.getCardanoRPCUrl(i);
          u[i] = this.createHttpProvider(i, p2);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      getCardanoRPCUrl(u) {
        const i = this.namespace.rpcMap;
        if (i)
          return i[u];
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || this.getCardanoRPCUrl(u);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var Vg = class {
      constructor(u) {
        this.name = "elrond", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
          const p2 = i || yn(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.chainId = u, this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          u[i] = this.createHttpProvider(i, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(u, this.namespace, this.client.core.projectId);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var kg = class {
      constructor(u) {
        this.name = "multiversx", this.namespace = u.namespace, this.events = Z("events"), this.client = Z("client"), this.chainId = this.getDefaultChain(), this.httpProviders = this.createHttpProviders();
      }
      updateNamespace(u) {
        this.namespace = Object.assign(this.namespace, u);
      }
      requestAccounts() {
        return this.getAccounts();
      }
      request(u) {
        return this.namespace.methods.includes(u.request.method) ? this.client.request(u) : this.getHttpProvider().request(u.request);
      }
      setDefaultChain(u, i) {
        if (!this.httpProviders[u]) {
          const p2 = i || yn(`${this.name}:${u}`, this.namespace, this.client.core.projectId);
          if (!p2)
            throw new Error(`No RPC url provided for chainId: ${u}`);
          this.setHttpProvider(u, p2);
        }
        this.chainId = u, this.events.emit(ft.DEFAULT_CHAIN_CHANGED, `${this.name}:${this.chainId}`);
      }
      getDefaultChain() {
        if (this.chainId)
          return this.chainId;
        if (this.namespace.defaultChain)
          return this.namespace.defaultChain;
        const u = this.namespace.chains[0];
        if (!u)
          throw new Error("ChainId not found");
        return u.split(":")[1];
      }
      getAccounts() {
        const u = this.namespace.accounts;
        return u ? [...new Set(u.filter((i) => i.split(":")[1] === this.chainId.toString()).map((i) => i.split(":")[2]))] : [];
      }
      createHttpProviders() {
        const u = {};
        return this.namespace.chains.forEach((i) => {
          var p2;
          u[i] = this.createHttpProvider(i, (p2 = this.namespace.rpcMap) == null ? void 0 : p2[i]);
        }), u;
      }
      getHttpProvider() {
        const u = `${this.name}:${this.chainId}`, i = this.httpProviders[u];
        if (typeof i > "u")
          throw new Error(`JSON-RPC provider for ${u} not found`);
        return i;
      }
      setHttpProvider(u, i) {
        const p2 = this.createHttpProvider(u, i);
        p2 && (this.httpProviders[u] = p2);
      }
      createHttpProvider(u, i) {
        const p2 = i || yn(u, this.namespace, this.client.core.projectId);
        return typeof p2 > "u" ? void 0 : new At.JsonRpcProvider(new Gt.default(p2, Z("disableProviderPing")));
      }
    };
    var jg = Object.defineProperty;
    var nv = Object.defineProperties;
    var tv = Object.getOwnPropertyDescriptors;
    var ba = Object.getOwnPropertySymbols;
    var ev = Object.prototype.hasOwnProperty;
    var rv = Object.prototype.propertyIsEnumerable;
    var Ta = (P, u, i) => u in P ? jg(P, u, { enumerable: true, configurable: true, writable: true, value: i }) : P[u] = i;
    var cr = (P, u) => {
      for (var i in u || (u = {}))
        ev.call(u, i) && Ta(P, i, u[i]);
      if (ba)
        for (var i of ba(u))
          rv.call(u, i) && Ta(P, i, u[i]);
      return P;
    };
    var Mi = (P, u) => nv(P, tv(u));
    var hr = class {
      constructor(u) {
        this.events = new Tg.default(), this.rpcProviders = {}, this.shouldAbortPairingAttempt = false, this.maxPairingAttempts = 10, this.disableProviderPing = false, this.providerOpts = u, this.logger = typeof u?.logger < "u" && typeof u?.logger != "string" ? u.logger : Aa.pino(Aa.getDefaultLoggerOptions({ level: u?.logger || Ia })), this.disableProviderPing = u?.disableProviderPing || false;
      }
      static async init(u) {
        const i = new hr(u);
        return await i.initialize(), i;
      }
      async request(u, i) {
        const [p2, I] = this.validateChain(i);
        if (!this.session)
          throw new Error("Please call connect() before request()");
        return await this.getProvider(p2).request({ request: cr({}, u), chainId: `${p2}:${I}`, topic: this.session.topic });
      }
      sendAsync(u, i, p2) {
        this.request(u, p2).then((I) => i(null, I)).catch((I) => i(I, void 0));
      }
      async enable() {
        if (!this.client)
          throw new Error("Sign Client not initialized");
        return this.session || await this.connect({ namespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties }), await this.requestAccounts();
      }
      async disconnect() {
        var u;
        if (!this.session)
          throw new Error("Please call connect() before enable()");
        await this.client.disconnect({ topic: (u = this.session) == null ? void 0 : u.topic, reason: un.getSdkError("USER_DISCONNECTED") }), await this.cleanup();
      }
      async connect(u) {
        if (!this.client)
          throw new Error("Sign Client not initialized");
        if (this.setNamespaces(u), await this.cleanupPendingPairings(), !u.skipPairing)
          return await this.pair(u.pairingTopic);
      }
      on(u, i) {
        this.events.on(u, i);
      }
      once(u, i) {
        this.events.once(u, i);
      }
      removeListener(u, i) {
        this.events.removeListener(u, i);
      }
      off(u, i) {
        this.events.off(u, i);
      }
      get isWalletConnect() {
        return true;
      }
      async pair(u) {
        this.shouldAbortPairingAttempt = false;
        let i = 0;
        do {
          if (this.shouldAbortPairingAttempt)
            throw new Error("Pairing aborted");
          if (i >= this.maxPairingAttempts)
            throw new Error("Max auto pairing attempts reached");
          const { uri: p2, approval: I } = await this.client.connect({ pairingTopic: u, requiredNamespaces: this.namespaces, optionalNamespaces: this.optionalNamespaces, sessionProperties: this.sessionProperties });
          p2 && (this.uri = p2, this.events.emit("display_uri", p2)), await I().then((T) => {
            this.session = T, this.namespaces || (this.namespaces = zg(T.namespaces), this.persist("namespaces", this.namespaces));
          }).catch((T) => {
            if (T.message !== Pa.PROPOSAL_EXPIRY_MESSAGE)
              throw T;
            i++;
          });
        } while (!this.session);
        return this.onConnect(), this.session;
      }
      setDefaultChain(u, i) {
        try {
          if (!this.session)
            return;
          const [p2, I] = this.validateChain(u);
          this.getProvider(p2).setDefaultChain(I, i);
        } catch (p2) {
          if (!/Please call connect/.test(p2.message))
            throw p2;
        }
      }
      async cleanupPendingPairings(u = {}) {
        this.logger.info("Cleaning up inactive pairings...");
        const i = this.client.pairing.getAll();
        if (un.isValidArray(i)) {
          for (const p2 of i)
            u.deletePairings ? this.client.core.expirer.set(p2.topic, 0) : await this.client.core.relayer.subscriber.unsubscribe(p2.topic);
          this.logger.info(`Inactive pairings cleared: ${i.length}`);
        }
      }
      abortPairingAttempt() {
        this.shouldAbortPairingAttempt = true;
      }
      async checkStorage() {
        if (this.namespaces = await this.getFromStore("namespaces"), this.optionalNamespaces = await this.getFromStore("optionalNamespaces") || {}, this.client.session.length) {
          const u = this.client.session.keys.length - 1;
          this.session = this.client.session.get(this.client.session.keys[u]), this.createProviders();
        }
      }
      async initialize() {
        this.logger.trace("Initialized"), await this.createClient(), await this.checkStorage(), this.registerEventListeners();
      }
      async createClient() {
        this.client = this.providerOpts.client || await bg.default.init({ logger: this.providerOpts.logger || Ia, relayUrl: this.providerOpts.relayUrl || Lg, projectId: this.providerOpts.projectId, metadata: this.providerOpts.metadata, storageOptions: this.providerOpts.storageOptions, storage: this.providerOpts.storage, name: this.providerOpts.name }), this.logger.trace("SignClient Initialized");
      }
      createProviders() {
        if (!this.client)
          throw new Error("Sign Client not initialized");
        if (!this.session)
          throw new Error("Session not initialized. Please call connect() before enable()");
        const u = [...new Set(Object.keys(this.session.namespaces).map((i) => un.parseNamespaceKey(i)))];
        Fi("client", this.client), Fi("events", this.events), Fi("disableProviderPing", this.disableProviderPing), u.forEach((i) => {
          if (!this.session)
            return;
          const p2 = Bg(i, this.session), I = Sa(p2), T = Gg(this.namespaces, this.optionalNamespaces), U = Mi(cr({}, T[i]), { accounts: p2, chains: I });
          switch (i) {
            case "eip155":
              this.rpcProviders[i] = new Yg({ namespace: U });
              break;
            case "solana":
              this.rpcProviders[i] = new Zg({ namespace: U });
              break;
            case "cosmos":
              this.rpcProviders[i] = new Xg({ namespace: U });
              break;
            case "polkadot":
              this.rpcProviders[i] = new Jg({ namespace: U });
              break;
            case "cip34":
              this.rpcProviders[i] = new Qg({ namespace: U });
              break;
            case "elrond":
              this.rpcProviders[i] = new Vg({ namespace: U });
              break;
            case "multiversx":
              this.rpcProviders[i] = new kg({ namespace: U });
              break;
          }
        });
      }
      registerEventListeners() {
        if (typeof this.client > "u")
          throw new Error("Sign Client is not initialized");
        this.client.on("session_ping", (u) => {
          this.events.emit("session_ping", u);
        }), this.client.on("session_event", (u) => {
          const { params: i } = u, { event: p2 } = i;
          if (p2.name === "accountsChanged") {
            const I = p2.data;
            I && un.isValidArray(I) && this.events.emit("accountsChanged", I.map(Kg));
          } else if (p2.name === "chainChanged") {
            const I = i.chainId, T = i.event.data, U = un.parseNamespaceKey(I), Sn = Wi(I) !== Wi(T) ? `${U}:${Wi(T)}` : I;
            this.onChainChanged(Sn);
          } else
            this.events.emit(p2.name, p2.data);
          this.events.emit("session_event", u);
        }), this.client.on("session_update", ({ topic: u, params: i }) => {
          var p2;
          const { namespaces: I } = i, T = (p2 = this.client) == null ? void 0 : p2.session.get(u);
          this.session = Mi(cr({}, T), { namespaces: I }), this.onSessionUpdate(), this.events.emit("session_update", { topic: u, params: i });
        }), this.client.on("session_delete", async (u) => {
          await this.cleanup(), this.events.emit("session_delete", u), this.events.emit("disconnect", Mi(cr({}, un.getSdkError("USER_DISCONNECTED")), { data: u.topic }));
        }), this.on(ft.DEFAULT_CHAIN_CHANGED, (u) => {
          this.onChainChanged(u, true);
        });
      }
      getProvider(u) {
        if (!this.rpcProviders[u])
          throw new Error(`Provider not found: ${u}`);
        return this.rpcProviders[u];
      }
      onSessionUpdate() {
        Object.keys(this.rpcProviders).forEach((u) => {
          var i;
          this.getProvider(u).updateNamespace((i = this.session) == null ? void 0 : i.namespaces[u]);
        });
      }
      setNamespaces(u) {
        const { namespaces: i, optionalNamespaces: p2, sessionProperties: I } = u;
        i && Object.keys(i).length && (this.namespaces = i), p2 && Object.keys(p2).length && (this.optionalNamespaces = p2), this.sessionProperties = I, this.persist("namespaces", i), this.persist("optionalNamespaces", p2);
      }
      validateChain(u) {
        const [i, p2] = u?.split(":") || ["", ""];
        if (!this.namespaces || !Object.keys(this.namespaces).length)
          return [i, p2];
        if (i && !Object.keys(this.namespaces || {}).map((U) => un.parseNamespaceKey(U)).includes(i))
          throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);
        if (i && p2)
          return [i, p2];
        const I = un.parseNamespaceKey(Object.keys(this.namespaces)[0]), T = this.rpcProviders[I].getDefaultChain();
        return [I, T];
      }
      async requestAccounts() {
        const [u] = this.validateChain();
        return await this.getProvider(u).requestAccounts();
      }
      onChainChanged(u, i = false) {
        var p2;
        if (!this.namespaces)
          return;
        const [I, T] = this.validateChain(u);
        i || this.getProvider(I).setDefaultChain(T), ((p2 = this.namespaces[I]) != null ? p2 : this.namespaces[`${I}:${T}`]).defaultChain = T, this.persist("namespaces", this.namespaces), this.events.emit("chainChanged", T);
      }
      onConnect() {
        this.createProviders(), this.events.emit("connect", { session: this.session });
      }
      async cleanup() {
        this.session = void 0, this.namespaces = void 0, this.optionalNamespaces = void 0, this.sessionProperties = void 0, this.persist("namespaces", void 0), this.persist("optionalNamespaces", void 0), this.persist("sessionProperties", void 0), await this.cleanupPendingPairings({ deletePairings: true });
      }
      persist(u, i) {
        this.client.core.storage.setItem(`${xa}/${u}`, i);
      }
      async getFromStore(u) {
        return await this.client.core.storage.getItem(`${xa}/${u}`);
      }
    };
    var iv = hr;
    exports.UniversalProvider = iv, exports.default = hr;
  }
});

// node_modules/@walletconnect/modal/dist/index.js
var dist_exports = {};
__export(dist_exports, {
  WalletConnectModal: () => d
});
var d;
var init_dist2 = __esm({
  "node_modules/@walletconnect/modal/dist/index.js"() {
    init_dist();
    d = class {
      constructor(e) {
        this.openModal = se.open, this.closeModal = se.close, this.subscribeModal = se.subscribe, this.setTheme = ne.setThemeConfig, ne.setThemeConfig(e), y.setConfig(e), this.initUi();
      }
      async initUi() {
        if (typeof window < "u") {
          await import("./dist-PW5YDSP2.js");
          const e = document.createElement("wcm-modal");
          document.body.insertAdjacentElement("beforeend", e), p.setIsUiLoaded(true);
        }
      }
    };
  }
});

// node_modules/@walletconnect/ethereum-provider/dist/index.cjs.js
var require_index_cjs6 = __commonJS({
  "node_modules/@walletconnect/ethereum-provider/dist/index.cjs.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var M = require_events();
    var p2 = require_index_cjs();
    var P = require_index_cjs5();
    function A(n) {
      if (n && n.__esModule)
        return n;
      var t = /* @__PURE__ */ Object.create(null);
      return n && Object.keys(n).forEach(function(e) {
        if (e !== "default") {
          var s = Object.getOwnPropertyDescriptor(n, e);
          Object.defineProperty(t, e, s.get ? s : { enumerable: true, get: function() {
            return n[e];
          } });
        }
      }), t.default = n, Object.freeze(t);
    }
    var T = "wc";
    var R = "ethereum_provider";
    var S = `${T}@2:${R}:`;
    var j = "https://rpc.walletconnect.com/v1/";
    var g = ["eth_sendTransaction", "personal_sign"];
    var w = ["eth_accounts", "eth_requestAccounts", "eth_sendRawTransaction", "eth_sign", "eth_signTransaction", "eth_signTypedData", "eth_signTypedData_v3", "eth_signTypedData_v4", "wallet_switchEthereumChain", "wallet_addEthereumChain", "wallet_getPermissions", "wallet_requestPermissions", "wallet_registerOnboarding", "wallet_watchAsset", "wallet_scanQRCode"];
    var m = ["chainChanged", "accountsChanged"];
    var _ = ["message", "disconnect", "connect"];
    var N = Object.defineProperty;
    var q = Object.defineProperties;
    var D = Object.getOwnPropertyDescriptors;
    var O = Object.getOwnPropertySymbols;
    var $ = Object.prototype.hasOwnProperty;
    var U = Object.prototype.propertyIsEnumerable;
    var y2 = (n, t, e) => t in n ? N(n, t, { enumerable: true, configurable: true, writable: true, value: e }) : n[t] = e;
    var u = (n, t) => {
      for (var e in t || (t = {}))
        $.call(t, e) && y2(n, e, t[e]);
      if (O)
        for (var e of O(t))
          U.call(t, e) && y2(n, e, t[e]);
      return n;
    };
    var b = (n, t) => q(n, D(t));
    function v(n) {
      return Number(n[0].split(":")[1]);
    }
    function f(n) {
      return `0x${n.toString(16)}`;
    }
    function Q(n) {
      const { chains: t, optionalChains: e, methods: s, optionalMethods: i, events: a, optionalEvents: c, rpcMap: h } = n;
      if (!p2.isValidArray(t))
        throw new Error("Invalid chains");
      const o = { chains: t, methods: s || g, events: a || m, rpcMap: u({}, t.length ? { [v(t)]: h[v(t)] } : {}) }, r = a?.filter((l) => !m.includes(l)), d2 = s?.filter((l) => !g.includes(l));
      if (!e && !c && !i && !(r != null && r.length) && !(d2 != null && d2.length))
        return { required: t.length ? o : void 0 };
      const C = r?.length && d2?.length || !e, E = { chains: [...new Set(C ? o.chains.concat(e || []) : e)], methods: [...new Set(o.methods.concat(i != null && i.length ? i : w))], events: [...new Set(o.events.concat(c || _))], rpcMap: h };
      return { required: t.length ? o : void 0, optional: e.length ? E : void 0 };
    }
    var I = class {
      constructor() {
        this.events = new M.EventEmitter(), this.namespace = "eip155", this.accounts = [], this.chainId = 1, this.STORAGE_KEY = S, this.on = (t, e) => (this.events.on(t, e), this), this.once = (t, e) => (this.events.once(t, e), this), this.removeListener = (t, e) => (this.events.removeListener(t, e), this), this.off = (t, e) => (this.events.off(t, e), this), this.parseAccount = (t) => this.isCompatibleChainId(t) ? this.parseAccountId(t).address : t, this.signer = {}, this.rpc = {};
      }
      static async init(t) {
        const e = new I();
        return await e.initialize(t), e;
      }
      async request(t) {
        return await this.signer.request(t, this.formatChainId(this.chainId));
      }
      sendAsync(t, e) {
        this.signer.sendAsync(t, e, this.formatChainId(this.chainId));
      }
      get connected() {
        return this.signer.client ? this.signer.client.core.relayer.connected : false;
      }
      get connecting() {
        return this.signer.client ? this.signer.client.core.relayer.connecting : false;
      }
      async enable() {
        return this.session || await this.connect(), await this.request({ method: "eth_requestAccounts" });
      }
      async connect(t) {
        if (!this.signer.client)
          throw new Error("Provider not initialized. Call init() first");
        this.loadConnectOpts(t);
        const { required: e, optional: s } = Q(this.rpc);
        try {
          const i = await new Promise(async (c, h) => {
            var o;
            this.rpc.showQrModal && ((o = this.modal) == null || o.subscribeModal((r) => {
              !r.open && !this.signer.session && (this.signer.abortPairingAttempt(), h(new Error("Connection request reset. Please try again.")));
            })), await this.signer.connect(b(u({ namespaces: u({}, e && { [this.namespace]: e }) }, s && { optionalNamespaces: { [this.namespace]: s } }), { pairingTopic: t?.pairingTopic })).then((r) => {
              c(r);
            }).catch((r) => {
              h(new Error(r.message));
            });
          });
          if (!i)
            return;
          const a = p2.getAccountsFromNamespaces(i.namespaces, [this.namespace]);
          this.setChainIds(this.rpc.chains.length ? this.rpc.chains : a), this.setAccounts(a), this.events.emit("connect", { chainId: f(this.chainId) });
        } catch (i) {
          throw this.signer.logger.error(i), i;
        } finally {
          this.modal && this.modal.closeModal();
        }
      }
      async disconnect() {
        this.session && await this.signer.disconnect(), this.reset();
      }
      get isWalletConnect() {
        return true;
      }
      get session() {
        return this.signer.session;
      }
      registerEventListeners() {
        this.signer.on("session_event", (t) => {
          const { params: e } = t, { event: s } = e;
          s.name === "accountsChanged" ? (this.accounts = this.parseAccounts(s.data), this.events.emit("accountsChanged", this.accounts)) : s.name === "chainChanged" ? this.setChainId(this.formatChainId(s.data)) : this.events.emit(s.name, s.data), this.events.emit("session_event", t);
        }), this.signer.on("chainChanged", (t) => {
          const e = parseInt(t);
          this.chainId = e, this.events.emit("chainChanged", f(this.chainId)), this.persist();
        }), this.signer.on("session_update", (t) => {
          this.events.emit("session_update", t);
        }), this.signer.on("session_delete", (t) => {
          this.reset(), this.events.emit("session_delete", t), this.events.emit("disconnect", b(u({}, p2.getSdkError("USER_DISCONNECTED")), { data: t.topic, name: "USER_DISCONNECTED" }));
        }), this.signer.on("display_uri", (t) => {
          var e, s;
          this.rpc.showQrModal && ((e = this.modal) == null || e.closeModal(), (s = this.modal) == null || s.openModal({ uri: t })), this.events.emit("display_uri", t);
        });
      }
      switchEthereumChain(t) {
        this.request({ method: "wallet_switchEthereumChain", params: [{ chainId: t.toString(16) }] });
      }
      isCompatibleChainId(t) {
        return typeof t == "string" ? t.startsWith(`${this.namespace}:`) : false;
      }
      formatChainId(t) {
        return `${this.namespace}:${t}`;
      }
      parseChainId(t) {
        return Number(t.split(":")[1]);
      }
      setChainIds(t) {
        const e = t.filter((s) => this.isCompatibleChainId(s)).map((s) => this.parseChainId(s));
        e.length && (this.chainId = e[0], this.events.emit("chainChanged", f(this.chainId)), this.persist());
      }
      setChainId(t) {
        if (this.isCompatibleChainId(t)) {
          const e = this.parseChainId(t);
          this.chainId = e, this.switchEthereumChain(e);
        }
      }
      parseAccountId(t) {
        const [e, s, i] = t.split(":");
        return { chainId: `${e}:${s}`, address: i };
      }
      setAccounts(t) {
        this.accounts = t.filter((e) => this.parseChainId(this.parseAccountId(e).chainId) === this.chainId).map((e) => this.parseAccountId(e).address), this.events.emit("accountsChanged", this.accounts);
      }
      getRpcConfig(t) {
        var e, s;
        const i = (e = t?.chains) != null ? e : [], a = (s = t?.optionalChains) != null ? s : [], c = i.concat(a);
        if (!c.length)
          throw new Error("No chains specified in either `chains` or `optionalChains`");
        const h = i.length ? t?.methods || g : [], o = i.length ? t?.events || m : [], r = t?.optionalMethods || [], d2 = t?.optionalEvents || [], C = t?.rpcMap || this.buildRpcMap(c, t.projectId), E = t?.qrModalOptions || void 0;
        return { chains: i?.map((l) => this.formatChainId(l)), optionalChains: a.map((l) => this.formatChainId(l)), methods: h, events: o, optionalMethods: r, optionalEvents: d2, rpcMap: C, showQrModal: !!(t != null && t.showQrModal), qrModalOptions: E, projectId: t.projectId, metadata: t.metadata };
      }
      buildRpcMap(t, e) {
        const s = {};
        return t.forEach((i) => {
          s[i] = this.getRpcUrl(i, e);
        }), s;
      }
      async initialize(t) {
        if (this.rpc = this.getRpcConfig(t), this.chainId = this.rpc.chains.length ? v(this.rpc.chains) : v(this.rpc.optionalChains), this.signer = await P.UniversalProvider.init({ projectId: this.rpc.projectId, metadata: this.rpc.metadata, disableProviderPing: t.disableProviderPing, relayUrl: t.relayUrl, storageOptions: t.storageOptions }), this.registerEventListeners(), await this.loadPersistedSession(), this.rpc.showQrModal) {
          let e;
          try {
            const { WalletConnectModal: s } = await Promise.resolve().then(function() {
              return A((init_dist2(), __toCommonJS(dist_exports)));
            });
            e = s;
          } catch {
            throw new Error("To use QR modal, please install @walletconnect/modal package");
          }
          if (e)
            try {
              this.modal = new e(u({ walletConnectVersion: 2, projectId: this.rpc.projectId, standaloneChains: this.rpc.chains }, this.rpc.qrModalOptions));
            } catch (s) {
              throw this.signer.logger.error(s), new Error("Could not generate WalletConnectModal Instance");
            }
        }
      }
      loadConnectOpts(t) {
        if (!t)
          return;
        const { chains: e, optionalChains: s, rpcMap: i } = t;
        e && p2.isValidArray(e) && (this.rpc.chains = e.map((a) => this.formatChainId(a)), e.forEach((a) => {
          this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        })), s && p2.isValidArray(s) && (this.rpc.optionalChains = [], this.rpc.optionalChains = s?.map((a) => this.formatChainId(a)), s.forEach((a) => {
          this.rpc.rpcMap[a] = i?.[a] || this.getRpcUrl(a);
        }));
      }
      getRpcUrl(t, e) {
        var s;
        return ((s = this.rpc.rpcMap) == null ? void 0 : s[t]) || `${j}?chainId=eip155:${t}&projectId=${e || this.rpc.projectId}`;
      }
      async loadPersistedSession() {
        if (!this.session)
          return;
        const t = await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`), e = this.session.namespaces[`${this.namespace}:${t}`] ? this.session.namespaces[`${this.namespace}:${t}`] : this.session.namespaces[this.namespace];
        this.setChainIds(t ? [this.formatChainId(t)] : e?.accounts), this.setAccounts(e?.accounts);
      }
      reset() {
        this.chainId = 1, this.accounts = [];
      }
      persist() {
        this.session && this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`, this.chainId);
      }
      parseAccounts(t) {
        return typeof t == "string" || t instanceof String ? [this.parseAccount(t)] : t.map((e) => this.parseAccount(e));
      }
    };
    var L = I;
    exports.EthereumProvider = L, exports.OPTIONAL_EVENTS = _, exports.OPTIONAL_METHODS = w, exports.REQUIRED_EVENTS = m, exports.REQUIRED_METHODS = g, exports.default = I;
  }
});
export default require_index_cjs6();
/**
* @license
* Lodash <https://lodash.com/>
* Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
* Released under MIT license <https://lodash.com/license>
* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
*/
