
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SLevelData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '3a6ceZPy4pOyaAplVMVy52t', 'SLevelData');
// Script/Game/Data/Static/SLevelData.ts

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SLevelData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SLevelData = /** @class */ (function (_super) {
    __extends(SLevelData, _super);
    function SLevelData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SLevelData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.id, raw);
        }
        return true;
    };
    /**
     * 获取结算奖励
     * @param type 排位赛类型
     * @param level 关卡
     * @param isWin 是否胜利
     */
    SLevelData.prototype.getVideoReward = function (type, level, isWin) {
        var arr = [];
        this._data.forEach(function (v) {
            if (Number(v.type) == type && v.level == level) {
                arr = v.videoReward;
            }
        });
        return arr;
    };
    SLevelData = __decorate([
        ccclass
    ], SLevelData);
    return SLevelData;
}(DataPool_1.GStatic));
exports.SLevelData = SLevelData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TTGV2ZWxEYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSwyREFBeUQ7QUFFakQsSUFBQSxPQUFPLEdBQUssRUFBRSxDQUFDLFVBQVUsUUFBbEIsQ0FBbUI7QUFFbEM7SUFBZ0MsOEJBQU87SUFBdkM7O0lBd0JBLENBQUM7SUF2QlEsMEJBQUssR0FBWixVQUFhLEdBQVE7UUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ3hDLElBQUksR0FBRyxHQUFHLGtCQUFPLENBQUMsUUFBUSxDQUFnQixHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUM3QjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksbUNBQWMsR0FBckIsVUFBc0IsSUFBWSxFQUFFLEtBQWEsRUFBRSxLQUFjO1FBQy9ELElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztRQUNiLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFVBQUMsQ0FBZ0I7WUFDbEMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLEtBQUssRUFBRTtnQkFDOUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxXQUFXLENBQUM7YUFDckI7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQXZCVSxVQUFVO1FBRHRCLE9BQU87T0FDSyxVQUFVLENBd0J0QjtJQUFELGlCQUFDO0NBeEJELEFBd0JDLENBeEIrQixrQkFBTyxHQXdCdEM7QUF4QlksZ0NBQVUiLCJmaWxlIjoiIiwic291cmNlUm9vdCI6Ii8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTTGV2ZWxEYXRhUmF3IH0gZnJvbSBcIi4uLy4uLy4uLy4uLy4uL2QudHMvZ2FtZS9KWENMQnRsXCI7XHJcbmltcG9ydCB7IEdTdGF0aWMgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9NYW5hZ2VyL0RhdGFQb29sXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBTTGV2ZWxEYXRhIGV4dGVuZHMgR1N0YXRpYyB7XHJcbiAgcHVibGljIHBhcnNlKG9iajogYW55KTogYm9vbGVhbiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG9iai5kYXRhLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCByYXcgPSBHU3RhdGljLmFkZG9uUmF3PFNMZXZlbERhdGFSYXc+KG9iai5kYXRhW2ldKTtcclxuICAgICAgdGhpcy5fZGF0YS5zZXQocmF3LmlkLCByYXcpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDojrflj5bnu5PnrpflpZblirFcclxuICAgKiBAcGFyYW0gdHlwZSDmjpLkvY3otZvnsbvlnotcclxuICAgKiBAcGFyYW0gbGV2ZWwg5YWz5Y2hXHJcbiAgICogQHBhcmFtIGlzV2luIOaYr+WQpuiDnOWIqVxyXG4gICAqL1xyXG4gIHB1YmxpYyBnZXRWaWRlb1Jld2FyZCh0eXBlOiBudW1iZXIsIGxldmVsOiBudW1iZXIsIGlzV2luOiBib29sZWFuKSB7XHJcbiAgICBsZXQgYXJyID0gW107XHJcbiAgICB0aGlzLl9kYXRhLmZvckVhY2goKHY6IFNMZXZlbERhdGFSYXcpID0+IHtcclxuICAgICAgaWYgKE51bWJlcih2LnR5cGUpID09IHR5cGUgJiYgdi5sZXZlbCA9PSBsZXZlbCkge1xyXG4gICAgICAgIGFyciA9IHYudmlkZW9SZXdhcmQ7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGFycjtcclxuICB9XHJcbn1cclxuIl19