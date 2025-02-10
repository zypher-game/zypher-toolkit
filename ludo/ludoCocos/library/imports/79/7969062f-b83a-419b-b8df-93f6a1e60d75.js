"use strict";
cc._RF.push(module, '79690YvuDpBm7jfk/ah5g11', 'SGuideChainData');
// Script/Game/Data/Static/SGuideChainData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SGuideChainData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SGuideChainData = /** @class */ (function (_super) {
    __extends(SGuideChainData, _super);
    function SGuideChainData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SGuideChainData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.guideId, raw);
        }
        return true;
    };
    SGuideChainData = __decorate([
        ccclass
    ], SGuideChainData);
    return SGuideChainData;
}(DataPool_1.GStatic));
exports.SGuideChainData = SGuideChainData;

cc._RF.pop();