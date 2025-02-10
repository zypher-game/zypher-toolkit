"use strict";
cc._RF.push(module, 'd62f0RvbD9Kvqnc7aR06SLv', 'SRankRewardData');
// Script/Game/Data/Static/SRankRewardData.ts

Object.defineProperty(exports, "__esModule", { value: true });
exports.SRankRewardData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SRankRewardData = /** @class */ (function (_super) {
    __extends(SRankRewardData, _super);
    function SRankRewardData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SRankRewardData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    /**获取总排位赛数量 */
    SRankRewardData.prototype.getRankLevel = function () {
        var level = 0;
        this.data.forEach(function (v) {
            if (level != Number(v.type)) {
                level++;
            }
        });
        return level;
    };
    /**获取某个排位赛数据 */
    SRankRewardData.prototype.getRankLevelData = function (v) {
        var level = v;
        var rankRewardData = [];
        this.data.forEach(function (v) {
            if (level == Number(v.type)) {
                rankRewardData.push(v);
            }
        });
        return rankRewardData;
    };
    /**获取每个赛段的关卡数 */
    SRankRewardData.prototype.getRankLevelNum = function (i) {
        var levelNum = 0;
        this.data.forEach(function (v) {
            if (i == Number(v.type)) {
                levelNum = v.name;
            }
        });
        return levelNum;
    };
    SRankRewardData = __decorate([
        ccclass
    ], SRankRewardData);
    return SRankRewardData;
}(DataPool_1.GStatic));
exports.SRankRewardData = SRankRewardData;

cc._RF.pop();