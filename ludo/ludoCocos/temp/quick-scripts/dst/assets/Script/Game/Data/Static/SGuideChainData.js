
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SGuideChainData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TR3VpZGVDaGFpbkRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwyREFBeUQ7QUFFakQsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBcUMsbUNBQU87SUFBNUM7O0lBUUEsQ0FBQztJQVBVLCtCQUFLLEdBQVosVUFBYSxHQUFRO1FBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN0QyxJQUFJLEdBQUcsR0FBRyxrQkFBTyxDQUFDLFFBQVEsQ0FBcUIsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDcEM7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDO0lBUFEsZUFBZTtRQUQzQixPQUFPO09BQ0ssZUFBZSxDQVEzQjtJQUFELHNCQUFDO0NBUkQsQUFRQyxDQVJvQyxrQkFBTyxHQVEzQztBQVJZLDBDQUFlIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNHdWlkZUNoYWluRGF0YSBleHRlbmRzIEdTdGF0aWMge1xyXG4gICAgcHVibGljIHBhcnNlKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBvYmouZGF0YS5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBsZXQgcmF3ID0gR1N0YXRpYy5hZGRvblJhdzxTR3VpZGVDaGFpbkRhdGFSYXc+KG9iai5kYXRhW2ldKTtcclxuICAgICAgICAgICAgdGhpcy5fZGF0YS5zZXQocmF3Lmd1aWRlSWQsIHJhdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG59Il19