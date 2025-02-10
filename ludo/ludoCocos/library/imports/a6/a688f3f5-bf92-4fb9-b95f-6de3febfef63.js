"use strict";
cc._RF.push(module, 'a688fP1v5JPublfbeP+v+9j', 'SRankData');
// Script/Game/Data/Static/SRankData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SRankData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SRankData = /** @class */ (function (_super) {
    __extends(SRankData, _super);
    function SRankData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SRankData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SRankData = __decorate([
        ccclass
    ], SRankData);
    return SRankData;
}(DataPool_1.GStatic));
exports.SRankData = SRankData;

cc._RF.pop();