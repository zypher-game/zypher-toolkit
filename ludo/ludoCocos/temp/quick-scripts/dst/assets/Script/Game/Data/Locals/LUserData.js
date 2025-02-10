
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'preview-scripts/assets/Script/Game/Data/Locals/LUserData.js';
                    var __require = nodeEnv ? function (request) {
                        return cc.require(request);
                    } : function (request) {
                        return __quick_compile_project__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_project__.registerModule(__filename, module);}"use strict";
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzc2V0cy9TY3JpcHQvR2FtZS9EYXRhL0xvY2Fscy9MVXNlckRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLDBEQUFzRDtBQUN0RCx1REFBc0U7QUFDdEUsNkNBQTRDO0FBQzVDLDJEQUF3RDtBQUN4RCw4Q0FNNkI7QUFDN0Isa0RBQTBDO0FBQzFDLG9EQUE4QztBQUM5QyxzQ0FBNEM7QUFDNUMsK0NBQTBDO0FBRWxDLElBQUEsT0FBTyxHQUFLLEVBQUUsQ0FBQyxVQUFVLFFBQWxCLENBQW1CO0FBRWxDO0lBQStCLDZCQUFNO0lBQXJDO1FBQUEscUVBeWFDO1FBeGFRLGVBQVMsR0FBRyxXQUFXLENBQUM7UUFDL0IsV0FBVztRQUNILGdCQUFVLEdBQVcsQ0FBQyxDQUFDO1FBRy9CLFdBQVc7UUFDSCxpQkFBVyxHQUFXLENBQUMsQ0FBQztRQUNoQyxZQUFZO1FBQ0osa0JBQVksR0FBVyxDQUFDLENBQUM7UUFDakMsUUFBUTtRQUNBLFlBQU0sR0FBVyxJQUFJLENBQUM7UUFDOUIsUUFBUTtRQUNBLGdCQUFVLEdBQVcsRUFBRSxDQUFDO1FBQ2hDLFFBQVE7UUFDQSxjQUFRLEdBQVcsZUFBTSxDQUFDLE9BQU8sQ0FBQztRQUMxQyxRQUFRO1FBQ0EsaUJBQVcsR0FBVyxlQUFNLENBQUMsT0FBTyxDQUFDO1FBQzdDLGNBQWM7UUFDTixtQkFBYSxHQUFrQixFQUFFLENBQUM7UUFDMUMsaUJBQWlCO1FBQ1Qsd0JBQWtCLEdBQXlCLEVBQUUsQ0FBQztRQUN0RCxjQUFjO1FBQ04sbUJBQWEsR0FBdUIsSUFBSSxDQUFDO1FBQ2pELFlBQVk7UUFDSixzQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFDckMsZ0JBQWdCO1FBQ1Isc0JBQWdCLEdBQVcsQ0FBQyxDQUFDO1FBQ3JDLFdBQVc7UUFDSCxlQUFTLEdBQVcsT0FBTyxDQUFDO1FBQ3BDLFVBQVU7UUFDRixZQUFNLEdBQVcsR0FBRyxDQUFD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clxuICBJR3JhZGVSYW5rSW5mbyxcclxuICBJUmFua0xldmVsLFxyXG4gIEl0ZW1Db3N0UmVzdWx0LFxyXG4gIExldmVsUmV3YXJkLFxyXG4gIFNHdWlkZUNoYWluRGF0YVJhdyxcclxufSBmcm9tIFwiLi4vLi4vLi4vLi4vLi4vZC50cy9nYW1lL0pYQ0xCdGxcIjtcclxuaW1wb3J0IHsgSlhEZWYgfSBmcm9tIFwiLi4vLi4vLi4vY29udmVudGlvbnMvSlhDb21tb25cIjtcclxuaW1wb3J0IHsgSU5WQUxJRF9WQUxVRSwgT0JKRUNUX0NPUFkgfSBmcm9tIFwiLi4vLi4vLi4vQ29yZS9Db3JlRGVmaW5lXCI7XHJcbmltcG9ydCB7IEdDdHJsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvR0N0cmxcIjtcclxuaW1wb3J0IHsgR0xvY2FsIH0gZnJvbSBcIi4uLy4uLy4uL0NvcmUvTWFuYWdlci9EYXRhUG9vbFwiO1xyXG5pbXBvcnQge1xyXG4gIENNc2csXHJcbiAgSVRFTVRZUEUsXHJcbiAgbGV2ZWxCb3hJdGVtLFxyXG4gIFJBTktMVixcclxuICByYW5rTHZCb3hJdGVtLFxyXG59IGZyb20gXCIuLi8uLi9Db21tb24vRGVmaW5lXCI7XHJcbmltcG9ydCB7IEwgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL0xhbmd1YWdlXCI7XHJcbmltcG9ydCBUaW1lVXRpbCBmcm9tIFwiLi4vLi4vQ29tbW9uL1RpbWVVdGlsc1wiO1xyXG5pbXBvcnQgeyBKWExvY2FsZXMgfSBmcm9tIFwiLi4vLi4vQ29tbW9uL1poXCI7XHJcbmltcG9ydCBHYW1lTWdyIGZyb20gXCIuLi8uLi9Mb2dpYy9HYW1lTWdyXCI7XHJcblxyXG5jb25zdCB7IGNjY2xhc3MgfSA9IGNjLl9kZWNvcmF0b3I7XHJcbkBjY2NsYXNzXHJcbmV4cG9ydCBjbGFzcyBMVXNlckRhdGEgZXh0ZW5kcyBHTG9jYWwge1xyXG4gIHB1YmxpYyAkbG9jYWxLZXkgPSBcIkxVc2VyRGF0YVwiO1xyXG4gIC8v56ys5LiA5qyh55m76ZmG5ri45oiP5pe26Ze0XHJcbiAgcHJpdmF0ZSAkZnJpc3RUaW1lOiBudW1iZXIgPSAwO1xyXG4gIC8qKuW5v+WRiue0r+iuoeingueci+asoeaVsCAqL1xyXG4gIHByaXZhdGUgJGFkV2F0Y2hUaW1lOiBudW1iZXI7XHJcbiAgLyoq562+5Yiw55qE5pe26Ze0ICovXHJcbiAgcHJpdmF0ZSAkc2lnbkluRGF0ZTogbnVtYmVyID0gMDtcclxuICAvKirov57nu63nrb7liLDml7bpl7QgKi9cclxuICBwcml2YXRlICRzaWduSW5Db3VudDogbnVtYmVyID0gMDtcclxuICAvKirph5HluIEgKi9cclxuICBwcml2YXRlICRfY29pbjogbnVtYmVyID0gbnVsbDtcclxuICAvKirkvZPlipsgKi9cclxuICBwcml2YXRlICRfcGh5c2ljYWw6IG51bWJlciA9IDEwO1xyXG4gIC8qKuauteS9jSAqL1xyXG4gIHByaXZhdGUgJF9yYW5rTHY6IG51bWJlciA9IFJBTktMVi5SQU5LTFYxO1xyXG4gIC8qKuaYn+aVsCAqL1xyXG4gIHByaXZhdGUgJF9zdGFyQ291bnQ6IG51bWJlciA9IFJBTktMVi5SQU5LTFYwO1xyXG4gIC8qKuWQhOauteS9jeWFs+WNoemAmuWFs+aVsCAqL1xyXG4gIHByaXZhdGUgJF9yYW5rUGFzc0FycjogQXJyYXk8bnVtYmVyPiA9IFtdO1xyXG4gIC8qKuWQhOauteS9jeWFs+WNoeWuneeusemihuWPluaDheWGtSAqL1xyXG4gIHByaXZhdGUgJF9yYW5rTHZCb3hSZWNlaXZlOiBBcnJheTxBcnJheTxudW1iZXI+PiA9IFtdO1xyXG4gIC8qKuauteS9jeWlluWKsemihuWPluaVsOe7hCAqL1xyXG4gIHByaXZhdGUgJF9sZXZlbFJld2FyZDogQXJyYXk8TGV2ZWxSZXdhcmQ+ID0gbnVsbDtcclxuICAvKirmrrXkvY3lpZblirHkvY3nva4gKi9cclxuICBwcml2YXRlICRfbGV2ZWxSZXdhcmROdW06IG51bWJlciA9IDA7XHJcbiAgLyoq5q615L2N5aWW5Yqx57Sv6K6h5Zy65qyh5pWw6YePICovXHJcbiAgcHJpdmF0ZSAkX2xldmVsUmV3YXJkV2luOiBudW1iZXIgPSAwO1xyXG4gIC8qKuiZmuaLn+eUqOaIt+WQjSAqL1xyXG4gIHByaXZhdGUgJF91c2VOYW1lOiBzdHJpbmcgPSBcIuW4heeahOS4jeaYjuaYvlwiO1xyXG4gIC8qKuiZmuaLn+WktOWDjyAqL1xyXG4gIHByaXZhdGUgJF9oZWFkOiBudW1iZXIgPSAxMjM7XHJcbiAgcHJpdmF0ZSAkZ3VpZGU6IG51bWJlcltdID0gbnVsbDtcclxuICBwcml2YXRlICRoajogYm9vbGVhbiA9IGZhbHNlO1xyXG4gIHByaXZhdGUgJHpzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgb25Jbml0KCkge1xyXG4gICAgdGhpcy5sb2FkKCk7XHJcbiAgICAvLyB0aGlzLmluaXRFdmVudCgpO1xyXG4gICAgaWYgKCF0aGlzLiRmcmlzdFRpbWUpIHtcclxuICAgICAgdGhpcy4kZnJpc3RUaW1lID0gR0N0cmwubm93O1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLiRndWlkZSkge1xyXG4gICAgICB0aGlzLiRndWlkZSA9IFtdO1xyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLiRfY29pbikge1xyXG4gICAgICBsZXQgSW5pdENvaW46IG51bWJlciA9IEdhbWVNZ3Iuc3lzdGVtQ29uZmlnLnZhbHVlKFxyXG4gICAgICAgIEpYRGVmLlNZU19DT05GSUdfS0VZLkluaXRDb2luXHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwiSW5pdENvaW5cIiwgSW5pdENvaW4pO1xyXG4gICAgICB0aGlzLiRfY29pbiA9IEluaXRDb2luO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy4kX2xldmVsUmV3YXJkKSB7XHJcbiAgICAgIGxldCBsZXZlbFJld2FyZDogTGV2ZWxSZXdhcmQgPSB7XHJcbiAgICAgICAgYWRib3g6IGxldmVsQm94SXRlbS5hZGJveDAsXHJcbiAgICAgICAgYm94OiBsZXZlbEJveEl0ZW0uYm94MCxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy4kX2xldmVsUmV3YXJkID0gW107XHJcbiAgICAgIEdhbWVNZ3IubGV2ZWxSZXdhcmREYXRhLmRhdGEudmFsdWVzKCkuZm9yRWFjaCgodiwgcykgPT4ge1xyXG4gICAgICAgIHRoaXMuJF9sZXZlbFJld2FyZC5wdXNoKGxldmVsUmV3YXJkKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gaWYgKCF0aGlzLiRfaGVhZCkge1xyXG4gICAgLy8gICAgIHRoaXMuJF9oZWFkID0gTWF0aEV4LnJhbmRvbSgxMDEsIDE1MCk7XHJcbiAgICAvLyB9XHJcbiAgICB0aGlzLnNldCgpO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGdldCB6cygpIHtcclxuICAgIHJldHVybiB0aGlzLiR6cztcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXQgenModikge1xyXG4gICAgdGhpcy4kenMgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgaGooKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kaGo7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgc2V0IGhqKHYpIHtcclxuICAgIHRoaXMuJGhqID0gdHJ1ZTtcclxuICAgIHRoaXMuc2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5bnlKjmiLfmrrXkvY3kv6Hmga8gKi9cclxuICBwdWJsaWMgZ2V0IGxldmVsSW5mbygpIHtcclxuICAgIGxldCBpbmZvOiBJR3JhZGVSYW5rSW5mbyA9IHtcclxuICAgICAgaXNTZWxmOiAxLFxyXG4gICAgICBuYW1lOiB0aGlzLiRfdXNlTmFtZSxcclxuICAgICAgaWNvbjogdGhpcy4kX2hlYWQsXHJcbiAgICAgIGxldmVsTHY6IHRoaXMuJF9yYW5rTHYsXHJcbiAgICAgIHN0YXJOdW06IHRoaXMuJF9zdGFyQ291bnQsXHJcbiAgICB9O1xyXG4gICAgcmV0dXJuIGluZm87XHJcbiAgfVxyXG5cclxuICAvKirkv67mlLnmrrXkvY3lpZblirHpooblj5bmlbDnu4QgKi9cclxuICBwdWJsaWMgc2V0TGV2ZWxSZXdhcmQodmFsdWU6IG51bWJlciwgaW5kZXg6IGxldmVsQm94SXRlbSkge1xyXG4gICAgdmFyIHJld2FyZDogQXJyYXk8TGV2ZWxSZXdhcmQ+ID0gT0JKRUNUX0NPUFkodGhpcy4kX2xldmVsUmV3YXJkKTtcclxuICAgIGlmIChpbmRleCA9PSBsZXZlbEJveEl0ZW0uZG91YmxlQm94KSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKFwi5L+u5pS55q615L2N5aWW5Yqx6aKG5Y+W5pWw57uEXCIsIHZhbHVlLCBpbmRleCk7XHJcbiAgICAgIHJld2FyZFt2YWx1ZV0uYWRib3ggPSBsZXZlbEJveEl0ZW0uYWRib3gxO1xyXG4gICAgICByZXdhcmRbdmFsdWVdLmJveCA9IGxldmVsQm94SXRlbS5ib3gxO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSBsZXZlbEJveEl0ZW0uYWRib3gxKSB7XHJcbiAgICAgIHJld2FyZFt2YWx1ZV0uYWRib3ggPSBsZXZlbEJveEl0ZW0uYWRib3gyO1xyXG4gICAgfSBlbHNlIGlmIChpbmRleCA9PSBsZXZlbEJveEl0ZW0uYm94MSkge1xyXG4gICAgICByZXdhcmRbdmFsdWVdLmJveCA9IGxldmVsQm94SXRlbS5ib3gyO1xyXG4gICAgfVxyXG4gICAgdGhpcy4kX2xldmVsUmV3YXJkID0gcmV3YXJkO1xyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKuiOt+WPluauteS9jeWlluWKsemihuWPluaVsOe7hOafkOS4quWuneeuseeKtuaAgSAqL1xyXG4gIHB1YmxpYyBnZXRMZXZlbFJld2FyZCh2KSB7XHJcbiAgICByZXR1cm4gdGhpcy4kX2xldmVsUmV3YXJkW3ZdO1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W5b2T5YmN5Lu75Yqh6IOc5Yip5Zy65qyhICovXHJcbiAgcHVibGljIGdldCBsZXZlbFJld2FyZFdpbigpIHtcclxuICAgIHJldHVybiB0aGlzLiRfbGV2ZWxSZXdhcmRXaW47XHJcbiAgfVxyXG5cclxuICAvKirorr7nva7lvZPliY3ku7vliqHog5zliKnlnLrmrKEgKi9cclxuICBwdWJsaWMgc2V0IGxldmVsUmV3YXJkV2luKHYpIHtcclxuICAgIHRoaXMuJF9sZXZlbFJld2FyZFdpbiA9IHY7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5bmrrXkvY3lpZblirHpooblj5bmnaHku7bntKLlvJUgKi9cclxuICBwdWJsaWMgZ2V0IGxldmVsUmV3YXJkTnVtKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJF9sZXZlbFJld2FyZE51bTtcclxuICB9XHJcblxyXG4gIC8qKuaPkOWNh+auteS9jeWlluWKsemihuWPluadoeS7tue0ouW8lSAqL1xyXG4gIHB1YmxpYyBzZXQgbGV2ZWxSZXdhcmROdW0odikge1xyXG4gICAgdGhpcy4kX2xldmVsUmV3YXJkTnVtKys7XHJcbiAgICB0aGlzLnNldCgpO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog6I635Y+W5p+Q5Liq5o6S5L2N6LWb5a6d566x54q25oCBXHJcbiAgICogQHBhcmFtIHJhbmtMdiDmjpLkvY3otZvmrrXkvY1cclxuICAgKiBAcGFyYW0gaWQg6YKj5Liq5a6d566xXHJcbiAgICovXHJcbiAgcHVibGljIGdldFJhbmtMdkJveFJlY2VpdmUocmFua0x2OiBudW1iZXIsIGlkOiBudW1iZXIpOiBudW1iZXIge1xyXG4gICAgbGV0IHR5cGUgPSByYW5rTHZCb3hJdGVtLk5VTEw7XHJcbiAgICB0aGlzLiRfcmFua0x2Qm94UmVjZWl2ZS5mb3JFYWNoKCh2LCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoaW5kZXggPT09IHJhbmtMdiAtIDEpIHtcclxuICAgICAgICB2LmZvckVhY2goKHM6IG51bWJlciwgY291bnQpID0+IHtcclxuICAgICAgICAgIGlmIChjb3VudCA9PSBpZCAtIDEpIHtcclxuICAgICAgICAgICAgdHlwZSA9IHM7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHR5cGU7XHJcbiAgfVxyXG5cclxuICAvKirliJ3lp4vorr7nva7lrp3nrrHnirbmgIEgKi9cclxuICBwdWJsaWMgc2V0UmFua0JveFR5cGUocmFua0x2OiBudW1iZXIsIGlkOiBudW1iZXIsIHR5cGU6IG51bWJlciA9IDEpIHtcclxuICAgIC8vIGNvbnNvbGUubG9nKFwi5Yid5aeL6K6+572u5a6d566x54q25oCBXCIsIGlkKTtcclxuXHJcbiAgICBpZiAoIXRoaXMuJF9yYW5rTHZCb3hSZWNlaXZlW3JhbmtMdiAtIDFdKSB7XHJcbiAgICAgIHRoaXMuJF9yYW5rTHZCb3hSZWNlaXZlW3JhbmtMdiAtIDFdID0gW107XHJcbiAgICB9XHJcbiAgICBpZiAodHlwZSA9PSAxKSB7XHJcbiAgICAgIHRoaXMuJF9yYW5rTHZCb3hSZWNlaXZlW3JhbmtMdiAtIDFdLnB1c2gocmFua0x2Qm94SXRlbS5ib3gwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuJF9yYW5rTHZCb3hSZWNlaXZlW3JhbmtMdiAtIDFdW2lkIC0gMV0gPSB0eXBlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKuiOt+WPluafkOS4quaOkuS9jei1m+mAmuWFs+aVsOmHjyAqL1xyXG4gIHB1YmxpYyBnZXRSYW5rUGFzc0NvdW50KHYpIHtcclxuICAgIGlmICghdGhpcy4kX3JhbmtQYXNzQXJyW3ZdKSB7XHJcbiAgICAgIHRoaXMuJF9yYW5rUGFzc0Fyclt2XSA9IDA7XHJcbiAgICAgIHRoaXMuc2V0KCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy4kX3JhbmtQYXNzQXJyW3ZdO1xyXG4gICAgLy8gcmV0dXJuIDk7XHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiDorr7nva7mn5DkuKrmjpLkvY3otZvlhbfkvZNcclxuICAgKiBAcGFyYW0gaW5kZXgg5YW35L2T5q615L2N6LWbXHJcbiAgICogQHBhcmFtIG51bSDntK/liqDlhbPljaHmlbDph49cclxuICAgKi9cclxuICBwdWJsaWMgc2V0UmFua1Bhc3NDb3VudChpbmRleDogbnVtYmVyLCBudW06IG51bWJlciA9IDEsIG1heEx2OiBudW1iZXIgPSAxMCkge1xyXG4gICAgaWYgKCF0aGlzLiRfcmFua1Bhc3NBcnJbaW5kZXggLSAxXSkge1xyXG4gICAgICB0aGlzLiRfcmFua1Bhc3NBcnJbaW5kZXggLSAxXSA9IDA7XHJcbiAgICB9XHJcbiAgICB0aGlzLiRfcmFua1Bhc3NBcnJbaW5kZXggLSAxXSArPSBudW07XHJcbiAgICBpZiAodGhpcy4kX3JhbmtQYXNzQXJyW2luZGV4IC0gMV0gPiBtYXhMdikge1xyXG4gICAgICB0aGlzLiRfcmFua1Bhc3NBcnJbaW5kZXggLSAxXSA9IG1heEx2O1xyXG4gICAgfVxyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcblxyXG4gIC8qKuiOt+WPluW9k+WJjeauteS9jSAqL1xyXG4gIHB1YmxpYyBnZXQgUmFua0x2KCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJF9yYW5rTHY7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5blvZPliY3mmJ/mmJ/mlbDph48gKi9cclxuICBwdWJsaWMgZ2V0IFN0YXJDb3VudCgpIHtcclxuICAgIHJldHVybiB0aGlzLiRfc3RhckNvdW50O1xyXG4gIH1cclxuXHJcbiAgLyoq5re75Yqg5pif5pif5piv5ZCm5pS55Y+Y5q615L2NICovXHJcbiAgcHVibGljIHNldFJhbmtMdih2ID0gMSkge1xyXG4gICAgdGhpcy4kX3N0YXJDb3VudCArPSB2O1xyXG4gICAgaWYgKHRoaXMuJF9zdGFyQ291bnQgPiAzICYmIHRoaXMuJF9yYW5rTHYgIT0gUkFOS0xWLlJBTktMVjcpIHtcclxuICAgICAgdGhpcy4kX3JhbmtMdisrO1xyXG4gICAgICBHQ3RybC5FUy5lbWl0KENNc2cuY2xpZW50LnZpZXcub25SYW5rTG9jaywgdGhpcy4kX3JhbmtMdik7XHJcbiAgICAgIHRoaXMuJF9zdGFyQ291bnQgPSAwO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLiRfcmFua0x2ID49IFJBTktMVi5SQU5LTFY3KSB7XHJcbiAgICAgIGlmICh0aGlzLiRfc3RhckNvdW50ID49IDk5OSkge1xyXG4gICAgICAgIHRoaXMuJF9zdGFyQ291bnQgPSA5OTk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy4kX3N0YXJDb3VudCA8IDApIHtcclxuICAgICAgdGhpcy4kX3JhbmtMdi0tO1xyXG4gICAgICBpZiAodGhpcy4kX3JhbmtMdiA8IDEpIHtcclxuICAgICAgICB0aGlzLiRfcmFua0x2ID0gMTtcclxuICAgICAgICB0aGlzLiRfc3RhckNvdW50ID0gMDtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLiRfc3RhckNvdW50ID0gMjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zZXQoKTtcclxuICB9XHJcbiAgcHVibGljIGlzR3VpZGVPdmVyKGd1aWRlSWQ6IG51bWJlcikge1xyXG4gICAgbGV0IGd1aWRlID0gdGhpcy4kZ3VpZGU7XHJcbiAgICByZXR1cm4gZ3VpZGUuaW5kZXhPZihndWlkZUlkKSAhPSBJTlZBTElEX1ZBTFVFO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIHNldEd1aWRlcyhndWlkZUlkOiBudW1iZXIpIHtcclxuICAgIGlmICh0aGlzLiRndWlkZS5pbmRleE9mKGd1aWRlSWQpID09IElOVkFMSURfVkFMVUUpIHtcclxuICAgICAgdGhpcy4kZ3VpZGUucHVzaChndWlkZUlkKTtcclxuICAgICAgdGhpcy5zZXQoKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBnZXQgZ3VpZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kZ3VpZGU7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgaXNEb25lR3VpZGUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kZ3VpZGUubGVuZ3RoID49IEdhbWVNZ3IuZ3VpZGVDaGFpbkRhdGEuZGF0YS5zaXplO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGNoZWNrR3VpZGVJc092ZXIoKSB7XHJcbiAgICBsZXQgYXJyID0gR2FtZU1nci5ndWlkZUNoYWluRGF0YS5kYXRhLnZhbHVlczxTR3VpZGVDaGFpbkRhdGFSYXc+KCk7XHJcbiAgICBmb3IgKGxldCBpbmRleCA9IDA7IGluZGV4IDwgYXJyLmxlbmd0aDsgaW5kZXgrKykge1xyXG4gICAgICBsZXQgcmF3ID0gYXJyW2luZGV4XTtcclxuICAgICAgbGV0IGlzRXhpdCA9IHRoaXMuaXNHdWlkZU92ZXIocmF3Lmd1aWRlSWQpO1xyXG4gICAgICBpZiAoIWlzRXhpdCkge1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH1cclxuXHJcbiAgLyoq5piv5ZCm5piv5paw55So5oi3ICjlvZPlpKnmmK/lkKbmmK/nlKjmiLfms6jlhozlvZPlpKkpKi9cclxuICBwdWJsaWMgY2hlY2tJc05ld1VzZXIoKSB7XHJcbiAgICByZXR1cm4gVGltZVV0aWwuaXNTYW1lRGF5KEdDdHJsLm5vdywgdGhpcy4kZnJpc3RUaW1lKTtcclxuICB9XHJcblxyXG4gIC8qKuiOt+WPluingueci+asoeaVsCAqL1xyXG4gIHB1YmxpYyBnZXQgYWRXYXRjaFRpbWUoKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kYWRXYXRjaFRpbWU7XHJcbiAgfVxyXG5cclxuICAvKirop4LnnIvlub/lkYogKi9cclxuICBwdWJsaWMgYWRkQWRXYXRjaFRpbWUodGltZTogbnVtYmVyID0gMSkge1xyXG4gICAgdGhpcy4kYWRXYXRjaFRpbWUgKz0gdGltZTtcclxuICAgIHRoaXMuc2V0KCk7XHJcbiAgfVxyXG5cclxuICAvKuetvuWIsOW8gOWniyAqL1xyXG4gIHB1YmxpYyBzaWduSW4oKSB7XHJcbiAgICB0aGlzLiRzaWduSW5EYXRlID0gR0N0cmwubm93O1xyXG4gICAgLy8gR0N0cmwuRVMuZW1pdChDTXNnLmNsaWVudC5ob21lLm9uU2lnbik7XHJcbiAgICB0aGlzLiRzaWduSW5Db3VudCsrO1xyXG4gICAgdGhpcy5zZXQoKTtcclxuICAgIHJldHVybiB0aGlzLiRzaWduSW5Db3VudDtcclxuICB9XHJcblxyXG4gIC8qKuiuvue9ruetvuWIsOWkqeaVsCAqL1xyXG4gIHB1YmxpYyBzZXRTaWduQ291bnQodikge1xyXG4gICAgdGhpcy4kc2lnbkluQ291bnQgPSB2O1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W562+5Yiw5aSp5pWwICovXHJcbiAgcHVibGljIGdldFNpZ25Db3VudCgpIHtcclxuICAgIHJldHVybiB0aGlzLiRzaWduSW5Db3VudDtcclxuICB9XHJcblxyXG4gIC8qKuaYr+WQpuWQjOWkqeetvuWIsCAqL1xyXG4gIHB1YmxpYyB0b2RheUlzU2lnbkluKCk6IGJvb2xlYW4ge1xyXG4gICAgcmV0dXJuIFRpbWVVdGlsLmlzU2FtZURheSh0aGlzLiRzaWduSW5EYXRlLCBHQ3RybC5ub3cpID8gdHJ1ZSA6IGZhbHNlO1xyXG4gIH1cclxuXHJcbiAgLyoq6I635Y+W6YeR5biBICovXHJcbiAgcHVibGljIGdldENvaW4oKSB7XHJcbiAgICByZXR1cm4gdGhpcy4kX2NvaW47XHJcbiAgfVxyXG5cclxuICAvKirmlLnlj5jph5HluIHmlbDph48gKi9cclxuICBwdWJsaWMgc2V0Q29pbih2KSB7XHJcbiAgICB0aGlzLiRfY29pbiArPSB2O1xyXG4gICAgdGhpcy5zZXQoKTtcclxuICAgIEdDdHJsLkVTLmVtaXQoQ01zZy5jbGllbnQuY3VycmVuY3kub25DdXJyZW5jeUNoYW5nZSwgSVRFTVRZUEUuQ09JTik7XHJcbiAgfVxyXG5cclxuICAvKirojrflj5bkvZPlipsgKi9cclxuICBwdWJsaWMgZ2V0IFBoeXNpY2FsKCkge1xyXG4gICAgcmV0dXJuIHRoaXMuJF9waHlzaWNhbDtcclxuICB9XHJcblxyXG4gIHB1YmxpYyBzZXRQaHlzaWNhbCh2KSB7XHJcbiAgICB0aGlzLiRfcGh5c2ljYWwgKz0gdjtcclxuICAgIHRoaXMuc2V0KCk7XHJcbiAgICBHQ3RybC5FUy5lbWl0KENNc2cuY2xpZW50LmN1cnJlbmN5Lm9uQ3VycmVuY3lDaGFuZ2UsIElURU1UWVBFLlBZKTtcclxuICB9XHJcblxyXG4gIHByb3RlY3RlZCBnZXRJdGVtKHY6IElURU1UWVBFKSB7XHJcbiAgICBsZXQgdHlwZSA9IG51bGw7XHJcbiAgICBzd2l0Y2ggKHYpIHtcclxuICAgICAgY2FzZSBJVEVNVFlQRS5DT0lOOiB7XHJcbiAgICAgICAgdHlwZSA9IHRoaXMuZ2V0Q29pbigpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICAgIGNhc2UgSVRFTVRZUEUuUFk6IHtcclxuICAgICAgICB0eXBlID0gdGhpcy5QaHlzaWNhbDtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG5cclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiB0eXBlO1xyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICog5rWL6K+V5raI6ICXXHJcbiAgICogQHBhcmFtIHR5cGUg5rWL6K+V57G75Z6LXHJcbiAgICogQHBhcmFtIHJhdyDmtojogJfmlbDph49cclxuICAgKiBAcGFyYW0gdGltZXMg5qyh5pWwXHJcbiAgICogQHBhcmFtIG5vdEVub3VnaE9wZW4g5LiN6Laz55qE5pe25YCZ5byA5ZCvXHJcbiAgICovXHJcblxyXG4gIHB1YmxpYyB0ZXN0Q29zdChcclxuICAgIHR5cGU6IElURU1UWVBFLFxyXG4gICAgcmF3OiBudW1iZXIsXHJcbiAgICB0aW1lczogbnVtYmVyID0gMSxcclxuICAgIG5vdEVub3VnaE9wZW4gPSBmYWxzZVxyXG4gICkge1xyXG4gICAgbGV0IHJlc3VsdDogSXRlbUNvc3RSZXN1bHQgPSB7fTtcclxuICAgIHJlc3VsdC5jdXIgPSB0aGlzLmdldEl0ZW0odHlwZSk7XHJcbiAgICByZXN1bHQucmF3ID0gcmF3O1xyXG4gICAgaWYgKHJhdyA+IDApIHtcclxuICAgICAgbGV0IHRvdGFsVGltZXMgPSBNYXRoLmZsb29yKHJlc3VsdC5jdXIgLyByYXcpO1xyXG4gICAgICByZXN1bHQuZW5vdWdoID0gdG90YWxUaW1lcyA+PSB0aW1lcztcclxuICAgICAgcmVzdWx0Lm5lZWQgPSByYXcgKiB0aW1lcztcclxuICAgICAgcmVzdWx0LmV4dCA9IHtcclxuICAgICAgICBlbm91Z2hUaW1lczogTWF0aC5tYXgoMCwgdG90YWxUaW1lcyksXHJcbiAgICAgICAgZW5vdWdoQ29zdDogTWF0aC5tYXgoMCwgTWF0aC5taW4odG90YWxUaW1lcywgdGltZXMpICogcmF3KSxcclxuICAgICAgfTtcclxuICAgICAgaWYgKCFyZXN1bHQuZW5vdWdoKSB7XHJcbiAgICAgICAgaWYgKG5vdEVub3VnaE9wZW4pIHtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gSVRFTVRZUEUuUFkpIHtcclxuICAgICAgICAgIHJlc3VsdC50aXAgPSBMKEpYTG9jYWxlcy5jdXJyZW5jeS5weSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHJlc3VsdC50aXAgPSBMKEpYTG9jYWxlcy5jdXJyZW5jeS5jb2luKTtcclxuICAgICAgICB9XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYgKHR5cGUgPT0gSVRFTVRZUEUuUFkpIHtcclxuICAgICAgICAgIC8vIHRoaXMuc2V0UGh5c2ljYWwoLXJhdyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIHRoaXMuc2V0Q29pbigtcmF3KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdC5lbm91Z2ggPSB0cnVlO1xyXG4gICAgICByZXN1bHQubmVlZCA9IDA7XHJcbiAgICAgIHJlc3VsdC5leHQgPSB7XHJcbiAgICAgICAgZW5vdWdoVGltZXM6IE5hTixcclxuICAgICAgICBlbm91Z2hDb3N0OiBOYU4sXHJcbiAgICAgIH07XHJcbiAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgfVxyXG4gIC8qKuiOt+WPluWIhumhteWFs+WNoeaVsCAqL1xyXG4gIHB1YmxpYyBnZXRSYW5rKG51bTogbnVtYmVyKSB7XHJcbiAgICBsZXQgb2JqOiBJUmFua0xldmVsID0ge1xyXG4gICAgICBsdjogMCxcclxuICAgICAgY291bnQ6IG51bSxcclxuICAgIH07XHJcbiAgICBsZXQgcmlzZTogbnVtYmVyID0gMTtcclxuICAgIGxldCBzdGFyID0gbnVtIC8gNTtcclxuICAgIHZhciBzdGFyQ291bnQgPSBudWxsO1xyXG4gICAgaWYgKHN0YXIgKyBvYmoubHYgPiByaXNlKSB7XHJcbiAgICAgIG9iai5sdiA9IHBhcnNlSW50KHN0YXIudG9TdHJpbmcoKSk7XHJcbiAgICAgIGlmIChzdGFyICUgMSA9PSAwKSB7XHJcbiAgICAgICAgb2JqLmx2ID0gc3RhciAtIDE7XHJcbiAgICAgIH1cclxuICAgICAgbGV0IG51bTEgPSAoc3RhciAlIDEpLnRvRml4ZWQoMSk7XHJcbiAgICAgIGlmIChudW0xID09IFwiMC4wXCIpIHtcclxuICAgICAgICBvYmoubHYrKztcclxuICAgICAgICBzdGFyQ291bnQgPSAwO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0YXJDb3VudCA9IE51bWJlcihudW0xKSAvIDAuMjtcclxuICAgICAgfVxyXG4gICAgICBvYmouY291bnQgPSBNYXRoLmNlaWwoc3RhckNvdW50KTtcclxuICAgIH1cclxuICAgIHJldHVybiBvYmo7XHJcbiAgfVxyXG59XHJcbiJdfQ==