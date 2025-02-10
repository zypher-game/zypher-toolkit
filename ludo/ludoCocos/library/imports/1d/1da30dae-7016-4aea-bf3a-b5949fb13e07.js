"use strict";
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