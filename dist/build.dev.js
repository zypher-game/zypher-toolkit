"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _esbuildPlugin = require("@vanilla-extract/esbuild-plugin");

var _autoprefixer = _interopRequireDefault(require("autoprefixer"));

var esbuild = _interopRequireWildcard(require("esbuild"));

var _esbuildPluginReplace = require("esbuild-plugin-replace");

var _postcss = _interopRequireDefault(require("postcss"));

var _postcssPrefixSelector = _interopRequireDefault(require("postcss-prefix-selector"));

var _recursiveReaddirFiles = _interopRequireDefault(require("recursive-readdir-files"));

var _esbuildStylusLoader = require("esbuild-stylus-loader");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isWatching = process.argv.includes("--watch");
var isCssMinified = process.env.MINIFY_CSS === "true";

var getAllEntryPoints = function getAllEntryPoints(rootPath) {
  return regeneratorRuntime.async(function getAllEntryPoints$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap((0, _recursiveReaddirFiles["default"])(rootPath));

        case 2:
          _context.t0 = function (_ref) {
            var path = _ref.path;
            return path;
          };

          _context.t1 = function (path) {
            return /\.tsx?$/.test(path) && !path.endsWith(".css.ts") && !path.includes(".test.");
          };

          return _context.abrupt("return", _context.sent.map(_context.t0).filter(_context.t1));

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
};

var baseBuildConfig = {
  banner: {
    js: '"use client";' // Required for Next 13 App Router

  },
  bundle: true,
  format: "esm",
  loader: {
    ".png": "dataurl",
    ".svg": "dataurl"
  },
  platform: "browser",
  plugins: [(0, _esbuildStylusLoader.stylusLoader)(), {
    name: "make-all-packages-external",
    setup: function setup(build) {
      var filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"

      build.onResolve({
        filter: filter
      }, function (args) {
        return {
          external: true,
          path: args.path
        };
      });
    }
  }],
  splitting: true // Required for tree shaking

};
var mainBuild = esbuild.build(_objectSpread({}, baseBuildConfig, {
  entryPoints: ["./src/index.ts"],
  outdir: "dist",
  watch: isWatching ? {
    onRebuild: function onRebuild(error, result) {
      if (error) console.error("main build failed:", error);else console.log("main build succeeded:", result);
    }
  } : undefined
}));
Promise.all([mainBuild]).then(function () {
  if (isWatching) {
    console.log("watching...");
  }
})["catch"](function () {
  return process.exit(1);
});