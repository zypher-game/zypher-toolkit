"use strict";
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