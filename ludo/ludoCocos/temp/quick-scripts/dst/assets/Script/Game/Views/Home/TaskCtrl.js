
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Views/Home/TaskCtrl.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
cc._RF.push(module, '1da302ucBZK6r86tZSfsT4H', 'TaskCtrl');
// Script/Game/Views/Home/TaskCtrl.ts

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
var CoreDefine_1 = require("../../../Core/CoreDefine");
var ColorLog_1 = require("../../../Core/FrameEx/ColorLog");
var GCtrl_1 = require("../../../Core/GCtrl");
var GChild_1 = require("../../../Core/GView/GChild");
var Define_1 = require("../../Common/Define");
var GameMgr_1 = require("../../Logic/GameMgr");
var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property, menu = _a.menu;
var TaskCtrl = /** @class */ (function (_super) {
    __extends(TaskCtrl, _super);
    function TaskCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**段位奖励数据 */
        _this._levelRewardData = null;
        /**是否是当前段位奖励索引，可以开始判断是否达到领取该段位奖励要求 */
        _this._bool = false;
        /**胜利场次 */
        _this._battleWin = 0;
        /**是否开启统计胜利场次累加 */
        _this._isOpenWin = Define_1.taskState.notOpen;
        /**是否开启判断段位要求 */
        _this._isRankLv = Define_1.taskState.notOpen;
        /**是否开启判断星级要求 */
        _this._isRankStar = Define_1.taskState.notOpen;
        /**需要达到任务段位要求 */
        _this._taskRankLv = Define_1.RANKLV.RANKLV2;
        /**需要达到任务段位星数要求 */
        _this._taskRankStar = Define_1.RANKLV.RANKLV0;
        /**需要达到任务胜利场次要求 */
        _this._taskBaskWin = Define_1.RANKLV.RANKLV0;
        /**任务类型 */
        _this._taskType = [];
        return _this;
    }
    TaskCtrl.prototype.onLoad = function () {
        GCtrl_1.GCtrl.ES.on(Define_1.CMsg.client.view.onBattleWin, this, this.onBattleWin.bind(this), CoreDefine_1.PRIORITY_VIEW);
        this.init();
    };
    TaskCtrl.prototype.init = function () {
        if (GameMgr_1.default.lUserData.levelRewardNum >=
            GameMgr_1.default.levelRewardData.data.values().length) {
            return;
        }
        this._battleWin = GameMgr_1.default.lUserData.levelRewardWin;
        this._levelRewardData = GameMgr_1.default.levelRewardData.getRaw(GameMgr_1.default.lUserData.levelRewardNum + 1);
        this._bool = true;
        this.isOpenTask();
        if (this._isRankLv === Define_1.taskState.open) {
            this.onBattleWin();
        }
    };
    /**胜利场次 */
    TaskCtrl.prototype.onBattleWin = function () {
        ColorLog_1.default.esOn("CMsg.client.view.onBattleWin");
        if (this._bool) {
            if (this._isOpenWin === Define_1.taskState.open) {
                this._battleWin++;
                GameMgr_1.default.lUserData.levelRewardWin = this._battleWin;
                if (this._battleWin >= this._taskBaskWin) {
                    if (this._isOpenWin === Define_1.taskState.open) {
                        this.cleanTask(Define_1.taskType.battleWin);
                    }
                    this._isOpenWin = Define_1.taskState.complete;
                }
            }
            if (this._isRankLv === Define_1.taskState.open) {
                var lv = GameMgr_1.default.lUserData.RankLv;
                console.log("段位", lv, this._taskRankLv);
                if (lv >= this._taskRankLv) {
                    if (this._isRankLv === Define_1.taskState.open) {
                        this.cleanTask(Define_1.taskType.rankLv);
                    }
                    this._isRankLv = Define_1.taskState.complete;
                }
            }
            if (this._isRankStar === Define_1.taskState.open) {
                if (GameMgr_1.default.lUserData.StarCount >= this._taskRankStar) {
                    if (this._isRankStar === Define_1.taskState.open) {
                        this.cleanTask(Define_1.taskType.rankNum);
                    }
                    this._isRankStar = Define_1.taskState.complete;
                }
            }
            console.log("胜利场次：", this._battleWin, "当前段位:", GameMgr_1.default.lUserData.RankLv, "当前段位星数：", GameMgr_1.default.lUserData.StarCount, "剩余任务：", this._taskType);
            /**已完成所有任务 */
            if (this._taskType.length < 1) {
                console.log(this._levelRewardData.info);
                GameMgr_1.default.lUserData.levelRewardNum = 1;
                this.recovery();
            }
        }
    };
    /**清理已完成任务 */
    TaskCtrl.prototype.cleanTask = function (type) {
        console.log("清理已完成任务:", type);
        var count = null;
        this._taskType.forEach(function (v, s) {
            if (v == type) {
                count = s;
            }
        });
        this._taskType.splice(count, 1);
    };
    /**恢复默认值 */
    TaskCtrl.prototype.recovery = function () {
        /**段位奖励数据 */
        this._levelRewardData = null;
        /**是否是当前段位奖励索引，可以开始判断是否达到领取该段位奖励要求 */
        this._bool = false;
        /**胜利场次 */
        this._battleWin = 0;
        GameMgr_1.default.lUserData.levelRewardWin = this._battleWin;
        /**是否开启统计胜利场次累加 */
        this._isOpenWin = Define_1.taskState.notOpen;
        /**是否开启判断段位要求 */
        this._isRankLv = Define_1.taskState.notOpen;
        /**是否开启判断星级要求 */
        this._isRankStar = Define_1.taskState.notOpen;
        /**需要达到任务段位要求 */
        this._taskRankLv = Define_1.RANKLV.RANKLV1;
        /**需要达到任务段位星数要求 */
        this._taskRankStar = Define_1.RANKLV.RANKLV0;
        /**需要达到任务胜利场次要求 */
        this._taskBaskWin = Define_1.RANKLV.RANKLV0;
        /**任务类型 */
        this._taskType = [];
        this.init();
    };
    /**是否开启任务条件 */
    TaskCtrl.prototype.isOpenTask = function () {
        var _this = this;
        this._levelRewardData.task.forEach(function (v, s) {
            /**
             * a [0] b[1]
             */
            v.forEach(function (a, b) {
                if (b == Define_1.taskType.default) {
                    switch (a) {
                        case Define_1.taskType.rankLv: {
                            if (_this._isRankLv === Define_1.taskState.notOpen) {
                                _this._taskType.push(Define_1.taskType.rankLv);
                            }
                            _this._isRankLv = Define_1.taskState.open;
                            console.log("开启段位奖励任务------段位要求", _this._taskType);
                            console.log(_this._levelRewardData.info);
                            break;
                        }
                        case Define_1.taskType.battleWin: {
                            if (_this._isOpenWin === Define_1.taskState.notOpen) {
                                _this._taskType.push(Define_1.taskType.battleWin);
                            }
                            console.log("开启段位奖励任务------胜利场次", _this._taskType);
                            console.log(_this._levelRewardData.info);
                            _this._isOpenWin = Define_1.taskState.open;
                            break;
                        }
                        case Define_1.taskType.rankNum: {
                            if (_this._isRankStar === Define_1.taskState.notOpen) {
                                _this._taskType.push(Define_1.taskType.rankNum);
                            }
                            console.log("开启段位奖励任务------段位星数", _this._taskType);
                            console.log(_this._levelRewardData.info);
                            _this._isRankStar = Define_1.taskState.open;
                            break;
                        }
                        default:
                            break;
                    }
                }
                if (b == Define_1.taskType.rankLv) {
                    if (_this._isRankLv == Define_1.taskState.open) {
                        if (!_this._taskRankLv) {
                            _this._taskRankLv = a;
                        }
                    }
                    if (_this._isRankStar == Define_1.taskState.open) {
                        if (!_this._taskRankStar) {
                            _this._taskRankStar = a;
                        }
                    }
                    if (_this._isOpenWin == Define_1.taskState.open) {
                        if (!_this._taskBaskWin) {
                            _this._taskBaskWin = a;
                        }
                    }
                }
            });
        });
    };
    TaskCtrl = __decorate([
        ccclass,
        menu("View/Home/TaskCtrl")
    ], TaskCtrl);
    return TaskCtrl;
}(GChild_1.default));
exports.default = TaskCtrl;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9WaWV3cy9Ib21lL1Rhc2tDdHJsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLHVEQUF5RDtBQUN6RCwyREFBc0Q7QUFDdEQsNkNBQTRDO0FBQzVDLHFEQUFnRDtBQUNoRCw4Q0FBd0U7QUFDeEUsK0NBQTBDO0FBRXBDLElBQUEsS0FBOEIsRUFBRSxDQUFDLFVBQVUsRUFBekMsT0FBTyxhQUFBLEVBQUUsUUFBUSxjQUFBLEVBQUUsSUFBSSxVQUFrQixDQUFDO0FBSWxEO0lBQXNDLDRCQUFNO0lBQTVDO1FBQUEscUVBbU5DO1FBbE5DLFlBQVk7UUFDSixzQkFBZ0IsR0FBd0IsSUFBSSxDQUFDO1FBQ3JELHFDQUFxQztRQUM3QixXQUFLLEdBQVksS0FBSyxDQUFDO1FBQy9CLFVBQVU7UUFDRixnQkFBVSxHQUFXLENBQUMsQ0FBQztRQUUvQixrQkFBa0I7UUFDVixnQkFBVSxHQUFjLGtCQUFTLENBQUMsT0FBTyxDQUFDO1FBQ2xELGdCQUFnQjtRQUNSLGVBQVMsR0FBYyxrQkFBUyxDQUFDLE9BQU8sQ0FBQztRQUNqRCxnQkFBZ0I7UUFDUixpQkFBVyxHQUFjLGtCQUFTLENBQUMsT0FBTyxDQUFDO1FBRW5ELGdCQUFnQjtRQUNSLGlCQUFXLEdBQVcsZUFBTSxDQUFDLE9BQU8sQ0FBQztRQUM3QyxrQkFBa0I7UUFDVixtQkFBYSxHQUFXLGVBQU0sQ0FBQyxPQUFPLENBQUM7UUFDL0Msa0JBQWtCO1FBQ1Ysa0JBQVksR0FBVyxlQUFNLENBQUMsT0FBTyxDQUFDO1FBRTlDLFVBQVU7UUFDRixlQUFTLEdBQWtCLEVBQUUsQ0FBQzs7SUE0THhDLENBQUM7SUExTEMseUJBQU0sR0FBTjtRQUNFLGFBQUssQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUNULGFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFDNUIsSUFBSSxFQUNKLElBQUksQ0FBQyxX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QyxJQUFJLENBQUMsS0FBSSxDQUFDLFdBQVcsRUFBRTs0QkFDckIsS0FBSSxDQUFDLFdBQVcsR0FBRyxDQUFDLENBQUM7eUJBQ3RCO3FCQUNGO29CQUVELElBQUksS0FBSSxDQUFDLFdBQVcsSUFBSSxrQkFBUyxDQUFDLElBQUksRUFBRTt3QkFDdEMsSUFBSSxDQUFDLEtBQUksQ0FBQyxhQUFhLEVBQUU7NEJBQ3ZCLEtBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO3lCQUN4QjtxQkFDRjtvQkFFRCxJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksa0JBQVMsQ0FBQyxJQUFJLEVBQUU7d0JBQ3JDLElBQUksQ0FBQyxLQUFJLENBQUMsWUFBWSxFQUFFOzRCQUN0QixLQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQzt5QkFDdkI7cUJBQ0Y7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQWxOa0IsUUFBUTtRQUY1QixPQUFPO1FBQ1AsSUFBSSxDQUFDLG9CQUFvQixDQUFDO09BQ04sUUFBUSxDQW1ONUI7SUFBRCxlQUFDO0NBbk5ELEFBbU5DLENBbk5xQyxnQkFBTSxHQW1OM0M7a0JBbk5vQixRQUFRIiwiZmlsZSI6IiIsInNvdXJjZVJvb3QiOiIvIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU0xldmVsUmV3YXJkRGF0YVJhdyB9IGZyb20gXCIuLi8uLi8uLi8uLi8uLi9kLnRzL2dhbWUvSlhDTEJ0bFwiO1xyXG5pbXBvcnQgeyBQUklPUklUWV9WSUVXIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvQ29yZURlZmluZVwiO1xyXG5pbXBvcnQgQ29sb3JMb2cgZnJvbSBcIi4uLy4uLy4uL0NvcmUvRnJhbWVFeC9Db2xvckxvZ1wiO1xyXG5pbXBvcnQgeyBHQ3RybCB9IGZyb20gXCIuLi8uLi8uLi9Db3JlL0dDdHJsXCI7XHJcbmltcG9ydCBHQ2hpbGQgZnJvbSBcIi4uLy4uLy4uL0NvcmUvR1ZpZXcvR0NoaWxkXCI7XHJcbmltcG9ydCB7IENNc2csIFJBTktMViwgdGFza1N0YXRlLCB0YXNrVHlwZSB9IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuLi8uLi9Mb2dpYy9HYW1lTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MsIHByb3BlcnR5LCBtZW51IH0gPSBjYy5fZGVjb3JhdG9yO1xyXG5cclxuQGNjY2xhc3NcclxuQG1lbnUoXCJWaWV3L0hvbWUvVGFza0N0cmxcIilcclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGFza0N0cmwgZXh0ZW5kcyBHQ2hpbGQge1xyXG4gIC8qKuauteS9jeWlluWKseaVsOaNriAqL1xyXG4gIHByaXZhdGUgX2xldmVsUmV3YXJkRGF0YTogU0xldmVsUmV3YXJkRGF0YVJhdyA9IG51bGw7XHJcbiAgLyoq5piv5ZCm5piv5b2T5YmN5q615L2N5aWW5Yqx57Si5byV77yM5Y+v5Lul5byA5aeL5Yik5pat5piv5ZCm6L6+5Yiw6aKG5Y+W6K+l5q615L2N5aWW5Yqx6KaB5rGCICovXHJcbiAgcHJpdmF0ZSBfYm9vbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIC8qKuiDnOWIqeWcuuasoSAqL1xyXG4gIHByaXZhdGUgX2JhdHRsZVdpbjogbnVtYmVyID0gMDtcclxuXHJcbiAgLyoq5piv5ZCm5byA5ZCv57uf6K6h6IOc5Yip5Zy65qyh57Sv5YqgICovXHJcbiAgcHJpdmF0ZSBfaXNPcGVuV2luOiB0YXNrU3RhdGUgPSB0YXNrU3RhdGUubm90T3BlbjtcclxuICAvKirmmK/lkKblvIDlkK/liKTmlq3mrrXkvY3opoHmsYIgKi9cclxuICBwcml2YXRlIF9pc1JhbmtMdjogdGFza1N0YXRlID0gdGFza1N0YXRlLm5vdE9wZW47XHJcbiAgLyoq5piv5ZCm5byA5ZCv5Yik5pat5pif57qn6KaB5rGCICovXHJcbiAgcHJpdmF0ZSBfaXNSYW5rU3RhcjogdGFza1N0YXRlID0gdGFza1N0YXRlLm5vdE9wZW47XHJcblxyXG4gIC8qKumcgOimgei+vuWIsOS7u+WKoeauteS9jeimgeaxgiAqL1xyXG4gIHByaXZhdGUgX3Rhc2tSYW5rTHY6IG51bWJlciA9IFJBTktMVi5SQU5LTFYyO1xyXG4gIC8qKumcgOimgei+vuWIsOS7u+WKoeauteS9jeaYn+aVsOimgeaxgiAqL1xyXG4gIHByaXZhdGUgX3Rhc2tSYW5rU3RhcjogbnVtYmVyID0gUkFOS0xWLlJBTktMVjA7XHJcbiAgLyoq6ZyA6KaB6L6+5Yiw5Lu75Yqh6IOc5Yip5Zy65qyh6KaB5rGCICovXHJcbiAgcHJpdmF0ZSBfdGFza0Jhc2tXaW46IG51bWJlciA9IFJBTktMVi5SQU5LTFYwO1xyXG5cclxuICAvKirku7vliqHnsbvlnosgKi9cclxuICBwcml2YXRlIF90YXNrVHlwZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG5cclxuICBvbkxvYWQoKSB7XHJcbiAgICBHQ3RybC5FUy5vbihcclxuICAgICAgQ01zZy5jbGllbnQudmlldy5vbkJhdHRsZVdpbixcclxuICAgICAgdGhpcyxcclxuICAgICAgdGhpcy5vbkJhdHRsZVdpbi5iaW5kKHRoaXMpLFxyXG4gICAgICBQUklPUklUWV9WSUVXXHJcbiAgICApO1xyXG4gICAgdGhpcy5pbml0KCk7XHJcbiAgfVxyXG5cclxuICBpbml0KCkge1xyXG4gICAgaWYgKFxyXG4gICAgICBHYW1lTWdyLmxVc2VyRGF0YS5sZXZlbFJld2FyZE51bSA+PVxyXG4gICAgICBHYW1lTWdyLmxldmVsUmV3YXJkRGF0YS5kYXRhLnZhbHVlcygpLmxlbmd0aFxyXG4gICAgKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuX2JhdHRsZVdpbiA9IEdhbWVNZ3IubFVzZXJEYXRhLmxldmVsUmV3YXJkV2luO1xyXG4gICAgdGhpcy5fbGV2ZWxSZXdhcmREYXRhID0gR2FtZU1nci5sZXZlbFJld2FyZERhdGEuZ2V0UmF3PFNMZXZlbFJld2FyZERhdGFSYXc+KFxyXG4gICAgICBHYW1lTWdyLmxVc2VyRGF0YS5sZXZlbFJld2FyZE51bSArIDFcclxuICAgICk7XHJcbiAgICB0aGlzLl9ib29sID0gdHJ1ZTtcclxuICAgIHRoaXMuaXNPcGVuVGFzaygpO1xyXG4gICAgaWYgKHRoaXMuX2lzUmFua0x2ID09PSB0YXNrU3RhdGUub3Blbikge1xyXG4gICAgICB0aGlzLm9uQmF0dGxlV2luKCk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICAvKirog5zliKnlnLrmrKEgKi9cclxuICBvbkJhdHRsZVdpbigpIHtcclxuICAgIENvbG9yTG9nLmVzT24oXCJDTXNnLmNsaWVudC52aWV3Lm9uQmF0dGxlV2luXCIpO1xyXG4gICAgaWYgKHRoaXMuX2Jvb2wpIHtcclxuICAgICAgaWYgKHRoaXMuX2lzT3BlbldpbiA9PT0gdGFza1N0YXRlLm9wZW4pIHtcclxuICAgICAgICB0aGlzLl9iYXR0bGVXaW4rKztcclxuICAgICAgICBHYW1lTWdyLmxVc2VyRGF0YS5sZXZlbFJld2FyZFdpbiA9IHRoaXMuX2JhdHRsZVdpbjtcclxuICAgICAgICBpZiAodGhpcy5fYmF0dGxlV2luID49IHRoaXMuX3Rhc2tCYXNrV2luKSB7XHJcbiAgICAgICAgICBpZiAodGhpcy5faXNPcGVuV2luID09PSB0YXNrU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFuVGFzayh0YXNrVHlwZS5iYXR0bGVXaW4pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5faXNPcGVuV2luID0gdGFza1N0YXRlLmNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5faXNSYW5rTHYgPT09IHRhc2tTdGF0ZS5vcGVuKSB7XHJcbiAgICAgICAgbGV0IGx2ID0gR2FtZU1nci5sVXNlckRhdGEuUmFua0x2O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwi5q615L2NXCIsIGx2LCB0aGlzLl90YXNrUmFua0x2KTtcclxuXHJcbiAgICAgICAgaWYgKGx2ID49IHRoaXMuX3Rhc2tSYW5rTHYpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9pc1JhbmtMdiA9PT0gdGFza1N0YXRlLm9wZW4pIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhblRhc2sodGFza1R5cGUucmFua0x2KTtcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIHRoaXMuX2lzUmFua0x2ID0gdGFza1N0YXRlLmNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5faXNSYW5rU3RhciA9PT0gdGFza1N0YXRlLm9wZW4pIHtcclxuICAgICAgICBpZiAoR2FtZU1nci5sVXNlckRhdGEuU3RhckNvdW50ID49IHRoaXMuX3Rhc2tSYW5rU3Rhcikge1xyXG4gICAgICAgICAgaWYgKHRoaXMuX2lzUmFua1N0YXIgPT09IHRhc2tTdGF0ZS5vcGVuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYW5UYXNrKHRhc2tUeXBlLnJhbmtOdW0pO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgICAgdGhpcy5faXNSYW5rU3RhciA9IHRhc2tTdGF0ZS5jb21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGNvbnNvbGUubG9nKFxyXG4gICAgICAgIFwi6IOc5Yip5Zy65qyh77yaXCIsXHJcbiAgICAgICAgdGhpcy5fYmF0dGxlV2luLFxyXG4gICAgICAgIFwi5b2T5YmN5q615L2NOlwiLFxyXG4gICAgICAgIEdhbWVNZ3IubFVzZXJEYXRhLlJhbmtMdixcclxuICAgICAgICBcIuW9k+WJjeauteS9jeaYn+aVsO+8mlwiLFxyXG4gICAgICAgIEdhbWVNZ3IubFVzZXJEYXRhLlN0YXJDb3VudCxcclxuICAgICAgICBcIuWJqeS9meS7u+WKoe+8mlwiLFxyXG4gICAgICAgIHRoaXMuX3Rhc2tUeXBlXHJcbiAgICAgICk7XHJcblxyXG4gICAgICAvKirlt7LlrozmiJDmiYDmnInku7vliqEgKi9cclxuICAgICAgaWYgKHRoaXMuX3Rhc2tUeXBlLmxlbmd0aCA8IDEpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9sZXZlbFJld2FyZERhdGEuaW5mbyk7XHJcbiAgICAgICAgR2FtZU1nci5sVXNlckRhdGEubGV2ZWxSZXdhcmROdW0gPSAxO1xyXG4gICAgICAgIHRoaXMucmVjb3ZlcnkoKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgLyoq5riF55CG5bey5a6M5oiQ5Lu75YqhICovXHJcbiAgY2xlYW5UYXNrKHR5cGU6IG51bWJlcikge1xyXG4gICAgY29uc29sZS5sb2coXCLmuIXnkIblt7LlrozmiJDku7vliqE6XCIsIHR5cGUpO1xyXG5cclxuICAgIGxldCBjb3VudCA9IG51bGw7XHJcbiAgICB0aGlzLl90YXNrVHlwZS5mb3JFYWNoKCh2LCBzKSA9PiB7XHJcbiAgICAgIGlmICh2ID09IHR5cGUpIHtcclxuICAgICAgICBjb3VudCA9IHM7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5fdGFza1R5cGUuc3BsaWNlKGNvdW50LCAxKTtcclxuICB9XHJcblxyXG4gIC8qKuaBouWkjem7mOiupOWAvCAqL1xyXG4gIHB1YmxpYyByZWNvdmVyeSgpIHtcclxuICAgIC8qKuauteS9jeWlluWKseaVsOaNriAqL1xyXG4gICAgdGhpcy5fbGV2ZWxSZXdhcmREYXRhID0gbnVsbDtcclxuICAgIC8qKuaYr+WQpuaYr+W9k+WJjeauteS9jeWlluWKsee0ouW8le+8jOWPr+S7peW8gOWni+WIpOaWreaYr+WQpui+vuWIsOmihuWPluivpeauteS9jeWlluWKseimgeaxgiAqL1xyXG4gICAgdGhpcy5fYm9vbCA9IGZhbHNlO1xyXG4gICAgLyoq6IOc5Yip5Zy65qyhICovXHJcbiAgICB0aGlzLl9iYXR0bGVXaW4gPSAwO1xyXG4gICAgR2FtZU1nci5sVXNlckRhdGEubGV2ZWxSZXdhcmRXaW4gPSB0aGlzLl9iYXR0bGVXaW47XHJcbiAgICAvKirmmK/lkKblvIDlkK/nu5/orqHog5zliKnlnLrmrKHntK/liqAgKi9cclxuICAgIHRoaXMuX2lzT3BlbldpbiA9IHRhc2tTdGF0ZS5ub3RPcGVuO1xyXG4gICAgLyoq5piv5ZCm5byA5ZCv5Yik5pat5q615L2N6KaB5rGCICovXHJcbiAgICB0aGlzLl9pc1JhbmtMdiA9IHRhc2tTdGF0ZS5ub3RPcGVuO1xyXG4gICAgLyoq5piv5ZCm5byA5ZCv5Yik5pat5pif57qn6KaB5rGCICovXHJcbiAgICB0aGlzLl9pc1JhbmtTdGFyID0gdGFza1N0YXRlLm5vdE9wZW47XHJcbiAgICAvKirpnIDopoHovr7liLDku7vliqHmrrXkvY3opoHmsYIgKi9cclxuICAgIHRoaXMuX3Rhc2tSYW5rTHYgPSBSQU5LTFYuUkFOS0xWMTtcclxuICAgIC8qKumcgOimgei+vuWIsOS7u+WKoeauteS9jeaYn+aVsOimgeaxgiAqL1xyXG4gICAgdGhpcy5fdGFza1JhbmtTdGFyID0gUkFOS0xWLlJBTktMVjA7XHJcbiAgICAvKirpnIDopoHovr7liLDku7vliqHog5zliKnlnLrmrKHopoHmsYIgKi9cclxuICAgIHRoaXMuX3Rhc2tCYXNrV2luID0gUkFOS0xWLlJBTktMVjA7XHJcbiAgICAvKirku7vliqHnsbvlnosgKi9cclxuICAgIHRoaXMuX3Rhc2tUeXBlID0gW107XHJcbiAgICB0aGlzLmluaXQoKTtcclxuICB9XHJcblxyXG4gIC8qKuaYr+WQpuW8gOWQr+S7u+WKoeadoeS7tiAqL1xyXG4gIGlzT3BlblRhc2soKSB7XHJcbiAgICB0aGlzLl9sZXZlbFJld2FyZERhdGEudGFzay5mb3JFYWNoKCh2LCBzKSA9PiB7XHJcbiAgICAgIC8qKlxyXG4gICAgICAgKiBhIFswXSBiWzFdXHJcbiAgICAgICAqL1xyXG4gICAgICB2LmZvckVhY2goKGEsIGIpID0+IHtcclxuICAgICAgICBpZiAoYiA9PSB0YXNrVHlwZS5kZWZhdWx0KSB7XHJcbiAgICAgICAgICBzd2l0Y2ggKGEpIHtcclxuICAgICAgICAgICAgY2FzZSB0YXNrVHlwZS5yYW5rTHY6IHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5faXNSYW5rTHYgPT09IHRhc2tTdGF0ZS5ub3RPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrVHlwZS5wdXNoKHRhc2tUeXBlLnJhbmtMdik7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIHRoaXMuX2lzUmFua0x2ID0gdGFza1N0YXRlLm9wZW47XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2coXCLlvIDlkK/mrrXkvY3lpZblirHku7vliqEtLS0tLS3mrrXkvY3opoHmsYJcIiwgdGhpcy5fdGFza1R5cGUpO1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRoaXMuX2xldmVsUmV3YXJkRGF0YS5pbmZvKTtcclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIHRhc2tUeXBlLmJhdHRsZVdpbjoge1xyXG4gICAgICAgICAgICAgIGlmICh0aGlzLl9pc09wZW5XaW4gPT09IHRhc2tTdGF0ZS5ub3RPcGVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90YXNrVHlwZS5wdXNoKHRhc2tUeXBlLmJhdHRsZVdpbik7XHJcbiAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIuW8gOWQr+auteS9jeWlluWKseS7u+WKoS0tLS0tLeiDnOWIqeWcuuasoVwiLCB0aGlzLl90YXNrVHlwZSk7XHJcbiAgICAgICAgICAgICAgY29uc29sZS5sb2codGhpcy5fbGV2ZWxSZXdhcmREYXRhLmluZm8pO1xyXG4gICAgICAgICAgICAgIHRoaXMuX2lzT3BlbldpbiA9IHRhc2tTdGF0ZS5vcGVuO1xyXG5cclxuICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjYXNlIHRhc2tUeXBlLnJhbmtOdW06IHtcclxuICAgICAgICAgICAgICBpZiAodGhpcy5faXNSYW5rU3RhciA9PT0gdGFza1N0YXRlLm5vdE9wZW4pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Rhc2tUeXBlLnB1c2godGFza1R5cGUucmFua051bSk7XHJcbiAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwi5byA5ZCv5q615L2N5aWW5Yqx5Lu75YqhLS0tLS0t5q615L2N5pif5pWwXCIsIHRoaXMuX3Rhc2tUeXBlKTtcclxuICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLl9sZXZlbFJld2FyZERhdGEuaW5mbyk7XHJcbiAgICAgICAgICAgICAgdGhpcy5faXNSYW5rU3RhciA9IHRhc2tTdGF0ZS5vcGVuO1xyXG4gICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYiA9PSB0YXNrVHlwZS5yYW5rTHYpIHtcclxuICAgICAgICAgIGlmICh0aGlzLl9pc1JhbmtMdiA9PSB0YXNrU3RhdGUub3Blbikge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX3Rhc2tSYW5rTHYpIHtcclxuICAgICAgICAgICAgICB0aGlzLl90YXNrUmFua0x2ID0gYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLl9pc1JhbmtTdGFyID09IHRhc2tTdGF0ZS5vcGVuKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fdGFza1JhbmtTdGFyKSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fdGFza1JhbmtTdGFyID0gYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG5cclxuICAgICAgICAgIGlmICh0aGlzLl9pc09wZW5XaW4gPT0gdGFza1N0YXRlLm9wZW4pIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl90YXNrQmFza1dpbikge1xyXG4gICAgICAgICAgICAgIHRoaXMuX3Rhc2tCYXNrV2luID0gYTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICB9XHJcbn1cclxuIl19