
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SRankRewardData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TUmFua1Jld2FyZERhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFFakQsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBcUMsbUNBQU87SUFBNUM7O0lBMENBLENBQUM7SUF6Q1UsK0JBQUssR0FBWixVQUFhLEdBQVE7UUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3RDLElBQUksR0FBRyxHQUFHLGtCQUFPLENBQUMsUUFBUSxDQUFxQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMvQjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2hCLENBQUM7SUFFRCxjQUFjO0lBQ1Asc0NBQVksR0FBbkI7UUFDSSxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDZCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXFCO1lBQ3BDLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLEtBQUssRUFBRSxDQUFDO2FBQ1g7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFFRCxlQUFlO0lBQ1IsMENBQWdCLEdBQXZCLFVBQXdCLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsSUFBSSxjQUFjLEdBQXlCLEVBQUUsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXFCO1lBQ3BDLElBQUksS0FBSyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDMUI7UUFDTCxDQUFDLENBQUMsQ0FBQTtRQUNGLE9BQU8sY0FBYyxDQUFDO0lBQzFCLENBQUM7SUFFRCxnQkFBZ0I7SUFDVCx5Q0FBZSxHQUF0QixVQUF1QixDQUFTO1FBQzVCLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxVQUFDLENBQXFCO1lBQ3BDLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3JCLFFBQVEsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDO2FBQ3JCO1FBQ0wsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLFFBQVEsQ0FBQTtJQUNuQixDQUFDO0lBekNRLGVBQWU7UUFEM0IsT0FBTztPQUNLLGVBQWUsQ0EwQzNCO0lBQUQsc0JBQUM7Q0ExQ0QsQUEwQ0MsQ0ExQ29DLGtCQUFPLEdBMEMzQztBQTFDWSwwQ0FBZSIsImZpbGUiOiIiLCJzb3VyY2VSb290IjoiLyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEdTdGF0aWMgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYW5hZ2VyL0RhdGFQb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBTUmFua1Jld2FyZERhdGEgZXh0ZW5kcyBHU3RhdGljIHtcclxuICAgIHB1YmxpYyBwYXJzZShvYmo6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGV0IHJhdyA9IEdTdGF0aWMuYWRkb25SYXc8U1JhbmtSZXdhcmREYXRhUmF3PihvYmouZGF0YVtpXSk7XHJcbiAgICAgICAgICAgIHRoaXMuX2RhdGEuc2V0KHJhdy5pZCwgcmF3KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5oC75o6S5L2N6LWb5pWw6YePICovXHJcbiAgICBwdWJsaWMgZ2V0UmFua0xldmVsKCk6IG51bWJlciB7XHJcbiAgICAgICAgbGV0IGxldmVsID0gMDtcclxuICAgICAgICB0aGlzLmRhdGEuZm9yRWFjaCgodjogU1JhbmtSZXdhcmREYXRhUmF3KSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChsZXZlbCAhPSBOdW1iZXIodi50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWwrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgcmV0dXJuIGxldmVsO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKuiOt+WPluafkOS4quaOkuS9jei1m+aVsOaNriAqL1xyXG4gICAgcHVibGljIGdldFJhbmtMZXZlbERhdGEodik6IEFycmF5PFNSYW5rUmV3YXJkRGF0YVJhdz4ge1xyXG4gICAgICAgIGxldCBsZXZlbCA9IHY7XHJcbiAgICAgICAgbGV0IHJhbmtSZXdhcmREYXRhOiBTUmFua1Jld2FyZERhdGFSYXdbXSA9IFtdO1xyXG4gICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh2OiBTUmFua1Jld2FyZERhdGFSYXcpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxldmVsID09IE51bWJlcih2LnR5cGUpKSB7XHJcbiAgICAgICAgICAgICAgICByYW5rUmV3YXJkRGF0YS5wdXNoKHYpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICByZXR1cm4gcmFua1Jld2FyZERhdGE7XHJcbiAgICB9XHJcblxyXG4gICAgLyoq6I635Y+W5q+P5Liq6LWb5q6155qE5YWz5Y2h5pWwICovXHJcbiAgICBwdWJsaWMgZ2V0UmFua0xldmVsTnVtKGk6IG51bWJlcikge1xyXG4gICAgICAgIGxldCBsZXZlbE51bSA9IDA7XHJcbiAgICAgICAgdGhpcy5kYXRhLmZvckVhY2goKHY6IFNSYW5rUmV3YXJkRGF0YVJhdykgPT4ge1xyXG4gICAgICAgICAgICBpZiAoaSA9PSBOdW1iZXIodi50eXBlKSkge1xyXG4gICAgICAgICAgICAgICAgbGV2ZWxOdW0gPSB2Lm5hbWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIHJldHVybiBsZXZlbE51bVxyXG4gICAgfVxyXG59Il19