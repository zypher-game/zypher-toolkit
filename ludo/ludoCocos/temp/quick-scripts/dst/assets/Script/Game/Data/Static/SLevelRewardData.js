
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SLevelRewardData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TTGV2ZWxSZXdhcmREYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBRWpELElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBRWxDO0lBQXNDLG9DQUFPO0lBQTdDOztJQVFBLENBQUM7SUFQVSxnQ0FBSyxHQUFaLFVBQWEsR0FBUTtRQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDdEMsSUFBSSxHQUFHLEdBQUcsa0JBQU8sQ0FBQyxRQUFRLENBQXNCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM3RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQy9CO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQVBRLGdCQUFnQjtRQUQ1QixPQUFPO09BQ0ssZ0JBQWdCLENBUTVCO0lBQUQsdUJBQUM7Q0FSRCxBQVFDLENBUnFDLGtCQUFPLEdBUTVDO0FBUlksNENBQWdCIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNMZXZlbFJld2FyZERhdGEgZXh0ZW5kcyBHU3RhdGljIHtcclxuICAgIHB1YmxpYyBwYXJzZShvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJhdyA9IEdTdGF0aWMuYWRkb25SYXc8U0xldmVsUmV3YXJkRGF0YVJhdz4ob2JqLmRhdGFbaV0pO1xyXG4gICAgICAgICAgICB0aGlzLl9kYXRhLnNldChyYXcuaWQsIHJhdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59Il19