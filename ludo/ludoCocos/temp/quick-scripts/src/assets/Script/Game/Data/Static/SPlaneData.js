"use strict";
cc._RF.push(module, '34975M0EYZNpKcrKl+lYORD', 'SPlaneData');
// Script/Game/Data/Static/SPlaneData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SPlaneData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SPlaneData = /** @class */ (function (_super) {
    __extends(SPlaneData, _super);
    function SPlaneData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SPlaneData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SPlaneData = __decorate([
        ccclass
    ], SPlaneData);
    return SPlaneData;
}(DataPool_1.GStatic));
exports.SPlaneData = SPlaneData;

cc._RF.pop();