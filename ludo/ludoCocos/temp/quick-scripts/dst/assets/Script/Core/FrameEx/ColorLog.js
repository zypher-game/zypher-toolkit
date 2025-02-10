
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Core/FrameEx/ColorLog.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_project__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvQ29yZS9GcmFtZUV4L0NvbG9yTG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBUUE7SUFBQTtJQTZCQSxDQUFDO0lBcEJRLGFBQUksR0FBWDtRQUFZLGVBQWE7YUFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1lBQWIsMEJBQWE7O1FBQ3ZCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssY0FBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELENBQUM7SUFDTSxZQUFHLEdBQVY7UUFBVyxlQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLDBCQUFhOztRQUN0QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLGNBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ00sYUFBSSxHQUFYO1FBQVksZUFBYTthQUFiLFVBQWEsRUFBYixxQkFBYSxFQUFiLElBQWE7WUFBYiwwQkFBYTs7UUFDdkIsSUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBSyxjQUFnQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUNNLGFBQUksR0FBWDtRQUFZLGVBQWE7YUFBYixVQUFhLEVBQWIscUJBQWEsRUFBYixJQUFhO1lBQWIsMEJBQWE7O1FBQ3ZCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQUssY0FBZ0IsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFDTSxjQUFLLEdBQVo7UUFBYSxlQUFhO2FBQWIsVUFBYSxFQUFiLHFCQUFhLEVBQWIsSUFBYTtZQUFiLDBCQUFhOztRQUN4QixJQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDckUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFLLGNBQWdCLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBM0JjLGVBQU0sR0FBOEI7UUFDakQsRUFBRSxFQUFFLDZEQUE2RDtRQUNqRSxPQUFPLEVBQUUsb0RBQW9EO1FBQzdELElBQUksRUFBRSxrREFBa0Q7UUFDeEQsT0FBTyxFQUFFLG1DQUFtQztRQUM1QyxLQUFLLEVBQUUsZ0NBQWdDO1FBQ3ZDLE9BQU8sRUFBRSxrQ0FBa0M7S0FDNUMsQ0FBQztJQXFCSixlQUFDO0NBN0JELEFBNkJDLElBQUE7a0JBN0JvQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiLy8gLy8g5L2/55So56S65L6LXG4vLyBDb2xvckxvZy5sb2coeyBzdGFydEd1aWRlOiBcInN0YXJ0R3VpZGVcIiB9KTtcbi8vIENvbG9yTG9nLmluZm8oXCJUaGlzIGlzIGFuIGluZm8gbWVzc2FnZS5cIik7XG4vLyBDb2xvckxvZy5lcnJvcihcIlRoaXMgaXMgYW4gZXJyb3IgbWVzc2FnZS5cIik7XG4vLyBDb2xvckxvZy5zdWNjZXNzKFwiVGhpcyBpcyBhIHN1Y2Nlc3MgbWVzc2FnZS5cIik7XG4vLyBDb2xvckxvZy50aXRsZWRMb2coXCJUaXRsZVwiLCB7IGtleTogXCJ2YWx1ZVwiIH0pO1xudHlwZSBMb2dMZXZlbCA9IDEgfCAyIHwgMyB8IDQ7IC8vIOWBh+iuvuaXpeW/l+e6p+WIq+S4ujEtNFxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBDb2xvckxvZyB7XG4gIHByaXZhdGUgc3RhdGljIHN0eWxlczogeyBba2V5OiBzdHJpbmddOiBzdHJpbmcgfSA9IHtcbiAgICBvbjogXCJjb2xvcjogcmdiKDc1LCAwLCAxMzApOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxMnB4O1wiLFxuICAgIGRlZmF1bHQ6IFwiY29sb3I6IHB1cnBsZTsgZm9udC13ZWlnaHQ6IGJvbGQ7IGZvbnQtc2l6ZTogMjBweDtcIixcbiAgICBpbmZvOiBcImNvbG9yOiBuYXZ5OyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxNHB4O1wiLFxuICAgIHdhcm5pbmc6IFwiY29sb3I6IG9yYW5nZTsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXG4gICAgZXJyb3I6IFwiY29sb3I6IHJlZDsgZm9udC13ZWlnaHQ6IGJvbGQ7XCIsXG4gICAgc3VjY2VzczogXCJjb2xvcjogZ3JlZW47IGZvbnQtd2VpZ2h0OiBib2xkO1wiLFxuICB9O1xuICBzdGF0aWMgZXNPbiguLi5lbnRyeTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZm9ybWF0dGVkRW50cnkgPSBKU09OLnN0cmluZ2lmeShlbnRyeSkucmVwbGFjZSgvXlxcW3xcXF0kL2csIFwiXCIpO1xuICAgIGNvbnNvbGUubG9nKGAlYyR7Zm9ybWF0dGVkRW50cnl9YCwgdGhpcy5zdHlsZXMub24pO1xuICB9XG4gIHN0YXRpYyBsb2coLi4uZW50cnk6IGFueSk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1hdHRlZEVudHJ5ID0gSlNPTi5zdHJpbmdpZnkoZW50cnkpLnJlcGxhY2UoL15cXFt8XFxdJC9nLCBcIlwiKTtcbiAgICBjb25zb2xlLmxvZyhgJWMke2Zvcm1hdHRlZEVudHJ5fWAsIHRoaXMuc3R5bGVzLmRlZmF1bHQpO1xuICB9XG4gIHN0YXRpYyBpbmZvKC4uLmVudHJ5OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRFbnRyeSA9IEpTT04uc3RyaW5naWZ5KGVudHJ5KS5yZXBsYWNlKC9eXFxbfFxcXSQvZywgXCJcIik7XG4gICAgY29uc29sZS5sb2coYCVjJHtmb3JtYXR0ZWRFbnRyeX1gLCB0aGlzLnN0eWxlcy5pbmZvKTtcbiAgfVxuICBzdGF0aWMgd2FybiguLi5lbnRyeTogYW55KTogdm9pZCB7XG4gICAgY29uc3QgZm9ybWF0dGVkRW50cnkgPSBKU09OLnN0cmluZ2lmeShlbnRyeSkucmVwbGFjZSgvXlxcW3xcXF0kL2csIFwiXCIpO1xuICAgIGNvbnNvbGUubG9nKGAlYyR7Zm9ybWF0dGVkRW50cnl9YCwgdGhpcy5zdHlsZXMud2FybmluZyk7XG4gIH1cbiAgc3RhdGljIGVycm9yKC4uLmVudHJ5OiBhbnkpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtYXR0ZWRFbnRyeSA9IEpTT04uc3RyaW5naWZ5KGVudHJ5KS5yZXBsYWNlKC9eXFxbfFxcXSQvZywgXCJcIik7XG4gICAgY29uc29sZS5sb2coYCVjJHtmb3JtYXR0ZWRFbnRyeX1gLCB0aGlzLnN0eWxlcy5lcnJvcik7XG4gIH1cbn1cbiJdfQ==