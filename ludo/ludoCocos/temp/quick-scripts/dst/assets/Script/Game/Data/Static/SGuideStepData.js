
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Static/SGuideStepData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, 'a4952C8dKRKaKi9NTrdhKIr', 'SGuideStepData');
// Script/Game/Data/Static/SGuideStepData.ts

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
exports.SGuideStepData = void 0;
var DataPool_1 = require("../../../Core/Manager/DataPool");
var ccclass = cc._decorator.ccclass;
var SGuideStepData = /** @class */ (function (_super) {
    __extends(SGuideStepData, _super);
    function SGuideStepData() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SGuideStepData.prototype.parse = function (obj) {
        for (var i = 0; i < obj.data.length; i++) {
            var raw = DataPool_1.GStatic.addonRaw(obj.data[i]);
            this._data.set(raw.stepId, raw);
        }
        return true;
    };
    SGuideStepData = __decorate([
        ccclass
    ], SGuideStepData);
    return SGuideStepData;
}(DataPool_1.GStatic));
exports.SGuideStepData = SGuideStepData;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL1N0YXRpYy9TR3VpZGVTdGVwRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsMkRBQXlEO0FBR2pELElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBRWxDO0lBQW9DLGtDQUFPO0lBQTNDOztJQVFBLENBQUM7SUFQUSw4QkFBSyxHQUFaLFVBQWEsR0FBUTtRQUNuQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDeEMsSUFBSSxHQUFHLEdBQUcsa0JBQU8sQ0FBQyxRQUFRLENBQW9CLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBUFUsY0FBYztRQUQxQixPQUFPO09BQ0ssY0FBYyxDQVExQjtJQUFELHFCQUFDO0NBUkQsQUFRQyxDQVJtQyxrQkFBTyxHQVExQztBQVJZLHdDQUFjIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgR1N0YXRpYyB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL01hbmFnZXIvRGF0YVBvb2xcIjtcclxuaW1wb3J0IHsgU0d1aWRlU3RlcERhdGFSYXcgfSBmcm9tIFwiLi4vLi4vR3VpZGUvR3VpZGUudHlwZVwiO1xyXG5cclxuY29uc3QgeyBjY2NsYXNzIH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5AY2NjbGFzc1xyXG5leHBvcnQgY2xhc3MgU0d1aWRlU3RlcERhdGEgZXh0ZW5kcyBHU3RhdGljIHtcclxuICBwdWJsaWMgcGFyc2Uob2JqOiBhbnkpOiBib29sZWFuIHtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgb2JqLmRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHJhdyA9IEdTdGF0aWMuYWRkb25SYXc8U0d1aWRlU3RlcERhdGFSYXc+KG9iai5kYXRhW2ldKTtcclxuICAgICAgdGhpcy5fZGF0YS5zZXQocmF3LnN0ZXBJZCwgcmF3KTtcclxuICAgIH1cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxufVxyXG4iXX0=