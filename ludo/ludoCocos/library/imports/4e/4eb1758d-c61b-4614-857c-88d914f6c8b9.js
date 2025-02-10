"use strict";
cc._RF.push(module, '4eb17WNxhtGFIV8iNkU9si5', 'GParam');
// Script/Core/GEvent/GParam.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ES5Ex_1 = require("../FrameEx/ES5Ex");
var GParam = /** @class */ (function (_super) {
    __extends(GParam, _super);
    function GParam(msg) {
        var _this = _super.call(this) || this;
        _this.arguments = new ES5Ex_1.MapWrap();
        _this._onlyArgument = msg;
        return _this;
    }
    GParam.prototype.push = function (key, val) {
        if (!key)
            return;
        this.arguments.set(key, val);
    };
    /**
     * 获取参数
     * @param key 参数Key
     */
    GParam.prototype.get = function (key) {
        if (!key)
            return this._onlyArgument;
        return this.arguments.get(key);
    };
    /**
     * 清理
     */
    GParam.prototype.clear = function () {
        this.arguments.clear();
    };
    /**
     * 将参数转成Array
     */
    GParam.prototype.toList = function () {
        if (this.arguments.size == 0)
            return null;
        return this.arguments.values();
    };
    /**
     * ToString实现
     */
    GParam.prototype.toString = function () {
        var keys = this.arguments.keys();
        var str = "";
        for (var index = 0; index < keys.length; index++) {
            str += keys[index] + "=" + this.get(keys[index]) + "/t";
        }
        return str;
    };
    return GParam;
}(ES5Ex_1.ObjectWrap));
exports.default = GParam;

cc._RF.pop();