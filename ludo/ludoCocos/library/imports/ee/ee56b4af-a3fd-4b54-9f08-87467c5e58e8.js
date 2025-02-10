"use strict";
cc._RF.push(module, 'ee56bSvo/1LVJ8Ih0Z8Xljo', 'SLevelRewardData');
// Script/Game/Data/Static/SLevelRewardData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SLevelRewardData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SLevelRewardData = /** @class */ (function (_super) {
    __extends(SLevelRewardData, _super);
    function SLevelRewardData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SLevelRewardData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SLevelRewardData = __decorate([
        ccclass
    ], SLevelRewardData);
    return SLevelRewardData;
}(DataPool_1.GStatic));
exports.SLevelRewardData = SLevelRewardData;

cc._RF.pop();