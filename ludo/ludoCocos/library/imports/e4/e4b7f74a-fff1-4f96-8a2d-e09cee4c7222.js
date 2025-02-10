"use strict";
cc._RF.push(module, 'e4b7fdK//FPloot4JzuTHIi', 'ColorLog');
// Script/Core/FrameEx/ColorLog.ts

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ColorLog = /** @class */ (function () {
    function ColorLog() {
    }
    ColorLog.esOn = function () {
        var entry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entry[_i] = arguments[_i];
        }
        var formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
        console.log("%c" + formattedEntry, this.styles.on);
    };
    ColorLog.log = function () {
        var entry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entry[_i] = arguments[_i];
        }
        var formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
        console.log("%c" + formattedEntry, this.styles.default);
    };
    ColorLog.info = function () {
        var entry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entry[_i] = arguments[_i];
        }
        var formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
        console.log("%c" + formattedEntry, this.styles.info);
    };
    ColorLog.warn = function () {
        var entry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entry[_i] = arguments[_i];
        }
        var formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
        console.log("%c" + formattedEntry, this.styles.warning);
    };
    ColorLog.error = function () {
        var entry = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            entry[_i] = arguments[_i];
        }
        var formattedEntry = JSON.stringify(entry).replace(/^\[|\]$/g, "");
        console.log("%c" + formattedEntry, this.styles.error);
    };
    ColorLog.styles = {
        on: "color: rgb(75, 0, 130); font-weight: bold; font-size: 12px;",
        default: "color: purple; font-weight: bold; font-size: 20px;",
        info: "color: navy; font-weight: bold; font-size: 14px;",
        warning: "color: orange; font-weight: bold;",
        error: "color: red; font-weight: bold;",
        success: "color: green; font-weight: bold;",
    };
    return ColorLog;
}());
exports.default = ColorLog;

cc._RF.pop();