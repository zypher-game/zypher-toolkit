"use strict";
cc._RF.push(module, 'f8ab0DbAi1HM6Q3F4ABXoIG', 'GCustomData');
// Script/Core/GView/GCustomData.ts

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
var GCustomData = /** @class */ (function (_super) {
    __extends(GCustomData, _super);
    function GCustomData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._customData = null;
        return _this;
    }
    GCustomData.prototype.onLoad = function () { };
    GCustomData.prototype.setData = function (data) {
        this._customData = data;
    };
    GCustomData.prototype.getData = function () {
        return this._customData;
    };
    return GCustomData;
}(cc.Component));
exports.default = GCustomData;

cc._RF.pop();