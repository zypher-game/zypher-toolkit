
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SPlaneData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TUGxhbmVEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBRWpELElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBRWxDO0lBQWdDLDhCQUFPO0lBQXZDOztJQVNBLENBQUM7SUFSTywwQkFBSyxHQUFaLFVBQWEsR0FBUTtRQUNwQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDekMsSUFBSSxHQUFHLEdBQUcsa0JBQU8sQ0FBQyxRQUFRLENBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQzVCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDYixDQUFDO0lBUFcsVUFBVTtRQUR0QixPQUFPO09BQ0ssVUFBVSxDQVN0QjtJQUFELGlCQUFDO0NBVEQsQUFTQyxDQVQrQixrQkFBTyxHQVN0QztBQVRZLGdDQUFVIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuXHJcbmNvbnN0IHsgY2NjbGFzcyB9ID0gY2MuX2RlY29yYXRvcjtcclxuQGNjY2xhc3NcclxuZXhwb3J0IGNsYXNzIFNQbGFuZURhdGEgZXh0ZW5kcyBHU3RhdGljIHtcclxuXHRwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuXHRcdGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuXHRcdFx0bGV0IHJhdyA9IEdTdGF0aWMuYWRkb25SYXc8U1BsYW5lRGF0YVJhdz4ob2JqLmRhdGFbaV0pO1xyXG5cdFx0XHR0aGlzLl9kYXRhLnNldChyYXcuaWQsIHJhdyk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gdHJ1ZTtcclxuXHR9XHJcblxyXG59Il19