"use strict";
cc._RF.push(module, '7dcdeEx/A5JKZtzZgJgbcAH', 'LRobotGrade');
// Script/Game/Data/Locals/LRobotGrade.ts

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
exports.LRobotGradeData = void 0;
var CoreDefine_1 = require("../../../Core/CoreDefine");
var DataPool_1 = require("../../../Core/Manager/DataPool");
var MathEx_1 = require("../../../Core/Math/MathEx");
var Define_1 = require("../../Common/Define");
var GameMgr_1 = require("../../Logic/GameMgr");
var ccclass = cc._decorator.ccclass;
var LRobotGradeData = /** @class */ (function (_super) {
    __extends(LRobotGradeData, _super);
    function LRobotGradeData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$localKey = "LRobotGradeData";
        _this.$userGradeInfo = [];
        return _this;
    }
    LRobotGradeData.prototype.onInit = function () {
        this.load();
        if (this.$userGradeInfo.length <= 0) {
            this.initNewSeason();
        }
        this.set();
    };
    /**初始化新赛季 */
    LRobotGradeData.prototype.initNewSeason = function (pastDay) {
        var _this = this;
        if (pastDay === void 0) { pastDay = 0; }
        this.$userGradeInfo = [];
        var robotDatas = GameMgr_1.default.npcData.data.values();
        robotDatas.forEach(function (v, s) {
            var info = {
                isSelf: 0,
                name: v.name,
                icon: v.icon,
                levelLv: MathEx_1.default.random(1, 3),
                starNum: MathEx_1.default.random(1, 3),
            };
            _this.$userGradeInfo.push(info);
        });
    };
    /**刷新当前赛季段位信息 */
    LRobotGradeData.prototype.brushSeasonLevelInfo = function () {
        var _this = this;
        var arr = [];
        this.$userGradeInfo.forEach(function (v, s) {
            var info = _this.brushRobotGradeLevelInfo(v);
            arr.push(info);
        });
        this.$userGradeInfo = [];
        this.$userGradeInfo = arr;
        this.set();
    };
    /**当前赛季段位排序由高到低 */
    LRobotGradeData.prototype.curSeasonLevel = function () { };
    /**修改机器人段位信息 */
    LRobotGradeData.prototype.brushRobotGradeLevelInfo = function (v) {
        if (v.levelLv >= 1 && v.starNum >= 0) {
            var star = MathEx_1.default.random(-1, 2);
            v.starNum += star;
            if (v.starNum > 3) {
                v.levelLv++;
                if (v.levelLv >= Define_1.RANKLV.RANKLV7) {
                    v.levelLv = Define_1.RANKLV.RANKLV7;
                }
                else {
                    v.starNum -= 3;
                }
            }
            else if (v.starNum < 0) {
                v.levelLv--;
                v.starNum += 3;
                if (v.levelLv < 1) {
                    v.levelLv = 1;
                    if (v.starNum < 0) {
                        v.starNum = 0;
                    }
                }
            }
        }
        else {
            v.levelLv = 1;
            v.starNum = 0;
        }
        return v;
    };
    /**获取所有机器人信息 */
    LRobotGradeData.prototype.getAll = function () {
        return CoreDefine_1.OBJECT_COPY(this.$userGradeInfo);
    };
    /**随机机器人 */
    LRobotGradeData.prototype.randomRobotGrade = function () {
        var num = MathEx_1.default.random(0, this.$userGradeInfo.length - 1);
        return this.$userGradeInfo[num];
    };
    LRobotGradeData = __decorate([
        ccclass
    ], LRobotGradeData);
    return LRobotGradeData;
}(DataPool_1.GLocal));
exports.LRobotGradeData = LRobotGradeData;

cc._RF.pop();