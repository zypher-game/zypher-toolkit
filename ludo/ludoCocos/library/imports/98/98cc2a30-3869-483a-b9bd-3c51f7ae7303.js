"use strict";
cc._RF.push(module, '98cc2owOGlIOrm9PFH3rnMD', 'LUserData');
// Script/Game/Data/Locals/LUserData.ts

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
exports.LUserData = void 0;
var JXCommon_1 = require("../../../conventions/JXCommon");
var CoreDefine_1 = require("../../../Core/CoreDefine");
var GCtrl_1 = require("../../../Core/GCtrl");
var DataPool_1 = require("../../../Core/Manager/DataPool");
var Define_1 = require("../../Common/Define");
var Language_1 = require("../../Common/Language");
var TimeUtils_1 = require("../../Common/TimeUtils");
var Zh_1 = require("../../Common/Zh");
var GameMgr_1 = require("../../Logic/GameMgr");
var ccclass = cc._decorator.ccclass;
var LUserData = /** @class */ (function (_super) {
    __extends(LUserData, _super);
    function LUserData() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.$localKey = "LUserData";
        //第一次登陆游戏时间
        _this.$fristTime = 0;
        /**签到的时间 */
        _this.$signInDate = 0;
        /**连续签到时间 */
        _this.$signInCount = 0;
        /**金币 */
        _this.$_coin = null;
        /**体力 */
        _this.$_physical = 10;
        /**段位 */
        _this.$_rankLv = Define_1.RANKLV.RANKLV1;
        /**星数 */
        _this.$_starCount = Define_1.RANKLV.RANKLV0;
        /**各段位关卡通关数 */
        _this.$_rankPassArr = [];
        /**各段位关卡宝箱领取情况 */
        _this.$_rankLvBoxReceive = [];
        /**段位奖励领取数组 */
        _this.$_levelReward = null;
        /**段位奖励位置 */
        _this.$_levelRewardNum = 0;
        /**段位奖励累计场次数量 */
        _this.$_levelRewardWin = 0;
        /**虚拟用户名 */
        _this.$_useName = "帅的不明显";
        /**虚拟头像 */
        _this.$_head = 123;
        _this.$guide = null;
        _this.$hj = false;
        _this.$zs = false;
        return _this;
    }
    LUserData.prototype.onInit = function () {
        var _this = this;
        this.load();
        // this.initEvent();
        if (!this.$fristTime) {
            this.$fristTime = GCtrl_1.GCtrl.now;
        }
        if (!this.$guide) {
            this.$guide = [];
        }
        if (!this.$_coin) {
            var InitCoin = GameMgr_1.default.systemConfig.value(JXCommon_1.JXDef.SYS_CONFIG_KEY.InitCoin);
            console.log("InitCoin", InitCoin);
            this.$_coin = InitCoin;
        }
        if (!this.$_levelReward) {
            var levelReward_1 = {
                adbox: Define_1.levelBoxItem.adbox0,
                box: Define_1.levelBoxItem.box0,
            };
            this.$_levelReward = [];
            GameMgr_1.default.levelRewardData.data.values().forEach(function (v, s) {
                _this.$_levelReward.push(levelReward_1);
            });
        }
        // if (!this.$_head) {
        //     this.$_head = MathEx.random(101, 150);
        // }
        this.set();
    };
    Object.defineProperty(LUserData.prototype, "zs", {
        get: function () {
            return this.$zs;
        },
        set: function (v) {
            this.$zs = true;
            this.set();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LUserData.prototype, "hj", {
        get: function () {
            return this.$hj;
        },
        set: function (v) {
            this.$hj = true;
            this.set();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LUserData.prototype, "levelInfo", {
        /**获取用户段位信息 */
        get: function () {
            var info = {
                isSelf: 1,
                name: this.$_useName,
                icon: this.$_head,
                levelLv: this.$_rankLv,
                starNum: this.$_starCount,
            };
            return info;
        },
        enumerable: false,
        configurable: true
    });
    /**修改段位奖励领取数组 */
    LUserData.prototype.setLevelReward = function (value, index) {
        var reward = CoreDefine_1.OBJECT_COPY(this.$_levelReward);
        if (index == Define_1.levelBoxItem.doubleBox) {
            console.log("修改段位奖励领取数组", value, index);
            reward[value].adbox = Define_1.levelBoxItem.adbox1;
            reward[value].box = Define_1.levelBoxItem.box1;
        }
        else if (index == Define_1.levelBoxItem.adbox1) {
            reward[value].adbox = Define_1.levelBoxItem.adbox2;
        }
        else if (index == Define_1.levelBoxItem.box1) {
            reward[value].box = Define_1.levelBoxItem.box2;
        }
        this.$_levelReward = reward;
        this.set();
    };
    /**获取段位奖励领取数组某个宝箱状态 */
    LUserData.prototype.getLevelReward = function (v) {
        return this.$_levelReward[v];
    };
    Object.defineProperty(LUserData.prototype, "levelRewardWin", {
        /**获取当前任务胜利场次 */
        get: function () {
            return this.$_levelRewardWin;
        },
        /**设置当前任务胜利场次 */
        set: function (v) {
            this.$_levelRewardWin = v;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LUserData.prototype, "levelRewardNum", {
        /**获取段位奖励领取条件索引 */
        get: function () {
            return this.$_levelRewardNum;
        },
        /**提升段位奖励领取条件索引 */
        set: function (v) {
            this.$_levelRewardNum++;
            this.set();
        },
        enumerable: false,
        configurable: true
    });
    /**
     * 获取某个排位赛宝箱状态
     * @param rankLv 排位赛段位
     * @param id 那个宝箱
     */
    LUserData.prototype.getRankLvBoxReceive = function (rankLv, id) {
        var type = Define_1.rankLvBoxItem.NULL;
        this.$_rankLvBoxReceive.forEach(function (v, index) {
            if (index === rankLv - 1) {
                v.forEach(function (s, count) {
                    if (count == id - 1) {
                        type = s;
                    }
                });
            }
        });
        return type;
    };
    /**初始设置宝箱状态 */
    LUserData.prototype.setRankBoxType = function (rankLv, id, type) {
        // console.log("初始设置宝箱状态", id);
        if (type === void 0) { type = 1; }
        if (!this.$_rankLvBoxReceive[rankLv - 1]) {
            this.$_rankLvBoxReceive[rankLv - 1] = [];
        }
        if (type == 1) {
            this.$_rankLvBoxReceive[rankLv - 1].push(Define_1.rankLvBoxItem.box0);
        }
        else {
            this.$_rankLvBoxReceive[rankLv - 1][id - 1] = type;
        }
        this.set();
    };
    /**获取某个排位赛通关数量 */
    LUserData.prototype.getRankPassCount = function (v) {
        if (!this.$_rankPassArr[v]) {
            this.$_rankPassArr[v] = 0;
            this.set();
        }
        return this.$_rankPassArr[v];
        // return 9;
    };
    /**
     * 设置某个排位赛具体
     * @param index 具体段位赛
     * @param num 累加关卡数量
     */
    LUserData.prototype.setRankPassCount = function (index, num, maxLv) {
        if (num === void 0) { num = 1; }
        if (maxLv === void 0) { maxLv = 10; }
        if (!this.$_rankPassArr[index - 1]) {
            this.$_rankPassArr[index - 1] = 0;
        }
        this.$_rankPassArr[index - 1] += num;
        if (this.$_rankPassArr[index - 1] > maxLv) {
            this.$_rankPassArr[index - 1] = maxLv;
        }
        this.set();
    };
    Object.defineProperty(LUserData.prototype, "RankLv", {
        /**获取当前段位 */
        get: function () {
            return this.$_rankLv;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(LUserData.prototype, "StarCount", {
        /**获取当前星星数量 */
        get: function () {
            return this.$_starCount;
        },
        enumerable: false,
        configurable: true
    });
    /**添加星星是否改变段位 */
    LUserData.prototype.setRankLv = function (v) {
        if (v === void 0) { v = 1; }
        this.$_starCount += v;
        if (this.$_starCount > 3 && this.$_rankLv != Define_1.RANKLV.RANKLV7) {
            this.$_rankLv++;
            GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.view.onRankLock, this.$_rankLv);
            this.$_starCount = 0;
        }
        else if (this.$_rankLv >= Define_1.RANKLV.RANKLV7) {
            if (this.$_starCount >= 999) {
                this.$_starCount = 999;
            }
        }
        if (this.$_starCount < 0) {
            this.$_rankLv--;
            if (this.$_rankLv < 1) {
                this.$_rankLv = 1;
                this.$_starCount = 0;
            }
            else {
                this.$_starCount = 2;
            }
        }
        this.set();
    };
    LUserData.prototype.isGuideOver = function (guideId) {
        var guide = this.$guide;
        return guide.indexOf(guideId) != CoreDefine_1.INVALID_VALUE;
    };
    LUserData.prototype.setGuides = function (guideId) {
        if (this.$guide.indexOf(guideId) == CoreDefine_1.INVALID_VALUE) {
            this.$guide.push(guideId);
            this.set();
        }
    };
    Object.defineProperty(LUserData.prototype, "guide", {
        get: function () {
            return this.$guide;
        },
        enumerable: false,
        configurable: true
    });
    LUserData.prototype.isDoneGuide = function () {
        return this.$guide.length >= GameMgr_1.default.guideChainData.data.size;
    };
    LUserData.prototype.checkGuideIsOver = function () {
        var arr = GameMgr_1.default.guideChainData.data.values();
        for (var index = 0; index < arr.length; index++) {
            var raw = arr[index];
            var isExit = this.isGuideOver(raw.guideId);
            if (!isExit) {
                return false;
            }
        }
        return true;
    };
    /**是否是新用户 (当天是否是用户注册当天)*/
    LUserData.prototype.checkIsNewUser = function () {
        return TimeUtils_1.default.isSameDay(GCtrl_1.GCtrl.now, this.$fristTime);
    };
    Object.defineProperty(LUserData.prototype, "adWatchTime", {
        /**获取观看次数 */
        get: function () {
            return this.$adWatchTime;
        },
        enumerable: false,
        configurable: true
    });
    /**观看广告 */
    LUserData.prototype.addAdWatchTime = function (time) {
        if (time === void 0) { time = 1; }
        this.$adWatchTime += time;
        this.set();
    };
    /*签到开始 */
    LUserData.prototype.signIn = function () {
        this.$signInDate = GCtrl_1.GCtrl.now;
        // GCtrl.ES.emit(CMsg.client.home.onSign);
        this.$signInCount++;
        this.set();
        return this.$signInCount;
    };
    /**设置签到天数 */
    LUserData.prototype.setSignCount = function (v) {
        this.$signInCount = v;
    };
    /**获取签到天数 */
    LUserData.prototype.getSignCount = function () {
        return this.$signInCount;
    };
    /**是否同天签到 */
    LUserData.prototype.todayIsSignIn = function () {
        return TimeUtils_1.default.isSameDay(this.$signInDate, GCtrl_1.GCtrl.now) ? true : false;
    };
    /**获取金币 */
    LUserData.prototype.getCoin = function () {
        return this.$_coin;
    };
    /**改变金币数量 */
    LUserData.prototype.setCoin = function (v) {
        this.$_coin += v;
        this.set();
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.currency.onCurrencyChange, Define_1.ITEMTYPE.COIN);
    };
    Object.defineProperty(LUserData.prototype, "Physical", {
        /**获取体力 */
        get: function () {
            return this.$_physical;
        },
        enumerable: false,
        configurable: true
    });
    LUserData.prototype.setPhysical = function (v) {
        this.$_physical += v;
        this.set();
        GCtrl_1.GCtrl.ES.emit(Define_1.CMsg.client.currency.onCurrencyChange, Define_1.ITEMTYPE.PY);
    };
    LUserData.prototype.getItem = function (v) {
        var type = null;
        switch (v) {
            case Define_1.ITEMTYPE.COIN: {
                type = this.getCoin();
                break;
            }
            case Define_1.ITEMTYPE.PY: {
                type = this.Physical;
                break;
            }
            default:
                break;
        }
        return type;
    };
    /**
     * 测试消耗
     * @param type 测试类型
     * @param raw 消耗数量
     * @param times 次数
     * @param notEnoughOpen 不足的时候开启
     */
    LUserData.prototype.testCost = function (type, raw, times, notEnoughOpen) {
        if (times === void 0) { times = 1; }
        if (notEnoughOpen === void 0) { notEnoughOpen = false; }
        var result = {};
        result.cur = this.getItem(type);
        result.raw = raw;
        if (raw > 0) {
            var totalTimes = Math.floor(result.cur / raw);
            result.enough = totalTimes >= times;
            result.need = raw * times;
            result.ext = {
                enoughTimes: Math.max(0, totalTimes),
                enoughCost: Math.max(0, Math.min(totalTimes, times) * raw),
            };
            if (!result.enough) {
                if (notEnoughOpen) {
                }
                if (type == Define_1.ITEMTYPE.PY) {
                    result.tip = Language_1.L(Zh_1.JXLocales.currency.py);
                }
                else {
                    result.tip = Language_1.L(Zh_1.JXLocales.currency.coin);
                }
            }
            else {
                if (type == Define_1.ITEMTYPE.PY) {
                    // this.setPhysical(-raw);
                }
                else {
                    this.setCoin(-raw);
                }
            }
            return result;
        }
        else {
            result.enough = true;
            result.need = 0;
            result.ext = {
                enoughTimes: NaN,
                enoughCost: NaN,
            };
            return result;
        }
    };
    /**获取分页关卡数 */
    LUserData.prototype.getRank = function (num) {
        var obj = {
            lv: 0,
            count: num,
        };
        var rise = 1;
        var star = num / 5;
        var starCount = null;
        if (star + obj.lv > rise) {
            obj.lv = parseInt(star.toString());
            if (star % 1 == 0) {
                obj.lv = star - 1;
            }
            var num1 = (star % 1).toFixed(1);
            if (num1 == "0.0") {
                obj.lv++;
                starCount = 0;
            }
            else {
                starCount = Number(num1) / 0.2;
            }
            obj.count = Math.ceil(starCount);
        }
        return obj;
    };
    LUserData = __decorate([
        ccclass
    ], LUserData);
    return LUserData;
}(DataPool_1.GLocal));
exports.LUserData = LUserData;

cc._RF.pop();