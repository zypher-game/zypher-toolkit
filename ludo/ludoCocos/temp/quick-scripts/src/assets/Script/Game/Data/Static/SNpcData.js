"use strict";
cc._RF.push(module, 'da4540wnjFAOa59ZHTy6qHF', 'SNpcData');
// Script/Game/Data/Static/SNpcData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SNpcData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SNpcData = /** @class */ (function (_super) {
    __extends(SNpcData, _super);
    function SNpcData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SNpcData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    SNpcData = __decorate([
        ccclass
    ], SNpcData);
    return SNpcData;
}(DataPool_1.GStatic));
exports.SNpcData = SNpcData;

cc._RF.pop();